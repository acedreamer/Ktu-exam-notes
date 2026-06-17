---
subject: AAD
module: '3'
title: Algorithm Analysis & Design (CST306) - Module 3 Study Guide
order: 3
---

# Module 3: Algorithm Analysis & Design (CST306) - Module 3 Study Guide

## 1. Part A: High Frequency Definitions (Module 3 Focus)
**[MODERATE]**

### A. What is this?
### Topic: Control abstraction: Greedy Strategy
**[HIGH PROB | ↻ REPEATED PYQ]**

#### Section A: What is this? (The Concept)
Imagine you are at a buffet and want to eat as much high-protein food as possible before you get full. You don't map out every possible combination of food on your plate. Instead, you look at the table, grab the item with the highest protein density right now, put it on your plate, and repeat until your plate is full.

> **The Analogy:** The Greedy Strategy is the "buffet plate" approach. It makes the locally optimal choice at each step with the hope that these local optimums will lead to a global optimum. It never reconsiders a choice once it is made.

#### Section B: Exam-Ready Theory (The Rigor)
*   **Definition:** A control abstraction is a procedure whose general flow is clear, but whose primary operations are left undefined. The Greedy method builds a solution piece by piece, always choosing the next piece that offers the most immediate benefit.
*   **Feasibility:** A solution is feasible if it satisfies the problem's constraints (e.g., doesn't exceed the knapsack capacity).
*   **Optimality:** An optimal solution is a feasible solution that maximizes or minimizes a given objective function.
*   **Algorithm Structure:**
    ```text
    Greedy(a, n) {
        solution = Φ;
        for i=1 to n do {
            x = Select(a);
            if Feasible(solution, x) then
                solution = Union(solution, x);
        }
        return solution;
    }
    ```

#### Section C: Step-by-Step Worked Example (The Application)
**(Theoretical Trace)**
1.  **Input:** A set of candidate items.
2.  **Select():** Picks the "best" item from the candidates based on a greedy criterion (e.g., highest profit-to-weight ratio).
3.  **Feasible():** Checks if adding this item violates constraints.
4.  **Union():** Adds it to the final solution set.

#### Section D: How to Write This in the Exam (The Strategy)
*   **Start With:** Define the core philosophy: "Make the locally optimal choice at each stage."
*   **Body:** Write down the formal pseudo-code for the `Greedy(a, n)` control abstraction. Explain what the `Select`, `Feasible`, and `Union` functions do.
*   **Traps:** Do not confuse Greedy with Dynamic Programming. Explicitly mention that Greedy *never* reconsiders previous choices.
*   **Close With:** List standard applications (Fractional Knapsack, Kruskal's, Dijkstra's).

---

### Topic: Control abstraction: Divide & Conquer
**[HIGH PROB | ↻ REPEATED PYQ]**

#### Section A: What is this? (The Concept)
Imagine you are asked to alphabetize a stack of 1,000 tests. Doing it all at once is overwhelming. Instead, you cut the stack in half, give 500 to a friend, and tell them to cut it in half again. Once everyone has just 1 or 2 tests, alphabetizing them takes a second. Then, you just merge the small, sorted stacks back together.

> **The Analogy:** Divide and Conquer is exactly this "divide the labor" strategy. You break a massive, complex problem into identical, smaller mini-problems until they are so trivial you can solve them instantly, and then you merge the mini-solutions.

#### Section B: Exam-Ready Theory (The Rigor)
*   **Definition:** An algorithm design paradigm that recursively breaks down a problem into two or more sub-problems of the same or related type, until these become simple enough to be solved directly.
*   **Three Steps:**
    1.  **Divide:** Break the problem $P$ into smaller instances $P_1, P_2, \dots, P_k$.
    2.  **Conquer:** Solve the sub-problems recursively.
    3.  **Combine:** Merge the sub-solutions into a single solution for $P$.
*   **Algorithm Structure:**
    ```text
    Algorithm DAndC(P) {
        if Small(P) then
            return S(P);
        else {
            Divide P into P1, P2... Pk;
            apply DAndC to sub-problems;
            return Combine(DAndC(P1)... DAndC(Pk));
        }
    }
    ```

