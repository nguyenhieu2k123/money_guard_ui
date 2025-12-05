# 🎨 Design System Reference - MoneyGuard

## Color Palette

### Light Mode
```css
/* Primary Colors */
--color-primary: #F59E0B        /* Amber - Main brand color */
--color-primary-light: #FBBF24  /* Light Amber - Gradients */
--color-secondary: #8B5CF6      /* Purple - Accents */
--color-accent: #0369A1         /* Blue - Links/CTAs */

/* Semantic Colors */
--color-success: #10B981        /* Green - Income, positive */
--color-danger: #EF4444         /* Red - Expenses, negative */
--color-warning: #F59E0B        /* Amber - Warnings */

/* Backgrounds */
--color-bg-primary: #FFFFFF     /* Main background */
--color-bg-secondary: #F8FAFC   /* Secondary background */
--color-bg-tertiary: #F1F5F9    /* Tertiary background */

/* Text */
--color-text-primary: #0F172A   /* Main text */
--color-text-secondary: #475569 /* Secondary text */
--color-text-muted: #64748B     /* Muted text */

/* Borders */
--color-border: #E2E8F0         /* Standard borders */
--color-border-light: #F1F5F9   /* Light borders */
```

### Dark Mode
```css
/* Backgrounds */
--color-bg-primary: #0F172A     /* Dark navy */
--color-bg-secondary: #1E293B   /* Lighter navy */
--color-bg-tertiary: #334155    /* Even lighter */

/* Text */
--color-text-primary: #F8FAFC   /* Light text */
--color-text-secondary: #CBD5E1 /* Secondary light */
--color-text-muted: #94A3B8     /* Muted light */

/* Borders */
--color-border: #334155         /* Dark borders */
--color-border-light: #475569   /* Lighter dark borders */
```

## Typography

### Font Families
```css
--font-heading: 'Poppins', sans-serif  /* Headings, buttons */
--font-body: 'Open Sans', sans-serif   /* Body text, inputs */
```

### Font Sizes
```css
h1: 2.5rem   (40px)
h2: 2rem     (32px)
h3: 1.75rem  (28px)
h4: 1.5rem   (24px)
h5: 1.25rem  (20px)
h6: 1rem     (16px)
body: 1rem   (16px)
small: 0.875rem (14px)
```

### Font Weights
```css
Light: 300
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
```

## Spacing Scale

```css
--spacing-xs: 0.25rem   (4px)
--spacing-sm: 0.5rem    (8px)
--spacing-md: 1rem      (16px)
--spacing-lg: 1.5rem    (24px)
--spacing-xl: 2rem      (32px)
--spacing-2xl: 3rem     (48px)
```

## Border Radius

```css
--radius-sm: 0.375rem   (6px)   /* Small elements */
--radius-md: 0.5rem     (8px)   /* Buttons, inputs */
--radius-lg: 0.75rem    (12px)  /* Cards */
--radius-xl: 1rem       (16px)  /* Large cards */
--radius-2xl: 1.5rem    (24px)  /* Hero sections */
```

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
             0 2px 4px -1px rgba(0, 0, 0, 0.06)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
             0 4px 6px -2px rgba(0, 0, 0, 0.05)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
             0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

## Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)
```

## Glass Effect

```css
/* Light Mode */
--glass-bg: rgba(255, 255, 255, 0.85)
--glass-border: rgba(255, 255, 255, 0.3)
--glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15)

/* Dark Mode */
--glass-bg: rgba(30, 41, 59, 0.85)
--glass-border: rgba(255, 255, 255, 0.1)
--glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4)

/* Usage */
background: var(--glass-bg);
backdrop-filter: blur(10px);
border: 1px solid var(--glass-border);
box-shadow: var(--glass-shadow);
```

## Component Patterns

### Glass Card
```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--glass-shadow);
  transition: all var(--transition-base);
}

.glass-card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-2px);
}
```

### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, 
    var(--color-primary) 0%, 
    var(--color-primary-light) 100%);
  color: white;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.btn-primary:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}
```

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, 
    var(--color-primary) 0%, 
    var(--color-primary-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## Animations

### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn var(--transition-slow) ease-out;
}
```

### Slide In
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in {
  animation: slideIn var(--transition-slow) ease-out;
}
```

## Responsive Breakpoints

```css
/* Mobile First Approach */

/* Mobile: Default (< 768px) */
/* No media query needed */

/* Tablet: 768px and up */
@media (min-width: 768px) {
  /* Tablet styles */
}

/* Desktop: 1024px and up */
@media (min-width: 1024px) {
  /* Desktop styles */
}

/* Large Desktop: 1440px and up */
@media (min-width: 1440px) {
  /* Large desktop styles */
}
```

## Accessibility

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Contrast Ratios
- Primary text: 4.5:1 minimum (WCAG AA)
- Large text: 3:1 minimum (WCAG AA)
- Interactive elements: 3:1 minimum

## Icon Guidelines

### Size Standards
```css
Small: 16px   /* Inline icons */
Medium: 20px  /* Button icons */
Large: 24px   /* Feature icons */
XLarge: 32px+ /* Hero icons */
```

### Stroke Width
```css
Standard: 2px
Thin: 1.5px
Bold: 2.5px
```

## Grid System

### Dashboard Grid
```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}
```

### Form Grid
```css
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}
```

## Usage Examples

### Creating a New Card
```tsx
<div className="glass-card" style={{ padding: 'var(--spacing-lg)' }}>
  <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Card Title</h3>
  <p style={{ color: 'var(--color-text-secondary)' }}>Card content</p>
</div>
```

### Adding a Gradient Button
```tsx
<button className="btn btn-primary">
  Click Me
</button>
```

### Using Custom Colors
```tsx
<div style={{ 
  color: 'var(--color-success)',
  backgroundColor: 'var(--color-bg-secondary)',
  padding: 'var(--spacing-md)',
  borderRadius: 'var(--radius-md)'
}}>
  Success message
</div>
```

---

**Pro Tip**: All these design tokens are defined in `src/index.css`. Modify them there to customize the entire app's appearance!
