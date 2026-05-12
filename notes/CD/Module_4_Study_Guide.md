# Module 4: Syntax Directed Translation and Run-Time Environments
**CST302 Compiler Design | KTU B.Tech CSE**

---

## 1. Semantic Analysis & Syntax Directed Translation (SDT)
**[HIGH PROBABILITY | ↻ REPEATED PYQ]**

### A. What is this?
If the Parser is the grammar teacher who checks if your sentence follows the rules (Syntax), the Semantic Analyzer is the logic teacher who checks if your sentence actually makes sense (Semantics). A sentence like "The apple ate the boy" is syntactically perfect but semantically weird. In programming, semantic analysis checks for things like adding a string to an integer or using a variable that was never declared.

> **Analogy:** Imagine you are filling out a government form. Syntax analysis is checking if you filled in every required box. Semantic analysis is checking if the "Date of Birth" you provided actually makes you old enough to apply for the "Senior Citizen" discount.

**Syntax Directed Translation (SDT)** is the mechanism we use to perform these checks and generate code. It works by attaching "actions" or "rules" to the grammar productions. As the parser builds the tree, it executes these rules to calculate values, check types, or generate intermediate code.

### B. Exam-Ready Theory

#### 1. Need for Semantic Analysis
The parser is limited to Context-Free Grammars (CFG), which cannot express dependencies like "a variable must be declared before use." Semantic analysis fills this gap by:
*   **Type Checking:** Ensuring operands are compatible with operators.
*   **Scope Checking:** Ensuring variables are used within their defined blocks.
*   **Object Binding:** Linking identifiers to their memory locations or definitions.

#### 2. Principles of SDT
SDT associates **Attributes** with grammar symbols.
*   **Syntax Directed Definition (SDD):** A high-level specification that uses mathematical rules to define attributes. It doesn't specify *when* to evaluate them, only *how*.
*   **Syntax Directed Translation Scheme (SDT Scheme):** A grammar with program fragments (semantic actions) embedded directly into the production bodies. This specifies the exact order of evaluation.

#### 3. Semantic Errors
Common errors caught in this phase:
*   Type mismatch (e.g., `int x = "hello"`)
*   Undeclared variables.
*   Multiple declarations in the same scope.
*   Function parameter mismatch (wrong number or type of arguments).

### C. Worked Examples

#### Example 1: SDD for a Desk Calculator
This is a classic exam question.
**Productions and Rules:**
1.  $L \to E \text{ n}$ : `print(E.val)`
2.  $E \to E_1 + T$ : `E.val = E1.val + T.val`
3.  $E \to T$ : `E.val = T.val`
4.  $T \to T_1 * F$ : `T.val = T1.val * F.val`
5.  $T \to F$ : `T.val = F.val`
6.  $F \to (E)$ : `F.val = E.val`
7.  $F \to \text{digit}$ : `F.val = digit.lexval`

#### Example 2: Annotated Parse Tree
For input `3 * 5 + 4 n`:
1.  `digit` (3) $\to F.val=3 \to T.val=3$
2.  `digit` (5) $\to F.val=5$
3.  $T \to T * F \to T.val = 3 * 5 = 15 \to E.val = 15$
4.  `digit` (4) $\to F.val=4 \to T.val=4$
5.  $E \to E + T \to E.val = 15 + 4 = 19$
6.  $L \to E \text{ n} \to \text{print } 19$.

### D. How to Write in Exam
*   **Start With:** Define Semantic Analysis and SDT. Use the desk calculator SDD as your primary example—it's the "Hello World" of this module.
*   **Body:** List the responsibilities of semantic analysis. Differentiate between SDD (rules) and SDT Schemes (actions).
*   **Traps:** 
    *   Don't confuse SDT with Parsing. SDT *uses* the parser's structure but does "extra" work.
    *   In the desk calculator example, make sure to use `.val` or `.lexval` to indicate attribute values.
*   **Close With:** Mention that the output of this phase is often an **Annotated Parse Tree** or **Intermediate Code**.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Semantic = Logic/Sense. SDD = Grammar + Rules. SDT = Grammar + Actions. Desk Calculator is the key example.
*   **Flash Questions:**
    1. What does SDD stand for? (Syntax Directed Definition)
    2. Name one error caught by semantic analysis. (Type mismatch)
    3. What is an annotated parse tree? (A parse tree showing attribute values at each node)
    4. Is type checking part of syntax analysis? (No, semantic analysis)
