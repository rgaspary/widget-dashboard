# Widget Dashboard

[![Latest release](https://img.shields.io/github/v/release/rgaspary/widget-dashboard)](https://github.com/rgaspary/widget-dashboard/releases/latest)

A personal start-page / new-tab dashboard: a draggable grid of small
widgets — links, search, weather, clock, to-dos, calendar, notes, and a
photo — with three switchable visual themes and light/dark mode. Everything
is saved to the browser's `localStorage`, so the board persists across
reloads with no backend or account required.

Originally prototyped as a Claude Design canvas (`Widget Dashboard.dc.html`,
built on the "Organic" design system) and reimplemented here as a
standalone React + Vite app so it can be built, containerized, and deployed
like any other static site.

## Features

- **Draggable, resizable grid** — on desktop, drag a widget by its header to
  reposition it, or drag the bottom-right handle to resize. Tablet widths
  collapse to a 2-column flow; mobile stacks widgets in a single column.
- **Three themes** — Minimal, Glass, and Organic, each with its own light
  and dark palette, switchable from the pills in the top bar. A separate
  toggle switches dark/light mode independently of the theme.
- **Add / remove widgets** — the "Add widget" menu only offers widget types
  not already on the board; removing a widget's last instance makes it
  available to add again.
- **Widgets**:
  - **Links** — a pinned bookmark list with per-link favicons (fetched from
    Google's favicon service, with an emoji fallback) and an "Add link"
    modal with an emoji icon picker.
  - **Search** — press Enter to open a Google search for the typed query in
    a new tab.
  - **Weather** — a static placeholder card (no API wired up — swap in a
    real weather API in `src/widgets/WeatherWidget.jsx` if you want live
    data).
  - **Clock** — live time and date, ticking every 15 seconds.
  - **To-do** — add, check off, and remove tasks.
  - **Calendar** — a static sample agenda (replace `CALENDAR_ITEMS` in
    `src/theme.js` with a real feed if needed).
  - **Notes** — a free-text scratchpad.
  - **Photo** — drag-and-drop or click to upload an image; it's downscaled
    client-side and stored as a data URL in `localStorage`.
- **Persistent state** — theme, layout, links, to-dos, and notes are saved
  under one `localStorage` key; uploaded photos are saved under a separate
  key (kept apart since image data can be large).

## Stack

- React 18 + Vite (no TypeScript — the app is small enough that plain JSX
  kept the translation from the original design canvas straightforward)
- Plain inline styles per component (matches the original design canvas's
  approach) plus a small `src/styles/tokens.css` for shared design tokens
  (fonts, corner radius) used across all three themes
- No backend, no external state — everything lives in the browser

## Project layout

```
src/
  App.jsx              top-level state: theme/mode, widget layout, drag &
                        resize tracking, localStorage persistence
  theme.js              palette() per theme, widget definitions, defaults
  lib/
    layout.js           grid math: viewport breakpoints, shell styles
    links.js            favicon/hostname helpers for the Links widget
  components/
    TopBar.jsx, AddWidgetMenu.jsx, LinkModal.jsx, WidgetCard.jsx, icons.jsx
  widgets/
    LinksWidget.jsx, SearchWidget.jsx, WeatherWidget.jsx, ClockWidget.jsx,
    TodoWidget.jsx, CalendarWidget.jsx, NotesWidget.jsx, PhotoWidget.jsx
  styles/
    tokens.css, global.css
```

## Installation

Requires Node.js 18+.

```bash
npm install
npm run dev       # http://localhost:5173
```

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Deploying with Docker

A multi-stage `Dockerfile` builds the app with Node and serves the static
output with nginx (`nginx:alpine`, multi-arch — this also builds and runs
directly on a Raspberry Pi if you don't want to cross-build).

```bash
./deploy.sh          # build image + start container in the background
./deploy.sh logs      # follow container logs
./deploy.sh stop      # stop and remove the container
```

This is a thin wrapper around `docker compose`, equivalent to:

```bash
docker compose up -d --build
```

Either way, the app is served at **http://localhost:8080**. Change the
host port by editing the `ports` mapping in `docker-compose.yml`.

## Releases

The [latest release](https://github.com/rgaspary/widget-dashboard/releases/latest)
includes a pre-built `dist/` package (static HTML/CSS/JS) as a downloadable
asset — drop it on any static host without running a build step yourself.

| Version | Notes |
| --- | --- |
| [v0.1.0](https://github.com/rgaspary/widget-dashboard/releases/tag/v0.1.0) | Initial release. |

## License

[PolyForm Noncommercial License 1.0.0](LICENSE) — free to use, modify, and
fork for any noncommercial purpose. Commercial use requires separate
permission from the copyright holder.
