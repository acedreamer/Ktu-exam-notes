# Module 5: Code Optimization and Generation
**CST302 Compiler Design | KTU B.Tech CSE**

---

## 1. Code Optimization: Overview, Criteria, and Types
**[MODERATE | ↻ REPEATED PYQ]**

### A. What is this?
Optimization is the "polishing" phase of the compiler. After generating intermediate code, the compiler looks for ways to make the program run faster or use less memory without changing what the program actually *does*. It's like a writer editing a first draft to remove redundant words and make the story flow better.

> **Analogy:** Imagine you are giving directions to a friend. 
> *   *First Draft:* "Go to the end of the road, turn left, go 100 meters, turn around, go 50 meters back, and the shop is on your right."
> *   *Optimized:* "Go to the end of the road, turn left, and the shop is 50 meters ahead on your right."
> Both get your friend to the shop, but the second one is much faster.

Optimization is technically an optional phase, but in modern computing, it is essential for performance.

### B. Exam-Ready Theory

#### 1. Criteria for Optimization
A transformation is a valid optimization only if it meets these three rules:
1.  **Meaning Preservation:** The output of the optimized code must be identical to the original for all possible inputs.
2.  **Efficiency Improvement:** It must actually make the code faster or smaller by a noticeable amount.
3.  **Worth the Effort:** The time the compiler spends optimizing shouldn't be so long that it outweighs the performance gains.

#### 2. Types of Optimization
*   **Machine-Independent:** Applied to Intermediate Code (TAC/DAG). These work regardless of whether the final code runs on an Intel or ARM processor (e.g., Constant Folding).
*   **Machine-Dependent:** Tailored to the specific CPU architecture. These involve register usage, instruction sets, and memory costs (e.g., Peephole Optimization).

#### 3. Scope of Optimization
*   **Local Optimization:** Focuses on a small segment of code called a **Basic Block**.
*   **Global Optimization:** Analyzes the entire function or program, looking at how data flows between blocks (Data-Flow Analysis).

### C. Worked Examples

#### Example 1: Meaning Preservation Trap
Original: `x = y / z`
Optimized: `x = y * (1/z)`
*Is this valid?* No! If `z` is 0, the first one throws a "Division by Zero" error. If the optimized version handles it differently, the meaning is changed.

#### Example 2: Machine-Independent vs Dependent
*   `x = 2 + 3` $\to$ `x = 5` (Machine-Independent, works on any CPU).
*   `x = x + 1` $\to$ `INC x` (Machine-Dependent, only works if the CPU has an `INC` instruction).

### D. How to Write in Exam
*   **Start With:** Define Code Optimization and list the three criteria (Meaning, Efficiency, Worth).
*   **Body:** Distinguish between local and global optimization. Use the "Machine Independent vs Dependent" classification.
*   **Traps:** 
    *   Do not say optimization makes code "perfect." It just makes it "better."
    *   Emphasize that the compiler must NEVER change the program's logic.