#### Section C: Step-by-Step Worked Example (The Application)
**(Theoretical Trace - Merge Sort Base Case)**
1.  **Divide:** Array `[38, 27, 43, 3]` is divided into `[38, 27]` and `[43, 3]`.
2.  **Conquer:** Sub-arrays are recursively divided until size 1. `[38]`, `[27]`, `[43]`, `[3]`. (Small(P) is True).
3.  **Combine:** Merge `[38]` and `[27]` into `[27, 38]`. Merge `[43]` and `[3]` into `[3, 43]`. Finally, merge `[27, 38]` and `[3, 43]` into `[3, 27, 38, 43]`.

#### Section D: How to Write This in the Exam (The Strategy)
*   **Start With:** Explicitly list the three phases: Divide, Conquer, Combine.
*   **Body:** Write the standard `DAndC(P)` pseudo-code block. Define the general recurrence relation $T(n) = aT(n/b) + f(n)$.
*   **Traps:** Do not skip the `Small(P)` base-case check in your algorithm. Without a base case, recursion is infinite.
*   **Close With:** Provide 2 standard examples (e.g., Merge Sort, Binary Search).

### B. Exam-Ready Theory
* **Definition:** The Greedy Strategy is a control abstraction that makes the locally optimal choice at each step with the hope that these local optimums will lead to a global optimum. It never reconsiders a choice once it is made.
* **Key Formulas:** 
  - The general structure of the Greedy algorithm can be represented as: 
    $$\text{Greedy}(a, n) = \{ \text{solution} = \emptyset; \forall i \in [1, n]: \text{solution} = \text{Union}(\text{solution}, \text{Select}(a)) \}$$
  - **Feasibility Check:** $\text{Feasible}(\text{solution}, x)$ checks if adding $x$ to the solution violates any problem constraints.
  - **Optimality Condition:** An optimal solution is a feasible solution that maximizes or minimizes a given objective function $f(x)$.
* **Core Properties:**
  - **Optimality:** Greedy algorithms do not always produce the optimal solution but aim to find a good approximation.
  - **Efficiency:** Greedy algorithms are generally efficient because they make the locally optimal choice at each step, reducing computational complexity.
  - **Determinism:** Greedy algorithms are deterministic, meaning they will always produce the same output given the same input.
* **Algorithm Structure:** 
```text
Greedy(a, n) {
  solution = Φ;
  for i = 1 to n do {
    x = Select(a);
    if Feasible(solution, x) then
      solution = Union(solution, x);
  }
  return solution;
}
```
* **Select Function:** Picks the "best" item from the candidates based on a greedy criterion (e.g., highest profit-to-weight ratio).
* **Feasible Function:** Checks if adding an item to the solution violates any constraints.
* **Union Function:** Adds an item to the final solution set.
* **Applications:** Fractional Knapsack, Kruskal's algorithm for Minimum Spanning Tree, Dijkstra's algorithm for Shortest Path.

### C. Worked Examples
### C. Worked Examples
* **Greedy Algorithm Example:**
  | Item | Weight | Profit |
  |------|--------|--------|
  | A    | 2      | 10     |
  | B    | 3      | 20     |
  | C    | 1      | 5      |
  | D    | 4      | 30     |
  1. **Input:** Set of items with weights and profits.
  2. **Select():** Choose item with highest profit-to-weight ratio.
  3. **Feasible():** Check if adding item exceeds knapsack capacity.
  4. **Union():** Add item to solution set if feasible.
* **Step-by-Step Calculation:**
  1. Sort items by profit-to-weight ratio: D (7.5), B (6.67), A (5), C (5).
  2. Initialize knapsack capacity: 10.
  3. Select item D (weight 4, profit 30), remaining capacity: 6.
  4. Select item B (weight 3, profit 20), remaining capacity: 3.
  5. Select item A (weight 2, profit 10), remaining capacity: 1.
  6. Item C (weight 1, profit 5) is feasible, add to solution set.
* **Divide and Conquer Example:**
  | Array | Size |
  |-------|------|
  | [38, 27, 43, 3] | 4    |
  1. **Divide:** Split array into two halves: [38, 27] and [43, 3].
  2. **Conquer:** Recursively divide sub-arrays until size 1.
  3. **Combine:** Merge sorted sub-arrays into final sorted array.
