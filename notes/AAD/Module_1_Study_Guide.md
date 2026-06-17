---
subject: AAD
module: '1'
title: Algorithm Analysis & Design (CST306) - Module 1 Study Guide
order: 1
---

# Module 1: Algorithm Analysis & Design (CST306) - Module 1 Study Guide

## 1. Part A: High Frequency Definitions (Module 1 Focus)
**[MODERATE]**

### A. What is this?
### Topic: Little-o notation $o(n^2)$ justification
**[SURE SHOT | ↻ REPEATED PYQ]**

#### Section A: What is this? (The Concept)
Imagine you are in a race against a rocket. No matter how fast you run, the rocket will eventually outpace you so severely that your speed becomes mathematically insignificant compared to its speed. 

> **The Analogy:** Little-o notation is the mathematical way of saying "I will get completely destroyed by this upper limit." While Big-O means "I will be less than or equal to this limit," Little-o strictly means "I will be strictly less than this limit as things get huge."

If a function $f(n)$ is $o(n^2)$, it means the growth rate of $f(n)$ is strictly slower than $n^2$. As $n$ approaches infinity, $f(n)$ becomes arbitrarily small compared to $n^2$.

#### Section B: Exam-Ready Theory (The Rigor)
* **Definition:** A function $f(n) = o(g(n))$ if and only if for **ANY** positive constant $c > 0$, there exists a constant $n_0 > 0$ such that:
  $$0 \leq f(n) < c \cdot g(n) \quad \text{for all } n \geq n_0$$
* **Limit Definition:** The most rigorous way to justify little-o is using limits. $f(n) = o(g(n))$ if:
  $$\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$$
* **Justification for $o(n^2)$:** If you are asked to justify why a function like $n \log n$ is $o(n^2)$, you apply the limit theorem.
  $$\lim_{n \to \infty} \frac{n \log n}{n^2} = \lim_{n \to \infty} \frac{\log n}{n} = 0$$
  Since the limit is 0, $n \log n$ is strictly bounded above by $n^2$, hence it is $o(n^2)$.

#### Section C: Step-by-Step Worked Example (The Application)
**Question:** Justify if $2n = o(n^2)$.
1. **Apply the Limit Test:** Set up the limit of $f(n) / g(n)$ as $n$ approaches infinity.
   $$\lim_{n \to \infty} \frac{2n}{n^2}$$
2. **Simplify the expression:**
   $$= \lim_{n \to \infty} \frac{2}{n}$$
3. **Evaluate the limit:** As $n$ grows infinitely large, any constant divided by infinity approaches zero.
   $$= 0$$
4. **Conclusion:** Since the limit is 0, $2n$ is indeed $o(n^2)$.

#### Section D: How to Write This in the Exam (The Strategy)
* **Start With:** Write down the formal limit definition: $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$.
* **Body:** Substitute the given functions into the limit. Simplify the algebraic expression cleanly before taking the limit.
* **Traps:** Do not confuse Little-o with Big-O. Big-O allows the limit to be a constant value greater than 0 (e.g., $2n = O(n)$ because limit is 2). Little-o requires the limit to be exactly 0.
* **Close With:** Conclude with the sentence: "Because the limit evaluates to 0, $f(n)$ grows strictly slower than $g(n)$, satisfying the little-o property."

### B. Exam-Ready Theory
* **Definition:** A function $f(n) = o(g(n))$ if and only if for **ANY** positive constant $c > 0$, there exists a constant $n_0 > 0$ such that: $0 \leq f(n) < c \cdot g(n) \quad \text{for all } n \geq n_0$
* **Limit Definition:** The most rigorous way to justify little-o is using limits. $f(n) = o(g(n))$ if: $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$
* **Key Formulas:**
  + $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$ for $f(n) = o(g(n))$
  + $0 \leq f(n) < c \cdot g(n) \quad \text{for all } n \geq n_0$
* **Core Properties:**
  + Little-o notation implies a strict upper bound that becomes arbitrarily small as $n$ approaches infinity.
  + For a function $f(n)$ to be $o(g(n))$, it must grow strictly slower than $g(n)$ as $n$ gets huge.
  + The limit definition provides a rigorous method to test if a function satisfies the little-o property.
  + Distinguishing between little-o and big-O is crucial, as big-O allows for a limit that is a positive constant, whereas little-o requires the limit to be exactly 0.

### C. Worked Examples
**Numerical Example 1:** Justify if $3n^2 = o(n^3)$.
| Step | Description | Calculation |
| --- | --- | --- |
| 1 | Apply the Limit Test | $\lim_{n \to \infty} \frac{3n^2}{n^3}$ |
| 2 | Simplify the expression | $= \lim_{n \to \infty} \frac{3}{n}$ |
| 3 | Evaluate the limit | $= 0$ |
| 4 | Conclusion | Since the limit is 0, $3n^2$ is indeed $o(n^3)$.

