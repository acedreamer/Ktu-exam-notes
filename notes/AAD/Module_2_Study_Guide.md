---
subject: AAD
module: '2'
title: Algorithm Analysis & Design (CST306) - Module 2 Study Guide
order: 2
---

# Module 2: Algorithm Analysis & Design (CST306) - Module 2 Study Guide

## 1. Graph Traversals (BFS / DFS)
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
---

Imagine you are exploring a massive, ancient underground tomb with many interconnected chambers. You have two ways to explore: either you visit all the rooms closest to the entrance first before going deeper, or you pick a dark corridor and keep following it as deep as it goes until you hit a dead end, then backtrack to the last intersection and try another way.

> **The Analogy:** Breadth-First Search (BFS) is like exploring the tomb "layer by level" (visiting all neighbors first). Depth-First Search (DFS) is like a "deep dive" into the tomb (following a path until you can't go any further).

In computer science, these are the fundamental ways we visit every node in a graph. BFS uses a Queue (First-In-First-Out) to keep track of neighbors, while DFS uses recursion or a Stack (Last-In-First-Out) to dive deep.

### B. Exam-Ready Theory
* **Formal Definitions:**
  + Breadth-First Search (BFS): A traversal strategy that explores all the neighbor nodes at the present depth prior to moving on to nodes at the next depth level.
  + Depth-First Search (DFS): A traversal strategy that explores as far as possible along each branch before backtracking.
* **Key Formulas:**
  + The time complexity of BFS and DFS can be represented as $O(|V| + |E|)$, where $|V|$ is the number of vertices and $|E|$ is the number of edges.
  + The space complexity for BFS is $O(|V|)$, as in the worst case, the queue will contain all vertices at the last level of the graph.
  + The space complexity for DFS is $O(h)$, where $h$ is the maximum height of the recursion call stack, which can be $O(|V|)$ in the worst case for an unbalanced graph.
* **Core Properties:**
  + **BFS:**
    - Uses a queue data structure.
    - Guaranteed to find the shortest path to the goal node in an unweighted graph.
  + **DFS:**
    - Uses a stack or recursion.
    - Can be used for cycle detection, topological sorting, and finding strongly connected components.
  + **Edge Classification in DFS:**
    - **Tree Edge:** An edge that is part of the DFS tree.
    - **Back Edge:** An edge that connects a vertex to an ancestor in the DFS tree, indicating a cycle.
    - **Forward Edge:** An edge that connects an ancestor to a descendant in the DFS tree, but is not a tree edge.
    - **Cross Edge:** An edge that connects two vertices that are not ancestors or descendants of each other in the DFS tree.

### C. Worked Examples
**Example: DFS Traversal & Edge Classification (University Question)**
Consider a Directed Graph with edges: $(1,2), (2,4), (4,6), (1,3), (3,5), (5,7), (5,8), (1,8), (6,2), (5,4)$.
Perform DFS starting at node 1 (pick neighbors in numerical order).

1.  **DFS Sequence:** $1 \to 2 \to 4 \to 6$. 
    *   From 6, neighbor 2 is already visited. **Backtrack to 1.**
    *   From 1, visit 3 $\to 5 \to 7$. 
    *   From 7, no neighbors. **Backtrack to 5.**
    *   From 5, visit 8.
2.  **Edge Classification:**
    *   **Tree Edges:** (1,2), (2,4), (4,6), (1,3), (3,5), (5,7), (5,8). (Edges forming the DFS tree).
    *   **Backward Edge:** (6,2). (Connects descendant 6 to ancestor 2). Indicates a cycle.
    *   **Forward Edge:** (1,8). (Connects ancestor 1 to descendant 8, not via tree path).
    *   **Cross Edge:** (5,4). (Connects 5 and 4 which have no ancestor/descendant relationship in this DFS tree).

### D. How to Write in Exam
*   **Start With:** The formal algorithm for BFS/DFS. Mention the data structure used (Queue for BFS, Stack/Recursion for DFS).
*   **Body:** For traversal questions, **always** show the state of the Queue (for BFS) or the Recursion Stack/Discovery times (for DFS) at each step. If asked for edge classification, label the edges on the graph diagram.
*   **Traps:** If the question says "pick neighbors in alphabetical order," strictly follow it. Missing a single node in a complex graph will lose symmetry and marks.
*   **Close With:** State the applications (e.g., BFS for shortest path in unweighted graphs, DFS for cycle detection or Topological Sort).

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** Breadth-First Search (BFS) explores a graph level by level using a Queue, while Depth-First Search (DFS) dives deep using a Stack or recursion. BFS is suitable for finding shortest paths in unweighted graphs, and DFS is used for cycle detection, Topological Sort, and testing whether a graph is connected.
* **Flash Questions:**
 1. What data structure is used in BFS to keep track of nodes to visit?
 2. How does DFS classify edges in a graph during traversal?
 3. What is the primary application of BFS in graph theory?
* **Practice Prompts:**
 1. Perform a BFS traversal on a graph with vertices A, B, C, D, E, and edges (A,B), (A,C), (B,D), (C,E), starting from vertex A. Show the state of the Queue at each step.
 2. Given a directed graph with edges (1,2), (2,3), (1,4), (4,5), perform a DFS traversal starting from node 1, classifying each edge as a tree edge, backward edge, forward edge, or cross edge.
 3. Explain how BFS can be used to find the shortest path between two nodes in an unweighted graph, providing a simple example to illustrate the process.

---

## 2. AVL Trees Construction
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Imagine you are building a library shelf. If you keep adding books only to the right side, the shelf will eventually tip over. To keep it stable, you need to rearrange the books so the weight is evenly distributed.

> **The Analogy:** An AVL Tree is a "self-balancing" library shelf. In a normal Binary Search Tree, if you insert numbers in order (1, 2, 3, 4...), the tree becomes a straight line (unbalanced), making it slow to search. An AVL tree detects whenever one side gets too "heavy" and performs a "rotation" (rearranging) to keep the height small.

The "weight" here is called the **Balance Factor**. An AVL tree ensures that for every single node, the height difference between its left and right sides is never more than 1.

### B. Exam-Ready Theory
**1. Definition:** An AVL tree is a height-balanced Binary Search Tree (BST).
**2. Balance Factor (BF):** 
$$BF(\text{node}) = \text{Height}(\text{Left Subtree}) - \text{Height}(\text{Right Subtree})$$
A node is considered **balanced** if its BF is $\{-1, 0, +1\}$. If BF becomes $+2$ or $-2$, the tree is unbalanced.

**3. The 4 AVL Rotations:**
*   **LL Rotation (Single Right):** Needed when a node is inserted into the left subtree of the left child.
*   **RR Rotation (Single Left):** Needed when a node is inserted into the right subtree of the right child.
*   **LR Rotation (Double):** Left rotation followed by Right rotation. Needed when inserted into the right subtree of the left child.
*   **RL Rotation (Double):** Right rotation followed by Left rotation. Needed when inserted into the left subtree of the right child.

**4. Complexity:** All operations (Search, Insertion, Deletion) take $O(\log n)$ time because the height is always kept logarithmic.

### C. Worked Examples
**Example: Construct AVL tree (April 2025 University Question)**
Insert nodes: 50, 20, 60, 10, 8, 15, 32, 46, 11, 48

1.  **Insert 50, 20, 60:**
    *   Root(50), Left(20), Right(60). All BFs within $\{-1, 0, 1\}$.
2.  **Insert 10:** Goes to Left of 20.
3.  **Insert 8:** Goes to Left of 10.
    *   **Imbalance at 20:** BF(20) = 2. Path: Left-Left (LL).
    *   **Action:** Single Right Rotation at 20.
    *   **Result:** 10 becomes parent of 8 and 20.
4.  **Insert 15:** Goes to Right of 10, Left of 20.
    *   **Imbalance at 50:** BF(50) = 2. Path: Left-Right (LR).
    *   **Action:** Double Rotation (LR) at 50.
    *   **Result:** 15 becomes the new root (or sub-root depending on depth).
5.  **Continue for 32, 46, 11, 48:**
    *   *Note: For the exam, you must draw the state after every single rotation.*
    *   **Key State (Final):** The tree remains balanced with height 3.

### D. How to Write in Exam
*   **Start With:** Define AVL tree and the Balance Factor formula.
*   **Body:** When asked to construct a tree, **draw the tree after every single insertion**. Calculate and write the BF for every node after each step.
*   **Traps:** If you find an imbalance, **identify the type of rotation** (LL, RR, LR, RL) before drawing the rotated version. Do not skip steps; the examiner gives marks for the intermediate unbalanced states and the rotation labels.
*   **Close With:** Verify that the final tree satisfies the BST property (Left < Root < Right) and all BFs are within $\{-1, 0, 1\}$.

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** 
  + An AVL tree is a self-balancing Binary Search Tree where the difference in height between the left and right subtrees of every node cannot exceed 1.
  + Balance Factor (BF) = Height(Left Subtree) - Height(Right Subtree), and a node is balanced if its BF is -1, 0, or 1.
  + Four types of rotations: LL (Single Right), RR (Single Left), LR (Double), and RL (Double) to balance the tree after insertion or deletion.
  + All operations (search, insert, delete) take O(log n) time due to the tree's logarithmic height.
* **Flash Questions:**
  1. What is the primary condition for a node to be considered balanced in an AVL tree?
  2. Describe the scenario that requires an LL rotation in an AVL tree.
  3. What is the time complexity for search, insertion, and deletion operations in an AVL tree, and why?
* **Practice Prompts:**
  1. Construct an AVL tree by inserting the numbers 10, 5, 15, 3, 7, 12, 18 in sequence, drawing the tree after each insertion and calculating the balance factor for each node.
  2. Given an AVL tree with the following nodes already inserted: 20, 10, 30, 5, 15, 25, 35, insert the number 12 and show the steps to balance the tree if necessary.
  3. Explain how the height of an AVL tree remains relatively small even after a large number of insertions, and how this affects the efficiency of search operations.

---

## 3. Disjoint Sets & Strongly Connected Components
**[HIGH PROB | ↻ REPEATED PYQ]**

### A. What is this?
**Disjoint Sets:** Imagine a group of people at a party. Initially, everyone is a stranger (their own set). As people talk, they form "friend groups." If person A knows B, and B knows C, then A, B, and C are in the same group.
> **The Analogy:** Disjoint Sets (Union-Find) help us track these groups. "Find" asks "Who is the leader of your group?" and "Union" says "Merge these two groups together under one leader."

**Strongly Connected Components (SCC):** In a directed map of one-way streets, an SCC is a neighborhood where you can drive from any house to any other house and still be able to get back.
> **The Analogy:** If you can go from A to B, but never from B back to A, they are NOT in the same SCC. SCCs are "circular" clusters in a directed graph.

### B. Exam-Ready Theory
**1. Disjoint Set Operations**
*   **Make-Set(x):** Creates a new set containing only element $x$.
*   **Find(x):** Returns the representative (root) of the set containing $x$.
*   **Union(x, y):** Merges the sets containing $x$ and $y$.
*   **Optimizations (The Heuristics):**
    *   **Union by Rank:** Always attach the smaller tree under the root of the larger tree to keep depth small.
    *   **Path Compression:** During "Find", make every node on the path point directly to the root to flatten the tree.

**2. Strongly Connected Components (Kosaraju’s Algorithm)**
*   A 2-Pass algorithm using DFS.
*   **Steps:**
    1.  Perform DFS on original graph $G$ and push nodes onto a **Stack** based on their finishing times.
    2.  **Reverse** all edges of the graph to get $G^T$ (Transpose Graph).
    3.  Pop nodes from the Stack. If the node is unvisited, perform DFS on $G^T$ starting from it. Each such DFS visit identifies one SCC.
*   **Complexity:** $O(V + E)$.

### C. Worked Examples
**Example 1: Union by Rank and Path Compression Trace (University Question)**
Suppose we have sets $\{1\}, \{2\}, \{3\}, \{4\}, \{5\}, \{6\}$.
Perform: $Union(1,2), Union(3,4), Union(5,6), Union(1,3)$.

1.  **Union(1,2):** Rank(1)=0, Rank(2)=0. Attach 2 to 1. **Root=1, Rank(1)=1**.
2.  **Union(3,4):** Rank(3)=0, Rank(4)=0. Attach 4 to 3. **Root=3, Rank(3)=1**.
3.  **Union(5,6):** Rank(5)=0, Rank(6)=0. Attach 6 to 5. **Root=5, Rank(5)=1**.
4.  **Union(1,3):** Both roots have Rank 1. Attach 3 to 1. **Root=1, Rank(1)=2**.
5.  **Find(4) with Path Compression:**
    *   Path: $4 \to 3 \to 1$. 
    *   **Compression:** Node 4 is reattached directly to Root 1.
    *   **Result:** Future Find(4) takes $O(1)$ time.

**Example 2: Kosaraju's SCC Trace (University Question)**
Graph: $1 \to 4, 4 \to 7, 7 \to 1, 9 \to 7, 9 \to 3, 6 \to 9, 3 \to 6, 8 \to 6, 8 \to 2, 2 \to 5, 5 \to 8$.

1.  **Pass 1 (DFS Finish Stack):** $[2, 5, 8, 3, 6, 9, 1, 4, 7]$ (Top is 8).
2.  **Pass 2 (DFS on Reversed Graph):**
    *   Pop 8: Visits $\{8, 5, 2\}$. **SCC 1 = {2, 5, 8}**.
    *   Pop 9: Visits $\{9, 6, 3\}$. **SCC 2 = {3, 6, 9}**.
    *   Pop 1: Visits $\{1, 7, 4\}$. **SCC 3 = {1, 4, 7}**.

### D. How to Write in Exam
*   **Start With:** For Disjoint sets, define the three operations. For SCC, define what "Strongly Connected" means.
*   **Body:** For Kosaraju's, draw the **Original Graph**, the **Stack state**, the **Reversed Graph**, and finally list the sets of nodes in each SCC.
*   **Traps:** In Disjoint Sets, remember that `Union(a, b)` actually performs `Union(Find(a), Find(b))`. You merge the roots, not the leaf nodes.
*   **Close With:** Mention the time complexity $O(V+E)$ for both SCC and optimized Disjoint Set operations.

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** Disjoint Sets use Union-Find operations (Make-Set, Find, Union) with optimizations (Union by Rank, Path Compression) for efficient set management. Strongly Connected Components (SCC) are identified using Kosaraju's Algorithm, a 2-pass DFS approach on the original and reversed graph, yielding a time complexity of $O(V + E)$.
* **Flash Questions:**
 1. What is the purpose of the "Find" operation in Disjoint Sets?
 2. How does Kosaraju's Algorithm handle the identification of SCCs in a directed graph?
 3. What is the significance of "Union by Rank" and "Path Compression" in optimizing Disjoint Set operations?
* **Practice Prompts:**
 1. Given a set of elements $\{1, 2, 3, 4, 5\}$, perform the following Disjoint Set operations and trace the resulting sets: $Union(1, 2), Union(3, 4), Find(5), Union(1, 3)$.
 2. Apply Kosaraju's Algorithm to the graph with edges $1 \to 2, 2 \to 3, 3 \to 1, 4 \to 5, 5 \to 4$ to identify the Strongly Connected Components.
 3. Explain how the time complexity of $O(V + E)$ is achieved for both optimized Disjoint Set operations and Kosaraju's Algorithm for finding SCCs.

---

## 4. Topological Sort
**[PART A FOCUS | HIGH FREQ]**

### A. What is this?
Imagine you are getting dressed. You can't put on your shoes before your socks, and you can't put on your jacket before your shirt. Some tasks *depend* on others.

> **The Analogy:** Topological Sort is the "Getting Dressed" sequence. It takes a list of tasks with dependencies (a Directed Acyclic Graph) and puts them in a valid linear order so that no task is started before its requirements are met.

### B. Exam-Ready Theory
*   **Definition:** A linear ordering of vertices such that for every directed edge $(u, v)$, vertex $u$ comes before $v$ in the ordering.
*   **Constraint:** Only possible for **Directed Acyclic Graphs (DAGs)**. If there is a cycle, no topological sort exists.
*   **Kahn's Algorithm (In-degree method):**
    1.  Find all nodes with **In-degree = 0** (no incoming edges).
    2.  Add them to a Queue.
    3.  While Queue is not empty:
        a. Pop node $u$, add to result.
        b. For each neighbor $v$ of $u$, decrement In-degree of $v$.
        c. If In-degree of $v$ becomes 0, add to Queue.
*   **Complexity:** $O(V + E)$.

### C. Worked Examples
**Example: Perform Topological Sort on a DAG**
Consider a DAG with vertices {1, 2, 3, 4, 5, 6} and edges:
(1, 2), (1, 3), (2, 4), (3, 4), (4, 5), (4, 6).

1.  **Calculate In-degrees:**
    *   Node 1: 0
    *   Node 2: 1 (from 1)
    *   Node 3: 1 (from 1)
    *   Node 4: 2 (from 2, 3)
    *   Node 5: 1 (from 4)
    *   Node 6: 1 (from 4)
2.  **Step 1:** Queue = [1]. Result = [].
    *   Pop 1. Neighbors: 2, 3.
    *   In-degree(2) = 0, In-degree(3) = 0.
    *   Queue = [2, 3]. Result = [1].
3.  **Step 2:** Pop 2. Neighbor: 4.
    *   In-degree(4) = 1.
    *   Queue = [3]. Result = [1, 2].
4.  **Step 3:** Pop 3. Neighbor: 4.
    *   In-degree(4) = 0.
    *   Queue = [4]. Result = [1, 2, 3].
5.  **Step 4:** Pop 4. Neighbors: 5, 6.
    *   In-degree(5) = 0, In-degree(6) = 0.
    *   Queue = [5, 6]. Result = [1, 2, 3, 4].
6.  **Step 5:** Pop 5. No neighbors.
    *   Queue = [6]. Result = [1, 2, 3, 4, 5].
7.  **Step 6:** Pop 6. No neighbors.
    *   Queue = []. Result = [1, 2, 3, 4, 5, 6].

**Final Topological Ordering:** [1, 2, 3, 4, 5, 6] (or [1, 3, 2, 4, 6, 5] etc.)

### D. How to Write in Exam
*   **Start With:** Define DAG and the condition for Topological Sort.
*   **Body:** List the In-degree of every node in a table. Show how the In-degrees change as you "remove" nodes.
*   **Traps:** If you are asked to find "any two" topological orderings, show how picking a different node from the "In-degree 0" set changes the final sequence.
*   **Close With:** State applications like task scheduling or instruction sequencing in compilers.

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** Topological Sort is a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge, the source vertex comes before the destination vertex. It's used for task scheduling, instruction sequencing in compilers, and other applications where order matters. Recall Kahn's Algorithm: find nodes with In-degree 0, add to a queue, and iteratively remove nodes, updating In-degrees until the queue is empty.
* **Flash Questions:**
  1. What is the primary condition for a graph to have a topological sort?
  2. How does Kahn's Algorithm handle nodes with In-degree greater than 0?
  3. What is the time complexity of performing a topological sort using Kahn's Algorithm?
* **Practice Prompts:**
  1. Given a DAG with vertices {A, B, C, D, E} and edges (A, B), (A, C), (B, D), (C, D), (D, E), perform a topological sort and list all possible orderings.
  2. Consider a scenario where you need to schedule tasks for a software development project. The tasks are: writing code, testing, debugging, and deployment. Write down the dependencies between these tasks and perform a topological sort to determine a valid order of execution.
  3. Prove that a graph with a cycle cannot have a topological sort by providing a counterexample and explaining why the presence of a cycle violates the definition of a topological sort.
