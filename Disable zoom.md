# Disable Zoom

This project disables browser zoom through three layers: Next.js viewport metadata, a client-side zoom lock component, and global touch-action CSS.

## 1. Viewport Metadata

The primary configuration is in `src/app/layout.tsx`.

```ts
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};
```

This makes Next.js emit a viewport meta tag equivalent to:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
>
```

Meaning:

- `initialScale: 1` keeps the page at normal scale on load.
- `minimumScale: 1` prevents zooming out.
- `maximumScale: 1` prevents zooming in.
- `userScalable: false` tells mobile browsers that user zoom is disabled.
- `viewportFit: "cover"` allows the layout to use the full device viewport, including safe-area screens.

## 2. Client-Side Zoom Lock

The runtime lock is implemented in `src/app/components/ViewportZoomLock.tsx` and mounted from `src/app/layout.tsx`.

```tsx
<ViewportZoomLock />
```

The component rewrites or creates the viewport meta tag after hydration:

```ts
const LOCKED_VIEWPORT_CONTENT =
  "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover";

const syncViewportLock = () => {
  viewportMeta.setAttribute("name", "viewport");
  viewportMeta.setAttribute("content", LOCKED_VIEWPORT_CONTENT);
};
```

It also re-applies the locked viewport on:

- `pageshow`
- `resize`
- `visualViewport.resize`

This helps keep the lock active if the browser restores the page from cache or changes viewport state.

## 3. Touch Gesture Blocking

The same component blocks common mobile zoom gestures.

```ts
window.addEventListener("gesturestart", preventGestureZoom, gestureOptions);
window.addEventListener("gesturechange", preventGestureZoom, gestureOptions);
window.addEventListener("gestureend", preventGestureZoom, gestureOptions);
document.addEventListener("touchstart", preventMultiTouchStart, gestureOptions);
document.addEventListener("touchmove", preventMultiTouchZoom, gestureOptions);
document.addEventListener("touchend", preventDoubleTapZoom, gestureOptions);
```

Covered interactions:

- iOS Safari pinch gestures through `gesturestart`, `gesturechange`, and `gestureend`.
- Multi-touch zoom through `touchstart` and `touchmove`.
- Double-tap zoom through `touchend`.

The event listeners use:

```ts
const gestureOptions = { passive: false } as const;
```

This is required because `event.preventDefault()` only works reliably when the listener is not passive.

## 4. Desktop Zoom Shortcut Blocking

Desktop zoom is blocked for common keyboard and wheel shortcuts.

```ts
const preventWheelZoom = (event: WheelEvent) => {
  if (event.ctrlKey || event.metaKey) {
    event.preventDefault();
  }
};
```

This prevents:

- `Ctrl + mouse wheel` on Windows/Linux.
- `Command + mouse wheel` on macOS.

Keyboard zoom shortcuts are also blocked:

```ts
const preventKeyboardZoom = (event: KeyboardEvent) => {
  if (!(event.ctrlKey || event.metaKey)) {
    return;
  }

  if (["+", "=", "-", "_", "0"].includes(event.key)) {
    event.preventDefault();
  }
};
```

This prevents:

- `Ctrl/Command + +`
- `Ctrl/Command + -`
- `Ctrl/Command + 0`

## 5. Global Touch Action CSS

The global CSS also limits browser gesture behavior.

File: `src/app/globals.css`

```css
html {
  scroll-behavior: smooth;
  touch-action: pan-x pan-y;
}

body {
  touch-action: pan-x pan-y;
}
```

`touch-action: pan-x pan-y` allows normal horizontal and vertical panning, while avoiding browser-level gestures such as pinch zoom where supported.

The `ViewportZoomLock` component also sets the same rule at runtime:

```ts
htmlElement.style.touchAction = "pan-x pan-y";
bodyElement.style.touchAction = "pan-x pan-y";
```

## 6. Important Limitation

This implementation blocks the normal zoom paths used by mobile gestures, touch events, wheel shortcuts, and keyboard shortcuts. It cannot absolutely prevent every system-level or browser-menu zoom action, because those may happen outside JavaScript control.

For this project, the effective zoom lock is the combination of:

- `src/app/layout.tsx` viewport metadata.
- `src/app/components/ViewportZoomLock.tsx` runtime enforcement and event blocking.
- `src/app/globals.css` touch-action rules.
