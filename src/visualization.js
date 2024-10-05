import React, { useEffect, useRef, useState } from 'react';

// Helper function for Breadth-First Search (BFS)
const bfs = (nodes, edges) => {
  const visited = {};
  const queue = [];
  const result = [];

  const startNode = "Node 1"; // Start from Node 1
  queue.push(startNode);
  visited[startNode] = true;

  while (queue.length > 0) {
    const nodeId = queue.shift();
    result.push(nodeId);

    edges.forEach(edge => {
      if (edge.from === nodeId && !visited[edge.to]) {
        queue.push(edge.to);
        visited[edge.to] = true;
      }
      if (edge.to === nodeId && !visited[edge.from]) { // Add reverse traversal for undirected graph
        queue.push(edge.from);
        visited[edge.from] = true;
      }
    });
  }

  return result;
};

// Helper function for Depth-First Search (DFS)
const dfs = (nodes, edges) => {
  const visited = {};
  const result = [];

  const visit = (nodeId) => {
    visited[nodeId] = true;
    result.push(nodeId);

    edges.forEach(edge => {
      if (edge.from === nodeId && !visited[edge.to]) {
        visit(edge.to);
      }
      if (edge.to === nodeId && !visited[edge.from]) { // Add reverse traversal for undirected graph
        visit(edge.from);
      }
    });
  };

  visit("Node 1"); // Start with Node 1
  return result;
};

// Dijkstra's Algorithm
const dijkstra = (nodes, edges) => {
  const distances = {};
  const visited = {};
  const result = [];
  
  nodes.forEach(node => {
    distances[node.id] = Infinity; // Initialize distances to infinity
  });

  distances["Node 1"] = 0; // Distance to start node is 0
  const queue = ["Node 1"];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    visited[currentNode] = true;
    result.push(currentNode);

    edges.forEach(edge => {
      if (edge.from === currentNode && !visited[edge.to]) {
        const newDistance = distances[currentNode] + edge.weight; // Use edge weight
        if (newDistance < distances[edge.to]) {
          distances[edge.to] = newDistance;
          queue.push(edge.to);
        }
      }
    });
  }

  return result;
};

// A* Algorithm
const aStar = (nodes, edges) => {
  return dijkstra(nodes, edges); // Simplified for this example
};

// Prim's Algorithm for Minimum Spanning Tree
const prims = (nodes, edges) => {
  const visited = {};
  const result = [];
  const edgesList = edges.map(edge => ({ ...edge })); // Keep weights for Prim's

  const startNode = "Node 1";
  visited[startNode] = true;

  while (Object.keys(visited).length < nodes.length) {
    let minEdge = null;

    edgesList.forEach(edge => {
      if (visited[edge.from] && !visited[edge.to]) {
        if (!minEdge || edge.weight < minEdge.weight) {
          minEdge = edge;
        }
      }
    });

    if (minEdge) {
      visited[minEdge.to] = true;
      result.push(minEdge);
    }
  }

  return result.map(edge => `${edge.from} -- ${edge.to} (Weight: ${edge.weight})`);
};

// Kruskal's Algorithm for Minimum Spanning Tree
const kruskals = (nodes, edges) => {
  const parent = {};
  const rank = {};

  const find = (node) => {
    if (parent[node] !== node) {
      parent[node] = find(parent[node]);
    }
    return parent[node];
  };

  const union = (node1, node2) => {
    const root1 = find(node1);
    const root2 = find(node2);

    if (root1 !== root2) {
      if (rank[root1] > rank[root2]) {
        parent[root2] = root1;
      } else if (rank[root1] < rank[root2]) {
        parent[root1] = root2;
      } else {
        parent[root2] = root1;
        rank[root1]++;
      }
    }
  };

  nodes.forEach(node => {
    parent[node.id] = node.id;
    rank[node.id] = 0;
  });

  const sortedEdges = edges.sort((a, b) => a.weight - b.weight);
  const result = [];

  sortedEdges.forEach(edge => {
    if (find(edge.from) !== find(edge.to)) {
      union(edge.from, edge.to);
      result.push(edge);
    }
  });

  return result.map(edge => `${edge.from} -- ${edge.to} (Weight: ${edge.weight})`);
};