**Numerical Example 2:** Determine if $n \log n = o(n^2)$.
| Step | Description | Calculation |
| --- | --- | --- |
| 1 | Apply the Limit Test | $\lim_{n \to \infty} \frac{n \log n}{n^2}$ |
| 2 | Simplify the expression | $= \lim_{n \to \infty} \frac{\log n}{n}$ |
| 3 | Evaluate the limit | $= 0$ |
| 4 | Conclusion | Since the limit is 0, $n \log n$ is indeed $o(n^2)$.

**Numerical Example 3:** Justify if $2^n = o(n^3)$.
| Step | Description | Calculation |
| --- | --- | --- |
| 1 | Apply the Limit Test | $\lim_{n \to \infty} \frac{2^n}{n^3}$ |
| 2 | Evaluate the limit | This limit does not approach 0 because $2^n$ grows faster than $n^3$ as $n$ approaches infinity. |
| 3 | Conclusion | Since the limit does not approach 0, $2^n$ is not $o(n^3)$.

To solve these problems efficiently in an exam setting, remember to:
* Always start with the limit definition of little-o notation.
* Substitute the given functions into the limit and simplify.
* Evaluate the limit; if it equals 0, the function is little-o of the given bound.
* Clearly state your conclusion based on the limit's value.

### D. How to Write in Exam
* **Start With:** Write down the formal limit definition: $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$.
* **Body:** Substitute the given functions into the limit. Simplify the algebraic expression cleanly before taking the limit.
* **Traps:** Do not confuse Little-o with Big-O. Big-O allows the limit to be a constant value greater than 0 (e.g., $2n = O(n)$ because limit is 2). Little-o requires the limit to be exactly 0.
* **Close With:** Conclude with the sentence: "Because the limit evaluates to 0, $f(n)$ grows strictly slower than $g(n)$, satisfying the little-o property."
* **Mark Split:** Allocate 1-2 marks for writing down the limit definition, 2-3 marks for the correct substitution and simplification, and 1 mark for the conclusion, totaling 4-6 marks for the entire question, depending on the examiner's discretion and the question's specificity.

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** Little-o notation $o(n^2)$ implies a function $f(n)$ grows strictly slower than $n^2$. The definition involves a limit as $n$ approaches infinity, where $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$. This means for any constant $c > 0$, there exists $n_0$ such that $0 \leq f(n) < c \cdot g(n)$ for all $n \geq n_0$.
* **Flash Questions:**
  1. What does it mean for a function to be $o(n^2)$?
  2. How does the limit definition of little-o notation help in justifying $f(n) = o(g(n))$?
  3. Provide an example of a function that is $o(n^2)$ and explain why.
* **Practice Prompts:**
  1. Justify whether $3n^2$ is $o(n^3)$ using the limit definition.
  2. Prove that $n \log n$ is $o(n^2)$ by applying the little-o notation definition.
  3. Determine if $2^n$ is $o(n^3)$ and provide a clear explanation based on the limit test.

---

## 2. Part B: Core Topics
**[MODERATE]**

### A. What is this?
This refers to the fundamental concepts and core ideas that form the basis of a subject or discipline. It is the essential knowledge that a student is expected to understand and master in order to progress in their studies. 
> **Analogy:** Understanding the core topics is like building a house, where the core topics are the foundation, and the other subjects or topics are the walls and roof that are constructed on top of this foundation. Just as a strong foundation is necessary for a sturdy house, a strong grasp of the core topics is necessary for a deep understanding of the subject as a whole.

### B. Exam-Ready Theory
* **Formal Definitions**: A set of fundamental principles and concepts that form the basis of a subject or theory, providing a clear understanding of key terms and notions.
* **Key Formulas**:
  + $a^2 + b^2 = c^2$ (Pythagorean theorem)
  + $E = mc^2$ (Mass-energy equivalence)
  + $\frac{d}{dx} x^n = nx^{n-1}$ (Power rule of differentiation)
* **Core Properties**:
  + Commutativity: $a + b = b + a$ and $ab = ba$
  + Associativity: $(a + b) + c = a + (b + c)$ and $(ab)c = a(bc)$
  + Distributivity: $a(b + c) = ab + ac$ and $(a + b)c = ac + bc$
* **Theorems and Principles**:
  + Theorem: A statement that has been proven to be true using rigorous mathematical reasoning.
  + Principle: A fundamental concept or assumption that serves as the foundation for a theory or subject.
* **Mathematical Notations**:
  + $\sum_{i=1}^{n} a_i$ (Summation notation)
  + $\prod_{i=1}^{n} a_i$ (Product notation)
  + $\lim_{x \to a} f(x)$ (Limit notation)