* **Merge Sort Example:**
  | Sub-array | Size |
  |-----------|------|
  | [38]      | 1    |
  | [27]      | 1    |
  | [43]      | 1    |
  | [3]       | 1    |
  1. Merge [38] and [27] into [27, 38].
  2. Merge [43] and [3] into [3, 43].
  3. Merge [27, 38] and [3, 43] into [3, 27, 38, 43].

### D. How to Write in Exam
* **Start With:** Define the core philosophy of the topic, clearly stating its fundamental approach and key characteristics.
* **Body:** Provide a detailed explanation of the topic, including any relevant theories, formulas, or algorithms. Use pseudo-code or diagrams to illustrate complex concepts and make sure to explain each component thoroughly.
* **Traps:** Highlight common mistakes or misconceptions related to the topic, and provide guidance on how to avoid them. Emphasize the importance of understanding the topic's limitations and potential pitfalls.
* **Close With:** Summarize the key points and provide examples of how the topic is applied in real-world scenarios or in the context of the exam. Ensure that the conclusion is concise and reinforces the main ideas presented in the body.
* **Mark Split:** Allocate marks to each section based on the exam's marking scheme, ensuring that the most critical aspects of the topic are given sufficient weightage. Typically, the mark split would be:
  + Definition and core philosophy: 2-3 marks
  + Detailed explanation and pseudo-code: 5-6 marks
  + Traps and common mistakes: 2-3 marks
  + Application and examples: 4-5 marks
  + Conclusion and summary: 1-2 marks

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** Greedy Strategy involves making the locally optimal choice at each stage with the hope that these local optimums will lead to a global optimum, while Divide and Conquer breaks down a problem into smaller sub-problems until they are simple enough to be solved directly, then merges the sub-solutions.
* **Flash Questions:**
 1. What is the primary difference between the Greedy Strategy and Divide and Conquer?
 2. How does the Greedy algorithm ensure feasibility of its solution?
 3. What are the three essential steps in the Divide and Conquer paradigm?
* **Practice Prompts:**
 1. Describe a scenario where the Greedy Strategy would be appropriate and explain why.
 2. Implement the Divide and Conquer approach to solve a simple problem like sorting a small list of numbers, detailing each step of the process.
 3. Compare and contrast the Greedy Strategy with Dynamic Programming, highlighting their differences in approach and application.

---

## 2. Part B: Core Topics
**[MODERATE]**

### A. What is this?
This refers to the fundamental concepts and core ideas that form the basis of a subject or discipline. It is essential to understand these core topics to build a strong foundation for further learning and to excel in exams like KTU. 
> **Analogy:** Understanding core topics is like building a house, where the core topics are the foundation, and the other subjects or concepts are the walls and roof. Just as a strong foundation is necessary for a stable house, a strong grasp of core topics is necessary for a deep understanding of the subject as a whole.

### B. Exam-Ready Theory
* **Formal Definitions**: A set of fundamental principles and concepts that form the basis of a subject or theory, providing a clear understanding of key terms and notions.
* **Key Formulas**: 
  + $a^2 + b^2 = c^2$ (Pythagorean theorem)
  + $E = mc^2$ (Mass-energy equivalence)
  + $\frac{d}{dx}x^n = nx^{n-1}$ (Power rule in calculus)
* **Core Properties**: 
  + Commutativity: $a + b = b + a$ and $ab = ba$
  + Associativity: $(a + b) + c = a + (b + c)$ and $(ab)c = a(bc)$
  + Distributivity: $a(b + c) = ab + ac$ and $(a + b)c = ac + bc$
* **Theorems and Principles**: 
  + Fundamental Theorem of Algebra: Every non-constant polynomial has at least one complex root.
  + Principle of Mathematical Induction: A statement is true for all positive integers if it is true for 1 and its truth for any positive integer implies its truth for the next positive integer.

### C. Worked Examples
To solve problems efficiently, let's consider a few numerical examples with step-by-step calculations.