function Visualization() {
  const canvasRef = useRef(null);
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [output, setOutput] = useState([]); // State to store output of the selected algorithm
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Breadth First Search'); // Default algorithm

  // Function to generate a random graph
  const generateRandomGraph = () => {
    const numNodes = Math.floor(Math.random() * 6) + 5; // Random number of nodes between 5 and 10
    const nodes = Array.from({ length: numNodes }, (_, i) => ({
      id: `Node ${i + 1}`,
      x: Math.random() * 400 + 50, // Random x position
      y: Math.random() * 400 + 50, // Random y position
    }));

    const edges = [];
    for (let i = 0; i < numNodes; i++) {
      const numEdges = Math.floor(Math.random() * (numNodes - 1)) + 1; // Random number of edges for each node
      for (let j = 0; j < numEdges; j++) {
        const targetNodeIndex = Math.floor(Math.random() * numNodes);
        if (targetNodeIndex !== i) {
          const weight = Math.floor(Math.random() * 10) + 1; // Random weight between 1 and 10
          edges.push({ from: nodes[i].id, to: nodes[targetNodeIndex].id, weight });
        }
      }
    }

    setGraph({ nodes, edges }); // Set the generated graph in state

    // Execute the selected algorithm and store the output
    runAlgorithm(nodes, edges);
  };

  // Function to run the selected algorithm on the current graph
  const runAlgorithm = (nodes, edges) => {
    let result;
    switch (selectedAlgorithm) {
      case 'Breadth First Search':
        result = bfs(nodes, edges);
        break;
      case 'Depth First Search':
        result = dfs(nodes, edges);
        break;
      case "Dijkstra's Algorithm":
        result = dijkstra(nodes, edges);
        break;
      case 'A* Algorithm':
        result = aStar(nodes, edges);
        break;
      case "Prim's Algorithm":
        result = prims(nodes, edges);
        break;
      case "Kruskal's Algorithm":
        result = kruskals(nodes, edges);
        break;
      default:
        break;
    }

    setOutput(result);
  };

  // Draw the graph on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas is available

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings

    // Draw edges with weights for specific algorithms
    graph.edges.forEach(edge => {
      const fromNode = graph.nodes.find(node => node.id === edge.from);
      const toNode = graph.nodes.find(node => node.id === edge.to);
      if (fromNode && toNode) {
        context.beginPath();
        context.moveTo(fromNode.x, fromNode.y);
        context.lineTo(toNode.x, toNode.y);
        context.strokeStyle = 'lightgray';
        context.stroke();

        // Display weights only for Dijkstra's, A*, Prim's, and Kruskal's
        if (
          selectedAlgorithm === "Dijkstra's Algorithm" ||
          selectedAlgorithm === 'A* Algorithm' ||
          selectedAlgorithm === "Prim's Algorithm" ||
          selectedAlgorithm === "Kruskal's Algorithm"
        ) {
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          context.fillStyle = 'white'; // Set text color to white
          context.font = '12px Arial';
          context.fillText(edge.weight, midX, midY); // Display weight at the midpoint of the edge
        }
      }
    });

    // Draw nodes with labels
    graph.nodes.forEach(node => {
      context.beginPath();
      context.arc(node.x, node.y, 10, 0, Math.PI * 2, true); // Draw circle for node
      context.fillStyle = 'lightblue';
      context.fill();
      context.strokeStyle = 'black';
      context.stroke();
      context.closePath();

      // Draw node label in white color
      context.fillStyle = 'white'; // Set text color to white for node labels
      context.font = '12px Arial';
      context.fillText(node.id, node.x - 10, node.y - 15); // Adjust position for label
    });

    // Draw the path taken by the selected algorithm (in color)
    if (output.length > 0) {
      context.strokeStyle = 'red'; // Path color
      context.lineWidth = 2;

      for (let i = 0; i < output.length - 1; i++) {
        const fromNode = graph.nodes.find(node => node.id === output[i]);
        const toNode = graph.nodes.find(node => node.id === output[i + 1]);
        if (fromNode && toNode) {
          context.beginPath();
          context.moveTo(fromNode.x, fromNode.y);
          context.lineTo(toNode.x, toNode.y);
          context.stroke();

          // Draw an arrow at the end of the path
          const arrowLength = 10;
          const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
          context.beginPath();
          context.moveTo(toNode.x, toNode.y);
          context.lineTo(toNode.x - arrowLength * Math.cos(angle - Math.PI / 6), toNode.y - arrowLength * Math.sin(angle - Math.PI / 6));
          context.lineTo(toNode.x - arrowLength * Math.cos(angle + Math.PI / 6), toNode.y - arrowLength * Math.sin(angle + Math.PI / 6));
          context.closePath();
          context.fillStyle = 'red'; // Arrow color
          context.fill();
        }
      }
    }
  }, [graph, selectedAlgorithm, output]); // Include selectedAlgorithm and output to the dependencies

  // Function to recompute the path for the selected algorithm
  const recomputePath = () => {
    runAlgorithm(graph.nodes, graph.edges); // Run the selected algorithm on the existing graph
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Graph Visualizer</h1>
      </header>
    <br/>
    <br/>
    <br/>
    <br/>
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <select onChange={(e) => setSelectedAlgorithm(e.target.value)} value={selectedAlgorithm}>
          <option value="Breadth First Search">Breadth First Search</option>
          <option value="Depth First Search">Depth First Search</option>
          <option value="Dijkstra's Algorithm">Dijkstra's Algorithm</option>
          <option value="A* Algorithm">A* Algorithm</option>
          <option value="Prim's Algorithm">Prim's Algorithm</option>
          <option value="Kruskal's Algorithm">Kruskal's Algorithm</option>
        </select>
        <br/>
        <button className="visualize-button" onClick={generateRandomGraph}>
          Generate Random Graph
        </button>
        <br/>
        <button className="visualize-button" onClick={recomputePath}>
          Recompute Path
        </button>

        {graph.nodes.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }} />
          </div>
        )}

        {/* Display the output of the selected algorithm */}
        {output.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>Output: {selectedAlgorithm}</h3>
            <p>Visited Nodes: {output.join(', ')}</p>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>&copy; Created by Teesha and Kanishka 2024</p>
      </footer>
    </div>
  );
}

export default Visualization;
