---
subject: AAD
module: '4'
title: Algorithm Analysis & Design (CST306) - Module 4 Study Guide
order: 4
---

# Module 4: Algorithm Analysis & Design (CST306) - Module 4 Study Guide

## 1. Dynamic Programming: Matrix Chain Multiplication
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
---

Imagine you are a logistics manager organizing a relay race. You have four runners of different speeds. Depending on the order you pair them and where you place the hand-off points, the total time for the race changes drastically. If you pair a slow runner with another slow runner early on, the entire team loses momentum.

> **The Analogy:** Matrix Chain Multiplication is the "Relay Race" of mathematics. When multiplying a string of matrices (like $A \times B \times C \times D$), the final answer is always the same regardless of how you group them (the Associative Property). However, the *amount of work* (scalar multiplications) the computer does changes depending on the grouping. One parenthesization might take 500 operations, while another takes 50,000. Dynamic Programming finds the absolute "cheapest" grouping by breaking the chain into every possible sub-chain and picking the optimal split points.

### B. Exam-Ready Theory
**1. The Matrix Compatibility Rule**
Two matrices $A$ and $B$ can be multiplied if and only if the number of columns in $A$ equals the number of rows in $B$. If $A$ is $p \times q$ and $B$ is $q \times r$, the resulting matrix $C$ is $p \times r$.
*   **Work Done:** The total number of scalar multiplications is $p \times q \times r$.

**2. Problem Definition**
Given a chain $\langle A_1, A_2, \dots, A_n \rangle$ of $n$ matrices, where matrix $A_i$ has dimensions $p_{i-1} \times p_i$. We must find the parenthesization that minimizes the total scalar multiplications.

**3. The Principle of Optimality**
The Matrix Chain problem satisfies the **Principle of Optimality**: an optimal parenthesization of the product $A_1 \dots A_n$ contains within it optimal parenthesizations of sub-products (e.g., $A_1 \dots A_k$ and $A_{k+1} \dots A_n$).

**4. The Recursive Formula**
Let $m[i, j]$ be the minimum cost to multiply matrices from index $i$ to $j$.
$$
m[i, j] = 
\begin{cases} 
0 & \text{if } i = j \\
\min_{i \leq k < j} \{ m[i, k] + m[k+1, j] + p_{i-1} p_k p_j \} & \text{if } i < j
\end{cases}
$$
*   $m[i, k]$ is the cost of the left sub-chain.
*   $m[k+1, j]$ is the cost of the right sub-chain.
*   $p_{i-1} p_k p_j$ is the cost of multiplying the two resulting matrices together.

### C. Worked Examples
**Example: Multiply 4 matrices with dimensions: $A_1(5\times 6), A_2(6\times 4), A_3(4\times 8), A_4(8\times 10)$.**
Dimensions array: $p = [5, 6, 4, 8, 10]$.

**Step 1: Initialize the $m$ table (Cost table)**
We fill the table diagonal by diagonal. $m[i,i] = 0$ (single matrices cost 0 to multiply).

| i\j | 1 | 2 | 3 | 4 |
| :--- | :--- | :--- | :--- | :--- |
| **1** | 0 | | | |
| **2** | - | 0 | | |
| **3** | - | - | 0 | |
| **4** | - | - | - | 0 |

**Step 2: Chain Length $L=2$**
*   $m[1,2] = m[1,1] + m[2,2] + p_0 p_1 p_2 = 0 + 0 + (5 \times 6 \times 4) = 120$
*   $m[2,3] = m[2,2] + m[3,3] + p_1 p_2 p_3 = 0 + 0 + (6 \times 4 \times 8) = 192$
*   $m[3,4] = m[3,3] + m[4,4] + p_2 p_3 p_4 = 0 + 0 + (4 \times 8 \times 10) = 320$

**Step 3: Chain Length $L=3$**
*   **For $m[1,3]$:**
    *   Split $k=1: m[1,1] + m[2,3] + p_0 p_1 p_3 = 0 + 192 + (5 \times 6 \times 8) = 192 + 240 = 432$
    *   Split $k=2: m[1,2] + m[3,3] + p_0 p_2 p_3 = 120 + 0 + (5 \times 4 \times 8) = 120 + 160 = 280$
    *   **Min $m[1,3] = 280$ (at $k=2$)**.
*   **For $m[2,4]$:**
    *   Split $k=2: m[2,2] + m[3,4] + p_1 p_2 p_4 = 0 + 320 + (6 \times 4 \times 10) = 320 + 240 = 560$
    *   Split $k=3: m[2,3] + m[4,4] + p_1 p_3 p_4 = 192 + 0 + (6 \times 8 \times 10) = 192 + 480 = 672$
    *   **Min $m[2,4] = 560$ (at $k=2$)**.

