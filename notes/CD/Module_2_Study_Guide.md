# Module 2: Syntax Analysis (Top-Down Parsing)
**CST302 Compiler Design | KTU B.Tech CSE**

---

## 1. Context-Free Grammars (CFG) & Ambiguity
**[MODERATE | ↻ REPEATED PYQ]**

### A. What is this?
Syntax Analysis is the "Grammar Check" phase. If Lexical Analysis identifies the words, Syntax Analysis ensures they are used in a valid sentence structure. For this, we use **Context-Free Grammars (CFG)**, which are sets of rules that define how tokens can be combined.

> **Analogy:** Imagine a Lego set. The pieces are tokens. The instruction manual is the CFG. It tells you that a "Window" piece can go into a "Wall" section, but a "Wheel" piece cannot go into a "Roof" section. **Ambiguity** is when the manual is poorly written, and you can build two different-looking houses using the exact same steps.

In compilers, an ambiguous grammar is a nightmare because it means the computer doesn't know which interpretation of your code is correct.

### B. Exam-Ready Theory

#### 1. Components of a CFG ($G = \{V, \Sigma, P, S\}$)
*   **$V$ (Variables/Non-terminals):** Abstract symbols representing structures (e.g., $E$ for Expression).
*   **$\Sigma$ (Terminals):** The actual tokens (e.g., `+`, `id`).
*   **$P$ (Productions):** Rules of the form $A \to \alpha$.
*   **$S$ (Start Symbol):** Where the parsing begins.

#### 2. Derivations
*   **Leftmost Derivation (LMD):** Always expand the leftmost non-terminal first.
*   **Rightmost Derivation (RMD):** Always expand the rightmost non-terminal first.

#### 3. Ambiguity
A grammar is **ambiguous** if there exists at least one string in its language that has:
*   More than one LMD, OR
*   More than one RMD, OR
*   More than one Parse Tree.
**Classic Example:** $E \to E + E | E * E | \text{id}$. The string `id + id * id` can be parsed two ways (leading to different math results).

### C. Worked Examples

#### Example 1: Proving Ambiguity
**Grammar:** $S \to iCtS | iCtSeS | a$
**String:** `if C1 then if C2 then a1 else a2`
*   **Tree 1:** The `else` belongs to the first `if`.
*   **Tree 2:** The `else` belongs to the second `if`.
Since we can draw two distinct trees for the same string, the grammar is **ambiguous**.

#### Example 2: LMD vs RMD
Grammar: $E \to E + E | \text{id}$. String: `id + id + id`.
*   **LMD:** $E \Rightarrow \underline{E} + E \Rightarrow \underline{E} + E + E \Rightarrow \text{id} + \underline{E} + E \dots$
*   **RMD:** $E \Rightarrow E + \underline{E} \Rightarrow E + E + \underline{E} \Rightarrow E + E + \text{id} \dots$

### D. How to Write in Exam
*   **Start With:** Define CFG and its 4 components.
*   **Body:** Define Ambiguity clearly. Use the "two parse trees" rule as it's the easiest to draw. Show the $E \to E+E|E*E$ example—it's the universal standard.
*   **Traps:** 
    *   Do not just say a grammar is ambiguous; you MUST provide a specific string and show two different trees/derivations for it.
    *   Mention that ambiguity is a property of the *grammar*, not the language.
*   **Close With:** State that top-down parsers require unambiguous grammars.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** CFG = Rules. LMD = Left first. RMD = Right first. Ambiguous = 2+ Trees for 1 string.
*   **Flash Questions:**
    1. What are the 4 components of a CFG? ($V, \Sigma, P, S$)
    2. How many LMDs does an unambiguous grammar have for a valid string? (Exactly one)
    3. Is $E \to E+E | \text{id}$ ambiguous? (Yes)
    4. What is a terminal symbol? (A token/leaf node)
*   **Practice Prompts:**
    1. Define Ambiguity. Prove that $S \to SS | (S) | \epsilon$ is ambiguous.
    2. Show the LMD and RMD for `id * id + id` using the standard expression grammar.

---

## 2. Left Recursion and Left Factoring
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Top-down parsers (like humans reading from left to right) get very confused by two things:
1.  **Left Recursion:** When a rule starts with itself (e.g., "To define a Word, first find a Word..."). The parser will loop forever trying to find the start.
2.  **Lack of Left Factoring:** When two rules start with the same thing (e.g., "Go to the Mall" and "Go to the Market"). The parser doesn't know which way to go until it's too late.

> **Analogy:** 
> *   **Left Recursion:** Like a GPS that says "To get home, first be at home." You'll never leave your driveway.
> *   **Left Factoring:** Like a fork in the road where both signs say "To the City." You have to drive for miles before you realize you took the "City North" path instead of "City South." We "Factor" it by putting a single sign "To the City" and then splitting the path *after* the city gates.

### B. Exam-Ready Theory

