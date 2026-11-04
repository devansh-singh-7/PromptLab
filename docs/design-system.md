# PromptLab design system

The design system is the product language for PromptLab. Later UI work should
reuse these tokens and primitives instead of introducing one-off colors,
radii, shadows, or motion. The living component catalog is available at
[`/design-system`](../src/app/design-system/page.tsx).

## Product feeling

PromptLab is warm, welcoming, encouraging, and a little playful without being
childish. Its signature is a soft, rounded, purple-tinted surface with a
gentle glow and light, purposeful motion. The visual language is original: it
does not use a green owl mascot, chunky 3D bottom-border buttons, or copied
illustration/layout patterns.

### Area personalities

| Area | Personality | Application |
| --- | --- | --- |
| Marketing | Expressive | Large type, generous whitespace, gentle entrance motion |
| Dashboard | Motivating | Colorful progress, XP, streaks, and clear next actions |
| Learning path | Playful | Trail map, PathNode states, and friendly milestones |
| Lesson | Calm | Focused reading width, low-noise controls, feedback near the work |
| Challenge Arena | Game-like | Strong state feedback, progress, and celebratory completion |
| Studio | Professional | Dark workbench, restrained decoration, PromptLab branding |

## Tokens

The source of truth is [`globals.css`](../src/app/globals.css). Tailwind v4
utilities are generated from the same values through `@theme`.

### Color scales

Every core color has a 50, 100, 200, 300, 400, 500, 600, 700, 800, and 900
step:

- **Purple**: brand and interactive focus, centered on `#7655E8`.
- **Mint**: success and completion, centered on `#29C5A4`.
- **Gold**: XP and achievement reward, centered on `#FFCA55`.
- **Coral**: attention and warnings, centered on `#FF806B`.
- **Navy**: ink, muted text, borders, and dark surfaces, centered on `#24243A`.

Mint, gold, and coral 400/500 values are intentionally visual fills, rings,
and illustrations. They are not used as small text on white because their
contrast is insufficient.

### Semantic CSS variables

Use semantic variables in components so light/dark theme behavior stays
centralized:

| Token | Meaning |
| --- | --- |
| `--brand` | Primary action, links, focus |
| `--success` | Completion and positive feedback |
| `--reward` | XP and achievement emphasis |
| `--attention` | Warning and attention emphasis |
| `--surface` | Main page background |
| `--surface-raised` | Cards and elevated sections |
| `--ink` | Primary text |
| `--ink-muted` | Supporting text |
| `--border` | Default divider and control border |

Theme switching uses `next-themes` with the `class` strategy. Use
`ThemeToggle` for user-facing theme controls and avoid reading `window` during
render.

## Contrast

Contrast was checked with the WCAG 2 relative-luminance formula. Normal text
must meet 4.5:1; large text and UI graphics must meet 3:1. These are the
approved text/background pairs in the initial palette:

| Text token | Background | Ratio | Use |
| --- | --- | ---: | --- |
| `#24243A` (`navy-800`) | `#FFFFFF` | 15.12:1 | Primary light-theme text |
| `#4E4E72` (`navy-500`) | `#FFFFFF` | 7.90:1 | Muted light-theme text |
| `#6D3DE0` (`purple-600`) | `#FFFFFF` | 6.19:1 | Purple text and links |
| `#5B2CC6` (`purple-700`) | `#FFFFFF` | 8.01:1 | Strong purple text |
| `#157A64` (`mint-700`) | `#FFFFFF` | 5.25:1 | Success text |
| `#B45309` (`gold-700`) | `#FFFFFF` | 5.02:1 | Reward text |
| `#B7321C` (`coral-700`) | `#FFFFFF` | 6.02:1 | Attention text |
| `#24243A` (`navy-800`) | `#F5F3FF` | 13.79:1 | Text on raised lavender |
| `#4E4E72` (`navy-500`) | `#F5F3FF` | 7.21:1 | Muted text on raised lavender |
| `#F0F0F8` (`navy-50`) | `#1A1A2E` (`navy-900`) | 15.05:1 | Primary dark-theme text |
| `#1A9A7E` (`mint-600`) | `#1A1A2E` (`navy-900`) | 4.85:1 | Success text in dark theme |
| `#FFCA55` (`gold-400`) | `#1A1A2E` (`navy-900`) | 11.23:1 | Reward text in dark theme |
| `#FF806B` (`coral-400`) | `#1A1A2E` (`navy-900`) | 6.95:1 | Attention text in dark theme |
| `#C4B5FD` (`purple-300`) | `#1A1A2E` (`navy-900`) | 9.24:1 | Brand text in dark theme |

The raw brand colors `#29C5A4`, `#FFCA55`, and `#FF806B` are valid for large
filled controls, rings, and illustrations but should not be used for normal
text on white. Components select darker semantic text steps automatically.