**Step 4: Chain Length $L=4$ (Final Answer)**
*   **For $m[1,4]$:**
    *   $k=1: m[1,1] + m[2,4] + p_0 p_1 p_4 = 0 + 560 + (5 \times 6 \times 10) = 560 + 300 = 860$
    *   $k=2: m[1,2] + m[3,4] + p_0 p_2 p_4 = 120 + 320 + (5 \times 4 \times 10) = 120 + 320 + 200 = 640$
    *   $k=3: m[1,3] + m[4,4] + p_0 p_3 p_4 = 280 + 0 + (5 \times 8 \times 10) = 280 + 400 = 680$
    *   **Min $m[1,4] = 640$ (at $k=2$)**.

**Final Solution Table ($m$):**
| i\j | 1 | 2 | 3 | 4 |
| :--- | :--- | :--- | :--- | :--- |
| **1** | 0 | 120 | 280 | **640** |
| **2** | - | 0 | 192 | 560 |
| **3** | - | - | 0 | 320 |
| **4** | - | - | - | 0 |

**Final Parenthesization:** $(A_1 A_2) (A_3 A_4)$.

### D. How to Write in Exam
*   **Start With:** State the **Principle of Optimality** and define the $m[i,j]$ recursive formula. List the dimensions array $p$.
*   **Body:** You MUST draw the $m$ table. Fill it step-by-step showing at least two manual calculations for cell values to show the examiner you know the formula.
*   **Visuals:** For larger marks, draw the $s$ (split) table as well, which records the value of $k$ that gave the minimum for each cell.
*   **Close With:** Write the final parenthesized expression and the value in a box: `Min Multiplications = 640`.

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** Matrix Chain Multiplication is a classic Dynamic Programming problem where the goal is to find the most efficient way to multiply a chain of matrices. This involves breaking down the chain into sub-chains and determining the optimal split points to minimize the total number of scalar multiplications. The key formula is $m[i, j] = \min_{i \leq k < j} \{ m[i, k] + m[k+1, j] + p_{i-1} p_k p_j \}$, where $m[i, j]$ represents the minimum cost to multiply matrices from index $i$ to $j$.
* **Flash Questions:**
 1. What is the primary goal in the Matrix Chain Multiplication problem?
 2. How does the Principle of Optimality apply to this problem?
 3. What does the $m[i, j]$ formula represent in the context of Matrix Chain Multiplication?
* **Practice Prompts:**
 1. Given three matrices $A(2 \times 3)$, $B(3 \times 4)$, and $C(4 \times 5)$, determine the minimum number of scalar multiplications required to compute $ABC$ and the optimal parenthesization.
 2. For matrices $A(10 \times 5)$, $B(5 \times 3)$, $C(3 \times 8)$, and $D(8 \times 12)$, calculate the minimum cost and optimal parenthesization for the product $ABCD$ using Dynamic Programming.
 3. Consider a chain of five matrices with dimensions $2 \times 3$, $3 \times 4$, $4 \times 5$, $5 \times 6$, and $6 \times 7$. Apply the Matrix Chain Multiplication algorithm to find the minimum number of scalar multiplications and the corresponding optimal parenthesization.

---

## 2. Dynamic Programming: Floyd-Warshall (All Pairs Shortest Path)
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Imagine you are at an airport hub. You can see direct flights between cities. But you want to know the absolute shortest travel time between *any* two cities in the world, even if it involves 1, 2, or 10 layovers.

> **The Analogy:** Floyd-Warshall is the "Layover Optimizer". It starts with a simple map of direct roads. Then it asks: "If I allow you to stop in City 1, can you find a faster route between any two cities?" Then it asks again for City 2, City 3, and so on. By the time it has checked all possible cities as intermediate "stops", the resulting map shows the guaranteed shortest path between every single pair of cities.

### B. Exam-Ready Theory
**1. Problem Definition**
Given a weighted directed graph $G=(V, E)$, find the shortest path between every pair of vertices $(i, j)$. This algorithm works correctly with **negative edge weights** but assumes there are no negative weight cycles.

**2. The Recurrence Relation**
Let $D^{(k)}_{ij}$ be the shortest path from vertex $i$ to $j$ using only intermediate vertices from the set $\{1, 2, \dots, k\}$.
$$
D^{(k)}_{ij} = \min(D^{(k-1)}_{ij}, D^{(k-1)}_{ik} + D^{(k-1)}_{kj})
$$
*   **$D^{(k-1)}_{ij}$**: The shortest path found in the *previous* iteration (not using $k$).
*   **$D^{(k-1)}_{ik} + D^{(k-1)}_{kj}$**: The new potential shortcut found by going from $i \to k$ and then $k \to j$.