#### 1. Immediate Left Recursion
A production is left-recursive if it is of the form $A \to A \alpha | \beta$.
**Elimination Rule:** Replace with:
1.  $A \to \beta A'$
2.  $A' \to \alpha A' | \epsilon$

#### 2. General Left Recursion
Happens through multiple steps, e.g., $A \to B, B \to A$. This is handled by a systematic algorithm that converts all rules to a standard order.

#### 3. Left Factoring
Used when two productions have a common prefix: $A \to \alpha \beta_1 | \alpha \beta_2$.
**Transformation:**
1.  $A \to \alpha A'$
2.  $A' \to \beta_1 | \beta_2$
This defers the decision until the parser has seen the prefix $\alpha$.

### C. Worked Examples

#### Example 1: Eliminating Left Recursion
**Grammar:** $E \to E + T | T$
*   Here, $A = E, \alpha = +T, \beta = T$.
*   **Result:**
    1. $E \to T E'$
    2. $E' \to + T E' | \epsilon$

#### Example 2: Left Factoring
**Grammar:** $S \to iEtS | iCtSeS$
*   Prefix $\alpha = iEtS$.
*   **Result:**
    1. $S \to iEtS S'$
    2. $S' \to eS | \epsilon$

### D. How to Write in Exam
*   **Start With:** Explain why these transformations are necessary (Top-down parsers cannot handle them).
*   **Body:** Provide the formal conversion formulas. This is a very common "Convert this grammar" 5-mark question.
*   **Traps:** 
    *   In Left Recursion, do not forget the $\epsilon$ in the $A'$ rule.
    *   In Left Factoring, ensure the prefix $\alpha$ is the *longest* common prefix.
*   **Close With:** State that these steps are mandatory prerequisites for **LL(1) Parsing**.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Left Recursion = Infinite loop. Left Factoring = Indecision. Recursion: $A \to \beta A'$. Factoring: $A \to \alpha A'$.
*   **Flash Questions:**
    1. Can a Recursive Descent parser handle left recursion? (No)
    2. What does Left Factoring solve? (Predictive parser conflict)
    3. Is $A \to BA$ left recursive if $B \to A$? (Yes, indirect)
    4. What is the "alpha" in $E \to E+T | T$? ($+T$)
*   **Practice Prompts:**
    1. Eliminate left recursion from: $E \to E+T|T, T \to T*F|F, F \to (E)|id$.
    2. Perform left factoring on: $A \to abB | aB | cd$.

---

## 3. FIRST and FOLLOW Sets
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
FIRST and FOLLOW are the "Lookahead Tools" of the compiler. 
*   **FIRST(A):** Tells you "If I start building an $A$, what are the possible first characters I will see?"
*   **FOLLOW(A):** Tells you "If I just finished building an $A$, what character might I see immediately after it?"

> **Analogy:** Imagine you are watching a movie. 
> *   **FIRST:** If the genre is "Horror," the **FIRST** thing you might see is a dark house or a scream. 
> *   **FOLLOW:** If the "Movie" is over, the **FOLLOW**ing thing you will see is the "Credits" or the "Exit" sign.

These sets allow the parser to choose the correct rule without guessing.

### B. Exam-Ready Theory

#### 1. Rules for FIRST($X$)
1.  If $X$ is a terminal, $FIRST(X) = \{X\}$.
2.  If $X \to \epsilon$ is a production, add $\epsilon$ to $FIRST(X)$.
3.  If $X \to Y_1 Y_2 \dots Y_k$, then add $FIRST(Y_1)$. If $Y_1$ can be $\epsilon$, add $FIRST(Y_2)$, and so on.

#### 2. Rules for FOLLOW($A$)
1.  Add $\$$ to $FOLLOW(S)$ (where $S$ is the start symbol).
2.  If there is a production $A \to \alpha B \beta$, then everything in $FIRST(\beta)$ (except $\epsilon$) is in $FOLLOW(B)$.
3.  If there is a production $A \to \alpha B$ OR $A \to \alpha B \beta$ where $FIRST(\beta)$ contains $\epsilon$, then everything in $FOLLOW(A)$ is in $FOLLOW(B)$.

### C. Worked Examples

#### Example 1: Basic Sets
**Grammar:**
1. $E \to T E'$
2. $E' \to + T E' | \epsilon$
3. $T \to \text{id}$