*   **Practice Prompts:**
    1. Write the SDD for a grammar that converts binary to decimal.
    2. Draw an annotated parse tree for the expression `(2+3)*4`.

---

## 2. Attributes: Synthesized vs. Inherited
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Attributes are like "sticky notes" attached to the nodes of a parse tree. There are two ways information can flow through these notes:
1.  **Synthesized (Bottom-Up):** Children give information to the parent. It's like a family where the kids earn money and give it to the head of the household.
2.  **Inherited (Top-Down/Sideways):** The parent or siblings give information to a node. It's like an inheritance where you get money from your parents or a gift from your brother.

> **Analogy:** Imagine a group project. **Synthesized** is when each student finishes their part and gives it to the leader to assemble the final report. **Inherited** is when the leader tells the students what font and format to use before they start writing.

### B. Exam-Ready Theory

#### 1. Synthesized Attributes
An attribute is synthesized if its value at a node $n$ is determined from the attribute values at the **children** of $n$ and $n$ itself.
*   **Evaluation:** Can be evaluated during a single **Bottom-Up** (Post-order) traversal.
*   **Example:** In $E \to E_1 + T$, `E.val` is calculated from `E1.val` and `T.val`.

#### 2. Inherited Attributes
An attribute is inherited if its value at a node $n$ is determined from the attribute values at the **parent** of $n$, $n$ itself, and its **siblings**.
*   **Evaluation:** Usually requires a **Top-Down** or more complex traversal.
*   **Example:** In declarations like `int a, b, c;`, the type `int` is passed "sideways" or "downwards" to the identifiers `a`, `b`, and `c`.

#### 3. Comparison Table
| Feature | Synthesized | Inherited |
| :--- | :--- | :--- |
| **Source** | Children | Parent and Siblings |
| **Flow** | Upwards | Downwards / Sideways |
| **Evaluation Order** | Bottom-Up (Post-order) | Top-Down / Mixed |
| **Usage** | Expression evaluation | Type declarations, Scope |
| **Dependency** | Simple | Can be complex |

### C. Worked Examples

#### Example 1: Synthesized (Expression)
Production: $T \to T_1 * F$
Rule: `T.val = T1.val * F.val`
Here, `T.val` is synthesized because it depends on its children $T_1$ and $F$.

#### Example 2: Inherited (Declarations)
Production: $D \to T L, L \to L_1, \text{id} | \text{id}$
Rules:
1.  `L.in = T.type` (Inherited from sibling $T$)
2.  `L1.in = L.in` (Inherited from parent $L$)
For `int a, b`, the `type` attribute flows from `int` to $L$, then down to each `id`.

### D. How to Write in Exam
*   **Start With:** Definitions of both types. This is a very common "Distinguish between" 5-mark question.
*   **Body:** Provide the formal definition (Node $n$ depends on...). Use the comparison table provided above.
*   **Traps:** 
    *   Do not say inherited attributes *only* come from parents; they can come from siblings too!
    *   Ensure your examples clearly show the direction of data flow.
*   **Close With:** State that an SDD with only synthesized attributes is called an **S-attributed definition**.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Synthesized = Up (Children to Parent). Inherited = Down/Sideways (Parent/Siblings to Self).
*   **Flash Questions:**
    1. Which attribute type is used for expression values? (Synthesized)
    2. Which attribute type is used for distributing types in declarations? (Inherited)
    3. Can an inherited attribute depend on children? (No, that would make it synthesized or a cycle)
    4. What traversal is used for synthesized attributes? (Post-order)
*   **Practice Prompts:**
    1. Distinguish between synthesized and inherited attributes with an example for each.
    2. Explain how inherited attributes are used in a declaration like `float x, y, z`.

---

## 3. Dependency Graphs & Evaluation Order
**[MODERATE | ↻ REPEATED PYQ]**

### A. What is this?
A dependency graph is a "map of influence." In an SDD, some attributes depend on others. For example, if you need to calculate $E.val = E_1.val + T.val$, you clearly need the values of $E_1$ and $T$ first. The dependency graph tracks these requirements using arrows. If attribute $X$ needs attribute $Y$, an arrow goes from $Y$ to $X$.