### C. Worked Examples
### C. Worked Examples
To illustrate key concepts, let's consider a few numerical examples with step-by-step calculations.

#### Example 1: Calculating Resistance
Given a wire with a length of 10 meters, a cross-sectional area of 0.01 m², and a resistivity of 1.68 × 10⁻⁸ Ωm, calculate its resistance.

| Parameter | Value | Unit |
| --- | --- | --- |
| Length (L) | 10 | meters |
| Cross-sectional Area (A) | 0.01 | m² |
| Resistivity (ρ) | 1.68 × 10⁻⁸ | Ωm |

Resistance (R) = ρ × L / A = (1.68 × 10⁻⁸ Ωm) × (10 m) / (0.01 m²) = 1.68 × 10⁻⁵ Ω

#### Example 2: Calculating Power
A device operates at 12V and draws a current of 0.5A. Calculate the power consumed.

| Parameter | Value | Unit |
| --- | --- | --- |
| Voltage (V) | 12 | Volts |
| Current (I) | 0.5 | Amperes |

Power (P) = V × I = 12 V × 0.5 A = 6 Watts

#### Example 3: Series Circuit Analysis
In a series circuit with two resistors (R₁ = 2Ω, R₂ = 3Ω) connected to a 10V battery, calculate the total resistance, current, and voltage drop across each resistor.

| Component | Value | Unit |
| --- | --- | --- |
| R₁ | 2 | Ω |
| R₂ | 3 | Ω |
| Voltage Source | 10 | Volts |

Total Resistance (Rₜ) = R₁ + R₂ = 2Ω + 3Ω = 5Ω  
Current (I) = V / Rₜ = 10V / 5Ω = 2A  
Voltage Drop Across R₁ (V₁) = I × R₁ = 2A × 2Ω = 4V  
Voltage Drop Across R₂ (V₂) = I × R₂ = 2A × 3Ω = 6V

These examples demonstrate how to apply fundamental principles to solve problems in electrical engineering, crucial for KTU exam preparation.

### D. How to Write in Exam
To effectively write in an exam, start with a clear and concise introduction that addresses the question, providing a brief overview of the main points to be discussed. The body of the answer should be well-structured, with each point supported by relevant examples, diagrams, or formulas where applicable. Ensure that each point is clearly explained and linked to the next to maintain a logical flow. 

Common traps to avoid include going off-topic, failing to address all parts of the question, and not leaving time to review your work. To avoid these traps, carefully read the question, plan your answer, and allocate your time wisely. 

Close your answer by summarizing the main points discussed and reiterating how they address the question. This not only reinforces your arguments but also gives a clear conclusion to your response. 

The mark split for questions is typically outlined in the exam paper or guidelines provided by the university. Understanding the mark allocation can help you prioritize your time and ensure you allocate sufficient time to each section of the question, maximizing your potential score. By following this structured approach, you can effectively manage your time, present clear and well-supported arguments, and achieve a high score in your KTU exam.

### E. Rapid Recall & Self-Test
* 1-Minute Recall: Key terms and concepts to recall within a minute include major concepts, key definitions, and important formulas. Focus on recalling the main ideas, definitions, and any critical formulas or equations that are essential for the topic.
* Flash Questions:
  1. What is the primary difference between key concepts in the topic?
  2. How do major theories or models apply to real-world scenarios?
  3. What are the limitations or potential biases of a specific concept or theory?
* Practice Prompts:
  1. Describe a scenario where a specific concept or theory is applied, and explain its relevance and impact.
  2. Compare and contrast two or more key concepts, highlighting their similarities and differences.
  3. Analyze a case study or example, identifying how different concepts or theories are used to address a problem or challenge.

---

## 3. Recursion Solving (Master's & Recursion Tree)
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Imagine you are tasked with counting all the leaves on a massive, sprawling oak tree. Counting them one by one would take forever. Instead, you recruit three friends and say, "Each of you take a main branch, count the leaves, and tell me the total." Your friends do the exact same thing, recruiting their own friends for the smaller branches, until someone reaches a tiny twig with just one leaf. 

> **The Analogy:** Solving recurrences is like calculating the total time it takes for all these friends to finish counting. The work is split into smaller identical tasks (recursive calls), but splitting the tasks and combining the results also takes some effort. 

In computer science, algorithms like Merge Sort or Binary Search work by splitting a problem into smaller chunks. A recurrence relation is simply a mathematical equation that describes the running time of these recursive algorithms in terms of their smaller inputs. We need methods like the Master's Theorem, Recursion Trees, and Substitution to solve these equations and find the final Time Complexity in standard Asymptotic notation (like $O(n \log n)$).

### B. Exam-Ready Theory
To analyze recursive algorithms, we represent their time complexity as a **Recurrence Relation**: an equation that describes a function in terms of its values on smaller inputs, such as $T(n) = aT(n/b) + f(n)$.

