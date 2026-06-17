---
subject: AAD
module: '5'
title: Algorithm Analysis & Design (CST306) - Module 5 Study Guide
order: 5
---

# Module 5: Algorithm Analysis & Design (CST306) - Module 5 Study Guide

## 1. Part A: High Frequency Definitions (Module 5 Focus)
**[MODERATE]**

### A. What is this?
### Topic: Define P, NP, NP-Hard, NP-Complete
**[SURE SHOT | ↻ REPEATED PYQ]**

#### Section A: What is this? (The Concept)
Imagine you are trying to solve a giant Sudoku puzzle. If I ask you to *solve* it from scratch, it might take you hours. But if I hand you a completely filled-out Sudoku board and ask, "Is this correct?", you can verify it in two minutes just by scanning the rows and columns.

> **The Analogy:** P vs NP is the difference between "Solving" and "Verifying". Class P contains problems that are easy to *solve*. Class NP contains problems that might be incredibly hard to solve, but if someone hands you a magic answer, it is easy to *verify*. NP-Complete problems are the absolute hardest problems in that "easy to verify" category.

#### Section B: Exam-Ready Theory (The Rigor)
*   **Class P (Polynomial Time):** The set of decision problems that can be *solved* by a deterministic algorithm in polynomial time $O(n^k)$. (e.g., Shortest Path, Merge Sort).
*   **Class NP (Non-Deterministic Polynomial Time):** The set of decision problems that can be *verified* by a deterministic algorithm in polynomial time. If you are given a "certificate" (a proposed solution), you can check if it is correct in $O(n^k)$ time.
*   **Class NP-Hard:** A problem $X$ is NP-Hard if *every* problem $Y$ in NP can be reduced to $X$ in polynomial time ($Y \leq_p X$). It means $X$ is at least as hard as the hardest problems in NP. (Note: $X$ itself does not have to be in NP).
*   **Class NP-Complete:** A problem is NP-Complete if it satisfies two conditions:
    1.  It is in NP.
    2.  It is NP-Hard.
    (e.g., TSP, Clique, Vertex Cover, 3-CNF-SAT).

#### Section C: Step-by-Step Worked Example (The Application)
**(Theoretical Trace: Hamiltonian Path)**
*   **Problem:** Does there exist a path in graph $G$ that visits every vertex exactly once?
*   **Why is it in NP?** If I claim the path is $v_1 \to v_3 \to v_2 \to v_4$, you can verify it in polynomial time by simply checking two things: 1) Are all vertices present exactly once? 2) Is there an actual edge between each adjacent vertex in the sequence? Both checks take $O(n)$ time. Hence, it is in NP.

#### Section D: How to Write This in the Exam (The Strategy)
*   **Start With:** Define P as "solvable in polynomial time" and NP as "verifiable in polynomial time."
*   **Body:** Draw the standard Venn Diagram showing P inside NP, and NP-Complete at the intersection of NP and NP-Hard.
*   **Traps:** A very common mistake is saying NP stands for "Not Polynomial". It stands for **Non-Deterministic Polynomial**. State this explicitly.
*   **Close With:** Provide one standard example for each class.

---

### Topic: Compare Las Vegas and Monte Carlo Algorithms
**[HIGH PROB | ↻ REPEATED PYQ]**

#### Section A: What is this? (The Concept)
Imagine you have a deck of cards and need to find the Ace of Spades.
*   **Strategy A:** You draw a card randomly. If it's not the Ace, you put it back, shuffle, and draw again until you find it. You will *definitely* find it eventually, but it might take 1 minute, or it might take 5 hours.
*   **Strategy B:** You draw 10 random cards. If the Ace is there, great! If not, you just give up and say "I didn't find it." You only spent exactly 10 seconds looking, but you might be wrong.

> **The Analogy:** Strategy A is a **Las Vegas** algorithm: The answer is always a guaranteed jackpot (correct), but you gamble with your time. Strategy B is a **Monte Carlo** algorithm: You strictly control your time, but you gamble with the accuracy of the answer.

#### Section B: Exam-Ready Theory (The Rigor)

