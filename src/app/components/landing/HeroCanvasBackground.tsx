"use client";

import { useEffect, useRef } from "react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function valueNoise(x: number, y: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = x0 + 1;
  const y1 = y0 + 1;

  const sx = x - x0;
  const sy = y - y0;
  const ux = sx * sx * (3 - 2 * sx);
  const uy = sy * sy * (3 - 2 * sy);

  const n00 = hash(x0, y0);
  const n10 = hash(x1, y0);
  const n01 = hash(x0, y1);
  const n11 = hash(x1, y1);

  const ix0 = lerp(n00, n10, ux);
  const ix1 = lerp(n01, n11, ux);

  return lerp(ix0, ix1, uy);
}

function fbm(x: number, y: number) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;

  for (let index = 0; index < 5; index += 1) {
    value += valueNoise(x * frequency, y * frequency) * amplitude;
    frequency *= 2;
    amplitude *= 0.5;
  }

  return value;
}

type Particle = {
  alpha: number;
  phase: number;
  size: number;
  speed: number;
  sway: number;
  x: number;
  y: number;
};

export function HeroCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const parent = canvas?.parentElement;

    if (!canvas || !ctx || !parent) {
      return;
    }

    const grainCanvas = document.createElement("canvas");
    const grainCtx = grainCanvas.getContext("2d");

    if (!grainCtx) {
      return;
    }

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let frameId = 0;

    const farParticles: Particle[] = Array.from({ length: 90 }, () => ({
      alpha: 0.018 + Math.random() * 0.028,
      phase: Math.random() * Math.PI * 2,
      size: 0.6 + Math.random() * 1.2,
      speed: 0.003 + Math.random() * 0.006,
      sway: 0.002 + Math.random() * 0.007,
      x: Math.random(),
      y: Math.random() * 0.62,
    }));

    const nearParticles: Particle[] = Array.from({ length: 55 }, () => ({
      alpha: 0.035 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2,
      size: 1 + Math.random() * 1.8,
      speed: 0.005 + Math.random() * 0.008,
      sway: 0.004 + Math.random() * 0.012,
      x: Math.random(),
      y: Math.random() * 0.7,
    }));

    const buildGrain = () => {
      const grainWidth = 220;
      const grainHeight = 220;
      grainCanvas.width = grainWidth;
      grainCanvas.height = grainHeight;

      const image = grainCtx.createImageData(grainWidth, grainHeight);
      const data = image.data;

      for (let index = 0; index < data.length; index += 4) {
        const noise = Math.floor(Math.random() * 255);
        data[index] = noise;
        data[index + 1] = noise;
        data[index + 2] = noise;
        data[index + 3] = 10;
      }

      grainCtx.putImageData(image, 0, 0);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth || window.innerWidth;
      height = parent.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawSoftEllipse = (
      x: number,
      y: number,
      radiusX: number,
      radiusY: number,
      alpha: number,
      angle: number,
      color: string,
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(radiusX, radiusY);

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
      gradient.addColorStop(0.48, `rgba(${color}, ${alpha * 0.46})`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawGlowDot = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 3.2);
      glow.addColorStop(0, `rgba(255, 230, 170, ${alpha})`);
      glow.addColorStop(0.35, `rgba(255, 210, 130, ${alpha * 0.55})`);
      glow.addColorStop(1, "rgba(255, 210, 130, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, size * 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(255, 240, 210, ${Math.min(alpha * 1.4, 1)})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawBackground = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const background = ctx.createLinearGradient(0, 0, 0, height);
      background.addColorStop(0, "#0e100c");
      background.addColorStop(0.35, "#080906");
      background.addColorStop(0.72, "#050605");
      background.addColorStop(1, "#030403");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "screen";

      const leftX = width * 0.1 + Math.sin(time * 0.1) * width * 0.018;
      const leftY = height * 0.46 + Math.cos(time * 0.08) * height * 0.028;
      const leftGreen = ctx.createRadialGradient(leftX, leftY, 0, leftX, leftY, Math.max(width, height) * 0.72);
      leftGreen.addColorStop(0, "rgba(35, 75, 40, 0.18)");
      leftGreen.addColorStop(0.35, "rgba(28, 55, 32, 0.09)");
      leftGreen.addColorStop(1, "rgba(20, 30, 20, 0)");
      ctx.fillStyle = leftGreen;
      ctx.fillRect(0, 0, width, height);

      const rightX = width * 0.9 + Math.cos(time * 0.1) * width * 0.016;
      const rightY = height * 0.52 + Math.sin(time * 0.08) * height * 0.024;
      const rightOlive = ctx.createRadialGradient(
        rightX,
        rightY,
        0,
        rightX,
        rightY,
        Math.max(width, height) * 0.58,
      );
      rightOlive.addColorStop(0, "rgba(95, 85, 28, 0.10)");
      rightOlive.addColorStop(0.48, "rgba(75, 70, 22, 0.05)");
      rightOlive.addColorStop(1, "rgba(60, 55, 20, 0)");
      ctx.fillStyle = rightOlive;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "source-over";
    };

    const drawMainSpotlight = (time: number) => {
      const driftX = (fbm(time * 0.1, 1.7) - 0.5) * width * 0.028;
      const driftY = (fbm(4.3, time * 0.09) - 0.5) * height * 0.022;

      const centerX =
        width * 0.48 +
        Math.sin(time * 0.2) * width * 0.03 +
        Math.sin(time * 0.44 + 1.2) * width * 0.01 +
        driftX;

      const centerY =
        height * 0.17 +
        Math.cos(time * 0.16 + 0.5) * height * 0.022 +
        Math.sin(time * 0.32 + 2.1) * height * 0.008 +
        driftY;

      const breathe = 1 + Math.sin(time * 0.8) * 0.018 + Math.sin(time * 0.34 + 1.3) * 0.008;
      const radiusX = Math.min(width, height) * 0.58 * breathe;
      const radiusY = Math.min(width, height) * 0.4 * breathe;

      ctx.globalCompositeOperation = "screen";

      const haloBaseX = width * 0.5;
      const haloBaseY = height * 0.19;
      const haloNoiseX = (fbm(time * 0.056, 8.1) - 0.5) * width * 0.03;
      const haloNoiseY = (fbm(3.7, time * 0.048) - 0.5) * height * 0.022;

      const haloX =
        haloBaseX +
        Math.sin(time * 0.36 + 0.8) * width * 0.22 +
        Math.cos(time * 0.18 + 1.7) * width * 0.08 +
        haloNoiseX;

      const haloY =
        haloBaseY +
        Math.cos(time * 0.32 + 0.3) * height * 0.12 +
        Math.sin(time * 0.14 + 2.4) * height * 0.05 +
        haloNoiseY;

      const haloScale = 1 + Math.sin(time * 0.44 + 0.5) * 0.08 + Math.cos(time * 0.22 + 1.2) * 0.04;
      const haloAngle = 0.03 + Math.sin(time * 0.2) * 0.04;

      drawSoftEllipse(haloX, haloY, radiusX * 1.24 * haloScale, radiusY * 1.14 * haloScale, 0.14, haloAngle, "255,188,71");
      drawSoftEllipse(haloX, haloY, radiusX * 0.76 * haloScale, radiusY * 0.68 * haloScale, 0.22, haloAngle * 0.8, "255,188,71");
      drawSoftEllipse(centerX, centerY, radiusX * 0.96, radiusY * 0.94, 0.17 + Math.sin(time * 0.68) * 0.008, 0.02, "255,188,71");
      drawSoftEllipse(
        centerX,
        centerY - height * 0.01,
        radiusX * 0.48,
        radiusY * 0.44,
        0.16 + Math.sin(time * 0.96 + 0.8) * 0.012,
        0.02,
        "255,235,180",
      );

      const beamAlpha = 0.16 + Math.sin(time * 0.48) * 0.014;
      const beam = ctx.createLinearGradient(0, 0, 0, height * 0.72);
      beam.addColorStop(0, `rgba(255, 210, 120, ${beamAlpha})`);
      beam.addColorStop(0.18, `rgba(255, 196, 95, ${beamAlpha * 0.66})`);
      beam.addColorStop(0.52, `rgba(255, 188, 71, ${beamAlpha * 0.22})`);
      beam.addColorStop(1, "rgba(255, 188, 71, 0)");
      ctx.fillStyle = beam;
      ctx.fillRect(0, 0, width, height * 0.8);

      drawSoftEllipse(
        centerX + Math.sin(time * 0.44) * radiusX * 0.08,
        centerY + radiusY * 0.06,
        radiusX * 0.92,
        radiusY * 0.68,
        0.05,
        0.08 + Math.sin(time * 0.28) * 0.04,
        "255,210,120",
      );

      ctx.globalCompositeOperation = "multiply";

      drawSoftEllipse(
        centerX + radiusX * 0.12 + Math.sin(time * 0.38) * radiusX * 0.03,
        centerY + radiusY * 0.08,
        radiusX * 0.58,
        radiusY * 0.5,
        0.072,
        0.18 + Math.sin(time * 0.22) * 0.04,
        "0,0,0",
      );

      drawSoftEllipse(
        centerX - radiusX * 0.18 + Math.cos(time * 0.32) * radiusX * 0.02,
        centerY - radiusY * 0.04,
        radiusX * 0.46,
        radiusY * 0.38,
        0.052,
        -0.28 + Math.cos(time * 0.2) * 0.05,
        "0,0,0",
      );

      ctx.globalCompositeOperation = "screen";

      drawSoftEllipse(
        width * 0.76 + Math.cos(time * 0.12) * width * 0.012,
        height * 0.72 + Math.sin(time * 0.1) * height * 0.012,
        radiusX * 0.62,
        radiusY * 0.5,
        0.036,
        -0.25,
        "255,150,90",
      );

      drawSoftEllipse(
        width * 0.18 + Math.sin(time * 0.1) * width * 0.012,
        height * 0.8 + Math.cos(time * 0.08) * height * 0.01,
        radiusX * 0.7,
        radiusY * 0.54,
        0.03,
        0.22,
        "55,85,45",
      );

      ctx.globalCompositeOperation = "source-over";
    };

    const drawDepthShadow = (time: number) => {
      const darkX = width * 0.28 + Math.sin(time * 0.08) * width * 0.01;
      const darkY = height * 0.72 + Math.cos(time * 0.09) * height * 0.012;

      const dark = ctx.createRadialGradient(darkX, darkY, 0, darkX, darkY, Math.max(width, height) * 0.75);
      dark.addColorStop(0, "rgba(0,0,0,0.00)");
      dark.addColorStop(0.5, "rgba(0,0,0,0.14)");
      dark.addColorStop(1, "rgba(0,0,0,0.42)");
      ctx.fillStyle = dark;
      ctx.fillRect(0, 0, width, height);

      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.44,
        Math.min(width, height) * 0.1,
        width * 0.5,
        height * 0.44,
        Math.max(width, height) * 0.86,
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.48)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const drawParticles = (time: number) => {
      ctx.save();

      farParticles.forEach((particle) => {
        const x = particle.x * width + Math.sin(time * particle.sway + particle.phase) * 10;
        const y = ((particle.y + time * particle.speed * 2) % 0.74) * height;
        const flicker = 0.7 + 0.3 * Math.sin(time * 1.5 + particle.phase * 1.7);
        drawGlowDot(x, y, particle.size, particle.alpha * flicker);
      });

      nearParticles.forEach((particle) => {
        const x = particle.x * width + Math.sin(time * particle.sway + particle.phase) * 16;
        const y = ((particle.y + time * particle.speed * 2.2) % 0.78) * height;
        const flicker = 0.72 + 0.28 * Math.sin(time * 2 + particle.phase * 2.1);
        drawGlowDot(x, y, particle.size, particle.alpha * flicker);
      });

      ctx.restore();
    };

    const drawGrain = () => {
      const pattern = ctx.createPattern(grainCanvas, "repeat");
      if (!pattern) {
        return;
      }

      ctx.save();
      ctx.globalAlpha = 0.03;
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    };

    const drawFrame = (time: number) => {
      drawBackground(time);
      drawMainSpotlight(time);
      drawDepthShadow(time);
      drawParticles(time);
      drawGrain();
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const render = (ms: number) => {
      drawFrame(ms * 0.001);
      frameId = window.requestAnimationFrame(render);
    };

    const start = () => {
      window.cancelAnimationFrame(frameId);
      resize();
      if (prefersReducedMotion.matches) {
        drawFrame(performance.now() * 0.001);
        return;
      }
      frameId = window.requestAnimationFrame(render);
    };

    buildGrain();
    start();

    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => start());
    resizeObserver?.observe(parent);
    window.addEventListener("resize", start);

    const handleMotionChange = () => start();
    if (typeof prefersReducedMotion.addEventListener === "function") {
      prefersReducedMotion.addEventListener("change", handleMotionChange);
    } else {
      prefersReducedMotion.addListener(handleMotionChange);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", start);
      if (typeof prefersReducedMotion.removeEventListener === "function") {
        prefersReducedMotion.removeEventListener("change", handleMotionChange);
      } else {
        prefersReducedMotion.removeListener(handleMotionChange);
      }
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />;
}