> **Analogy:** Think of cooking a complex meal. You can't "fry the onions" until you have "chopped the onions." The "chopped onions" are a dependency for the "fried onions." A dependency graph for a recipe would show the order in which every ingredient must be prepped before the final dish is assembled.

### B. Exam-Ready Theory

#### 1. Formal Definition
A **Dependency Graph** is a directed graph where:
*   Nodes represent attributes of the grammar symbols at a particular parse tree node.
*   An edge from attribute $a$ to attribute $b$ exists if $b$ is calculated using $a$.

#### 2. Evaluation Order: Topological Sort
To evaluate the attributes, we must find an order such that for every edge $a \to b$, $a$ is evaluated before $b$. This order is called a **Topological Sort**.
*   **Property:** A topological sort exists IF AND ONLY IF the dependency graph has no **cycles**.
*   **Cycles:** If a cycle exists (e.g., $A$ depends on $B$, and $B$ depends on $A$), the SDD is invalid and cannot be evaluated.

#### 3. Relation to Traversal
*   For **S-attributed** definitions, the order is always a simple post-order traversal.
*   For **L-attributed** definitions, a more specific depth-first, left-to-right traversal is required.

### C. Worked Examples

#### Example 1: Drawing a Dependency Graph
Production: $E \to E_1 + T$
Rule: `E.val = E1.val + T.val`
Nodes: `E1.val`, `T.val`, `E.val`
Edges: `E1.val -> E.val` and `T.val -> E.val`.

#### Example 2: Cycle Detection
If production $A \to B$ had rules `A.s = B.i` and `B.i = A.s + 1`, we would have a cycle: `A.s -> B.i -> A.s`. This SDD is un-evaluatable.

### D. How to Write in Exam
*   **Start With:** Define the Dependency Graph and its purpose (finding evaluation order).
*   **Body:** Explain Topological Sort. State clearly that cycles make evaluation impossible.
*   **Traps:** 
    *   Ensure arrows point FROM the source TO the result (Independent -> Dependent).
    *   Mention that each parse tree has its own unique dependency graph.
*   **Close With:** Connect this to the next topic (S and L attributed definitions).

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Graph of attribute needs. Topological sort = evaluation order. No cycles allowed.
*   **Flash Questions:**
    1. What does an edge $a \to b$ mean? ($b$ depends on $a$)
    2. What algorithm finds the evaluation order? (Topological Sort)
    3. What prevents an SDD from being evaluated? (Cycles)
    4. Is the dependency graph built on the grammar or the parse tree? (Parse tree)
*   **Practice Prompts:**
    1. Draw the dependency graph for the declaration `int x, y`.
    2. Explain why circular dependencies are a problem in SDDs.

---

## 4. S-attributed and L-attributed Definitions
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
These are "well-behaved" versions of SDDs. While a general SDD can have arrows going anywhere (as long as there are no cycles), S and L attributed definitions follow strict rules that make them easy for a compiler to process.

*   **S-attributed:** The "Simplest." Only uses synthesized attributes. Data only flows **up**.
*   **L-attributed:** The "Left-to-right." Uses synthesized AND inherited attributes, but data can only flow **down or to the right**. It never flows from a right-sibling to a left-sibling.

### B. Exam-Ready Theory

#### 1. S-attributed Definitions
An SDD is **S-attributed** if every attribute is synthesized.
*   **Evaluation:** Can be evaluated during a single **Bottom-Up** parse (Post-order traversal).
*   **Implementation:** Easy to implement using a parser stack during Shift-Reduce parsing.

#### 2. L-attributed Definitions
An SDD is **L-attributed** if for every production $A \to X_1 X_2 \dots X_n$, every inherited attribute of $X_j$ depends only on:
1.  Attributes of symbols to its left ($X_1, \dots, X_{j-1}$).
2.  Inherited attributes of the parent $A$.
*   **Crucial Rule:** It cannot depend on attributes of $X_{j+1} \dots X_n$ (right siblings).
*   **Relation:** Every S-attributed definition is also L-attributed.

#### 3. Comparison Table
| Feature | S-attributed | L-attributed |
| :--- | :--- | :--- |
| **Attributes** | Synthesized only | Synthesized & Inherited |
| **Data Flow** | Up only | Down, Up, Left-to-Right |
| **Ease of Eval** | Very Easy | Moderately Easy |
| **Traversal** | Post-order | Pre-order + Post-order |