| Feature | Las Vegas Algorithms | Monte Carlo Algorithms |
| :--- | :--- | :--- |
| **Output Correctness** | Always produces the correct and optimal output (Probability of correctness = 1). | May produce incorrect output with some probability of failure. |
| **Running Time** | The running time is a random variable and is NOT bounded. | Runs for a fixed, deterministic number of steps (Time is bounded). |
| **Trade-off** | Gambles with computing resources (Time/Space). | Gambles with the accuracy of the result. |
| **Examples** | Randomized Quick Sort. | Miller-Rabin Primality Test, checking for a majority element. |

#### Section D: How to Write This in the Exam (The Strategy)
*   **Start With:** Create a clear comparison table.
*   **Body:** Write down the two definitions clearly. Mention the probabilities (Las Vegas success = 1, Monte Carlo success < 1).
*   **Close With:** Give one example for each to secure full marks.

### B. Exam-Ready Theory
* **Class P (Polynomial Time):** The set of decision problems that can be *solved* by a deterministic algorithm in polynomial time $O(n^k)$. 
* **Class NP (Non-Deterministic Polynomial Time):** The set of decision problems that can be *verified* by a deterministic algorithm in polynomial time. 
* **Class NP-Hard:** A problem $X$ is NP-Hard if *every* problem $Y$ in NP can be reduced to $X$ in polynomial time ($Y \leq_p X$). 
* **Class NP-Complete:** A problem is NP-Complete if it satisfies two conditions: 
  1. It is in NP. 
  2. It is NP-Hard. 
Key formulas include:
- $O(n^k)$ for polynomial time complexity
- $Y \leq_p X$ for polynomial time reduction
Core properties:
- P problems are easy to solve
- NP problems are easy to verify
- NP-Hard problems are at least as hard as the hardest NP problems
- NP-Complete problems are both in NP and NP-Hard
For Las Vegas and Monte Carlo algorithms:
* **Las Vegas Algorithms:** Always produce the correct output, but have unbounded running time, exemplified by randomized Quick Sort.
* **Monte Carlo Algorithms:** Have bounded running time, but may produce incorrect output with some probability of failure, exemplified by the Miller-Rabin Primality Test. 
Key formulas and properties for these algorithms include:
- Probability of correctness = 1 for Las Vegas algorithms
- Probability of correctness < 1 for Monte Carlo algorithms
- $P(\text{correct}) = 1$ for Las Vegas
- $P(\text{correct}) < 1$ for Monte Carlo
Understanding these concepts and formulas is crucial for KTU exam preparation, as they form the foundation of computational complexity theory and probabilistic algorithms.

### C. Worked Examples
### C. Worked Examples
#### Theoretical Trace: Hamiltonian Path
* **Problem:** Does there exist a path in graph $G$ that visits every vertex exactly once?
* **Why is it in NP?** If I claim the path is $v_1 \to v_3 \to v_2 \to v_4$, you can verify it in polynomial time by simply checking two things: 
  1) Are all vertices present exactly once? 
  2) Is there an actual edge between each adjacent vertex in the sequence? 
Both checks take $O(n)$ time. Hence, it is in NP.

| Problem | Class | Explanation |
| :--- | :--- | :--- |
| Hamiltonian Path | NP | Can be verified in polynomial time |
| Shortest Path | P | Can be solved in polynomial time |
| TSP | NP-Complete | Is in NP and NP-Hard |

#### Numerical Example
Consider a graph with 4 vertices. 
To verify a Hamiltonian path $v_1 \to v_2 \to v_3 \to v_4$, we check:
- All vertices are present exactly once: True
- Edges exist between consecutive vertices: True (assuming the graph has these edges)

This verification takes $O(n)$ time, where $n$ is the number of vertices, making Hamiltonian Path a problem in NP.

#### Step-by-Step Calculation
1. Define the problem: Find a path visiting each vertex exactly once.
2. Claim a solution: $v_1 \to v_2 \to v_3 \to v_4$
3. Verify the solution:
   - Check if all vertices are present exactly once.
   - Check if there are edges between $v_1$ and $v_2$, $v_2$ and $v_3$, $v_3$ and $v_4$.
4. Conclusion: If both checks pass, the path is a Hamiltonian path.

#### Example Use Case: Las Vegas vs Monte Carlo
Consider finding the shortest path in a graph using:
- **Las Vegas Algorithm (e.g., Randomized Quick Sort):** Always finds the correct shortest path but may take variable time.
- **Monte Carlo Algorithm (e.g., Miller-Rabin Primality Test):** May not always find the shortest path but takes a fixed amount of time.

