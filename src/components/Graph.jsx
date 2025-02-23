import React, { useEffect, useState } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

const graphContainerStyle = {
  width: "100%",
  height: "500px",
  border: "2px solid #ccc",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f9f9",
  padding: "10px",
};

const Graph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    axios
      .get("/mockData/graph.json") // ✅ Fetch from public folder
      .then((res) => {
        const { nodes, edges } = mapGraphData(res.data);
        setNodes(nodes);
        setEdges(edges);
      })
      .catch((err) => console.error("Mock API Error:", err));
  }, []);

  const mapGraphData = (data) => {
    let nodes = [],
      edges = [];

    if (!data?.nodes || !data?.edges) return { nodes, edges };

    // Map Nodes
    nodes = data.nodes.map((node) => ({
      id: node.id,
      data: { label: node.data.label },
      position: node.position || { x: Math.random() * 400, y: Math.random() * 400 },
      style: {
        backgroundColor: "#3498db",
        color: "white",
        padding: "10px",
        borderRadius: "8px",
        fontSize: "14px",
        textAlign: "center",
        fontWeight: "bold",
      },
    }));

    // Map Edges
    edges = data.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      animated: true,
      style: { stroke: "#2c3e50", strokeWidth: 2 },
    }));

    return { nodes, edges };
  };

  return (
    <div style={graphContainerStyle}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Controls />
        <Background variant="lines" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Graph;