### C. Worked Examples

#### Example 1: L-attributed Check
Production: $A \to B C$
1.  `C.in = B.val` (L-attributed? **Yes**, $B$ is to the left of $C$).
2.  `B.in = C.val` (L-attributed? **No**, $C$ is to the right of $B$).

#### Example 2: S-attributed implementation
During a reduction $E \to E + T$, the values for $E$ and $T$ are already on the parser stack. The semantic action just pops them, adds them, and pushes the result back. This is why Yacc/Bison prefer S-attributed logic.

### D. How to Write in Exam
*   **Start With:** Definitions of both. State that S-attributed is a subset of L-attributed.
*   **Body:** Provide the formal rules for L-attributed (the "two sources" rule).
*   **Traps:** 
    *   Many students forget that L-attributed *can* have synthesized attributes.
    *   The "left-to-right" rule is the most important part of the L-attributed definition.
*   **Close With:** Explain that these classes of SDDs are preferred because they don't require building the full dependency graph for every parse.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** S = Synthesized only (Up). L = Inherited allowed but only from left/parent. S is a subset of L.
*   **Flash Questions:**
    1. Is $A \to B C \{B.i = f(C.s)\}$ L-attributed? (No)
    2. What traversal is used for L-attributed? (Depth-first, left-to-right)
    3. Can an S-attributed SDD be evaluated bottom-up? (Yes, always)
    4. Which is more powerful, S or L? (L-attributed)
*   **Practice Prompts:**
    1. Prove that all S-attributed definitions are L-attributed.
    2. Convert a non-L-attributed grammar to an L-attributed one (using internal knowledge of grammar refactoring).

---

## 5. Intermediate Code: DAG and Three Address Code (TAC)
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Intermediate Code is the "Universal Language" inside the compiler. It's too complex to be source code (like C) but too simple to be machine code (like Assembly). It's the sweet spot where optimization happens.

*   **DAG (Directed Acyclic Graph):** A super-smart version of a parse tree. It identifies common sub-expressions (like calculating `a+b` twice) and points both uses to a single node. It's essentially a tree that "shares" its branches.
*   **Three Address Code (TAC):** A simplified instructions set where each line has at most three "addresses" (variables). Example: $x = y + z$.

### B. Exam-Ready Theory

#### 1. DAG for Expressions
A DAG for an expression is like a syntax tree, but a node is shared if it represents a common sub-expression.
*   **Leaves:** Variables or constants.
*   **Interior Nodes:** Operators.
*   **Advantage:** Automatically performs **Common Sub-expression Elimination**.

#### 2. Three Address Code (TAC)
TAC is a sequence of instructions of the form $x = y \text{ op } z$.
**Types of TAC:**
1.  **Assignment:** $x = y \text{ op } z$ or $x = \text{op } y$.
2.  **Copy:** $x = y$.
3.  **Unconditional Jump:** `goto L`.
4.  **Conditional Jump:** `if x relop y goto L`.
5.  **Procedure Calls:** `param x`, `call p, n`.

#### 3. Implementations of TAC (Very Important!)
*   **Quadruples:** Has 4 fields: `op, arg1, arg2, result`.
    *   *Pros:* Easy to optimize.
*   **Triples:** Has 3 fields: `op, arg1, arg2`. The result is referred to by the position (index) of the triple itself.
    *   *Cons:* Hard to move code around during optimization.
*   **Indirect Triples:** A table of pointers to triples. Solves the "moving code" problem of Triples.

### C. Worked Examples

#### Example 1: DAG vs Syntax Tree
For expression: `a = b * c + b * c`
*   **Syntax Tree:** Two identical `*` nodes and two identical `+` nodes.
*   **DAG:** Only one `*` node for `b * c`. The `+` node takes both its left and right inputs from that same `*` node.

#### Example 2: Quadruples vs Triples
For `a = b * -c`:
**Quadruples:**
1. `minus, c, _, t1`
2. `mult, b, t1, t2`
3. `assign, t2, _, a`

**Triples:**
(0) `minus, c, _`
(1) `mult, b, (0)`
(2) `assign, a, (1)`