*   **FIRST(E):** $\{ \text{id} \}$
*   **FIRST(E'):** $\{ +, \epsilon \}$
*   **FOLLOW(E):** $\{ \$ \}$
*   **FOLLOW(E'):** Same as FOLLOW(E) = $\{ \$ \}$
*   **FOLLOW(T):** FIRST(E') = $\{ + \}$, and since E' has $\epsilon$, also FOLLOW(E) = $\{ +, \$ \}$.

### D. How to Write in Exam
*   **Start With:** Definitions of FIRST and FOLLOW.
*   **Body:** Provide the three rules for each. This is often asked as a theory question. Then, solve a grammar—this is the most frequent Part B question (7-10 marks).
*   **Traps:** 
    *   $\epsilon$ NEVER goes into a FOLLOW set.
    *   Always start FOLLOW calculation with the start symbol (add \$).
    *   Be careful with the "chain" rule in FIRST: if $Y_1 \to \epsilon$, you MUST check $Y_2$.
*   **Close With:** Mention that these sets are used to build the **LL(1) Parsing Table**.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** FIRST = First terminals. FOLLOW = Terminals after NT. $\$$ in start FOLLOW. $\epsilon$ NOT in FOLLOW.
*   **Flash Questions:**
    1. Is $\epsilon$ allowed in a FIRST set? (Yes)
    2. What symbol is always in FOLLOW(Start)? (\$)
    3. If $A \to B$, is FOLLOW(A) $\subseteq$ FOLLOW(B)? (Yes)
    4. What set helps handle $\epsilon$-productions in parsing? (FOLLOW)
*   **Practice Prompts:**
    1. Calculate FIRST and FOLLOW for the expression grammar after removing left recursion.
    2. Explain the algorithm to compute FOLLOW sets.

---

## 4. LL(1) Parsing (Predictive Parsing)
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
LL(1) is the "Professional" top-down parser. 
*   **L:** Scans input Left-to-right.
*   **L:** Uses a Leftmost derivation.
*   **1:** Looks ahead at exactly one token to make a decision.
It uses a **Parsing Table** to decide which production to apply. If you are in state "Expression" and you see "id," the table tells you exactly which rule to use. No backtracking, no guessing.

> **Analogy:** Imagine a subway system. You are at a station (Non-terminal). You have a ticket for "Destination X" (Lookahead token). You look at a big board (Parsing Table). It tells you exactly which train (Production) to take. There is only one correct train for every destination.

### B. Exam-Ready Theory

#### 1. Predictive Parsing Table Construction
For every production $A \to \alpha$:
1.  For each terminal $a \in FIRST(\alpha)$, add $A \to \alpha$ to $M[A, a]$.
2.  If $\epsilon \in FIRST(\alpha)$, then for each terminal $b \in FOLLOW(A)$, add $A \to \alpha$ to $M[A, b]$.
3.  If $\epsilon \in FIRST(\alpha)$ and $\$ \in FOLLOW(A)$, add $A \to \alpha$ to $M[A, \$]$.

#### 2. LL(1) Grammar Condition
A grammar is LL(1) if and only if the parsing table has **no multiple entries** (no conflicts).
*   *Requirement:* Must be unambiguous, no left recursion, and left-factored.

#### 3. LL(1) vs Recursive Descent
| Feature | Recursive Descent | LL(1) Predictive |
| :--- | :--- | :--- |
| **Implementation** | Functions (Recursion) | Table + Stack |
| **Logic** | May Backtrack | No Backtracking |
| **Efficiency** | Slower (Call overhead) | Faster (Table lookup) |

### C. Worked Examples

#### Example 1: Table Conflict
If $FIRST(A \to \alpha) \cap FIRST(A \to \beta) \neq \emptyset$, then for some terminal $a$, both rules will be in $M[A, a]$. This is a **FIRST-FIRST conflict**.

#### Example 2: The Stack Trace
To parse `id + id`:
1.  Stack: `$E$`. Input: `id + id $`
2.  Table says $E \to T E'$. Pop $E$, push $E' T$.
3.  Stack: `$E' T$`. Input: `id...`
4.  Table says $T \to \text{id}$. Pop $T$, push `id`.
5.  Stack: `$E' \text{id}$`. Match `id` with input.
6.  ...and so on.

### D. How to Write in Exam
*   **Start With:** Draw the block diagram of a Predictive Parser (Input, Stack, Table, Driver).
*   **Body:** Write the algorithm for Table Construction. Solve a full problem: Grammar $\to$ FIRST/FOLLOW $\to$ Table $\to$ Trace a string. This is a 14-mark question.
*   **Traps:** 
    *   If a rule has $\epsilon$, remember to use the FOLLOW set for those table entries.
    *   In the stack trace, the stack is pushed in **reverse order** (e.g., for $A \to XYZ$, push $Z, Y, X$).
*   **Close With:** State that LL(k) grammars are a subset of LR(k) grammars.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** LL(1) = Table driven. No backtracking. Table uses FIRST and FOLLOW. Multiple entries = Not LL(1).
*   **Flash Questions:**
    1. Can an LL(1) grammar be ambiguous? (No)
    2. What happens if a table entry is empty? (Syntax Error)
    3. Why is the stack pushed in reverse? (To keep the first symbol on top)
    4. What is a FIRST-FOLLOW conflict? (When FIRST and FOLLOW of an NT overlap and it has an $\epsilon$ rule)
*   **Practice Prompts:**
    1. Construct the LL(1) parsing table for the expression grammar.
    2. Trace the string `(id + id) * id` using the table-driven algorithm.