| Algorithm Type | Output Correctness | Running Time |
| :--- | :--- | :--- |
| Las Vegas | Always Correct | Variable |
| Monte Carlo | May be Incorrect | Fixed |

This comparison highlights the trade-off between the two types of algorithms.

### D. How to Write in Exam
* **Start With:** Begin by defining the key terms and concepts, such as P, NP, NP-Hard, and NP-Complete, to establish a clear understanding of the topic.
* **Body:** The main body of the answer should include a detailed explanation of each concept, including examples and diagrams to illustrate the relationships between them. A Venn diagram showing the relationships between P, NP, NP-Hard, and NP-Complete is essential.
* **Traps:** Be cautious of common mistakes, such as confusing NP with "Not Polynomial" instead of "Non-Deterministic Polynomial". Clearly state the correct definitions to avoid losing marks.
* **Close With:** Conclude the answer by providing a summary of the key points, including examples of problems that belong to each class, such as shortest path for P, Hamiltonian path for NP, and traveling salesman problem for NP-Complete. Ensure that the answer is concise, clear, and well-structured to secure full marks.
* **Mark Split:** Typically, the mark split for this type of question would be:
  + Definition and explanation of key terms (20-30%)
  + Venn diagram and relationships between concepts (20-30%)
  + Examples and illustrations (20-30%)
  + Clarity, concision, and overall structure of the answer (30-40%)

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** Class P problems are easy to solve, Class NP problems are easy to verify, NP-Hard problems are at least as hard as NP problems, and NP-Complete problems are both in NP and NP-Hard.
* **Flash Questions:**
 1. What is the key difference between Class P and Class NP problems?
 2. Can you give an example of an NP-Complete problem?
 3. How does a Las Vegas algorithm differ from a Monte Carlo algorithm in terms of output correctness and running time?
* **Practice Prompts:**
 1. Describe a scenario where a Las Vegas algorithm would be preferred over a Monte Carlo algorithm, and explain why.
 2. Prove that the Hamiltonian Path problem is in NP by describing a polynomial-time verification algorithm.
 3. Compare and contrast the trade-offs made by Las Vegas and Monte Carlo algorithms, providing examples of each.

---

## 2. Part B: Core Topics
**[MODERATE]**

### A. What is this?
This refers to the fundamental concepts and core ideas that form the basis of a subject or discipline. It is the essential knowledge and principles that are widely accepted and used as the foundation for further learning and development. 
> **Analogy:** Understanding the core topics is like building a house, where the core topics are the foundation, and the other subjects or disciplines are the walls and roof that are constructed on top of this foundation. Just as a strong foundation is necessary for a stable and durable house, a strong grasp of the core topics is necessary for a deep and lasting understanding of the subject.

### B. Exam-Ready Theory
* **Formal Definitions**: A set of fundamental principles and concepts that form the basis of a subject or theory, providing a clear understanding of key terms and notions.
* **Key Formulas**: 
  + $a^2 + b^2 = c^2$ (Pythagorean theorem)
  + $E = mc^2$ (Mass-energy equivalence)
  + $\frac{d}{dx} x^n = nx^{n-1}$ (Power rule for differentiation)
* **Core Properties**: 
  + Commutativity: $a + b = b + a$ and $ab = ba$
  + Associativity: $(a + b) + c = a + (b + c)$ and $(ab)c = a(bc)$
  + Distributivity: $a(b + c) = ab + ac$ and $(a + b)c = ac + bc$
* **Theorems and Principles**: 
  + Fundamental Theorem of Algebra: Every non-constant polynomial has at least one complex root.
  + Principle of Mathematical Induction: A statement is true for all positive integers if it is true for 1 and its truth for any positive integer implies its truth for the next integer.

### C. Worked Examples
### C. Worked Examples
To illustrate key concepts, let's consider a few numerical examples with step-by-step calculations.

#### Example 1: Calculating Resistance
Given a wire with a length of 10 meters, a cross-sectional area of 0.01 m², and a resistivity of 1.68 × 10⁻⁸ Ωm, calculate its resistance using the formula R = ρ(L/A), where R is the resistance, ρ is the resistivity, L is the length, and A is the cross-sectional area.

