import React, { useState, useRef, useEffect } from 'react';
import {  Link } from 'react-router-dom';  
import './App.css';
import bfsImage from './images/BFS.png';
import dfsImage from './images/DFS.png';
import dijkstraImage from './images/Dijkstras.png';
import aStarImage from './images/Astar.png';
import kruskalImage from './images/Kruskals.png';
import primImage from './images/Prims.png';


function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const descriptionRef = useRef(null);

  const handleAlgorithmClick = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };
  
  useEffect(() => {
    if (selectedAlgorithm && descriptionRef.current) {
      descriptionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedAlgorithm]);


  const algorithmDescriptions = {
    "Breadth First Search": `Breadth-First Search (BFS) is one of the simplest algorithms for traversing or searching through graph structures. 
    It explores all nodes level by level, starting from the source node, and visits all its neighboring nodes before proceeding to the next level. 
    The algorithm operates using a queue, which ensures that nodes are visited in the order they are discovered. 
    BFS can be used to find the shortest path in unweighted graphs, making it ideal for applications such as social network analysis, 
    network broadcasting, and GPS navigation systems. BFS has applications in problem-solving domains such as finding connected components, 
    detecting cycles, and searching for specific data in large datasets. Its efficiency and simplicity make it a fundamental tool in graph theory and computer science education.
    In practical terms, BFS is often compared to its depth-first counterpart, DFS, but it tends to perform better for problems that require level-wise exploration.`,

    "Depth First Search": `Depth-First Search (DFS) is a fundamental algorithm that traverses a graph by exploring as deep as possible along each branch before backtracking. 
    Unlike BFS, which explores nodes in layers, DFS dives into each path to the deepest node before exploring other branches. 
    DFS is implemented using a stack, which can either be explicit (through a data structure) or implicit (through recursion). 
    This algorithm has various applications, including solving puzzles such as mazes, topological sorting, and pathfinding in AI game development.
    DFS is also instrumental in detecting cycles in graphs and identifying strongly connected components in directed graphs.
    Because DFS explores each path completely before moving to the next, it can be less efficient than BFS in cases where the target is close to the root, but its efficiency shines in scenarios like backtracking algorithms and exhaustive searches. 
    Additionally, DFS forms the foundation of advanced algorithms such as Tarjan's algorithm for finding strongly connected components.`,

    "Dijkstra's Algorithm": `Dijkstra's Algorithm, created by Edsger Dijkstra in 1956, is one of the most well-known shortest path algorithms for graphs with non-negative edge weights. 
    The algorithm begins at a starting node, exploring all possible paths and iteratively selecting the path with the smallest cumulative weight until it reaches the destination.
    Dijkstra's algorithm guarantees the shortest path in graphs where all edges have non-negative weights, making it particularly effective for tasks such as routing protocols, 
    network traffic optimization, and road map navigation systems. It's extensively used in GPS systems to calculate the most efficient route between two locations. 
    In practical applications, Dijkstra's algorithm has been a core component in fields such as telecommunications, logistics, and networking.
    One limitation of the algorithm, however, is that it does not handle negative weights; for those scenarios, the Bellman-Ford algorithm is more appropriate.`,

    'A* Algorithm': `A* (A-Star) Search Algorithm is an advanced graph traversal technique that builds on both BFS and Dijkstra's algorithms. 
    It introduces a heuristic, which estimates the cost of reaching the goal from a given node. This heuristic guides the search, allowing A* to efficiently focus on promising paths and reduce unnecessary exploration.
    The A* algorithm is extensively used in pathfinding and graph traversal problems in domains like AI, game development, and robotics.
    By combining both the actual cost (from the start to the current node) and the estimated cost (from the current node to the goal), A* ensures that the algorithm balances efficiency with accuracy. 
    Applications of A* range from finding the shortest path in complex, dynamic environments to calculating optimal routes in GPS systems. 
    Unlike Dijkstra's algorithm, which considers all possible paths, A* narrows down the options with its heuristic function, making it more efficient in certain scenarios, particularly in AI-driven decision-making systems.`,

    "Kruskal's Algorithm": `Kruskal's Algorithm, developed by Joseph Kruskal in 1956, is a greedy algorithm for finding the minimum spanning tree (MST) in a graph. 
    The MST is a subset of edges that connects all vertices together without any cycles and with the minimum possible total edge weight. 
    Kruskal's algorithm is particularly well-suited for sparse graphs, where the number of edges is significantly smaller than the number of nodes.
    This algorithm sorts all edges in the graph by weight and adds them to the spanning tree one by one, ensuring no cycles are formed by employing a union-find data structure. 
    The practical applications of Kruskal's algorithm extend to designing efficient network infrastructures, such as telecommunication and transportation systems, 
    where reducing the overall cost is essential. Additionally, it plays a critical role in clustering algorithms and understanding the structure of large-scale systems like electrical grids.`,

    "Prim's Algorithm": `Prim's Algorithm is another greedy algorithm used for finding the minimum spanning tree (MST) of a weighted graph. 
    Unlike Kruskal's Algorithm, which starts with individual edges and builds up the tree, Prim's algorithm begins with a single vertex and expands the tree by selecting the smallest edge that connects the tree to a new vertex. 
    This incremental approach ensures that Prim's algorithm is more efficient for dense graphs. 
    Prim's algorithm is widely used in real-world applications such as designing road, telecommunication, and utility networks where minimizing the total length of the network is crucial.
    The algorithm is also employed in applications such as image segmentation and network reliability optimization. 
    It guarantees that the minimum spanning tree is found without forming any cycles, making it a fundamental tool in graph theory and combinatorial optimization problems.`
  };

  return (

    <div className="App">
      <header className="App-header">
        <h1>Graph Visualizer</h1>
      </header>

      <main className="App-body">
        <h2>Select an Algorithm</h2>
        <div className="algorithm-grid">
          <div onClick={() => handleAlgorithmClick("Breadth First Search")} className="algorithm-card">
            <img src={bfsImage} alt="Breadth First Search" />
            <p>Breadth-First Search</p>
          </div>
          <div onClick={() => handleAlgorithmClick("Depth First Search")} className="algorithm-card">
            <img src={dfsImage} alt="Depth First Search" />
            <p>Depth-First Search</p>
          </div>
          <div onClick={() => handleAlgorithmClick("Dijkstra's Algorithm")} className="algorithm-card">
            <img src={dijkstraImage} alt="Dijkstra's Algorithm" />
            <p>Dijkstra's Algorithm</p>
          </div>
          <div onClick={() => handleAlgorithmClick('A* Algorithm')} className="algorithm-card">
            <img src={aStarImage} alt="A* Search" />
            <p>A* Search Algorithm</p>
          </div>
          <div onClick={() => handleAlgorithmClick("Kruskal's Algorithm")} className="algorithm-card">
            <img src={kruskalImage} alt="Kruskal's Algorithm" />
            <p>Kruskal's Algorithm</p>
          </div>
          <div onClick={() => handleAlgorithmClick("Prim's Algorithm")} className="algorithm-card">
            <img src={primImage} alt="Prim's Algorithm" />
            <p>Prim's Algorithm</p>
          </div>
        </div>

        {selectedAlgorithm && (
          <div ref={descriptionRef} className="algorithm-info">
            <h3>Selected Algorithm: {selectedAlgorithm}</h3>
            <p dangerouslySetInnerHTML={{ __html: algorithmDescriptions[selectedAlgorithm] }}></p>
            <p class= "button"> <Link to="/visualization" className = "linker">Visualize</Link>
      </p>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>&copy; Created by Teesha and Kanishka 2024 </p>
      </footer>
    </div>

  );
}

export default App;  
