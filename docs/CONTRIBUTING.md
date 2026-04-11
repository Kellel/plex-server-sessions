# Contributing

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

### Local Preview

```bash
npm run dev
```

This starts a local Vite preview page with mocked Home Assistant fixtures so you can iterate on the card UI without pushing a beta release into HACS.

## Release Process

1. Run `npm run build`.
2. Commit source changes and the updated `dist/plex-server-sessions.js`.
3. Bump the version in `package.json`.
4. Create and push a tag like `v0.1.0`.

For beta releases, use a tag like `v0.1.2-beta.1`.

Pushing the tag triggers the release workflow, which validates the build and creates a GitHub Release for that tag. Tags containing `-beta.` are published as GitHub prereleases. HACS uses those releases for versioned updates, so the built `dist` file must be committed before you tag a release.
