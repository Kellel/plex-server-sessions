# Plex Sessions Card Spec

## Goal

Build a HACS-installable custom Lovelace card for Home Assistant that presents Plex activity more cleanly than stock cards. The card should focus on active sessions and clients, emphasize who is watching, and fit naturally on a compact Home dashboard.

## What The Card Should Do

Primary use case:

- show current Plex clients and sessions on a dashboard
- label each item by Plex `username`, not the verbose Home Assistant entity name
- encode playback state visually with a compact symbol or icon
- stay compact enough for a Home view, not a full media page

Functional requirements:

- discover Plex-related `media_player` entities automatically
- support mixed entity naming patterns like:
  - `media_player.plex_client_service_*`
  - `media_player.plex_*`
- display one compact item per client or session
- show username from entity attributes when available
- fall back to friendly name if `username` is missing
- show playback state:
  - `playing`
  - `paused`
  - idle, unknown, or offline if desired
- optionally hide inactive clients
- optionally show only active clients
- optionally show currently playing title or series as secondary text
- optionally show entity picture or artwork if available
- update live as client states change

Nice-to-have requirements:

- compact and expanded modes
- grid and row layouts
- click-through to `more-info`
- optional session count header
- optional grouping by user
- optional filtering by state
- optional filtering by regex or entity pattern
- optional custom icons or symbols for playback state

## Minimum Viable UI

Recommended MVP layout:

- card title: `Plex`
- a compact grid of session chips or tiles
- each tile shows:
  - avatar, artwork, or icon
  - username
  - state glyph like `>` or `||`, or a proper icon
- optional subtitle:
  - current media title
  - or client or device name

Example visual model:

- `kzorro >`
- `alex ||`
- `tv-room >`

MVP display modes:

- `compact`
- `detailed`

`compact`:

- username
- state icon
- maybe client icon

`detailed`:

- username
- state icon
- media title
- client or device name
- poster or avatar if available

## Entity And Data Model

Likely data sources:

- Plex client `media_player` entities

Useful attributes observed so far:

- `username`
- `media_title`
- `media_series_title`
- `entity_picture`
- `friendly_name`
- `player_source`
- `media_content_type`

Core entity states to support:

- `playing`
- `paused`
- `idle`
- `off`
- `unavailable`

The card should not depend on a single fixed entity naming scheme. It should support:

- auto-discovery by domain plus name pattern
- explicit entity list override in config

## Suggested Card Config API

Example target YAML:

```yaml
type: custom:plex-sessions-card
title: Plex
entity_patterns:
  - media_player.plex_*
show_inactive: false
display_mode: compact
show_title: true
show_media_title: false
show_client_name: false
state_style: symbol
tap_action:
  action: more-info
```

Expanded example:

```yaml
type: custom:plex-sessions-card
title: Plex
entities:
  - media_player.plex_plex_for_android_tv_google_tv_streamer
  - media_player.plex_client_service_plex_plex_web_firefox_windows
display_mode: detailed
show_inactive: true
show_media_title: true
show_client_name: true
show_entity_picture: true
state_style: icon
sort_by: username
```

Config options to support:

- `title`
- `entities`
- `entity_patterns`
- `show_inactive`
- `display_mode`
- `show_media_title`
- `show_client_name`
- `show_entity_picture`
- `state_style`
- `sort_by`
- `tap_action`

## Technical Requirements

Repository type:

- HACS `Dashboard` repo type

Suggested repo name:

- `lovelace-plex-sessions-card`

Expected built artifact:

- `dist/plex-sessions-card.js`

Card registration:

- custom element name like `plex-sessions-card`

Implementation stack:

- TypeScript preferred
- Lit recommended for rendering
- bundle with Vite, Rollup, or esbuild

Card behavior requirements:

- subscribe to Home Assistant state updates
- recompute visible sessions when `hass.states` changes
- no server-side dependency
- no custom backend integration required
- work with standard Home Assistant frontend resources

## Repo Structure

```text
lovelace-plex-sessions-card/
  src/
    plex-sessions-card.ts
    types.ts
    helpers.ts
  dist/
    plex-sessions-card.js
  .github/workflows/
    validate.yaml
    release.yaml
  package.json
  tsconfig.json
  vite.config.ts
  hacs.json
  README.md
  LICENSE
```

## HACS Requirements

Minimum:

- public GitHub repo
- `hacs.json`
- built JavaScript in `dist/`
- built filename matches repo naming expectations
- README with install and config examples

Suggested `hacs.json`:

```json
{
  "name": "Plex Sessions Card",
  "render_readme": true
}
```

## GitHub And Build Requirements

Initial simple path:

- commit `dist/` to the repo
- GitHub Action runs build on push or pull request
- later add release packaging

Build workflow:

- install Node
- run `npm ci`
- run `npm run build`
- verify `dist/plex-sessions-card.js` exists

Release workflow:

- run on Git tag
- build card
- attach `dist/plex-sessions-card.js` to release
- optionally keep `dist/` committed too for HACS simplicity

## Open Questions Before Building

These need decisions before implementation:

- Should the card show all Plex clients or only active ones by default?
- Should paused sessions be considered active?
- Should username always override friendly name?
- Should the state indicator be symbols, icons, or color?
- Should the card support multiple Plex integrations and naming patterns explicitly?
- Should the card show artwork or stay ultra-compact?
- Should the card support a count badge or header?
- Should tapping a client open `more-info` or navigate somewhere custom?

## Recommended MVP Scope

Keep version 1 narrow:

- auto-discover `media_player.plex_*`
- show active and paused sessions
- username override from attribute
- compact grid
- state icon or symbol
- optional media title toggle
- no artwork in version 1
- no advanced grouping in version 1

That gets to a useful card quickly without overbuilding.