Here are the three primary rigorous methods to solve them:

**1. The Master's Theorem**
This is a direct formula-based method for solving recurrences of the form:
$$ T(n) = aT(n/b) + \Theta(n^k \log^p n) $$
Where:
* $a \geq 1$ is the number of subproblems (recursive calls).
* $b > 1$ is the factor by which the input size is divided.
* $k \geq 0$ and $p$ is a real number representing the cost of dividing/combining $f(n)$.

**The 3 Master Cases:**
* **Case 1:** If $a > b^k$, then $T(n) = \Theta(n^{\log_b a})$
* **Case 2:** If $a = b^k$, we check the value of $p$:
  * If $p > -1$, then $T(n) = \Theta(n^{\log_b a} \log^{p+1} n)$
  * If $p = -1$, then $T(n) = \Theta(n^{\log_b a} \log \log n)$
  * If $p < -1$, then $T(n) = \Theta(n^{\log_b a})$
* **Case 3:** If $a < b^k$, we check the value of $p$:
  * If $p \geq 0$, then $T(n) = \Theta(n^k \log^p n)$
  * If $p < 0$, then $T(n) = \Theta(n^k)$

**2. The Recursion Tree Method**
This is a pictorial representation of the iteration method. It converts the recurrence into a tree where nodes represent the cost incurred at various levels of the recursion.
* The root is the initial cost $f(n)$.
* Its children represent the cost of the subproblems, e.g., $a$ branches each costing $f(n/b)$.
* You sum the costs across each horizontal level of the tree.
* Finally, you sum the costs of all levels from the root down to the leaves to get the total complexity.

**3. The Substitution Method**
This method involves two formal mathematical steps:
1. **Guess the form** of the solution (e.g., guess that $T(n) = O(n \log n)$).
2. **Use Mathematical Induction** to find the exact constants and prove that the guess is correct. This involves showing $T(n) \leq c \cdot g(n)$.

### C. Worked Examples
**Example 1: Master's Theorem**
Solve $T(n) = 3T(n/4) + n \log n$
1. Compare with the standard form: $T(n) = aT(n/b) + \Theta(n^k \log^p n)$
2. Extract the constants: 
   * $a = 3$
   * $b = 4$
   * $f(n) = n \log^1 n \implies k = 1, p = 1$
3. Evaluate $b^k$: 
   * $b^k = 4^1 = 4$
4. Compare $a$ and $b^k$: 
   * $a = 3$ and $b^k = 4$. 
   * Since $3 < 4$, we have $a < b^k$. This falls under **Case 3**.
5. Check $p$ for Case 3: 
   * $p = 1$, which means $p \geq 0$.
6. Apply the formula: $T(n) = \Theta(n^k \log^p n)$
   * $T(n) = \Theta(n^1 \log^1 n)$
   * **Final Answer:** $T(n) = \Theta(n \log n)$

**Example 2: Recursion Tree Method (April 2025 University Question)**
Solve $T(n) = 3T(n/4) + cn^2$
1.  **Level 0 (Root):** The cost at the root is $cn^2$.
2.  **Level 1:** The recurrence branches 3 ways ($a=3$). The input size drops to $n/4$.
    *   Each node costs $c(n/4)^2 = cn^2 / 16$.
    *   Total cost at Level 1 $= 3 \times (cn^2 / 16) = (3/16)cn^2$.
3.  **Level 2:** Each of the 3 nodes branches 3 ways (9 nodes total). Input is $n/16$.
    *   Each node costs $c(n/16)^2 = cn^2 / 256$.
    *   Total cost at Level 2 $= 9 \times (cn^2 / 256) = (3/16)^2 cn^2$.
4.  **Level $i$ (General Case):**
    *   Number of nodes $= 3^i$.
    *   Cost per node $= c(n/4^i)^2 = cn^2 / 16^i$.
    *   Total cost at Level $i = (3/16)^i cn^2$.
5.  **Total Cost Summation:**
    *   $T(n) = \sum_{i=0}^{\log_4 n - 1} (3/16)^i cn^2 + \text{Leaf Cost}$
    *   This is a geometric series with ratio $r = 3/16$.
    *   $T(n) = cn^2 [1 + (3/16) + (3/16)^2 + \dots ]$
    *   Using the infinite series formula $S = a / (1-r)$:
    *   $T(n) < cn^2 \times \frac{1}{1 - 3/16} = cn^2 \times \frac{16}{13}$
6.  **Final Result:** 
    *   $T(n) = O(n^2)$.