### Example 1: Calculating Resistance
Given a wire with a length of 10 meters, a cross-sectional area of 0.01 m², and a resistivity of 1.68 × 10⁻⁸ Ωm, calculate its resistance using the formula R = ρ(L/A), where R is the resistance, ρ is the resistivity, L is the length, and A is the cross-sectional area.

| Parameter | Value        |
|-----------|--------------|
| Length (L) | 10 m         |
| Area (A)   | 0.01 m²      |
| Resistivity (ρ) | 1.68 × 10⁻⁸ Ωm |

Resistance (R) = 1.68 × 10⁻⁸ Ωm * (10 m / 0.01 m²) = 1.68 × 10⁻⁵ Ω

### Example 2: Calculating Power
A device consumes 2000 W of power when connected to a 230 V supply. Calculate the current drawn by the device using the formula P = VI, where P is the power, V is the voltage, and I is the current.

| Parameter | Value        |
|-----------|--------------|
| Power (P)  | 2000 W       |
| Voltage (V) | 230 V       |

Current (I) = Power (P) / Voltage (V) = 2000 W / 230 V ≈ 8.7 A

### Example 3: Calculating Energy
A 60 W light bulb is used for 8 hours a day. Calculate the energy consumed in a day using the formula E = Pt, where E is the energy, P is the power, and t is the time in seconds.

| Parameter | Value        |
|-----------|--------------|
| Power (P)  | 60 W         |
| Time (t)   | 8 hours = 8 * 3600 s = 28800 s |

Energy (E) = Power (P) * Time (t) = 60 W * 28800 s = 1728000 J or 1.728 MJ

These examples demonstrate how to apply formulas to solve problems in physics and engineering, which is crucial for KTU exam preparation.

### D. How to Write in Exam
To effectively write in an exam, start with a clear and concise introduction that addresses the question, providing a brief overview of the main points to be discussed. The body of the answer should be well-structured, using relevant theories, concepts, and examples to support arguments, with each point clearly explained and linked to the next. Be aware of common traps such as going off-topic, failing to address all parts of the question, and not leaving enough time to complete the exam, which can significantly impact the quality of the answer and the overall score. Close with a strong conclusion that summarizes the main points and reiterates the answer to the question, ensuring all aspects of the question have been addressed. The mark split for the exam should guide the allocation of time to each question, with more marks generally indicating a more comprehensive answer is required.

### E. Rapid Recall & Self-Test
* 1-Minute Recall: Key terms and concepts to recall within a minute include important formulas, key definitions, and critical processes related to the topic.
* Flash Questions:
  1. What is the primary difference between [concept 1] and [concept 2]?
  2. How does [process/mechanism] affect [system/outcome]?
  3. What are the main advantages of [technique/method] over [alternative technique/method]?
* Practice Prompts:
  1. Describe the steps involved in [process] and explain its significance in [context].
  2. Compare and contrast [concept 1] and [concept 2], highlighting their applications and limitations.
  3. Discuss the implications of [theory/findings] on [field/practice], providing examples to support your argument.

---

## 3. Greedy: Fractional Knapsack
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Imagine you are a thief breaking into a spice shop with a bag that holds exactly 15 kg. You see sacks of Saffron, Pepper, and Salt. Saffron is incredibly valuable per kilogram, while Salt is cheap but heavy. Because it's fractional, you can scoop out *portions* of a sack.

> **The Analogy:** The Fractional Knapsack problem is the ultimate test of "value density". You calculate the price-per-kilogram of every item, greedily load up on the most valuable dust until that sack is empty, then move to the second most valuable, and so on. If you run out of bag space on the last item, you just take a fraction of it.

### B. Exam-Ready Theory
*   **Problem Statement:** Given $n$ objects, each with a weight $W_i$ and a profit $P_i$, and a knapsack of capacity $m$. Find the fractions $X_i \in [0, 1]$ for each object such that the total weight $\sum (W_i X_i) \leq m$ and the total profit $\sum (P_i X_i)$ is maximized.
*   **Greedy Strategy:**
    1. Calculate the profit-to-weight ratio for all items: $Ratio_i = P_i / W_i$.
    2. Sort the items in **descending order** of this ratio.
    3. Iterate through the sorted items:
        * If the item fits entirely, take it ($X_i = 1$) and reduce capacity.
        * If it doesn't fit entirely, take the remaining fraction of it ($X_i = \text{Remaining Capacity} / W_i$) and terminate.
