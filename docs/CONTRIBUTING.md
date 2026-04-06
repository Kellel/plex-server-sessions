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

HACS uses the repository contents at the tagged version, so the built `dist` file must be committed before you tag a release.