| Parameter | Value |
| --- | --- |
| Length (L) | 10 m |
| Cross-sectional Area (A) | 0.01 m² |
| Resistivity (ρ) | 1.68 × 10⁻⁸ Ωm |

Step 1: Plug the values into the formula R = ρ(L/A)  
R = (1.68 × 10⁻⁸ Ωm) * (10 m) / (0.01 m²)  
R = 1.68 × 10⁻⁶ Ω

#### Example 2: Calculating Power
A device consumes 240 volts at a current of 5 amps. Calculate the power consumed using the formula P = VI, where P is the power, V is the voltage, and I is the current.

| Parameter | Value |
| --- | --- |
| Voltage (V) | 240 V |
| Current (I) | 5 A |

Step 1: Use the formula P = VI  
P = 240 V * 5 A  
P = 1200 W

#### Example 3: Series Circuit Analysis
In a series circuit with two resistors, R1 = 10 Ω and R2 = 20 Ω, and a voltage source of 12 V, calculate the total resistance, current, and voltage drop across each resistor.

| Component | Value |
| --- | --- |
| Resistor 1 (R1) | 10 Ω |
| Resistor 2 (R2) | 20 Ω |
| Voltage Source (V) | 12 V |

Step 1: Calculate total resistance (R_total = R1 + R2)  
R_total = 10 Ω + 20 Ω = 30 Ω  

Step 2: Calculate the current (I = V/R_total)  
I = 12 V / 30 Ω = 0.4 A  

Step 3: Calculate voltage drop across R1 (V1 = I*R1) and R2 (V2 = I*R2)  
V1 = 0.4 A * 10 Ω = 4 V  
V2 = 0.4 A * 20 Ω = 8 V  

These examples demonstrate how to apply fundamental principles to solve problems in electrical engineering, crucial for KTU exam preparation.

### D. How to Write in Exam
To effectively write in an exam, start with a clear and concise introduction that addresses the question, providing a brief overview of the key points to be discussed. The body of the answer should be well-structured, using relevant theories, concepts, and examples to support arguments. It is essential to allocate time wisely, ensuring each question is answered within the allotted time frame. 
Common traps to avoid include not reading the question carefully, failing to manage time effectively, and providing irrelevant information. 
Close with a summary of the main points, reiterating the importance of the topic and its relevance to the subject matter. 
The mark split for the exam should be considered when allocating time to each question, ensuring that the most heavily weighted questions are answered thoroughly and accurately.

### E. Rapid Recall & Self-Test
* 1-Minute Recall: Key terms and concepts to recall within a minute include major concepts, key definitions, and key equations or formulas.
* Flash Questions:
  1. What is the primary difference between a key concept and another related concept?
  2. How does a specific theory or principle apply to real-world scenarios?
  3. What are the main advantages and disadvantages of a particular methodology or approach?
* Practice Prompts:
  1. Describe a scenario where a specific concept or principle is applied, and explain the outcome or results.
  2. Compare and contrast two related concepts or theories, highlighting their similarities and differences.
  3. Given a case study or problem, apply relevant concepts or principles to propose a solution or recommendation.

---

## 3. Randomized Algorithms: Quick Sort
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Imagine sorting a line of students by height. In standard Quick Sort, you always pick the first student as the "pivot" to divide the line. But what if the teacher arranged them from tallest to shortest as a prank? Your standard method would perform terribly, comparing everyone one-by-one.

> **The Analogy:** Randomized Quick Sort beats the prankster. Instead of always picking the first student, you close your eyes, spin around, and pick a random student as the pivot. Because you choose randomly, the worst-case scenario (a perfectly bad pivot every single time) becomes astronomically improbable.

### B. Exam-Ready Theory
*   **Deterministic Quick Sort Issue:** If the input array is already sorted or reverse-sorted, picking the first element as the pivot results in unbalanced partitions ($0$ and $n-1$ elements). This degrades the time complexity to $O(n^2)$.
*   **Randomized Quick Sort Algorithm:**
    ```text
    Algorithm randQuickSort(A[], low, high) {
        if low >= high, then EXIT
        While pivot 'x' is not a Central Pivot:
            1. Choose uniformly at random an element 'x' from A[low..high].
            2. Count elements smaller than 'x' (sc) and greater than 'x' (gc).
            3. If sc >= n/4 and gc >= n/4, then 'x' is a central pivot. Break loop.
        Partition A[low..high] using 'x'. Let index of 'x' be pos.
        randQuickSort(A, low, pos-1)
        randQuickSort(A, pos+1, high)
    }
    ```

