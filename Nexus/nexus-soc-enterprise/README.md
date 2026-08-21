# NEXUS SOC — Enterprise Frontend Simulation

A modular React + TypeScript Security Operations Center portfolio application. The app simulates live security telemetry in the browser and is designed to demonstrate production-style frontend architecture, real-time UI behavior, investigation workflows, endpoint/network monitoring, SIEM search and SOAR playbooks.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

Windows users can also run `start-dev.bat` or `start-dev.ps1`.

## Build

```bash
npm run build
npm run preview
```

## Main routes

- `/dashboard` — global SOC overview and animated attack map
- `/executive` — posture, MTTD, MTTR and SLA metrics
- `/alerts` — alert triage queue
- `/threats` — threat table and incident drawer
- `/events` — live event stream
- `/detection-rules` — detection engineering
- `/incidents` — incident Kanban response workflow
- `/investigations` — entity graph and process tree
- `/playbooks` — animated SOAR automation
- `/intelligence` — IOC investigation
- `/indicators` — IOC inventory
- `/threat-actors` — fictional adversary profiles
- `/network` — traffic, protocols, connections and topology
- `/endpoints` — EDR-style endpoint monitoring and isolation
- `/assets` — business-aware asset inventory
- `/vulnerabilities` — exposure management
- `/users`, `/authentication`, `/user-risk` — identity security and UEBA
- `/analytics` — attack analytics and MITRE-style tactics
- `/search` — mock SIEM query workspace
- `/reports` — reporting hub
- `/settings` — interaction preferences

## Architecture

The project intentionally separates app routing, layouts, pages, feature components, stores, hooks, simulation services, mock data, TypeScript domain models, utility functions, and style layers. The simulator is isolated from the UI so a real REST/WebSocket backend can replace it later without redesigning the component tree.

## Important

All telemetry, identities, IPs, incidents and threat actors in this project are synthetic/fictitious and intended for UI demonstration only.