*   **Time Complexity:** $O(n \log n)$ due to the sorting step.

### C. Worked Examples
**Example: Fractional Knapsack (April 2025 University Question)**
$n=7$, Capacity $m=15$.
Profits $P = \{10, 5, 15, 7, 6, 18, 3\}$, Weights $W = \{2, 3, 5, 7, 1, 4, 1\}$.

1.  **Calculate Ratios ($P_i / W_i$):**
    *   I1: 5, I2: 1.66, I3: 3, I4: 1, I5: 6, I6: 4.5, I7: 3.
2.  **Sort Items (Descending Ratio):**
    *   I5(6), I1(5), I6(4.5), I3(3), I7(3), I2(1.66), I4(1).
3.  **Fill Knapsack:**
    *   **I5:** 1kg (Full). Profit: 6. Rem: 14.
    *   **I1:** 2kg (Full). Profit: 10. Rem: 12.
    *   **I6:** 4kg (Full). Profit: 18. Rem: 8.
    *   **I3:** 5kg (Full). Profit: 15. Rem: 3.
    *   **I7:** 1kg (Full). Profit: 3. Rem: 2.
    *   **I2:** 2/3 of 3kg. Profit: $5 \times \frac{2}{3} = 3.33$. Rem: 0.
4.  **Final Profit:** $6 + 10 + 18 + 15 + 3 + 3.33 = 55.33$.
5.  **Solution Vector:** $X = [1, 2/3, 1, 0, 1, 1, 1]$.

### D. How to Write in Exam
*   **Start With:** State the objective function (Maximize $\sum P_i X_i$) and the constraint ($\sum W_i X_i \leq m$).
*   **Body:** You **must** create a table. Do not do the calculations inline. Create columns for `Item`, `Profit`, `Weight`, `Ratio(P/W)`, and `Fraction (X)`. Show the remaining capacity after every single item is added.
*   **Traps:** A massive mistake students make is writing the final Solution Vector $X$ in the *sorted* order. You MUST write the final solution vector $X$ mapped back to the *original* item index order (e.g., $X_1, X_2, \dots, X_n$).
*   **Close With:** Clearly write "Total Maximum Profit = 55.33".

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** The Fractional Knapsack problem involves maximizing the total profit by selecting fractions of items based on their profit-to-weight ratio. The greedy strategy includes calculating the ratio for each item, sorting them in descending order, and then iteratively adding items to the knapsack until it's full. The time complexity is $O(n \log n)$ due to sorting.
* **Flash Questions:**
 1. What is the primary goal of the Fractional Knapsack problem?
 2. How do you calculate the profit-to-weight ratio for each item, and why is it crucial?
 3. What happens when an item does not fit entirely in the remaining knapsack capacity?
* **Practice Prompts:**
 1. Given $n=5$ items with profits $P = \{12, 7, 11, 9, 5\}$ and weights $W = \{4, 3, 2, 5, 1\}$, and a knapsack capacity of $10$, find the maximum total profit using the Fractional Knapsack algorithm.
 2. Suppose you have $n=3$ items with profits $P = \{15, 10, 8\}$ and weights $W = \{5, 4, 3\}$, and the knapsack capacity is $7$. Determine the fractions of each item to include to maximize the total profit.
 3. For $n=4$ items with profits $P = \{20, 12, 15, 8\}$ and weights $W = \{6, 4, 3, 2\}$, and a knapsack capacity of $9$, apply the Fractional Knapsack algorithm to find the optimal fractions of items to achieve the maximum profit.

---

## 4. Greedy: Minimum Spanning Tree (Kruskal's)
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Imagine you are building roads to connect a group of remote villages. Roads are expensive, and some terrains are harder to build on than others. Your goal is to connect all the villages using the absolute minimum amount of asphalt, ensuring every village can reach every other village, but with no redundant circular routes.

