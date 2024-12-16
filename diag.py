from graphviz import Digraph

# Create a directed graph for the architecture diagram
diagram = Digraph("ArchitectureDiagram", format="png", node_attr={"shape": "rectangle", "style": "rounded"})

# Add nodes
diagram.node("Frontend", "Frontend (React.js / Vue.js)\n- Dashboard\n- Real-time Stats\n- Wager Module")
diagram.node("Backend", "Backend (Node.js / Express.js)\n- API Layer\n- WebSocket Server\n- Business Logic")
diagram.node("Database", "Database (PostgreSQL)\n- User Data\n- Stats Cache\n- Wager Details")
diagram.node("Cache", "Redis\n- Caching Stats\n- API Rate Limits")
diagram.node("SocialMedia", "Social Media API\n(Telegram Bot API, X API)")
diagram.node("WebSocket", "WebSocket Server\n- Real-time Updates")
diagram.node("GameAPI", "Call of Duty API\n- Player Stats\n- Event Data")
diagram.node("SmartContract", "Smart Contract (Ethereum / Polygon)\n- Wager Management\n- Escrow")
diagram.node("ZeroKnowledge", "Zero-Knowledge Proof\n(zkSNARKs / zkSTARKs)\n- Privacy-Preserving Proofs")
diagram.node("Notification", "Notification System\n- Real-time Alerts\n- Wager Status")

# Add edges
diagram.edge("Frontend", "Backend", label="API Requests / WebSocket Updates")
diagram.edge("Backend", "Database", label="Read/Write Data")
diagram.edge("Backend", "Cache", label="Caching Layer")
diagram.edge("Backend", "GameAPI", label="Fetch Stats")
diagram.edge("Backend", "SmartContract", label="Wager Escrow")
diagram.edge("Backend", "ZeroKnowledge", label="Stat Verifications")
diagram.edge("Backend", "SocialMedia", label="Share Highlights/Results")
diagram.edge("Backend", "WebSocket", label="Real-time Events")
diagram.edge("Backend", "Notification", label="Send Alerts")
diagram.edge("Frontend", "SocialMedia", label="Trigger Sharing")

# Add additional details
diagram.edge("WebSocket", "Frontend", label="Real-time Updates")
diagram.edge("GameAPI", "Cache", label="Cache Stats")
diagram.edge("SmartContract", "ZeroKnowledge", label="Proof Validation")

# Render the diagram
diagram.render("/mnt/data/ArchitectureDiagram", view=True)