**3. Complexity**
*   **Time Complexity:** $O(V^3)$ because of three nested `for` loops (one for $k$, one for $i$, one for $j$).
*   **Space Complexity:** $O(V^2)$ to store the distance matrix.

### C. Worked Examples
**Example: Find all-pairs shortest paths for the following graph.**
Edges: (1,2): 9, (1,3): -4, (2,1): 6, (2,4): 2, (3,2): 5, (4,3): 1.

**Matrix $D^{(0)}$ (Initial state - direct edges only):**
```text
    1   2   3   4
1 [ 0,  9, -4,  ∞]
2 [ 6,  0,  ∞,  2]
3 [ ∞,  5,  0,  ∞]
4 [ ∞,  ∞,  1,  0]
```

**Iteration 1: Use Vertex 1 as intermediate ($k=1$)**
*   $D^{(1)}_{23} = \min(D^{(0)}_{23}, D^{(0)}_{21} + D^{(0)}_{13}) = \min(\infty, 6 + (-4)) = 2$.
*   *Note: Row 1 and Col 1 remain unchanged.*
```text
    1   2   3   4
1 [ 0,  9, -4,  ∞]
2 [ 6,  0,  2,  2]
3 [ ∞,  5,  0,  ∞]
4 [ ∞,  ∞,  1,  0]
```

**Iteration 2: Use Vertex 2 as intermediate ($k=2$)**
*   $D^{(2)}_{13} = \min(D^{(1)}_{13}, D^{(1)}_{12} + D^{(1)}_{23}) = \min(-4, 9 + 2) = -4$.
*   $D^{(2)}_{14} = \min(D^{(1)}_{14}, D^{(1)}_{12} + D^{(1)}_{24}) = \min(\infty, 9 + 2) = 11$.
*   $D^{(2)}_{31} = \min(D^{(1)}_{31}, D^{(1)}_{32} + D^{(1)}_{21}) = \min(\infty, 5 + 6) = 11$.
*   $D^{(2)}_{34} = \min(D^{(1)}_{34}, D^{(1)}_{32} + D^{(1)}_{24}) = \min(\infty, 5 + 2) = 7$.
```text
    1   2   3   4
1 [ 0,  9, -4, 11]
2 [ 6,  0,  2,  2]
3 [11,  5,  0,  7]
4 [ ∞,  ∞,  1,  0]
```

**Iteration 3: Use Vertex 3 as intermediate ($k=3$)**
*   (Similar steps, check all paths $i \to 3 \to j$)
```text
    1   2   3   4
1 [ 0,  1, -4,  3]
2 [ 6,  0,  2,  2]
3 [11,  5,  0,  7]
4 [12,  6,  1,  0]
```

**Iteration 4: Final Matrix $D^{(4)}$ (Use Vertex 4)**
*   *The final matrix shows the absolute shortest distance between any two vertices.*

### D. How to Write in Exam
*   **Start With:** Write the three nested loops pseudo-code. State that $D^{(0)}$ is the adjacency matrix.
*   **Body:** You MUST show every intermediate matrix $D^{(1)}, D^{(2)}$, etc. Don't just skip to the final answer.
*   **Traps:** If you find a diagonal element becomes negative ($D_{ii} < 0$), it means the graph has a **negative cycle**, and shortest paths are undefined. Mention this if you see it.
*   **Close With:** State the final distances and mention $O(n^3)$ complexity.

### E. Rapid Recall & Self-Test
**1-Minute Recall:** Floyd-Warshall algorithm is used to find the shortest path between all pairs of vertices in a weighted directed graph. It works with negative edge weights but assumes no negative weight cycles. The algorithm iterates through all vertices, updating the shortest path matrix at each step. The time complexity is O(V^3) and space complexity is O(V^2).

**Flash Questions:**
1. What is the primary application of the Floyd-Warshall algorithm?
2. How does the algorithm handle negative edge weights and negative weight cycles?
3. What are the time and space complexities of the Floyd-Warshall algorithm?

**Practice Prompts:**
1. Given a graph with vertices {1, 2, 3, 4} and edges (1,2): 3, (1,3): 2, (2,3): 1, (3,4): 4, use the Floyd-Warshall algorithm to find the shortest path between all pairs of vertices.
2. Prove that the Floyd-Warshall algorithm correctly handles negative edge weights but fails when a negative weight cycle is present in the graph.
3. Compare the Floyd-Warshall algorithm with other shortest path algorithms like Dijkstra's and Bellman-Ford, highlighting their differences in handling negative weights and cycles.

