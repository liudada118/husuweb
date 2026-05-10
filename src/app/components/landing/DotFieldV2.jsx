"use client";

import { memo, useEffect, useRef } from "react";

const TWO_PI = Math.PI * 2;

const DotFieldV2 = memo(function DotFieldV2({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = "rgba(168, 85, 247, 0.35)",
  gradientTo = "rgba(180, 151, 207, 0.25)",
  targetFps = 30,
  renderScale = 0.72,
  style,
  className,
}) {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const propsRef = useRef({});
  const rebuildRef = useRef(null);

  propsRef.current = {
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowEl = glowRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.max(0.65, Math.min((window.devicePixelRatio || 1) * renderScale, 1.25));
    const frameDuration = 1000 / Math.max(targetFps, 1);
    let lastRenderedAt = 0;
    let isVisible = document.visibilityState !== "hidden";
    let resizeTimer;

    function buildDots(w, h) {
      const p = propsRef.current;
      const step = p.dotRadius + p.dotSpacing;
      const cols = Math.max(1, Math.floor(w / step));
      const rows = Math.max(1, Math.floor(h / step));
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots = new Array(rows * cols);
      let index = 0;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[index] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
          index += 1;
        }
      }

      dotsRef.current = dots;
    }

    function doResize() {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = {
        w,
        h,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
      };

      buildDots(w, h);
    }

    function resize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(doResize, 100);
    }

    function onMouseMove(event) {
      const s = sizeRef.current;
      mouseRef.current.x = event.pageX - s.offsetX;
      mouseRef.current.y = event.pageY - s.offsetY;
    }

    function updateMouseSpeed() {
      const m = mouseRef.current;
      const dx = m.prevX - m.x;
      const dy = m.prevY - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      m.speed += (dist - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;
    }

    const speedInterval = window.setInterval(updateMouseSpeed, 20);
    let frameCount = 0;

    function startLoop() {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(tick);
      }
    }

    function stopLoop() {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }

    function tick(now) {
      rafRef.current = null;
      if (!isVisible) {
        return;
      }

      if (lastRenderedAt && now - lastRenderedAt < frameDuration) {
        startLoop();
        return;
      }

      lastRenderedAt = now;
      frameCount += 1;

      const dots = dotsRef.current;
      const m = mouseRef.current;
      const { w, h } = sizeRef.current;
      const p = propsRef.current;
      const time = frameCount * 0.02;

      const targetEngagement = Math.min(m.speed / 5, 1);
      engagement.current += (targetEngagement - engagement.current) * 0.06;
      if (engagement.current < 0.001) engagement.current = 0;
      const eng = engagement.current;

      glowOpacity.current += (eng - glowOpacity.current) * 0.08;

      if (glowEl) {
        glowEl.setAttribute("cx", `${m.x}`);
        glowEl.setAttribute("cy", `${m.y}`);
        glowEl.style.opacity = `${glowOpacity.current}`;
      }

      ctx.clearRect(0, 0, w, h);

      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, p.gradientFrom);
      gradient.addColorStop(1, p.gradientTo);
      ctx.fillStyle = gradient;

      const cr = p.cursorRadius;
      const crSq = cr * cr;
      const rad = p.dotRadius / 2;
      const useBulge = p.bulgeOnly;

      ctx.beginPath();

      for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i];
        const dx = m.x - dot.ax;
        const dy = m.y - dot.ay;
        const distSq = dx * dx + dy * dy;

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq);

          if (useBulge) {
            const t = 1 - dist / cr;
            const push = t * t * p.bulgeStrength * eng;
            const angle = Math.atan2(dy, dx);
            dot.sx += (dot.ax - Math.cos(angle) * push - dot.sx) * 0.15;
            dot.sy += (dot.ay - Math.sin(angle) * push - dot.sy) * 0.15;
          } else {
            const angle = Math.atan2(dy, dx);
            const safeDist = Math.max(dist, 1);
            const move = (500 / safeDist) * (m.speed * p.cursorForce);
            dot.vx += Math.cos(angle) * -move;
            dot.vy += Math.sin(angle) * -move;
          }
        } else if (useBulge) {
          dot.sx += (dot.ax - dot.sx) * 0.1;
          dot.sy += (dot.ay - dot.sy) * 0.1;
        }

        if (!useBulge) {
          dot.vx *= 0.9;
          dot.vy *= 0.9;
          dot.x = dot.ax + dot.vx;
          dot.y = dot.ay + dot.vy;
          dot.sx += (dot.x - dot.sx) * 0.1;
          dot.sy += (dot.y - dot.sy) * 0.1;
        }

        let drawX = dot.sx;
        let drawY = dot.sy;

        if (p.waveAmplitude > 0) {
          drawY += Math.sin(dot.ax * 0.03 + time) * p.waveAmplitude;
          drawX += Math.cos(dot.ay * 0.03 + time * 0.7) * p.waveAmplitude * 0.5;
        }

        if (p.sparkle) {
          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
          if (hash % 100 < 3) {
            ctx.moveTo(drawX + rad * 1.8, drawY);
            ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
          } else {
            ctx.moveTo(drawX + rad, drawY);
            ctx.arc(drawX, drawY, rad, 0, TWO_PI);
          }
        } else {
          ctx.moveTo(drawX + rad, drawY);
          ctx.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      }

      ctx.fill();
      startLoop();
    }

    function handleVisibilityChange() {
      isVisible = document.visibilityState !== "hidden";
      if (isVisible) {
        lastRenderedAt = 0;
        startLoop();
        return;
      }

      stopLoop();
    }

    doResize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    startLoop();

    rebuildRef.current = () => {
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) buildDots(w, h);
    };

    return () => {
      stopLoop();
      window.clearInterval(speedInterval);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [renderScale, targetFps]);

  useEffect(() => {
    rebuildRef.current?.();
  }, [dotRadius, dotSpacing]);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <radialGradient id="dot-field-v2-glow">
            <stop offset="0%" stopColor="#120F17" />
            <stop offset="100%" stopColor="#120F1700" />
          </radialGradient>
        </defs>

        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill="url(#dot-field-v2-glow)"
          style={{ opacity: 0, willChange: "opacity" }}
        />
      </svg>
    </div>
  );
});

export default DotFieldV2;