### C. Worked Examples
**Example: Expected Running Time Analysis (University Question)**
Prove that the expected running time of Randomized Quicksort is $O(n \log n)$.

1.  **Define Indicator Variables:** Let $X$ be the number of comparisons. $X = \sum_{i=1}^{n-1} \sum_{j=i+1}^{n} X_{ij}$, where $X_{ij}$ is 1 if elements $z_i$ and $z_j$ are compared, and 0 otherwise.
2.  **Probability of Comparison:** Elements $z_i$ and $z_j$ are compared only if one of them is chosen as a pivot before any other element in the range $\{z_i, \dots, z_j\}$.
    *   Number of elements in range $= j - i + 1$.
    *   $P(X_{ij} = 1) = \frac{2}{j - i + 1}$.
3.  **Expectation:** $E[X] = E[\sum \sum X_{ij}] = \sum \sum P(X_{ij} = 1)$.
    *   $E[X] = \sum_{i=1}^{n-1} \sum_{j=i+1}^{n} \frac{2}{j - i + 1}$.
4.  **Simplify the Sum:** Let $k = j - i$.
    *   $E[X] = \sum_{i=1}^{n-1} \sum_{k=1}^{n-i} \frac{2}{k+1} < \sum_{i=1}^{n} \sum_{k=1}^{n} \frac{2}{k}$.
5.  **Harmonic Series:** The inner sum is the Harmonic Series $H_n \approx \ln n$.
    *   $E[X] \approx \sum_{i=1}^{n} 2 \ln n = 2n \ln n$.
6.  **Final Result:** $E[X] = O(n \log n)$.

### D. How to Write in Exam
*   **Start With:** Explain the difference between Deterministic and Randomized complexity.
*   **Body:** Write the algorithm explicitly.
*   **Traps:** The analysis proof is where marks are won. You must use the indicator variable $X_{ij}$ and the probability $2/(j-i+1)$.
*   **Close With:** State clearly that this is a **Las Vegas** randomized algorithm.

### E. Rapid Recall & Self-Test
* 1-Minute Recall: Randomized Quick Sort is an algorithm that selects a random pivot to avoid worst-case scenarios, resulting in an expected time complexity of $O(n \log n)$. It works by choosing a random element as the pivot, partitioning the array, and recursively sorting the subarrays. The key to its efficiency is the randomized selection of the pivot, which makes the worst-case scenario highly improbable.
* Flash Questions:
 1. What is the main difference between Deterministic Quick Sort and Randomized Quick Sort?
 2. How does Randomized Quick Sort achieve an expected time complexity of $O(n \log n)$?
 3. What type of randomized algorithm is Randomized Quick Sort classified as?
* Practice Prompts:
 1. Prove that the expected running time of Randomized Quicksort is $O(n \log n)$ using indicator variables and probability.
 2. Compare and contrast Deterministic Quick Sort and Randomized Quick Sort in terms of their time complexities and pivot selection methods.
 3. Explain how Randomized Quick Sort can be used to sort an array of integers, including the steps involved in the algorithm and the benefits of using a random pivot.

---

## 4. Approximation Algorithms: Bin Packing
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Imagine you are moving to a new house and have a pile of assorted heavy items. You have moving boxes that can hold exactly 10kg each. You want to use the absolute minimum number of boxes. Finding the mathematically perfect packing combination takes thousands of years for a large house (it is NP-Hard).

> **The Analogy:** Instead of freezing in calculation paralysis, you use a "good enough" strategy. **Next Fit**: Put items in the current box until it's full, then tape it shut and start a new one. **First Fit**: Leave boxes open; if an item fits in *any* previous box, put it there. **First Fit Decreasing**: Sort the items from heaviest to lightest first, then do First Fit. This guarantees a near-optimal packing in seconds.