> **The Analogy:** Kruskal's algorithm is like sorting all possible road blueprints from cheapest to most expensive. You look at the cheapest blueprint. Does it connect two villages that were previously disconnected? If yes, build it. Does it create a useless loop between already-connected villages? If yes, throw the blueprint away. Repeat until all villages are linked.

### B. Exam-Ready Theory
*   **Spanning Tree:** A subgraph of an undirected connected graph $G=(V, E)$ that includes all vertices $V$ but has exactly $V-1$ edges and no cycles.
*   **Minimum Spanning Tree (MST):** A spanning tree with the minimum possible total edge weight.
*   **Kruskal's Strategy:** 
    1.  Treat every vertex as its own isolated set (forest of trees).
    2.  Sort all edges in the graph in ascending order of their weight.
    3.  Iterate through the sorted edges:
        *   If the edge connects two vertices in *different* sets (using Union-Find / Disjoint Sets), add it to the MST and Union the sets.
        *   If it connects vertices in the *same* set, adding it would form a cycle, so discard it.
    4.  Stop when $V-1$ edges have been added.
*   **Time Complexity:** $O(|E| \log |E|)$ dominated by sorting the edges using a min-heap.

### C. Worked Examples
**Example: Kruskal's MST Trace (University Question)**
Consider vertices {1..8} with edges: 
(1,6): 10, (1,2): 28, (2,3): 16, (3,4): 12, (4,5): 22, (5,6): 25, (2,7): 14, (7,4): 18, (7,5): 24.

1.  **Sorted Edges:** (1,6): 10, (3,4): 12, (2,7): 14, (2,3): 16, (7,4): 18, (4,5): 22, (7,5): 24, (5,6): 25, (1,2): 28.
2.  **Steps:**
    *   Add (1,6): Cost 10.
    *   Add (3,4): Cost 12.
    *   Add (2,7): Cost 14.
    *   Add (2,3): Cost 16. (Sets {2,7} and {3,4} merged).
    *   Edge (7,4): **Discard** (Forms cycle 7-2-3-4-7).
    *   Add (4,5): Cost 22.
    *   Edge (7,5): **Discard** (Forms cycle).
    *   Add (5,6): Cost 25.
3.  **Final MST Cost:** $10 + 12 + 14 + 16 + 22 + 25 = 99$.

### D. How to Write in Exam
*   **Start With:** Define Spanning Tree and MST. State that Kruskal's uses a Greedy Approach and requires sorting edges.
*   **Body:** For numericals, first list ALL edges sorted by weight in a column. Then, systematically write "Select Edge X -> Check Cycle -> Action (Include/Discard)". 
*   **Visuals:** You must draw the graph being built step-by-step.
*   **Close With:** Write the sum equation: "Min Cost = 99".

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** Kruskal's algorithm for Minimum Spanning Tree (MST) is a greedy approach that sorts all edges in ascending order of weight, then iterates through them, adding an edge to the MST if it connects two vertices in different sets and discarding it if it forms a cycle. The process stops when V-1 edges have been added, resulting in a spanning tree with the minimum possible total edge weight.
* **Flash Questions:**
 1. What is the primary goal of Kruskal's algorithm in the context of graph theory?
 2. How does Kruskal's algorithm determine whether to include or discard an edge during its iteration?
 3. What is the time complexity of Kruskal's algorithm, and which operation dominates this complexity?
* **Practice Prompts:**
 1. Given a graph with vertices {A, B, C, D} and edges (A,B): 5, (B,C): 3, (C,D): 7, (A,D): 9, (A,C): 2, apply Kruskal's algorithm to find the Minimum Spanning Tree and calculate its total cost.
 2. Describe how Kruskal's algorithm would handle a graph with multiple edges of the same weight, emphasizing the importance of sorting edges by weight.
 3. Consider a scenario where a graph has a large number of vertices but relatively few edges. Discuss how Kruskal's algorithm would perform in this case, focusing on its efficiency and potential optimizations.

---

## 5. Greedy: Single Source Shortest Path (Dijkstra's)
**[HIGH PROB | ↻ REPEATED PYQ]**

### A. What is this?
Imagine you are using a GPS navigation system to drive from your house to a specific restaurant. The GPS needs to find the absolute fastest route. 