**Example 3: Substitution Method (April 2025 University Question)**
Solve $T(n) = 2T(\lfloor n/2 \rfloor) + n$ where $T(1) = 1$.
1.  **Guess:** Based on the form (similar to Merge Sort), we guess $T(n) = O(n \log n)$.
2.  **Inductive Goal:** Prove $T(n) \leq cn \log n$ for some $c > 0$.
3.  **Inductive Step:** Assume it holds for $n/2$, i.e., $T(n/2) \leq c(n/2) \log(n/2)$.
4.  **Substitute into Recurrence:**
    *   $T(n) \leq 2 [c(n/2) \log(n/2)] + n$
    *   $T(n) \leq cn \log(n/2) + n$
    *   $T(n) \leq cn (\log n - \log 2) + n$
    *   $T(n) \leq cn \log n - cn + n$
5.  **Final Condition:** We need $cn \log n - cn + n \leq cn \log n$.
    *   This is true if $-cn + n \leq 0 \implies n(1-c) \leq 0$.
    *   This holds for all $c \geq 1$.
6.  **Conclusion:** $T(n) = O(n \log n)$.

### D. How to Write in Exam
* **Start With:** For Master's theorem questions (Even Path - Q12), immediately write down the standard form $T(n) = aT(n/b) + \Theta(n^k \log^p n)$ at the top of your page. Extract $a, b, k, p$ clearly in a list.
* **Body:** Calculate $b^k$ and explicitly write down the comparison "$a$ vs $b^k$". State exactly which case of the Master's theorem you are applying. For Recursion Trees, you **must** draw the tree. Calculate the sum of the first 3 levels and write down the general series equation.
* **Traps:** Do not forget to check the condition for $p$ in Cases 2 and 3 of the Master's theorem. A common mistake is writing $T(n) = \Theta(n^{\log_b a})$ for Case 3 when it should be determined by $f(n)$.
* **Close With:** Write your final answer in a neat box: **$T(n) = \Theta(\dots)$**.

### E. Rapid Recall & Self-Test
**1-Minute Recall**
- Recurrence relations describe the time complexity of recursive algorithms.
- The Master's Theorem is used for solving recurrences of the form $T(n) = aT(n/b) + \Theta(n^k \log^p n)$.
- Recursion Trees provide a pictorial representation for solving recurrences by summing costs at each level.
- The Substitution Method involves guessing the solution form and proving it using mathematical induction.

**Flash Questions**
1. What is the primary condition to apply the Master's Theorem for solving recurrence relations?
2. How does the Recursion Tree Method differ from the Substitution Method in solving recurrences?
3. What are the three cases in the Master's Theorem, and how do they depend on the values of $a$, $b$, and $k$?

**Practice Prompts**
1. Solve the recurrence relation $T(n) = 2T(n/2) + n$ using the Master's Theorem and verify your answer using the Recursion Tree Method.
2. Use the Substitution Method to solve $T(n) = T(n/2) + n$ and prove your guess using mathematical induction.
3. For the recurrence $T(n) = 4T(n/2) + n^2$, apply both the Master's Theorem and the Recursion Tree Method to find $T(n)$, and compare your results.

---

## 4. Asymptotic Notations (Big O, Omega, Theta)
**[HIGH PROB | ↻ REPEATED PYQ]**

### A. What is this?
Imagine you are comparing two cars. Car A is a heavy truck that starts off really fast but hits a strict top speed. Car B is a sports car that stalls out for the first 10 seconds, but eventually accelerates infinitely. If you only test them on a 5-meter driveway, Car A wins. But if you test them on a cross-country highway, Car B destroys Car A. 

> **The Analogy:** Asymptotic notation is the "cross-country highway" test for algorithms. We do not care about small inputs (the 5-meter driveway) or minor hardware advantages. We only care about how the algorithm's running time *grows* as the input size ($n$) gets massively large (approaches infinity).

Asymptotic notations are mathematical tools used to represent the Time and Space complexity of algorithms. They allow us to establish upper bounds (Worst case), lower bounds (Best case), and tight bounds (Average/Exact case) ignoring machine-specific constants.

### B. Exam-Ready Theory
There are 5 primary asymptotic notations used to classify functions by their asymptotic growth rate:

**1. Big-Oh ($O$) - Asymptotic Tight Upper Bound (Worst Case)**
* The function $f(n) = O(g(n))$ if and only if there exist two positive constants $c$ and $n_0$ such that:
* $$0 \leq f(n) \leq c \cdot g(n) \quad \text{for all } n \geq n_0$$
* Meaning: $f(n)$ grows no faster than $g(n)$. $g(n)$ bounds $f(n)$ from above.

**2. Big-Omega ($\Omega$) - Asymptotic Tight Lower Bound (Best Case)**
* The function $f(n) = \Omega(g(n))$ if and only if there exist two positive constants $c$ and $n_0$ such that:
* $$0 \leq c \cdot g(n) \leq f(n) \quad \text{for all } n \geq n_0$$
* Meaning: $f(n)$ grows at least as fast as $g(n)$. $g(n)$ bounds $f(n)$ from below.

