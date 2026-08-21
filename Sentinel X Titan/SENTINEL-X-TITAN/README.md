# SENTINEL-X TITAN

Enterprise Autonomous Cyber Defense, Digital Forensics, Recovery & Cyber-Range Platform.

> Defensive-use project. The included simulator generates synthetic security events only inside the application/lab model. It does not attack external systems and contains no hack-back capability.

## What is included

- 20-machine software-company cyber range
- Live SOC command center and infrastructure war room
- Beginner / Intermediate / Advanced / Expert scenarios
- Incident lifecycle: detect → investigate → contain → eradicate → recover → verify
- Attack-path reconstruction graph
- Unified timeline and evidence locker
- MITRE ATT&CK-style tactical mapping
- Threat-source enrichment model (IP/ASN/reputation/approximate geolocation placeholders)
- Recovery center with integrity verification
- AI analyst panel that explains only observed evidence
- ASP.NET Core API/SignalR backend source
- Python analytics service source
- Docker/infrastructure/security integration placeholders
- Wazuh, Suricata, Zeek, Velociraptor, Sigma and YARA integration folders

## Quick start — frontend demo

```bash
cd apps/web
npm install
npm run dev
```

Open the URL printed by Vite. The UI runs with its built-in deterministic simulator if the API is not available.

## Backend

The backend source targets .NET 8 and uses in-memory demo state so no database is required for the first run.

```bash
cd services/gateway
# requires .NET 8 SDK
dotnet run
```

Default API: `http://localhost:5080`.

## Python analytics

```bash
cd analytics/api
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8090
```

## Demo workflow

1. Open **Cyber Range**.
2. Start a scenario such as **Multi-stage intrusion**.
3. Watch machine states change in **War Room**.
4. Open **Incidents** and inspect the attack path + evidence timeline.
5. Use **Contain** to isolate affected machines.
6. Open **Recovery** and run recovery verification.
7. Close the incident after the platform reports clean integrity checks.

## Architecture

```text
Sensors / Simulator
       ↓
Collectors / Normalization
       ↓
Event Bus
       ↓
Detection → Correlation → Risk Engine → Incident Engine
       ↓
SignalR / REST
       ↓
React Command Center
```

## Important safety boundary

The source-analysis screen models source IP reputation, ASN, hosting provider and approximate network geolocation. This information is treated as infrastructure evidence, **not proof of a person's physical location or identity**. Recovery restores your own lab/company data from clean replicas/snapshots; it never connects back into an attacker-controlled system.