> **The Analogy:** Dijkstra's Algorithm works like a wave of water expanding outward from your house. It first finds the absolute closest intersection. From that intersection, it explores the next closest roads, constantly updating its internal map if it finds a "shortcut". It "locks in" the fastest route to a location only when it is absolutely mathematically impossible to find a faster shortcut.

### B. Exam-Ready Theory
*   **Problem:** Given a weighted graph $G(V,E)$ with **non-negative** edge weights, find the shortest path from a single source vertex $S$ to all other vertices.
*   **Algorithm Strategy (Relaxation):**
    1.  Initialize `dist[] = ∞`, `dist[S] = 0`.
    2.  Maintain set $Q$ of unvisited nodes.
    3.  While $Q$ is not empty:
        *   Extract $u$ with min `dist`.
        *   For each neighbor $v$ of $u$:
            *   `alt = dist[u] + weight(u, v)`.
            *   If `alt < dist[v]`, update `dist[v] = alt`.
*   **Time Complexity:** $O(V^2)$ with array, $O(E \log V)$ with min-heap.

### C. Worked Examples
**Example: Dijkstra's Trace (University Question)**
Source: S. Nodes: A, B, C, D, E, F, G, T.
1.  **Iteration 1:** Extract S. dist(S)=0. Neighbors: A(4), B(3).
2.  **Iteration 2:** Extract B. dist(B)=3. Neighbor: D. $dist(D) = 3 + 4 = 7$.
3.  **Iteration 3:** Extract A. dist(A)=4. Neighbor: C. $dist(C) = 4 + 1 = 5$.
4.  **Iteration 4:** Extract C. dist(C)=5. Neighbor: E. $dist(E) = 5 + 1 = 6$.
5.  **Iteration 5:** Extract E. dist(E)=6. Neighbor: G(8), T. $dist(T) = 6 + 4 = 10$.
6.  **Iteration 6:** Extract D. dist(D)=7. Neighbor: E(8), T(10), F. $dist(F) = 7 + 5 = 12$.
7.  **Final Path to T:** $S \to B \to D \to T$ (cost 10).

### D. How to Write in Exam
*   **Start With:** Define the problem space (Single Source, Non-negative weights).
*   **Body:** The university expects a standard routing table. Create a table where rows are Iterations, and columns are Vertices. Fill in the shortest known distance to every vertex at each step. Bold or circle the value when a vertex is extracted.
*   **Traps:** Dijkstra's algorithm **fails with negative edge weights**.
*   **Close With:** Clearly write the final shortest path costs.

### E. Rapid Recall & Self-Test
**1-Minute Recall:** Dijkstra's algorithm is used to find the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights. It works by maintaining a set of unvisited nodes and iteratively extracting the node with the minimum distance, updating the distances of its neighbors. The time complexity is O(V^2) with an array and O(E log V) with a min-heap.

**Flash Questions:**
1. What is the primary condition for Dijkstra's algorithm to work correctly?
2. How does Dijkstra's algorithm handle negative edge weights?
3. What data structure can be used to improve the time complexity of Dijkstra's algorithm?

**Practice Prompts:**
1. Given a weighted graph with vertices A, B, C, D, and E, and edges (A, B) with weight 2, (A, C) with weight 3, (B, D) with weight 1, (C, D) with weight 2, and (D, E) with weight 4, find the shortest path from vertex A to all other vertices using Dijkstra's algorithm.
2. Explain why Dijkstra's algorithm fails with negative edge weights and provide an example to illustrate this.
3. Compare the time complexity of Dijkstra's algorithm using an array and a min-heap, and explain the trade-offs between the two implementations.

---

## 6. Divide and Conquer: Merge Sort
**[HIGH PROB | ↻ REPEATED PYQ]**

### A. What is this?
Imagine someone drops a deck of 52 mixed cards on your desk and says "sort these." Instead of frantically scanning the whole pile, you split the deck exactly in half (26 and 26). You tell your brain, "I'll sort these two smaller piles later." You split them again (13 and 13), and again, until you have 52 piles of exactly 1 card. A 1-card pile is inherently sorted. 