**3. Big-Theta ($\Theta$) - Asymptotic Tight Bound (Average Case)**
* The function $f(n) = \Theta(g(n))$ if and only if there exist three positive constants $c_1, c_2,$ and $n_0$ such that:
* $$0 \leq c_1 \cdot g(n) \leq f(n) \leq c_2 \cdot g(n) \quad \text{for all } n \geq n_0$$
* Meaning: $f(n)$ and $g(n)$ grow at the exact same rate asymptotically.

**4. Little-Oh ($o$) - Asymptotic Loose Upper Bound**
* The function $f(n) = o(g(n))$ iff for **ANY** positive constant $c > 0$, there exists a constant $n_0 > 0$ such that:
* $$0 \leq f(n) < c \cdot g(n) \quad \text{for all } n \geq n_0$$
* Equivalently using limits: $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$
* Meaning: $g(n)$ becomes arbitrarily large relative to $f(n)$.

**5. Little-Omega ($\omega$) - Asymptotic Loose Lower Bound**
* The function $f(n) = \omega(g(n))$ iff for **ANY** positive constant $c > 0$, there exists a constant $n_0 > 0$ such that:
* $$0 \leq c \cdot g(n) < f(n) \quad \text{for all } n \geq n_0$$
* Equivalently using limits: $\lim_{n \to \infty} \frac{f(n)}{g(n)} = \infty$

**Properties of Asymptotic Notations:**
* **Reflexivity:** $f(n) = O(f(n))$, $f(n) = \Omega(f(n))$, $f(n) = \Theta(f(n))$
* **Symmetry:** $f(n) = \Theta(g(n))$ if and only if $g(n) = \Theta(f(n))$
* **Transpose Symmetry:** $f(n) = O(g(n))$ if and only if $g(n) = \Omega(f(n))$

### C. Worked Examples
**Example 1: Prove that $f(n) = 2^{n+1}$ is $O(2^n)$ (April 2025 University Question)**
1. **State the definition:** We need to find $c$ and $n_0$ such that $2^{n+1} \leq c \cdot 2^n$ for all $n \geq n_0$.
2. **Algebraic Manipulation:**
   * $2^{n+1} = 2^1 \cdot 2^n = 2 \cdot 2^n$
3. **Identify the constants:** 
   * The inequality becomes $2 \cdot 2^n \leq c \cdot 2^n$.
   * This is true if we choose $c = 2$.
   * Since this holds for all $n \geq 1$, we set $n_0 = 1$.
4. **Conclusion:** Since there exist positive constants $c=2$ and $n_0=1$, $2^{n+1} = O(2^n)$.

**Example 2: Is $2^{2n} = O(2^n)$? Justify your answer. (University Question)**
1. **State the definition:** $2^{2n} \leq c \cdot 2^n$ for all $n \geq n_0$.
2. **Algebraic Manipulation:**
   * $(2^2)^n \leq c \cdot 2^n$
   * $4^n \leq c \cdot 2^n$
3. **Analyze the ratio:**
   * $4^n / 2^n \leq c$
   * $(4/2)^n \leq c$
   * $2^n \leq c$
4. **Conclusion:** There is **no constant $c$** that can bound the function $2^n$ as $n$ approaches infinity. The ratio grows without bound.
5. **Final Result:** Therefore, $2^{2n} \neq O(2^n)$.

**Example 3: Arrange functions by growth rate (University Question)**
$n^3, 2^n, \log n^3, 2^{100}, n^2 \log n, n^n, \log n, n^{0.3}, 2^{\log n}$
1. **Constant:** $2^{100}$
2. **Logarithmic:** $\log n$ and $\log n^3 = 3 \log n$
3. **Fractional Power:** $n^{0.3}$
4. **Linear (via identity):** $2^{\log_2 n} = n$
5. **Linear-Logarithmic:** $n^2 \log n$
6. **Polynomial:** $n^3$
7. **Exponential:** $2^n$
8. **Factorial-like:** $n^n$
**Final Order:** $2^{100} < \log n < \log n^3 < n^{0.3} < 2^{\log n} < n^2 \log n < n^3 < 2^n < n^n$.

### D. How to Write in Exam
* **Start With:** If asked for definitions (Odd Path - Q11), write the formal mathematical inequality immediately. Do not just write english text. "f(n) is O(g(n)) iff $f(n) \leq c \cdot g(n)$". 
* **Body:** For proof questions, use the technique of replacing lower-order terms with higher-order terms to find your constant $c$. Clearly state "Let $c = \dots$ and $n_0 = \dots$". If asked to illustrate graphically, draw the standard X-Y axis graph showing $f(n)$ crossing $c \cdot g(n)$ at point $n_0$.
* **Traps:** Do not forget the condition "for all $n \geq n_0$". Without stating that the inequality holds for all inputs after a certain point, the definition is mathematically incorrect and will lose marks.
* **Close With:** Conclude proofs with "Since there exists positive constants $c$ and $n_0$, the function belongs to the complexity class."

