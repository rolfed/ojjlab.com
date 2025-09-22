# Brand Style Guide

This document defines the visual identity, design standards, and brand guidelines for OJJ Lab. Follow these specifications precisely to maintain brand consistency and premium quality across all touchpoints.

## Brand Identity

### Brand Positioning

OJJ Lab represents premium coaching and performance excellence. Our visual identity conveys:

- **Athletic Excellence**: Professional sports-grade training and coaching
- **Premium Quality**: Luxury brand aesthetic with attention to detail
- **Performance Focus**: Results-driven approach with scientific backing
- **Accessibility**: Inclusive design that serves all athletes and individuals

## Color System

### Primary Brand Colors

#### Brand Red - Primary Identity

```css
--color-brand: #f23838
  --color-brand-dark: color-mix(in oklab, var(--color-brand), black 30%)
  --color-brand-light: color-mix(
    in oklab,
    var(--color-brand-dark),
    var(--color-pop-dark) 15%
  );
```

- **Primary Use**: Hero elements, CTAs, brand moments, navigation highlights
- **Brand Personality**: Energy, passion, performance, determination
- **Application**: Use sparingly for maximum impact, never overwhelm with red

#### Accent Colors - Secondary Palette

```css
--color-accent-light: #f2d680 (Gold/Yellow) --color-accent-dark: #a67c53
  (Bronze/Brown);
```