---

## 3. Branch and Bound: Traveling Salesperson Problem (TSP)
**[HIGH PROB | ↻ REPEATED PYQ]**

### A. What is this?
Imagine a billionaire wants to visit 5 world capitals and return home. He wants the absolute cheapest tour. He has a private jet, but fuel is expensive.

> **The Analogy:** TSP using Branch & Bound is the "Deal or No Deal" of algorithms. You start a path (e.g., London $\to$ Paris). As soon as you start, you calculate a **Lower Bound**—the absolute minimum the whole trip *could* cost. If that "deal" (the bound) is already more expensive than a full trip you already found, you immediately "No Deal" and abandon that path forever. This is called **Pruning**.

### B. Exam-Ready Theory
**1. The Bounding Function (Matrix Reduction)**
To calculate the cost (Lower Bound) of a node in the state space tree:
1.  **Row Reduction:** Subtract the minimum element of each row from that row.
2.  **Column Reduction:** Subtract the minimum element of each column from that column.
3.  **Total Reduction ($r$):** The sum of all values subtracted.

**2. Branching to a New City**
If you move from City $i$ to City $j$:
1.  Add the Cost of the current node.
2.  Add the cost of edge $(i, j)$ in the current reduced matrix.
3.  Set Row $i$ and Column $j$ to $\infty$.
4.  Set Matrix $[j, 1]$ to $\infty$ (to prevent returning home early).
5.  Reduce the new matrix and add the new reduction sum $r$.

**3. Least Cost Search (LC-Search)**
Always expand the node with the absolute lowest cost bound first.

### C. Worked Examples
**Example: Solve TSP for the following cost matrix.**
```text
   1  2  3  4
1 [∞, 2, 5, 7]
2 [2, ∞, 8, 3]
3 [5, 8, ∞, 1]
4 [7, 3, 1, ∞]
```

**Step 1: Reduce Initial Matrix (Root Node 1)**
*   Row mins: R1:2, R2:2, R3:1, R4:1. **Sum = 6**.
*   Matrix after Row Reduction:
    ```text
    [∞, 0, 3, 5]
    [0, ∞, 6, 1]
    [4, 7, ∞, 0]
    [6, 2, 0, ∞]
    ```
*   Col mins: All 0. **Total Reduction $r = 6$**.
*   **Cost of Node 1 = 6**.

**Step 2: Branch to City 2 from 1 (Node 2)**
*   $M[1, \dots] = \infty$, $M[\dots, 2] = \infty$, $M[2, 1] = \infty$.
*   Cost = Cost(Node 1) + $M[1, 2]$(from reduced) + New Reduction.
*   Cost = $6 + 0 + 5 = 11$. (After reducing remaining matrix).

**Step 3: Branch to City 3 from 1 (Node 3)**
*   Cost = $6 + 3 + 2 = 11$.

**Step 4: Branch to City 4 from 1 (Node 4)**
*   Cost = $6 + 5 + 6 = 17$.

**Step 5: Least Cost Search**
Nodes 2 and 3 have the same cost (11). Pick Node 2. Expand children of 2.
Eventually, the lowest cost path is found.

**Final Path:** $1 \to 2 \to 4 \to 3 \to 1$. **Min Cost = 11**.

### D. How to Write in Exam
*   **Start With:** Explain the concept of the Lower Bound and LC-Search.
*   **Body:** You MUST show the **Reduced Matrix** for the root node. Then show the calculation for the cost of each child node. Draw the State Space Tree clearly showing the cost at every node.
*   **Traps:** Don't forget to set the "return edge" (e.g., $j \to 1$) to $\infty$ when branching.
*   **Close With:** Final tour sequence and the minimum cost value.

### E. Rapid Recall & Self-Test
**1-Minute Recall**
* The Traveling Salesperson Problem (TSP) is solved using Branch and Bound method.
* Lower Bound is calculated using matrix reduction (row and column reduction).
* Least Cost Search (LC-Search) is used to expand the node with the lowest cost bound.
* The process involves branching to new cities, calculating the cost of each node, and pruning nodes with higher costs.

**Flash Questions**
1. What is the purpose of calculating the Lower Bound in the Branch and Bound method for TSP?
2. How is the Total Reduction ($r$) calculated in the matrix reduction step?
3. What is the main principle behind the Least Cost Search (LC-Search) in the Branch and Bound method?

**Practice Prompts**
1. Solve the TSP for a given cost matrix using the Branch and Bound method, showing all steps and calculations.
2. Explain how the Lower Bound is used to prune nodes in the state space tree, and provide an example.
3. Describe the process of branching to a new city, including the steps to update the matrix and calculate the new cost bound.