### E. Rapid Recall & Self-Test
**1-Minute Recall:**
- Asymptotic notations describe the growth rate of algorithms as input size increases.
- Big O ($O$) represents the upper bound (worst case), Big Omega ($\Omega$) represents the lower bound (best case), and Big Theta ($\Theta$) represents the tight bound (average case).
- Little o ($o$) and Little Omega ($\omega$) are loose bounds where $g(n)$ becomes arbitrarily large relative to $f(n)$ or $f(n)$ becomes arbitrarily large relative to $g(n)$, respectively.

**Flash Questions:**
1. What does Big O notation represent in terms of algorithm complexity?
2. How does Big Omega notation differ from Big O notation?
3. What is the primary difference between Big Theta and Little o notations?

**Practice Prompts:**
1. Prove that $f(n) = 3n^2 + 2n + 1$ is $O(n^2)$.
2. Determine if $2^{n+1}$ is $O(2^n)$ and justify your answer.
3. Arrange the following functions in order of growth rate: $n^2$, $\log n$, $n \log n$, $2^n$, $n^{1.5}$, and $2^{2n}$.

---

## 5. Algorithm Analysis (Linear/Binary/Insertion Sort)
**[HIGH PROB]**

### A. What is this?
If you hire a contractor to build a brick wall, you don't calculate the time by measuring how fast his heart beats. You calculate the time by counting *how many bricks he has to lay*. 

> **The Analogy:** In Algorithm Analysis, we don't measure the exact milliseconds a CPU takes (because a supercomputer is faster than a 10-year-old laptop). Instead, we use the "Frequency Count" method. We count exactly how many times the core statements (the "bricks") inside loops are executed relative to the input size $n$. 

By doing this, we determine the **Time Complexity** (how execution time scales) and **Space Complexity** (how memory usage scales). We analyze algorithms under three lenses: Best Case (the easiest input possible), Worst Case (the most difficult, punishing input), and Average Case (a mathematically probable random input).

### B. Exam-Ready Theory
**1. Space Complexity: $S(P) = C + S_P(I)$**
The total memory required by an algorithm to run to completion.
* **Fixed Part ($C$):** Independent of input characteristics. Includes instruction space (code), space for simple variables, and constants.
* **Variable Part ($S_P$):** Dependent on the input instance. Includes space for dynamic arrays, referenced variables, and the recursion stack space.

**2. Time Complexity & Frequency Count**
Time complexity is calculated by counting the number of times fundamental operations execute.
* `for(i=1; i<=n; i++)`: The initialization runs 1 time. The condition check runs $n+1$ times (it checks and fails on the final try). The inner body runs $n$ times.
* If a loop increments geometrically (e.g., `i = i * 2`), the loop executes $\log_2 n$ times.

**3. Types of Complexity Analysis**
* **Best Case ($\Omega$):** The minimum number of steps executed for a given parameter. Occurs when the input naturally bypasses the algorithm's heavy lifting.
* **Worst Case ($O$):** The maximum number of steps executed. The algorithm is forced to do every possible calculation.
* **Average Case ($\Theta$):** The expected number of steps averaged over all possible inputs.

**Analysis of Classical Algorithms:**
* **Linear Search:** 
  * Best Case: Item is at index 0. $\Omega(1)$.
  * Worst Case: Item is not present or at the very end. $O(n)$.
  * Average Case: Item is found in the middle $(n+1)/2$ comparisons. $\Theta(n)$.
* **Insertion Sort:**
  * Best Case: Array is already sorted. The inner `while` loop condition fails immediately every time. $\Omega(n)$.
  * Worst Case: Array is sorted in reverse order. Inner loop runs $1 + 2 + 3 + \dots + (n-1) = n(n-1)/2$ times. $O(n^2)$.
  * Average Case: Elements are half-sorted. $\Theta(n^2)$.

### C. Worked Examples
**Example 1: Analyze the time complexity of the following code segment**
```c
for(int i=1; i<=n; i++) {
    for(int j=1; j<=n; j++) {
        // O(1) statement
    }
}
```
1. **Analyze Outer Loop:** The outer loop `i` runs from $1$ to $n$. It successfully executes its body $n$ times.
2. **Analyze Inner Loop:** For *every single iteration* of the outer loop, the inner loop `j` resets and runs from $1$ to $n$, executing its body $n$ times.
3. **Total Frequency Count:** The innermost $O(1)$ statement executes $n$ (from outer) $\times$ $n$ (from inner) times.
4. **Result:** Total executions $= n^2$. Time Complexity $= O(n^2)$.

