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

## Release Process

1. Run `npm run build`.
2. Commit source changes and the updated `dist/plex-server-sessions.js`.
3. Bump the version in `package.json`.
4. Create and push a tag like `v0.1.0`.

Pushing the tag triggers the release workflow, which validates the build and creates a GitHub Release for that tag. HACS uses those releases for versioned updates, so the built `dist` file must be committed before you tag a release.
