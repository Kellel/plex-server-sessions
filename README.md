# Plex Server Sessions

A HACS-installable Lovelace card for compact Plex session visibility in Home Assistant.

## Status

This repository is scaffolded and ready for implementation. The current card renders a placeholder while the session discovery and display logic is built out.

## Installation

### HACS

1. Add this repository as a custom repository in HACS.
2. Select the `Dashboard` category.
3. Install `Plex Sessions Card`.
4. Add the resource exposed by HACS to your dashboard if needed.

### Manual

1. Build the project with `npm install` and `npm run build`.
2. Copy `dist/plex-server-sessions.js` into your Home Assistant `www` directory.
3. Add the resource to Lovelace.

## Example Config

```yaml
type: custom:plex-server-sessions
title: Plex
entity_patterns:
  - media_player.plex_*
show_inactive: false
display_mode: compact
show_media_title: false
show_client_name: false
show_entity_picture: true
```

## Development

### Nix

```bash
nix develop
npm install
npm run build
```

The dev shell provides Node.js and npm from Nix. If you change the flake, re-enter the shell before reinstalling dependencies.

### Without Nix

```bash
npm install
npm run build
```