**Example 2: Analyze an algorithmic segment with dependent bounds**
```c
for(int i=1; i<=n; i++) {
    for(int j=1; j<=i; j++) {
        // O(1) statement
    }
}
```
1. **Trace iterations:**
   * When $i = 1$, inner loop runs $1$ time.
   * When $i = 2$, inner loop runs $2$ times.
   * ...
   * When $i = n$, inner loop runs $n$ times.
2. **Sum the frequencies:** 
   Total executions $= 1 + 2 + 3 + \dots + n$
3. **Apply Arithmetic Progression Formula:**
   Sum of first $n$ natural numbers $= \frac{n(n+1)}{2} = \frac{n^2 + n}{2}$
4. **Result:** Dropping lower-order terms and constants, the Time Complexity $= O(n^2)$.

**Example 3: Determine Space Complexity for a Recursive Array Sum**
```c
int RSum(int a[], int n) {
    if (n <= 0) return 0;
    return a[n] + RSum(a, n-1);
}
```
1. **Fixed Space:** Negligible (pointers and $n$ passed by value).
2. **Variable Space (Recursion Stack):** For each recursive call, the stack must store the return address and local parameters. 
3. **Depth of Recursion:** The function calls itself $n$ times (from $n$ down to $0$).
4. **Result:** Since the depth of the recursion tree is $n$, and each stack frame takes $O(1)$ space, the total Space Complexity is $O(n)$.

**Example 4: Analyze the complexity of the following function (University Question)**
```c
void function(int n) {
    int count=0;
    for(int i=n/2; i<=n; i++)
        for(int j=1; j<=n; j=2*j)
            for(int k=1; k<=n; k=k*2)
                count++;
}
```
1.  **Outer Loop ($i$):** Runs from $n/2$ to $n$.
    *   Number of iterations $= n - n/2 + 1 \approx n/2$.
    *   Complexity: $O(n)$.
2.  **Middle Loop ($j$):** Starts at 1, doubles each time ($1, 2, 4, 8, \dots, n$).
    *   This is a geometric progression. The loop runs $k$ times where $2^k = n \implies k = \log_2 n$.
    *   Complexity: $O(\log n)$.
3.  **Inner Loop ($k$):** Same as the middle loop, starts at 1 and doubles until $n$.
    *   Complexity: $O(\log n)$.
4.  **Total Frequency Count:**
    *   $T(n) = (\text{Outer iterations}) \times (\text{Middle iterations}) \times (\text{Inner iterations})$
    *   $T(n) = (n/2) \times (\log n) \times (\log n)$
5.  **Final Result:** 
    *   $T(n) = O(n \log^2 n)$.

### D. How to Write in Exam
* **Start With:** If given a code snippet (Odd Path), create a table with columns: `Step/Execution`, `Frequency Count`, and `Total Frequency`.
* **Body:** Map each line of code to a row in the table. For simple assignment statements, put $1$. For a `for` loop, put $n+1$ for the loop statement itself, and $n$ for the block inside it. Multiply nested loops carefully. Show the summation clearly (e.g., writing out $1+2+...+n = n(n+1)/2$).
* **Traps:** When asked for Best/Worst/Average cases of Insertion Sort, do not just write the final $O(n^2)$ answer. You must explicitly state the physical condition of the array that causes the case (e.g., "Best case occurs when the array is already sorted in ascending order"). 
* **Close With:** Box your final result in Big-O notation, e.g., **Time Complexity = $O(n^2)$**. Ensure you explicitly name the mathematical series used if applicable (Arithmetic, Geometric, Logarithmic).

### E. Rapid Recall & Self-Test
**1-Minute Recall**
- Algorithm analysis involves counting the frequency of core statements relative to input size $n$.
- Time complexity measures how execution time scales, while space complexity measures how memory usage scales.
- Analysis is done under best, worst, and average cases.
- Linear search has a best case of $\Omega(1)$, worst case of $O(n)$, and average case of $\Theta(n)$.
- Insertion sort has a best case of $\Omega(n)$, worst case of $O(n^2)$, and average case of $\Theta(n^2)$.

**Flash Questions**
1. What is the primary method used in algorithm analysis to determine time complexity?
2. How does the best case for linear search differ from its worst case in terms of time complexity?
3. What is the time complexity of insertion sort in its average case, and why does it occur?

**Practice Prompts**
1. Analyze the time complexity of a nested loop structure where the outer loop runs $n$ times and the inner loop runs $n/2$ times for each iteration of the outer loop.
2. Determine the space complexity of a recursive function that calculates the factorial of a given number $n$, considering the recursion stack space.
3. Explain the difference between best, worst, and average cases in the context of algorithm analysis, providing examples for each case using a simple sorting algorithm like bubble sort.