> **The Analogy:** Now the "Conquer" phase begins. You take two 1-card piles, look at both, and stack them in order. Now you have a sorted 2-card pile. You take another sorted 2-card pile, compare the top cards, and zip them together like a zipper into a sorted 4-card pile. You zip these piles upward until the whole deck is sorted. This is 2-Way Merge Sort.

### B. Exam-Ready Theory
*   **Algorithm Strategy:**
    1.  **Divide:** Find the midpoint `mid = (low + high) / 2`.
    2.  **Conquer:** Recursively call `MergeSort(low, mid)` and `MergeSort(mid+1, high)`.
    3.  **Combine:** Call `Merge(low, mid, high)` to weave the two sorted halves into a single temporary array, then copy it back.
*   **Recurrence Relation:**
    *   Dividing takes $O(1)$.
    *   Recursively sorting two halves takes $2T(n/2)$.
    *   Merging two arrays of size $n/2$ takes $O(n)$ comparisons.
    *   Equation: $T(n) = 2T(n/2) + cn$
*   **Time Complexity:** Solving the recurrence (via Master's Theorem or Recursion Tree) yields exactly **$O(n \log n)$** in the Best, Average, and Worst cases.

### C. Worked Examples
**Trace: [38, 27, 43, 3, 9, 82, 10, 15]**

1.  **Divide Phase:**
    *   L1: [38, 27, 43, 3] | [9, 82, 10, 15]
    *   L2: [38, 27] [43, 3] | [9, 82] [10, 15]
    *   L3: [38] [27] [43] [3] | [9] [82] [10] [15]
2.  **Merge Phase:**
    *   Merge [38],[27] $\to$ [27, 38]
    *   Merge [43],[3] $\to$ [3, 43]
    *   Merge [27,38],[3,43] $\to$ [3, 27, 38, 43]
    *   Merge [9],[82] $\to$ [9, 82]
    *   Merge [10],[15] $\to$ [10, 15]
    *   Merge [9,82],[10,15] $\to$ [9, 10, 15, 82]
3.  **Final Merge:**
    *   Merge [3, 27, 38, 43] and [9, 10, 15, 82]
    *   Compare 3 and 9 $\to$ [3]
    *   Compare 27 and 9 $\to$ [3, 9]
    *   Compare 27 and 10 $\to$ [3, 9, 10]
    *   Compare 27 and 15 $\to$ [3, 9, 10, 15]
    *   Compare 27 and 82 $\to$ [3, 9, 10, 15, 27]
    *   Continue...
    *   **Sorted Array:** [3, 9, 10, 15, 27, 38, 43, 82].

### D. How to Write in Exam
*   **Start With:** Write the `MergeSort(low, high)` and `Merge(low, mid, high)` algorithms clearly.
*   **Body:** If asked to illustrate, you MUST draw the recursion tree. Draw downward arrows showing the array splitting into individual boxes. Then draw upward merging arrows showing the sorted arrays combining. 
*   **Traps:** The complexity of Merge Sort is $O(n \log n)$ in *all* cases. Unlike QuickSort (which degrades to $O(n^2)$), Merge Sort's exact halving guarantees mathematical consistency. Mention this property.
*   **Close With:** Derive the time complexity by setting up the recurrence $T(n) = 2T(n/2) + cn$ and explicitly solving it to prove $O(n \log n)$.

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** Merge Sort is a divide-and-conquer algorithm that splits an array into two halves, recursively sorts them, and merges the sorted halves. It has a time complexity of $O(n \log n)$ in all cases, which can be derived from the recurrence relation $T(n) = 2T(n/2) + cn$.
* **Flash Questions:**
 1. What is the basic strategy of the Merge Sort algorithm?
 2. How does the Merge Sort algorithm achieve a time complexity of $O(n \log n)$?
 3. What is the key difference between Merge Sort and QuickSort in terms of time complexity?
* **Practice Prompts:**
 1. Trace the Merge Sort algorithm for the array `[5, 2, 8, 1, 9]` and show the recursion tree.
 2. Prove that the time complexity of Merge Sort is $O(n \log n)$ by solving the recurrence relation $T(n) = 2T(n/2) + cn$.
 3. Compare and contrast the time complexities of Merge Sort and QuickSort, and explain why Merge Sort is more consistent in its performance.
