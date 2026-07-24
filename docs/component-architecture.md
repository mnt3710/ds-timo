# Component Architecture

## Purpose

`ds-timo` is the shared UI foundation for the TiMo product family. It should
provide reusable visual rules and components without depending on the business
logic, API models, routing, or state management of a specific application.

Applications should install `@timo/design-system` as a dependency. They should
not copy component source files into each project.

## Directory Structure

Use the following responsibility-based structure:

```text
src/
├── foundation/
│   ├── tokens.css
│   ├── theme.css
│   └── types/
├── primitives/
│   ├── Button/
│   └── Badge/
├── patterns/
│   └── Card/
├── brand/
│   └── Logo/
└── index.ts
```

The existing `src/components` directory can be migrated incrementally. Moving
files must not unnecessarily change the public imports used by applications.

### Foundation

Values and rules used to construct the UI, rather than rendered components.

Examples:

- Color, spacing, typography, radius, and motion tokens
- Light and dark themes
- Shared component types

### Primitives

Small, generic UI elements that work independently and do not know anything
about an application's domain.

Examples:

- `Button`
- `Badge`
- `Input`
- `Icon`

Being visually small is not the deciding factor. A component belongs here when
it is a basic UI operation or element that can be reused in many contexts.

### Patterns

Reusable UI structures that compose primitives or define a recurring layout
and interaction.

Examples:

- `Card`
- `Dialog`
- `EmptyState`
- `FormField`

A pattern must still be independent of application-specific data and business
rules. For example, a generic `Card` may belong here, while a
`VintageItemResultCard` tied to dig-vault should remain in dig-vault.

### Brand

Assets and components whose responsibility is the TiMo brand identity rather
than general UI behavior.

Examples:

- `Logo`
- Crown assets
- Brand lockups

## Public API

Applications should import from the package root:

```tsx
import { Badge, Button, Card, Logo } from "@timo/design-system";
```

Internal directory names are implementation details. Avoid public deep imports:

```tsx
// Do not use this from an application.
import { Button } from "@timo/design-system/primitives/Button";
```

`src/index.ts` is the package boundary. Internal files can be reorganized while
the root exports remain stable.

## When a Component Belongs in ds-timo

Add a component when all or most of the following are true:

- It has the same responsibility in two or more TiMo applications.
- It does not depend on application-specific APIs, models, routes, or state.
- Differences between applications can be expressed with a small, coherent API.
- Centralizing accessibility, interaction, and visual behavior has clear value.
- It follows the shared tokens and brand rules.

Do not generalize a component only because two screens currently look similar.
Keep it in the application until its shared responsibility is understood.

## Why We Do Not Use Atomic Design as the Primary Classification

Atomic Design is not inherently unsuitable. Its composition model is useful
when discussing how interfaces are built from smaller parts. However,
`atoms / molecules / organisms` is not the primary directory structure for
this repository for the following reasons:

1. Classification becomes subjective as components evolve. An icon-only button
   may look like an atom, while a button with an icon, label, loading state, and
   tooltip could be called a molecule even though its responsibility is still
   simply "button."
2. Size does not describe ownership. A small TiMo logo is brand-specific, while
   a larger dialog can still be a generic shared UI component.
3. Refactoring composition can force unrelated folder moves. Adding an internal
   primitive should not change a component's public meaning or location.
4. Atomic levels do not answer the package-boundary question. They do not tell
   us whether `VintageItemResultCard` belongs in the design system or in
   dig-vault.
5. Teams tend to spend time debating taxonomy rather than responsibility and
   reuse.

The chosen categories answer more practical questions:

- `foundation`: What rules is the UI built from?
- `primitives`: What generic UI operations and elements are shared?
- `patterns`: What recurring UI structures are shared?
- `brand`: What belongs specifically to the TiMo identity?

Atomic Design terminology may still be used when it helps explain composition.
It is simply not used as the filesystem or ownership model.

## Component Design Rules

- Prefer semantic design tokens over hardcoded visual values.
- Keep domain data transformations and API access outside the design system.
- Use composition before adding many boolean props.
- Keep required props minimal and give optional behavior sensible defaults.
- Support keyboard operation, focus visibility, and appropriate ARIA semantics.
- Support both light and dark themes where the component uses theme colors.
- Add Storybook stories for important states and variants.
- Treat breaking public API changes as deliberate package changes.

## Initial Classification

| Current component | Target category | Reason |
| --- | --- | --- |
| `Button` | `primitives` | Generic user action |
| `Badge` | `primitives` | Generic status or label element |
| `Card` | `patterns` | Reusable content container structure |
| `Logo` | `brand` | TiMo-specific identity and assets |