### D. How to Write in Exam
*   **Start With:** Define Intermediate Code and its role in portability and optimization.
*   **Body:** Explain DAG and draw one. Then detail the Quadruples and Triples tables—this is a "Sure Shot" 10-mark question.
*   **Traps:** 
    *   In Triples, remember that you refer to previous results using their index in parentheses, e.g., `(0)`.
    *   In Quadruples, you MUST create temporary variables like `t1, t2`.
*   **Close With:** Mention that TAC is often generated from SDDs using `mkNode` and `mkLeaf` functions.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** DAG = Tree with shared common parts. TAC = 3 addresses max. Quadruples = `op, a1, a2, res`. Triples = No result field (use index).
*   **Flash Questions:**
    1. What is the main advantage of a DAG? (Eliminates common sub-expressions)
    2. How many fields does a Quadruple have? (Four)
    3. How do Triples refer to intermediate results? (By their instruction index)
    4. What is the "result" field in a Triple? (There isn't one)
*   **Practice Prompts:**
    1. Convert $x = (a+b) * (a+b) + c$ into DAG and Quadruples.
    2. Compare Quadruples, Triples, and Indirect Triples.

---

## 6. Run-Time Environments: Activation Records & Storage
**[HIGH PROBABILITY | ↻ REPEATED PYQ]**

### A. What is this?
Now we move from the "logic" of the code to the "reality" of the computer's memory. When a function is called, the computer needs to set aside a block of memory for that function's variables, parameters, and return address. This block is called an **Activation Record** (or Stack Frame). 

> **Analogy:** Imagine a hotel. When a guest (function) checks in, the hotel assigns them a "Room" (Activation Record). The room has space for their luggage (local variables), their room key (return address), and their room service orders (parameters). When the guest checks out (function returns), the room is cleared for the next guest.

### B. Exam-Ready Theory

#### 1. Structure of an Activation Record
A standard record contains (in order):
1.  **Actual Parameters:** Values passed by the caller.
2.  **Returned Value:** Space for the result.
3.  **Control Link:** Pointer to the AR of the caller.
4.  **Access Link:** Pointer to the AR of the surrounding scope (for nested functions).
5.  **Saved Machine Status:** Register values before the call.
6.  **Local Data:** Variables declared inside the function.
7.  **Temporaries:** Intermediate values used in calculations.

#### 2. Storage Allocation Strategies
*   **Static Allocation:** Memory is assigned at compile-time. Used for globals. No recursion allowed.
*   **Stack Allocation:** Memory is pushed on call and popped on return. Supports recursion.
*   **Heap Allocation:** Memory is allocated/deallocated at will (e.g., `malloc` or `new`). Used for dynamic data structures.

#### 3. Storage Hierarchy
`Code -> Static Data -> Stack -> [Free Memory] <- Heap`
The Stack grows down, and the Heap grows up towards each other.

### C. Worked Examples

#### Example 1: Tracing Activation Records
Function `Fact(n)` calls itself.
1. `Fact(3)` is called. AR for `Fact(3)` is pushed.
2. `Fact(2)` is called. AR for `Fact(2)` is pushed on top of `Fact(3)`.
3. `Fact(1)` is called. AR for `Fact(1)` is pushed on top.
4. `Fact(1)` returns. Its AR is popped.

#### Example 2: Static vs Stack
*   If a language only uses **Static Allocation**, it cannot support recursive functions because there is only one "room" for each function. If the function calls itself, it would overwrite its own variables.
*   **Stack Allocation** creates a NEW room for every call, allowing recursion.

### D. How to Write in Exam
*   **Start With:** Draw a neat diagram of an Activation Record. Label all 7 fields.
*   **Body:** Explain each field briefly. Discuss the three allocation strategies (Static, Stack, Heap).
*   **Traps:** 
    *   Do not forget the "Temporaries" field in the AR.
    *   Clearly state that Static allocation forbids recursion.
*   **Close With:** Explain the Stack-Heap collision (running out of memory).

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** AR = Stack Frame. Fields: Params, Return, Links, Status, Locals, Temps. Static = No recursion. Stack = Recursion OK.
*   **Flash Questions:**
    1. Where are local variables stored? (In the Activation Record)
    2. Which link supports nested scopes? (Access Link)
    3. What happens to an AR when a function returns? (It is popped/deallocated)
    4. Why can't static allocation support recursion? (Single fixed memory location per function)
*   **Practice Prompts:**
    1. Draw and explain the structure of an Activation Record.
    2. Compare static, stack, and heap allocation strategies.