## Shape, space, and depth

- Use the 4px spacing scale and generous gaps between learning steps.
- Cards use 16–24px radii (`--radius-lg` through `--radius-2xl`).
- Buttons, chips, and badges use full-pill radii.
- Shadows are layered and purple-tinted at low opacity:
  `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, and the glow
  tokens.
- Hover is a slight lift. Press feedback is a subtle `scale(0.98)` and
  smaller shadow. Every interactive control has a 2px brand focus ring with a
  2px offset.

## Typography

Fonts are loaded with `next/font` in [`fonts.ts`](../src/lib/fonts.ts):

- **Lexend** for headings and prominent labels.
- **Inter** for body copy and controls.
- **JetBrains Mono** for code.
- **Noto Sans Devanagari** as the Hindi and Marathi fallback.

The type scale is defined in `globals.css` from `xs` through `5xl`. Body copy
uses a relaxed 1.6 line height; headings use a comfortable, script-friendly
line height rather than compressed display spacing. Always test translated
strings for wrapping, especially in headings and buttons.

## Motion

Framer Motion provides short spring interactions in the 150–300ms range.
Motion should explain state or provide feedback, not decorate every action.
Confetti and celebration are reserved for lesson or level completion.

Every animated component uses `useReducedMotion`, and the global reduced-motion
media query provides a calm static fallback. Sound is optional and off by
default. Do not add autoplay audio.

## Pip mascot

`Mascot` exposes a stable interface:

```tsx
<Mascot state="wave" size="md" label="Pip waves hello" />
```

States are `wave`, `think`, `cheer`, `encourage`, and `rest`; sizes are `sm`,
`md`, and `lg`. The current implementation is an original rounded speech
bubble with blinking text-caret eyes and simple SVG placeholders. Final art
can replace the SVG internals without changing callers.

## Component inventory

All components are typed, keyboard-aware where interactive, and exported from
[`components/design-system/index.ts`](../src/components/design-system/index.ts):

`Button`, `IconButton`, `Card`, `Badge`, `Chip`, `XPChip`, `StreakChip`,
`LevelBadge`, `ProgressBar`, `ProgressRing`, `Avatar`, `Input`, `Textarea`,
`Select`, `Tabs`, `Dialog`, `Sheet`, `Tooltip`, `Toast`, `Skeleton`,
`EmptyState`, `ErrorState`, `PathNode`, `FeedbackPanel`,
`CelebrationOverlay`, `Callout`, and `Mascot`.

Use Radix primitives for focus management, escape handling, and keyboard
navigation in Select, Tabs, Dialog, Sheet, and Tooltip. Icon-only controls
must provide an accessible `aria-label`. Inputs must have a visible label or
an explicit accessible name.

## Microcopy

Copy is encouraging, plain, and human:

- “Welcome back, Devansh. Ready for a quick one?”
- “Nice try. Here’s a nudge.”
- “That’s a wrap for today. See you tomorrow!”

Never guilt-trip learners about streaks or breaks. A missed day is a normal
part of learning; describe the next step, not the failure.

## Responsive layout

Studio is desktop-first. Learning screens work on mobile:

- Desktop uses a left sidebar for persistent navigation.
- Mobile uses bottom tab navigation and sheets for secondary destinations.
- Keep lesson reading widths comfortable and preserve keyboard focus order when
  controls reflow.

## Definition of done for new UI

Before shipping a new surface:

1. Reuse semantic tokens and an existing primitive where possible.
2. Check keyboard navigation, visible focus, labels, and error announcements.
3. Check light and dark themes.
4. Check `prefers-reduced-motion`.
5. Check English plus a Hindi/Marathi sample when text is user-facing.
6. Confirm all text/background pairs against the approved contrast table or
   add a measured pair to this document.
# Theme modes

PromptLab supports Light, Dark, and System modes through `next-themes`. The
choice is local to the browser and is applied with the `class` strategy so
semantic tokens remain the single styling interface. The compact
`ThemeToggle` cycles modes; `ThemeSelector` is intended for settings screens.
Theme changes use a circular View Transition when supported and a scoped
fallback transition otherwise. Reduced-motion users receive an instant switch.

The application surfaces use a calm blue brand (`#2876b8` / dark-mode
`#72b5df`) for readable navigation and actions. The landing page intentionally
scopes the original purple identity to its own surfaces and illustrations.
Text uses the navy ink tokens; mint, gold, and coral remain accent fills rather
than body text. The main contrast pairs are `--ink` on `--surface`,
`--ink-muted` on `--surface`, white on `--brand` in light mode, and
`--ink` on `--surface-raised` in dark mode; these are selected from the
token scales to meet WCAG AA.
