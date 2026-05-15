"use client";

import { useEffect } from "react";

const LOCKED_VIEWPORT_CONTENT =
  "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover";

export function ViewportZoomLock() {
  useEffect(() => {
    const syncViewportLock = () => {
      let viewportMeta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');

      if (!viewportMeta) {
        viewportMeta = document.createElement("meta");
        document.head.appendChild(viewportMeta);
      }

      viewportMeta.setAttribute("name", "viewport");
      viewportMeta.setAttribute("content", LOCKED_VIEWPORT_CONTENT);

      document.documentElement.style.touchAction = "pan-x pan-y";
      document.body.style.touchAction = "pan-x pan-y";
    };

    const preventDefault = (event: Event) => {
      event.preventDefault();
    };

    const preventMultiTouchZoom = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (event: TouchEvent) => {
      const now = Date.now();

      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }

      lastTouchEnd = now;
    };

    const preventWheelZoom = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    };

    const preventKeyboardZoom = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) {
        return;
      }

      if (["+", "=", "-", "_", "0"].includes(event.key)) {
        event.preventDefault();
      }
    };

    const gestureOptions = { passive: false } as const;
    const syncOptions = { passive: true } as const;

    syncViewportLock();

    window.addEventListener("pageshow", syncViewportLock, syncOptions);
    window.addEventListener("resize", syncViewportLock, syncOptions);
    window.visualViewport?.addEventListener("resize", syncViewportLock, syncOptions);
    window.addEventListener("gesturestart", preventDefault, gestureOptions);
    window.addEventListener("gesturechange", preventDefault, gestureOptions);
    window.addEventListener("gestureend", preventDefault, gestureOptions);
    document.addEventListener("touchstart", preventMultiTouchZoom, gestureOptions);
    document.addEventListener("touchmove", preventMultiTouchZoom, gestureOptions);
    document.addEventListener("touchend", preventDoubleTapZoom, gestureOptions);
    window.addEventListener("wheel", preventWheelZoom, gestureOptions);
    window.addEventListener("keydown", preventKeyboardZoom);

    return () => {
      window.removeEventListener("pageshow", syncViewportLock);
      window.removeEventListener("resize", syncViewportLock);
      window.visualViewport?.removeEventListener("resize", syncViewportLock);
      window.removeEventListener("gesturestart", preventDefault);
      window.removeEventListener("gesturechange", preventDefault);
      window.removeEventListener("gestureend", preventDefault);
      document.removeEventListener("touchstart", preventMultiTouchZoom);
      document.removeEventListener("touchmove", preventMultiTouchZoom);
      document.removeEventListener("touchend", preventDoubleTapZoom);
      window.removeEventListener("wheel", preventWheelZoom);
      window.removeEventListener("keydown", preventKeyboardZoom);
    };
  }, []);

  return null;
}
