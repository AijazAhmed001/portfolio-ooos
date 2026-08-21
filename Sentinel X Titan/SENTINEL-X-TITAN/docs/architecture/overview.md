# Architecture Overview

SENTINEL-X uses a streaming security architecture:

`Sensors → Normalization → Event Bus → Detection → Correlation → Risk → Incident → Realtime UI`

The demo ships with a deterministic synthetic event engine. Real adapters may ingest Wazuh alerts, Suricata EVE JSON, Zeek logs and approved endpoint-forensics output.
