# Plugin direction

`plugins/sdk` defines the start of a future plugin contract. Third-party plugins are not dynamically loaded in this release because doing that safely requires signing, permission manifests, capability isolation and an update model. The directory is intentionally an SDK boundary, not an unsafe eval-based loader.