### B. Exam-Ready Theory
*   **Definition:** Approximation algorithms return near-optimal solutions in polynomial time for NP-Complete optimization problems.
*   **Bin Packing Problem:** Given $n$ items of sizes $S_1, S_2, \dots, S_n$ and bins of capacity $C$, assign items to bins to minimize the number of used bins.
*   **Lower Bound:** Minimum bins $\geq \lceil \text{Total Weight} / \text{Bin Capacity} \rceil$.
*   **Approximation Ratio:**
    *   **First Fit (FF):** $FF(I) \leq \frac{17}{10} OPT(I) + 2$.
    *   **First Fit Decreasing (FFD):** $FFD(I) \leq \frac{11}{9} OPT(I) + \frac{6}{9}$.

### C. Worked Examples
**Example: First Fit Decreasing Trace (University Question)**
Bin Capacity = 10. Items = $\{5, 7, 5, 2, 4, 2, 5, 1, 6\}$.
1.  **Sort items:** $\{7, 6, 5, 5, 5, 4, 2, 2, 1\}$.
2.  **Packing:**
    *   Item 7: **Bin 1** (Rem: 3).
    *   Item 6: **Bin 2** (Rem: 4).
    *   Item 5: **Bin 3** (Rem: 5).
    *   Item 5: **Bin 3** (Fits exactly! Rem: 0).
    *   Item 5: **Bin 4** (Rem: 5).
    *   Item 4: **Bin 2** (Fits exactly! Rem: 0).
    *   Item 2: **Bin 1** (Fits! Rem: 1).
    *   Item 2: **Bin 4** (Fits! Rem: 3).
    *   Item 1: **Bin 1** (Fits exactly! Rem: 0).
3.  **Result:** 4 bins used. Optimal bins = $\lceil 37/10 \rceil = 4$.

### D. How to Write in Exam
*   **Start With:** Calculate and state the Lower Bound immediately using the ceiling formula.
*   **Body:** For numericals, draw actual boxes (rectangles) on your paper. Write the numbers inside them as you process the list. Do not try to hold the remaining capacities in your head.
*   **Traps:** Pay close attention to whether the question asks for First Fit or First Fit **Decreasing**. If it says Decreasing, you lose all marks if you forget to sort the array first.
*   **Close With:** State the final number of bins used and compare it to the theoretical lower bound.

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** Approximation algorithms for bin packing include Next Fit, First Fit, and First Fit Decreasing. First Fit Decreasing guarantees a near-optimal solution by sorting items from heaviest to lightest before packing. The approximation ratio for First Fit is $FF(I) \leq \frac{17}{10} OPT(I) + 2$, and for First Fit Decreasing, it's $FFD(I) \leq \frac{11}{9} OPT(I) + \frac{6}{9}$.
* **Flash Questions:**
 1. What is the primary advantage of using approximation algorithms like First Fit Decreasing for the bin packing problem?
 2. How does the First Fit Decreasing algorithm improve upon the basic First Fit algorithm?
 3. What is the significance of calculating the lower bound in bin packing problems, and how is it calculated?
* **Practice Prompts:**
 1. Given a set of items with sizes 3, 5, 2, 7, 1, and bin capacity of 8, apply the First Fit Decreasing algorithm to determine the minimum number of bins required.
 2. For a bin packing problem with items of sizes 4, 6, 3, 2, 5, and a bin capacity of 10, calculate the lower bound and then apply the First Fit algorithm to pack the items, comparing the result with the lower bound.
 3. Compare the performance of First Fit and First Fit Decreasing algorithms on a set of items with sizes 8, 4, 6, 2, 3, given a bin capacity of 12, discussing the implications of the approximation ratios.

---

## 5. NP Completeness Proofs (Clique)
**[HIGH PROB | ↻ REPEATED PYQ]**

### A. What is this?
Imagine a high school cafeteria. A "Clique" is a group of students where *every single person* in the group is friends with *every other person* in the group. Finding if a clique of size 50 exists in a school of 1000 is incredibly hard.

> **The Analogy:** To prove that the Clique problem is mathematically one of the hardest problems in the universe (NP-Complete), we use a "Reduction". We take another notoriously impossible problem (like satisfying a massive logical boolean formula, 3-CNF-SAT), and we prove that we can disguise it as a Clique problem. If we can map the boolean formula to a graph of friendships, then solving the Clique problem automatically solves the boolean formula.

