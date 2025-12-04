---
published: false
---

# Animation System Documentation

## Overview

This app uses a comprehensive animation system based on Android Material Motion guidelines with smooth, natural transitions across all screens.

## Available Animation Classes

### Page Transitions

- `animate-slide-in-right` - Slide in from right (300ms)
- `animate-slide-out-left` - Slide out to left (300ms)
- `animate-slide-in-up` - Slide in from bottom (300ms)
- `animate-slide-out-down` - Slide out to bottom (300ms)

### Visibility Transitions

- `animate-fade-in` - Fade in (200ms)

### Scale Animations

- `animate-scale-in` - Scale from 0.95 to 1.0 (300ms)
- `animate-scale-up` - Brief scale pulse 1.0 to 1.02 (120ms)
- `animate-bounce-subtle` - Subtle vertical bounce (500ms)

### Interactive Animations

- `btn-interactive` - Button base class with active:scale-95
- `btn-ripple` - Ripple effect on active state
- `card-animated` - Card hover/active states with shadow transitions
- `list-item-animated` - List item fade-in + scale
- `animate-ripple-pulse` - Ripple effect animation (600ms)

### Special Effects

- `animate-pulse-soft` - Soft pulsing (2s infinite)
- `animate-shimmer-pulse` - Shimmer loading effect (2s infinite)
- `animate-check-draw` - SVG stroke drawing animation (200ms)

## Usage Examples

### Page Entry

```jsx
<div className="animate-slide-in-right">{/* Page content */}</div>
```

### Staggered List Items

```jsx
{
  items.map((item, idx) => (
    <div
      className="animate-scale-in"
      style={{ animationDelay: `\${idx * 80}ms` }}
    >
      {item}
    </div>
  ));
}
```

### Button with Ripple

```jsx
<button className="btn-interactive btn-ripple hover:shadow-md">Click me</button>
```

### Card Animation

```jsx
<div className="card-animated animate-scale-in hover:shadow-md">
  {/* Card content */}
</div>
```

### Modal Entry

```jsx
<div className="animate-fade-in">
  <div className="animate-slide-in-up">{/* Modal content */}</div>
</div>
```

## Timing Guidelines

- Micro interactions: 100–150ms
- Button press: 120–150ms
- Element entry: 200–300ms
- Staggered items: 50–80ms delay between each
- Modal transitions: 300ms
- List item delays: 60–80ms between items

## Color Transitions

All interactive elements use `transition-all duration-150` or `transition-colors duration-150` for smooth color changes.

## Performance Notes

- All animations use CSS-based transitions (GPU accelerated)
- Animations are applied via `transform`, `opacity`, and `scale` properties
- No JavaScript animation loops required
- Safe for mobile devices (Android 6.0+)
