from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import networkx as nx

app = FastAPI(title="SENTINEL-X Analytics", version="1.0.0")

class Event(BaseModel):
    machine: str
    severity: str
    tactic: str
    title: str

class CorrelationRequest(BaseModel):
    events: List[Event]

@app.get('/health')
def health():
    return {'service':'sentinel-x-analytics','status':'healthy'}

@app.post('/correlate')
def correlate(req: CorrelationRequest):
    weights={'LOW':10,'MEDIUM':25,'HIGH':45,'CRITICAL':70}
    score=min(100, round(sum(weights.get(e.severity,10) for e in req.events)/(max(len(req.events),1)*0.75))) if req.events else 0
    assets=sorted(set(e.machine for e in req.events))
    tactics=sorted(set(e.tactic for e in req.events))
    confidence=min(99, 50+len(req.events)*7+len(assets)*3)
    return {'risk_score':score,'confidence':confidence,'assets':assets,'tactics':tactics,'event_count':len(req.events)}

@app.post('/attack-graph')
def attack_graph(req: CorrelationRequest):
    g=nx.DiGraph()
    previous='SOURCE'
    g.add_node(previous)
    for e in req.events:
        g.add_node(e.machine, tactic=e.tactic)
        g.add_edge(previous,e.machine,label=e.tactic)
        previous=e.machine
    return {'nodes':[{'id':n,**g.nodes[n]} for n in g.nodes],'edges':[{'source':a,'target':b,**d} for a,b,d in g.edges(data=True)]}