### B. Exam-Ready Theory
**Steps to prove a problem $X$ is NP-Complete:**
1.  Prove $X \in NP$ (Write a polynomial time verifier).
2.  Prove $X \in NP-Hard$ (Reduce a known NP-Complete problem $Y$ to $X$ in polynomial time: $Y \leq_p X$).

**Proof: CLIQUE is NP-Complete**

**Step 1: Prove CLIQUE is in NP**
*   **Certificate:** A set $V'$ of $k$ vertices.
*   **Verifier:** 
    1. Check if $|V'| = k$.
    2. For every pair of vertices $u, v \in V'$, check if the edge $(u, v)$ exists in the graph $G$.
*   Since checking edges takes $O(k^2)$ time (polynomial), CLIQUE is in NP.

**Step 2: Prove CLIQUE is NP-Hard (Reduction from 3-CNF-SAT)**
*   Let $\Phi = C_1 \land C_2 \dots \land C_k$ be a boolean formula in 3-CNF with $k$ clauses. Each clause has 3 literals: $(l_1 \lor l_2 \lor l_3)$.
*   **Construct Graph $G$:**
    1.  For each clause, create a "triple" of vertices in $G$ corresponding to its 3 literals.
    2.  Connect vertex $v_{i}$ to vertex $v_{j}$ with an edge IF AND ONLY IF:
        *   They belong to *different* clauses (different triples).
        *   They are *not* logical negations of each other (e.g., do not connect $x$ and $\neg x$).
*   **Equivalence:** The boolean formula $\Phi$ is satisfiable IF AND ONLY IF the constructed graph $G$ has a CLIQUE of size exactly $k$. (Picking one true literal per clause forms a fully connected $k$-clique).
*   Since constructing this graph takes polynomial time, 3-CNF-SAT $\leq_p$ CLIQUE.

### C. Worked Examples
**Example: Constructing graph for $\Phi = (x_1 \lor \neg x_2) \land (\neg x_1 \lor x_3)$**
1.  **Clause 1:** Vertices $\{v_{1,1}, v_{1,2}\}$ for $\{x_1, \neg x_2\}$.
2.  **Clause 2:** Vertices $\{v_{2,1}, v_{2,2}\}$ for $\{\neg x_1, x_3\}$.
3.  **Edges:** 
    *   Connect $v_{1,1}(x_1)$ to $v_{2,2}(x_3)$. (Different clauses, no negation).
    *   Do NOT connect $v_{1,1}(x_1)$ to $v_{2,1}(\neg x_1)$. (Negation!).
    *   Connect $v_{1,2}(\neg x_2)$ to $v_{2,1}(\neg x_1)$. (No negation).
    *   Connect $v_{1,2}(\neg x_2)$ to $v_{2,2}(x_3)$. (No negation).

### D. How to Write in Exam
*   **Start With:** Explicitly write the two required steps: "1. Prove it is in NP. 2. Prove it is NP-Hard via reduction."
*   **Body:** For Step 1, write the verifier algorithm. For Step 2, clearly state you are reducing from **3-CNF-SAT**. List the two critical rules for drawing edges in the graph construction.
*   **Visuals:** Draw a small example. Write $\Phi = (x_1 \lor \neg x_2 \lor x_3) \land (\neg x_1 \lor x_2 \lor x_3)$. Draw the 6 nodes grouped into two columns, and draw the valid connecting edges between the columns.
*   **Close With:** "Since CLIQUE is in NP and NP-Hard, it is NP-Complete."

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** NP-Completeness of CLIQUE involves two steps: proving CLIQUE is in NP by showing a polynomial time verifier, and proving CLIQUE is NP-Hard by reducing 3-CNF-SAT to CLIQUE in polynomial time. The verifier checks for a clique of size k in polynomial time. The reduction constructs a graph where each clause in 3-CNF-SAT is represented by a set of vertices, and edges are drawn between vertices of different clauses if they do not represent negations of each other.
* **Flash Questions:**
 1. What are the two main steps to prove a problem is NP-Complete?
 2. How does the verifier for CLIQUE work?
 3. What is the key idea behind reducing 3-CNF-SAT to CLIQUE?
