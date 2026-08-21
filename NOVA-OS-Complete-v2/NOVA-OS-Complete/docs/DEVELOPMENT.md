# Development

1. Install Node.js 20+ or a current LTS release.
2. Run `npm install`.
3. Run `npm run dev`.
4. Use `npm run check` for TypeScript validation.
5. Use `npm run test:smoke` for Electron JavaScript syntax checks.
6. Run `npm run dist:win` to build the Windows installer.

Windows-only inventory views (services, startup entries and installed applications) return empty data on unsupported platforms instead of faking values.
