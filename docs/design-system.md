# PromptLab design system

PromptLab is a precise, welcoming design tool: pale paper, hard ink lines,
one hot-orange accent, electric-blue selection, and a small pixel mascot.
This document supersedes the previous purple/mint/gold/coral system.

## Tokens

The source of truth is [`globals.css`](../src/app/globals.css).

| Token | Light | Dark |
| --- | --- | --- |
| Paper | `#FFEEE6` | `#15171D` |
| Panel | `#FFFFFF` | `#1D2028` |
| Ink | `#23262F` | `#F6EDE8` |
| Muted ink | `#4A505C` | `#AEB3BF` |
| Accent | `#FF5000` | `#FF5000` |
| On accent | `#23262F` | `#15171D` |
| Selection | `#1F3BFF` | `#7C8BFF` |
| Selection tint | `rgba(31,59,255,.08)` | translucent blue |
| Border | ink | `rgba(246,237,232,.85)` |

Orange is a fill, marker, or underline; it is never small text on paper.
Text on orange uses the dark on-accent ink. Blue means selection, focus, links,
or current state. Success, danger, and warning states always include an icon
and a word as well as color.

Approved AA text pairs:

| Text | Background | Ratio target | Use |
| --- | --- | --- | --- |
| `#23262F` | `#FFEEE6` or `#FFFFFF` | 4.5:1+ | light body and labels |
| `#4A505C` | `#FFEEE6` or `#FFFFFF` | 4.5:1+ | light supporting text |
| `#F6EDE8` | `#15171D` or `#1D2028` | 4.5:1+ | dark body and labels |
| `#AEB3BF` | `#15171D` or `#1D2028` | 4.5:1+ | dark supporting text |
| `#23262F` | `#FF5000` | 4.5:1+ | text on accent controls |
| `#FFFFFF` | `#1F3BFF` | 4.5:1+ | selection tags |

## Shape and motifs

Everything is square: radius is zero, surfaces and primary controls use 2px
solid borders, secondary dividers use 1px, and there are no shadows, gradients,
blur, glass, or glow. Depth comes from offset layers and color blocks.

Reusable motifs are `SelectionFrame`, `Tag`, `Ruler`, `PropertiesPanel`,
`PixelBar`, `GridBackground`, measurement marks, `Mascot`/`PixelPip`, pixel
bursts, and window panels. Decorative rulers and grids are `aria-hidden`; the
same information is always available as real text.

Buttons, inputs, tabs, cards, dialogs, sheets, toasts, tables, and charts follow
the same square treatment. Interactive targets are at least 44px. Focus is a
3px ink outline with a 3px offset; inputs also receive the blue selection frame.

## Typography and motion

`next/font` loads Space Mono 400/700 for headings, labels, buttons, numbers,
tags, and code; Space Grotesk 400–700 for readable long-form copy; and Noto
Sans Devanagari for Hindi and Marathi. Mono ligatures are off, display type is
balanced and tightly tracked, and `:lang(hi)`/`:lang(mr)` disables caps and
negative tracking.

Motion is mechanical and brief (120–220ms ease-out). Use `steps()` for cues,
transform/opacity for entrances, pixel dispersal for celebrations, and static
equivalents under `prefers-reduced-motion`.

## Components and copy

`components/design-system/index.ts` is the public component inventory. Keep
behavior, keyboard handling, accessible names, and real labels unchanged while
restyling. Use warm, plain copy such as “Nice try. Here’s a nudge.” and never
make streaks or status feel punitive.

Run `pnpm check:theme` to reject legacy radii, shadows, gradients, blur, fonts,
and palette values.
