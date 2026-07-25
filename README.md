# TiMo Design System

A unified design system for the TiMo brand family (dig-vault, fillma, and Panora).

**[View the public Storybook](https://mnt3710.github.io/ds-timo/)**

## 🎨 Brand Concept

TiMo is inspired by **"indigo denim × brass hardware"** — representing the vintage aesthetic of fabric and functional metal elements:

- **Indigo (Fabric)**: Base surfaces, stability, and calm
- **Gold (Hardware)**: Functional accents for interactive elements only

## 📦 Installation

```bash
npm install @timo/design-system
# or
yarn add @timo/design-system
```

## 🚀 Usage

```tsx
import { Button, Card, Badge, Logo } from '@timo/design-system';

function App() {
  return (
    <Card variant="indigo">
      <Logo variant="white" size="md" />
      <h1>Welcome to TiMo</h1>
      <Badge variant="accent">New</Badge>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

## 🎯 Design Principles

### Color Usage Rules

1. **Gold (accent)** is used for functional points only:
   - Buttons
   - Interactive icons
   - Badges
   - Selected states
   
2. **Indigo (brand)** can be used as surfaces:
   - Cards
   - Headers
   - Containers
   
3. **Logo is always monochrome** (black or white only)
   - Never apply brand colors to the logo
   - No gradients or shadows

### Typography

- **UI Text**: Neutral sans-serif (system fonts)
- **Cursive**: Only for logo and momentary signatures (e.g., "Save Complete")
- **Monospace**: Optional for data display (codes, timestamps)

### Motion

- Minimal decorative animations
- Respects `prefers-reduced-motion`
- One animation per flow maximum

## 🌗 Dark Mode

All components automatically support dark mode via `data-theme` attribute:

```tsx
<div data-theme="dark">
  <Button>Dark Mode Button</Button>
</div>
```

For React applications, use `ThemeProvider` at the application root. An
explicit `light` or `dark` value takes precedence over the operating system
setting.

```tsx
import { ThemeProvider } from '@timo/design-system';

<ThemeProvider theme="light">
  <App />
</ThemeProvider>
```

Or use system preference:

```tsx
// Automatically follows prefers-color-scheme
<div>
  <Button>Auto Theme Button</Button>
</div>
```

### Project primary color

The default primary color is TiMo gold. A project can override the semantic
accent colors without changing individual components:

```tsx
<ThemeProvider
  theme="light"
  accent={{
    primary: '#DA6E55',
    active: '#B95743',
    subtle: '#F5D8D1',
    foreground: '#142328',
  }}
>
  <App />
</ThemeProvider>
```

- `primary`: Buttons and other primary actions
- `active`: Hover and pressed states
- `subtle`: Focus rings and subtle accent surfaces
- `foreground`: Text and icons displayed on the primary color

These values map to CSS custom properties, so applications that do not use
React may set `--color-accent-primary`, `--color-accent-primary-active`,
`--color-accent-subtle`, and `--color-on-accent` directly.

## 📚 Components

### Component catalog

| Category | Components |
| --- | --- |
| Actions | `Button`, `IconButton`, `Link` |
| Forms | `FormField`, `Label`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider` |
| Navigation | `Tabs`, `Pagination` |
| Feedback | `Alert`, `Toast`, `Spinner`, `Progress`, `Skeleton`, `EmptyState` |
| Overlays | `Popover`, `Dialog`, `Tooltip` |
| Content and brand | `Card`, `Badge`, `Logo` |
| Foundation | `ThemeProvider` |

Use `Slider` when a user chooses a value within a numeric range. Use
`Progress` when the application reports completion and the user does not
directly control the value.

Use `Pagination` for page-based collections where users need stable navigation
and URLs. Applications built exclusively around an infinite feed do not need
to show Pagination.

### Button

Pill-shaped button with gold accent for primary actions.

```tsx
<Button variant="primary" size="md">
  Click Me
</Button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'ghost'`
- `size`: `'sm' | 'md' | 'lg'`
- `fullWidth`: `boolean`
- `disabled`: `boolean`

### Badge

Compact label using gold-light for subtle highlighting.

```tsx
<Badge variant="accent" size="md">
  New
</Badge>
```

**Props:**
- `variant`: `'accent' | 'neutral' | 'indigo'`
- `size`: `'sm' | 'md' | 'lg'`

### Card

Container with rounded corners using indigo or surface colors.

```tsx
<Card variant="indigo" onClick={() => console.log('Clicked')}>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

**Props:**
- `variant`: `'default' | 'indigo' | 'elevated'`
- `onClick`: Optional click handler (makes card interactive)

### Logo

Official logo assets for the TiMo product family.

```tsx
<Logo type="timo" variant="black" size="md" />
<Logo type="fillma" size="lg" />
<Logo type="panora" size="lg" />
```

**Props:**
- `type`: `'timo' | 'fillma' | 'fillma-extension' | 'fillma-toolbar' | 'panora'`
- `variant`: `'black' | 'white'` (monochrome only)
- `size`: `'sm' | 'md' | 'lg' | 'xl'`

### Form controls

`FormField` connects labels, helper text, errors, and accessibility attributes
to `Input`, `Textarea`, or `Select`.

```tsx
<FormField
  label="Email address"
  helperText="Used for account notifications."
  required
>
  <Input type="email" name="email" placeholder="name@example.com" />
</FormField>

<FormField label="Product" error="Select a product." required>
  <Select
    name="product"
    placeholder="Select a product"
    options={[
      { value: 'dig-vault', label: 'dig-vault' },
      { value: 'fillma', label: 'fillma' },
      { value: 'panora', label: 'Panora' },
    ]}
  />
</FormField>

<FormField label="Notes">
  <Textarea name="notes" />
</FormField>
```

`Label`, `Input`, `Textarea`, and `Select` can also be used independently.

### Popover

Use the shared popover surface for anchored floating content. It closes on
outside click or `Escape` and follows the active theme.

```tsx
<Popover placement="bottom-start">
  <PopoverTrigger>
    <Button variant="ghost">Open details</Button>
  </PopoverTrigger>
  <PopoverContent style={{ padding: 16 }}>
    Project details
  </PopoverContent>
</Popover>
```

`Select` uses this Popover internally, so its option list uses design-system
colors, spacing, focus states, and Light/Dark themes instead of the browser's
default select menu.

## 🎨 Design Tokens

All design tokens are defined as CSS custom properties:

```css
/* Brand Colors */
--indigo-raw: #2C3A66;
--indigo-faded: #8C9BC0;
--gold-base: #F0C33D;
--gold-deep: #B98E0E;
--gold-light: #F8E09B;

/* Semantic Tokens */
--color-accent-primary: var(--gold-base);
--color-accent-primary-active: var(--gold-deep);
--color-accent-subtle: var(--gold-light);
--color-brand-surface: var(--indigo-raw);
--color-brand-surface-muted: var(--indigo-faded);

/* Spacing (4px increments) */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Build library
npm run build

# Build Storybook
npm run build-storybook
```

## 📖 Documentation

View the complete component library in Storybook:

```bash
npm run storybook
```

Architecture and contribution boundaries:

- [Component architecture](docs/component-architecture.md)

## 🤝 Contributing

This design system is shared across:
- **dig-vault**: Vintage item discovery
- **fillma**: Tool creation platform
- **Panora**: [Description]

When adding new components:
1. Use semantic tokens only (no hardcoded colors)
2. Support both light and dark themes
3. Follow the indigo × gold color philosophy
4. Include Storybook stories
5. Respect accessibility guidelines

## 📄 License

MIT