*   **Close With:** Mention that optimization usually happens on the Three Address Code (TAC).

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Optimization = Faster/Smaller. 3 Criteria: Meaning, Efficiency, Worth. Machine-Indep (TAC) vs Machine-Dep (Target).
*   **Flash Questions:**
    1. Is optimization mandatory? (No, it's optional)
    2. What is the primary constraint? (Must preserve meaning)
    3. What does "Global" optimization look at? (Whole procedures/functions)
    4. Name a machine-dependent optimization. (Peephole / Register allocation)
*   **Practice Prompts:**
    1. List and explain the criteria for code optimization.
    2. Compare local and global optimization techniques.

---

## 2. Basic Blocks & Flow Graphs
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Before a compiler can optimize, it needs to organize the code into logical "rooms." A **Basic Block** is a sequence of instructions where you enter at the very top and leave at the very bottom. There are no jumps allowed *into* the middle of the block, and no jumps *out* from the middle.

> **Analogy:** A Basic Block is like a one-way tunnel with no exits or entrances inside. Once you enter the tunnel, you are guaranteed to drive through every inch of it until you reach the end.

A **Flow Graph** is a map showing how these tunnels are connected. It shows which block follows which, including loops and branches.

### B. Exam-Ready Theory

#### 1. Defining a Basic Block
A sequence of TAC instructions such that:
1.  Control enters through the first instruction only.
2.  Control leaves through the last instruction only.

#### 2. Finding Leaders (The Algorithm)
To partition code into blocks, we first find the **Leaders**. The first instruction of every block is a leader.
**Rules for Leaders:**
1.  The first instruction in the code is a leader.
2.  Any instruction that is the **target** of a jump (conditional or unconditional) is a leader.
3.  Any instruction that **immediately follows** a jump is a leader.

#### 3. Constructing the Flow Graph
*   **Nodes:** Basic Blocks.
*   **Edges:** Represent the flow of control. An edge exists from block $B_1$ to $B_2$ if the last instruction of $B_1$ can jump to the first of $B_2$, or if $B_2$ immediately follows $B_1$ in the code.

### C. Worked Examples

#### Example 1: Finding Leaders
1. `i = 1` (Rule 1: First instruction)
2. `j = 1`
3. `t1 = 10 * i`
4. `if t1 > 100 goto (6)`
5. `goto (1)`
6. `return`

**Leaders:**
*   Instruction 1 (Rule 1)
*   Instruction 6 (Rule 2: Target of jump in 4)
*   Instruction 5 (Rule 3: Follows jump in 4)
*   Instruction 1 is already a leader.

#### Example 2: Basic Block Partitioning
Using the leaders from above:
*   **Block 1:** Instructions 1-4
*   **Block 2:** Instruction 5
*   **Block 3:** Instruction 6

### D. How to Write in Exam
*   **Start With:** Definition of a Basic Block.
*   **Body:** Provide the three rules for finding leaders. This is a very common 5-mark question.
*   **Traps:** 
    *   Forgetting Rule 3 (instruction *after* a jump) is the most common error.
    *   Make sure jump targets are correctly identified as leaders.
*   **Close With:** Draw a simple Flow Graph using nodes and arrows to show the "Entry" and "Exit" points.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Basic Block = Single entry/exit. Leaders = First, Jump Targets, After Jumps. Flow Graph = Block map.
*   **Flash Questions:**
    1. Can a Basic Block have a jump in the middle? (No)
    2. Is the first instruction always a leader? (Yes)
    3. What represents control flow in a graph? (Edges/Arrows)
    4. What are the rules for identifying leaders? (1st, Target, Following jump)
*   **Practice Prompts:**
    1. Given a piece of TAC, identify the leaders and partition it into basic blocks.
    2. Explain how a flow graph helps in global optimization.

---

## 3. Principal Sources of Optimization (Local & Global)
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
These are the specific "tricks" a compiler uses to clean up the code. They can be performed within a single room (**Local**) or across the entire house (**Global**). Some tricks focus on making expressions simpler, while others focus on getting rid of variables that aren't needed anymore.

> **Analogy:** 
> *   **Constant Folding:** If you know $2+2=5$ (oops, 4!), why write the math every time? Just write 4.
> *   **Dead Code Elimination:** Why keep an old treadmill in the basement if nobody uses it? Throw it away to save space!
> *   **Copy Propagation:** If you know "Bob" is "The Boss," you don't need two separate name tags. Just use "The Boss" everywhere.

### B. Exam-Ready Theory

#### 1. Function-Preserving Transformations
These improve the code without changing the mathematical function it computes.
*   **Common Sub-expression Elimination (CSE):** If an expression $E$ was previously computed, and its variables haven't changed, reuse the old value instead of re-calculating.
*   **Copy Propagation:** If we have $x = y$, replace subsequent uses of $x$ with $y$ (if $y$ is not changed).
*   **Dead-Code Elimination:** Remove instructions whose results are never used.
*   **Constant Folding:** Evaluate expressions with constant operands at compile-time (e.g., $3.14 / 2 \to 1.57$).

#### 2. Local vs. Global
*   **Local:** Happens within one Basic Block. Easy and fast.
*   **Global:** Happens across blocks. Requires "Data-Flow Analysis" to know if a variable is "live" or "reaching" a certain point.

### C. Worked Examples

#### Example 1: Copy Propagation + Dead Code
1. `x = t3`
2. `a[i] = x`
3. `x = y + z`
*   **Propagate:** `a[i] = t3`
*   **Eliminate:** If `x` is never used after line 2, line 1 is now "Dead Code" and can be deleted.

#### Example 2: Common Sub-expression (CSE)
1. `t1 = a + b`
2. `...` (no changes to a or b)
3. `t2 = a + b`
*   **Optimized:** Change line 3 to `t2 = t1`. Now the CPU doesn't have to add again.

### D. How to Write in Exam
*   **Start With:** List the 4 main function-preserving transformations.
*   **Body:** Define each one clearly with a "Before" and "After" code snippet. This is the most effective way to get full marks.
*   **Traps:** 
    *   For CSE, mention that variables must NOT change between calculations.
    *   For Copy Propagation, mention it's often a stepping stone to Dead Code Elimination.
*   **Close With:** Mention that these are "Machine-Independent" optimizations.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** CSE = Reuse values. Copy Prop = Use original name. Dead Code = Delete unused stuff. Const Fold = Math at compile-time.
*   **Flash Questions:**
    1. What does CSE stand for? (Common Sub-expression Elimination)
    2. Does constant folding happen at run-time? (No, compile-time)
    3. What is "Dead Code"? (Code that computes a value never used)
    4. Why do we do Copy Propagation? (To expose dead code or simplify register needs)
*   **Practice Prompts:**
    1. Show how Copy Propagation leads to Dead Code Elimination with an example.
    2. Explain the difference between local and global CSE.

---

## 4. Loop Optimization Techniques
**[HIGH PROBABILITY | ↻ REPEATED PYQ]**

### A. What is this?
Most of a program's time is spent inside loops. If you can make a loop run even 10% faster, the whole program speeds up significantly. Loop optimization is like a "Pit Stop" in racing—it focuses on the part of the track where the car spends the most time.

> **Analogy:** Imagine you are painting a fence.
> *   **Code Motion:** If you have to check the weather every time you dip your brush, move that check outside. Look at the sky once, then paint the whole fence.
> *   **Strength Reduction:** If you are moving a heavy bucket of paint for every plank, put the bucket on a cart with wheels to reduce the effort needed.

### B. Exam-Ready Theory

#### 1. Code Motion (Loop Invariant Computation)
Move calculations that produce the same result in every iteration **outside** the loop.
*   Example: `while (i < limit - 2)` $\to$ `t = limit - 2; while (i < t)`.

#### 2. Induction Variable Elimination
If multiple variables in a loop change "in step" (e.g., $i$ and $j = 4*i$), try to eliminate one of them to reduce the number of updates.

#### 3. Strength Reduction
Replace an expensive operation (like multiplication) with a cheaper one (like addition) inside a loop.
*   Example: Instead of calculating `4*i` every time, start `t = 4` and do `t = t + 4` in each iteration.

#### 4. Loop Unrolling
Increase the loop body and decrease the number of iterations to reduce "loop overhead" (jumps and increments).

### C. Worked Examples

#### Example 1: Strength Reduction + Induction Variable
```c
for (i=0; i<n; i++) {
    a[i] = 10;
}
```
Intermediate TAC:
1. `i = 0`
2. `t1 = 4 * i`
3. `a[t1] = 10`
4. `i = i + 1`
5. `if i < n goto 2`
*   **Strength Reduction:** Change `t1 = 4 * i` to `t1 = t1 + 4`.
*   **Result:** Replaces `*` with `+`.

### D. How to Write in Exam
*   **Start With:** State that loops are the most critical area for optimization.
*   **Body:** Detail Code Motion, Strength Reduction, and Induction Variables. Use the $4*i$ example—it is the standard textbook case.
*   **Traps:** 
    *   When moving code outside a loop, ensure it doesn't have side effects.
    *   For induction variables, explain the "lock-step" relationship.
*   **Close With:** Mention that loop optimizations are often performed on the Flow Graph.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Code Motion = Move out invariants. Strength Reduction = Multi $\to$ Add. Induction = Merge variables. Unrolling = Reduce jumps.
*   **Flash Questions:**
    1. Which is cheaper: multiplication or addition? (Addition)
    2. What is "Loop Invariant" code? (Code that gives same result every iteration)
    3. What does Loop Unrolling reduce? (Loop overhead/jumps)
    4. Why are loops optimized more than other parts? (High execution frequency)
*   **Practice Prompts:**
    1. Perform strength reduction on the expression $y = 7 * i$ inside a loop.
    2. Explain Code Motion with a concrete code example.

---

## 5. DAG and Peephole Optimization
**[MODERATE | ↻ REPEATED PYQ]**

### A. What is this?
**DAG (Directed Acyclic Graph)** is the "Blueprint" the compiler uses to see the structure of code. It's better than a tree because it automatically merges identical parts.

**Peephole Optimization** is the "Last Minute Check." It looks at the final machine code through a tiny "peephole" (just 2 or 3 lines at a time) to find silly mistakes the compiler made.

> **Analogy:** 
> *   **DAG:** Like a family tree where siblings are clearly linked, so you don't have to write the "Grandparents" twice for every child.
> *   **Peephole:** Like checking your shoes before you leave. You might notice you have a "Load Shoe" and "Unload Shoe" command right next to each other, so you just skip both and keep walking.

### B. Exam-Ready Theory

#### 1. Applications of DAG
*   Detecting Common Sub-expressions.
*   Identifying variables used outside the block.
*   Determining which statements can have their computed values used elsewhere.

#### 2. Peephole Optimization Characteristics
Applied to the **Target Code** (Assembly).
1.  **Redundant Load/Store:** Removing `MOV R0, x` followed by `MOV x, R0`.
2.  **Unreachable Code:** Removing code after a `return` or `goto`.
3.  **Flow of Control:** Changing `goto L1` where `L1: goto L2` into `goto L2`.
4.  **Algebraic Simplification:** Changing `x = x + 0` to nothing, or `x = x * 1` to nothing.
5.  **Use of Machine Idioms:** Using specialized instructions like `INC` instead of `ADD #1`.

### C. Worked Examples

#### Example 1: Redundant Load/Store
```asm
MOV R0, a
MOV a, R0  <-- Delete this!
```
The second instruction is useless because `a` already matches `R0`.

#### Example 2: Flow of Control
```asm
   GOTO L1
   ...
L1: GOTO L2
```
*   **Optimized:** `GOTO L2`. This saves one jump instruction.

### D. How to Write in Exam
*   **Start With:** Define Peephole as a "local, target-code optimization."
*   **Body:** List and explain the 5 characteristics. Use the "MOV R0, x / MOV x, R0" example—it's very popular.
*   **Traps:** 
    *   Peephole is NOT machine-independent; it's done on the final instructions.
    *   The "window" size is typically small (2-3 instructions).
*   **Close With:** Mention that it's a very fast and effective way to get a 5-10% performance boost.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** DAG = Merged Tree. Peephole = Tiny window on Assembly. Targets: Redundancy, Unreachable, Jumps, Idioms.
*   **Flash Questions:**
    1. Is peephole optimization local or global? (Local)
    2. What code does peephole work on? (Target/Assembly code)
    3. Give an example of an algebraic simplification in peephole. ($x + 0 = x$)
    4. What is a "Machine Idiom"? (A CPU-specific instruction like `INC`)
*   **Practice Prompts:**
    1. Explain the role of DAG in identifying common sub-expressions.
    2. List 4 techniques used in peephole optimization with examples.

---

## 6. Code Generation: Issues and `getreg` Algorithm
**[HIGH PROBABILITY | ↻ REPEATED PYQ]**

### A. What is this?
Code Generation is the "Translator" phase. It takes the optimized Intermediate Code and turns it into the final "Binary" or "Assembly" that the computer understands. The biggest headache here is **Registers**. Registers are the fastest memory in the CPU, but there are very few of them. The `getreg` algorithm is the "Seating Chart" that decides which variable gets to sit in a "VIP Register" and who has to stay in "General Memory."

> **Analogy:** Imagine a very busy restaurant with only 4 tables (Registers). Thousands of customers (Variables) want to eat. `getreg` is the host who decides who gets a table, who has to wait in the lobby (Memory), and who has to be "kicked out" (Spilled) to make room for a new customer.

### B. Exam-Ready Theory

#### 1. Issues in Design of Code Generator
1.  **Input to Code Gen:** Usually TAC, DAG, or Syntax Tree. Assumed to be error-free.
2.  **Target Program:** Can be Absolute Machine Code, Relocatable Code, or Assembly.
3.  **Instruction Selection:** Choosing the fastest sequence of instructions (e.g., `INC` vs `ADD`).
4.  **Register Allocation:** Deciding which values stay in registers.
5.  **Evaluation Order:** The order in which instructions are generated affects register needs.

#### 2. Register and Address Descriptors
*   **Register Descriptor:** Keeps track of what is currently inside each register.
*   **Address Descriptor:** Keeps track of where the current value of a variable can be found (Register, Stack, or Memory).

#### 3. The `getreg` Algorithm
To generate code for $x = y \text{ op } z$:
1.  If $y$ is in a register, use that.
2.  If not, find an empty register.
3.  If no empty register, "Spill" a register (move its content to memory) to free it up.
4.  Criteria for spilling: Pick a register whose value isn't needed for the longest time.

### C. Worked Examples

#### Example 1: Instruction Cost Calculation
Instruction | Cost
--- | ---
`MOV R0, R1` | 1 (Register to Register)
`MOV a, R0` | 2 (Memory to Register)
`ADD #1, R0` | 2 (Immediate to Register)
*   **Rule:** Cost = 1 + cost of addressing modes.

#### Example 2: `getreg` Seating
Variable $A$ is in $R0$. We need to compute $C = A + B$.
1. `getreg` sees $A$ is already in $R0$.
2. It allocates $R0$ for the result.
3. Generated: `ADD B, R0`.
4. Update descriptors: $R0$ now contains $C$, and $C$'s address is $R0$.

### D. How to Write in Exam
*   **Start With:** List the 5 design issues. This is a very common 7-mark question.
*   **Body:** Explain Register and Address descriptors. Describe the `getreg` logic. Provide a small cost table.
*   **Traps:** 
    *   Do not forget to mention "Instruction Cost."
    *   When explaining registers, distinguish between "Allocation" (which variable) and "Assignment" (which register).
*   **Close With:** Mention that the simple code generator works block-by-block.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Code Gen = TAC $\to$ Assembly. Key issues: Instruction selection, Registers, Order. `getreg` manages register tables.
*   **Flash Questions:**
    1. What is "Register Spilling"? (Moving register content to memory to free space)
    2. What does an Address Descriptor store? (Current location of a variable's value)
    3. What is the cost of a Register-to-Register MOV? (1)
    4. Why is relocatable code better than absolute code? (Can be loaded anywhere in memory)
*   **Practice Prompts:**
    1. Explain the main issues in the design of a code generator.
    2. Describe the simple code generation algorithm for a single basic block.