- **Light Theme**: Use `accent-dark` (#a67c53) for borders, highlights, secondary text
- **Dark Theme**: Use `accent-light` (#f2d680) for borders, highlights, secondary text
- **Brand Personality**: Premium, achievement, warmth, sophistication

### Background System

#### Primary Backgrounds

```css
--color-bg-dark: #172601 (Deep Green) --color-bg-light: #365902 (Forest Green);
```

- **Usage**: Section backgrounds, hero overlays, immersive content areas
- **Brand Personality**: Nature, growth, stability, performance foundation

#### Neutral Backgrounds

```css
--color-pop-dark: #ffffff (Pure White) --color-pop-light: #000000 (Pure Black)
  --color-dark: #000000 --color-light: #ffffff;
```

- **Light Theme**: White backgrounds, black text
- **Dark Theme**: Black backgrounds, white text
- **Application**: Clean, minimal foundation for content clarity

### Contextual Colors

#### Text Colors

- **Primary Text**: `--color-pop-light` (black) in light mode, `--color-pop-dark` (white) in dark mode
- **Brand Text**: `--color-brand-dark` in light mode, `--color-brand-light` in dark mode
- **Accent Text**: `--color-accent-dark` in light mode, `--color-accent-light` in dark mode
- **Coach Text**: Special variable that adapts to theme context

### Color Usage Guidelines

#### Do's 

- Use brand red (#f23838) for primary CTAs and brand moments
- Apply accent colors for borders, highlights, and secondary elements
- Maintain high contrast ratios (WCAG AA+) in all color combinations
- Use color strategically to guide user attention and create hierarchy
- Adapt colors contextually between light and dark themes

#### Don'ts L

- Never use brand red as a background color (overwhelming)
- Don't mix multiple accent colors in the same design element
- Avoid low contrast combinations that compromise accessibility
- Don't use colors outside the defined system without purpose
- Never apply colors that conflict with brand personality

## Typography System

### Font Families

#### Primary - Hind (Headlines & Titles)

```css
--font-title: 'Hind', ui-sans-serif, system-ui, sans-serif;
```

- **Usage**: h1, h2, h3, h4, h5, h6, section titles, brand names
- **Personality**: Clean, modern, athletic, professional
- **Weights**: Regular, Medium, SemiBold, Bold

#### Secondary - Montserrat (Body Content)

```css
--font-content: 'Montserrat', sans-serif;
```

- **Usage**: Paragraphs, body text, descriptions, captions
- **Personality**: Readable, approachable, contemporary
- **Weights**: Regular, Medium, SemiBold, Bold

#### Icons - Material Symbols

```css
--font-icons: 'Material Symbols Outlined' --icon-fill: 1 (filled style)
  --icon-wght: 300 (weight) --icon-grad: 0 (gradient) --icon-opsz: 24
  (optical size);
```

### Typography Scale

#### Mobile Typography

- **H1**: 3xl (3rem/48px) - Hero titles, page headers
- **H2-H6**: Use Tailwind scale (text-2xl, text-xl, etc.)
- **Body**: Base size (1rem/16px) for optimal mobile readability

#### Desktop Typography

- **H1**: 7xl (4.5rem/72px) - Impactful hero titles
- **Programs/Coaches Titles**: 9xl � 16rem (responsive scaling)
- **Section Titles**: 6xl � 8xl depending on context
- **Body**: Maintains base size for consistency

### Typography Guidelines

#### Hierarchy Principles

1. **Display Text**: Use Hind Bold for maximum impact (programs, coaches titles)
2. **Headline Text**: Use Hind SemiBold/Bold for section headers
3. **Body Text**: Use Montserrat Regular/Medium for readability
4. **UI Text**: Use Montserrat Medium for buttons, navigation
5. **Caption Text**: Use Montserrat Regular for supporting information

#### Responsive Behavior

- **Mobile First**: Start with readable mobile sizes
- **Progressive Enhancement**: Scale up dramatically for desktop impact
- **Landscape Considerations**: Adjust for mobile landscape orientation
- **Accessibility**: Maintain minimum 16px body text size

## Layout & Spacing System

### Golden Ratio Foundation

```css
--ratio: 1.618;
```

- **Usage**: Logo scaling, proportional relationships
- **Application**: Create harmonious size relationships across elements

### Responsive Grid System

- **Mobile**: Single column, stacked layout
- **Tablet**: 4-column grid system
- **Desktop**: 16-column grid for maximum flexibility

### Spacing Philosophy

- **Mobile**: Compact but breathable (py-8, px-4)
- **Desktop**: Generous whitespace for luxury feel (py-16, px-8)
- **Landscape**: Adaptive spacing for mobile landscape orientation

## Component Standards

### Button System

#### Primary Buttons

```css
.primary-btn {
  background: var(--color-brand) / var(--color-brand-dark);
  color: white;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.125rem;
}
```

#### Secondary Buttons

```css
.secondary-btn {
  background: white / var(--color-white);
  color: var(--color-brand-dark);
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.125rem;
}
```

### Navigation Standards

- **Desktop**: Horizontal navigation with hover states
- **Mobile**: Bottom navigation + fullscreen menu overlay
- **Accessibility**: Full keyboard navigation support
- **Sticky Behavior**: Navigation adapts on scroll

### Card System

- **Program Cards**: Full-height with overlay content
- **Coach Cards**: Portrait format with hover effects
- **Gallery Cards**: Square aspect ratio with modal functionality

## Visual Effects & Interactions

### Animation Principles

- **Duration**: 200-300ms for micro-interactions
- **Easing**: ease-in-out for natural movement
- **Purpose**: Enhance usability, never distract
- **Performance**: Optimized for 60fps on all devices

### Hover States

- **Buttons**: Background color shift + scale (1.05)
- **Cards**: Overlay opacity change + scale
- **Links**: Color transition to brand/accent colors
- **Navigation**: Background highlight + text color change

### Loading States

- **Page Load**: Branded percentage loader with clip-path animation
- **Content**: Skeleton screens for perceived performance
- **Actions**: Spinners for form submissions

## Accessibility Standards

### Color Contrast

- **AA Compliance**: Minimum 4.5:1 for normal text
- **AAA Target**: 7:1 for enhanced readability
- **Interactive Elements**: Clear focus indicators
- **State Changes**: Multiple indicators beyond color

### Keyboard Navigation

- **Tab Order**: Logical, predictable navigation flow
- **Focus Indicators**: Visible focus states on all interactive elements
- **Skip Links**: Allow users to bypass navigation
- **Modal Handling**: Proper focus management

### Screen Reader Support

- **Alt Text**: Descriptive alt text for all images
- **Headings**: Proper heading hierarchy (h1-h6)
- **Labels**: Form labels and ARIA labels where needed
- **Live Regions**: Dynamic content announcements

## Mobile Considerations

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Landscape**: Special handling for mobile landscape

### Touch Interactions

- **Minimum Target Size**: 44px for touch targets
- **Gesture Support**: Swipe navigation where appropriate
- **Performance**: Optimized for mobile devices
- **Orientation**: Graceful handling of orientation changes

## Content Guidelines

### Voice & Tone

- **Professional**: Expert knowledge and credibility
- **Motivational**: Encouraging and performance-focused
- **Accessible**: Clear, jargon-free communication
- **Premium**: Quality-focused without being pretentious

### Image Standards

- **Quality**: High-resolution, professional photography
- **Style**: Athletic, dynamic, diverse representation
- **Processing**: Consistent color grading and filtering
- **Optimization**: Compressed for web performance

### Iconography

- **Style**: Material Design outlined icons
- **Size**: 24px base size, scalable
- **Usage**: Functional, not decorative
- **Consistency**: Single icon family throughout

## Brand Applications

### Logo Usage

- **Primary Logo**: Use in headers, footers, brand moments
- **Minimum Size**: 32px height for digital applications
- **Clear Space**: Equal to logo height on all sides
- **Color Variations**: Adapt to background context

### Photography Style

- **Athletic Focus**: Performance, training, movement
- **Lighting**: Natural, high-contrast lighting
- **Composition**: Dynamic angles, action shots
- **Diversity**: Inclusive representation across all content

### Tone of Voice in Design

- **Bold Typography**: Confident, strong brand statements
- **Clean Layouts**: Professional, organized, trustworthy
- **Strategic Color**: Purposeful use for maximum impact
- **Performance Focus**: Every element serves user goals

---

## Implementation Notes for Claude

When implementing designs:

1. **Always check theme context** - Use appropriate light/dark variants
2. **Maintain accessibility** - Test color contrast and keyboard navigation
3. **Follow component patterns** - Use established component classes
4. **Optimize for performance** - Consider loading times and animations
5. **Test across devices** - Ensure responsive behavior works correctly
6. **Preserve brand personality** - Every decision should reinforce brand values

Remember: This style guide is a living document that should evolve with the brand while maintaining core identity principles.