* **Practice Prompts:**
 1. Describe how to construct a graph for a given 3-CNF-SAT formula to prove CLIQUE is NP-Hard.
 2. Prove that CLIQUE is in NP by detailing a polynomial time verifier algorithm.
 3. Given a boolean formula $\Phi = (x_1 \lor x_2 \lor \neg x_3) \land (\neg x_1 \lor \neg x_2 \lor x_3)$, construct the corresponding graph as per the reduction from 3-CNF-SAT to CLIQUE and identify a clique if it exists.

---

## 6. NP Completeness Proofs (Vertex Cover)
**[HIGH PROB | ↻ REPEATED PYQ]**

### A. What is this?
Imagine you are a security guard at a museum with several hallways. Hallways connect different rooms. You want to place guards in the rooms so that *every single hallway* is watched by at least one guard. 

> **The Analogy:** Vertex Cover is the "Minimum Security Guard" problem. A "Vertex Cover" is a set of rooms (vertices) such that every hallway (edge) has at least one of its endpoints in that set. Finding the absolute smallest number of guards needed is an NP-Hard problem.

### B. Exam-Ready Theory
**Proof: VERTEX COVER is NP-Complete**

**Step 1: Prove VERTEX COVER is in NP**
*   **Certificate:** A subset of vertices $V'$.
*   **Verifier:**
    1. Check if $|V'| \leq k$.
    2. For every edge $(u, v)$ in the graph $G$, check if $u \in V'$ OR $v \in V'$.
*   Since checking all edges takes $O(E)$ time, VERTEX COVER is in NP.

**Step 2: Prove VERTEX COVER is NP-Hard (Reduction from CLIQUE)**
*   **Concept:** A clique in a graph $G$ is a vertex cover in the **complement graph** $\bar{G}$ (with a size adjustment).
*   **Reduction Algorithm:**
    1.  Given an instance of CLIQUE $(G, k)$.
    2.  Construct the complement graph $\bar{G}$ (where an edge exists in $\bar{G}$ iff it does NOT exist in $G$).
    3.  A subset $V'$ is a CLIQUE of size $k$ in $G$ IF AND ONLY IF the subset $V - V'$ is a VERTEX COVER of size $|V| - k$ in $\bar{G}$.
*   Since constructing the complement graph takes polynomial time, CLIQUE $\leq_p$ VERTEX COVER.

### C. Worked Examples
**Example: Verify Vertex Cover**
Graph $G$ with edges: (1, 2), (2, 3), (3, 4).
Proposed Vertex Cover $V' = \{2, 3\}$.

1.  **Edge (1, 2):** Node 2 is in $V'$. (Watched)
2.  **Edge (2, 3):** Node 2 and 3 are in $V'$. (Watched)
3.  **Edge (3, 4):** Node 3 is in $V'$. (Watched)
4.  **Conclusion:** Every edge is covered by $V'$. $\{2, 3\}$ is a valid vertex cover of size 2.

### D. How to Write in Exam
*   **Start With:** Define Vertex Cover: "A set of vertices such that every edge is incident to at least one vertex in the set."
*   **Body:** Perform the 2-step NP-Complete proof. Use the **Reduction from CLIQUE** to the complement graph.
*   **Visuals:** Draw a simple 3-node triangle graph. Show how picking 2 nodes covers all 3 edges.
*   **Close With:** "Because VERTEX COVER is in NP and is NP-Hard, it is NP-Complete."

### E. Rapid Recall & Self-Test
* 1-Minute Recall: Vertex Cover is NP-Complete, proven by showing it's in NP and NP-Hard via reduction from CLIQUE. A subset of vertices is a vertex cover if every edge has at least one endpoint in the subset. 
* Flash Questions: 
  1. What is the definition of a Vertex Cover in a graph?
  2. How is VERTEX COVER shown to be in NP?
  3. What problem is used for the NP-Hardness reduction to prove VERTEX COVER is NP-Complete?
* Practice Prompts: 
  1. Prove that VERTEX COVER is in NP by describing a certificate and a verifier that runs in polynomial time.
  2. Describe the reduction algorithm from CLIQUE to VERTEX COVER, explaining how a clique in a graph corresponds to a vertex cover in its complement graph.
  3. Given a graph with 5 nodes and 6 edges, propose a vertex cover and verify that it indeed covers all edges according to the definition of a vertex cover.
