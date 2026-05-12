# Module 3: Bottom-Up Parsing and LR Parsing
**CST302 Compiler Design | KTU B.Tech CSE**

---

## 1. Introduction to Bottom-Up Parsing & Shift-Reduce Mechanics
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Bottom-up parsing is like solving a jigsaw puzzle where you start with the individual pieces (tokens) and gradually group them together to form larger sections (non-terminals) until the entire picture (the start symbol) is complete. Unlike top-down parsing, which starts with a "vision" of the root and tries to guess which branches to grow, bottom-up parsing is purely evidence-based. It looks at the input tokens and asks, "What production rule could have generated this substring?"

> Imagine you are reading a sentence like "The cat sat on the mat." In a top-down approach, you assume it's a "Sentence" and look for a "Noun Phrase" followed by a "Verb Phrase." In a bottom-up approach, you identify "cat" as a Noun, "The" as an Article, and then combine them to form a "Noun Phrase." You keep building upwards until you have identified the entire structure as a "Sentence."

This approach is mathematically "stronger" than top-down parsing because it doesn't need to guess. It waits until it has seen enough of the input to make a definitive decision. In the context of compilers, this is officially called **Shift-Reduce Parsing** because the parser essentially performs two main actions: shifting tokens onto a stack and reducing them to non-terminals.

### B. Exam-Ready Theory
Bottom-up parsing (also known as **LR parsing**, where L = Left-to-right scan and R = Rightmost derivation in reverse) works by constructing a parse tree starting from the leaves and moving towards the root.

#### 1. The Core Mechanism: Reduction
A reduction is the reverse of a production. If $A \to \beta$ is a production, then replacing $\beta$ with $A$ in a sentential form is a reduction.
*   **Goal:** To reduce the input string $w$ to the start symbol $S$.
*   **Trace:** A bottom-up parse corresponds to a **Rightmost Derivation in reverse**.

#### 2. Shift-Reduce Parser Actions
A shift-reduce parser maintains a **stack** to hold grammar symbols and an **input buffer** for the remaining tokens. It can perform four actions:
1.  **Shift:** Move the next input symbol from the buffer onto the top of the stack.
2.  **Reduce:** If the top of the stack contains a string $\beta$ that matches the right side of a production $A \to \beta$, replace $\beta$ with $A$.
3.  **Accept:** Successfully finish parsing if the stack contains only the start symbol and the input buffer is empty.
4.  **Error:** If neither shift nor reduce is possible, a syntax error is reported.

#### 3. Stack Configuration
The parser configuration is represented as:
$$ (\text{Stack}, \text{Input}) $$
Initial state: $(\$, w\$)$
Final state: $(\$S, \$)$

#### 4. Comparison: Top-Down vs Bottom-Up
| Feature | Top-Down (LL) | Bottom-Up (LR) |
| :--- | :--- | :--- |
| **Derivation** | Leftmost | Rightmost in reverse |
| **Starting Point** | Start Symbol (Root) | Input String (Leaves) |
| **Logic** | Predictive (Guesses) | Evidence-based (Waits) |
| **Grammar Class** | Small (No Left Recursion) | Large (Handles most CFGs) |
| **Conflicts** | First/Follow overlaps | Shift-Reduce / Reduce-Reduce |

### C. Worked Examples

#### Example 1: Basic Shift-Reduce Trace
**Grammar:**
1. $E \to E + T$
2. $E \to T$
3. $T \to T * F$
4. $T \to F$
5. $F \to (E)$
6. $F \to \text{id}$

**Input String:** $\text{id}_1 * \text{id}_2$

| Stack | Input | Action |
| :--- | :--- | :--- |
| $\$$ | $\text{id}_1 * \text{id}_2 \$$ | Shift |
| $\$ \text{id}_1$ | $* \text{id}_2 \$$ | Reduce by $F \to \text{id}$ |
| $\$ F$ | $* \text{id}_2 \$$ | Reduce by $T \to F$ |
| $\$ T$ | $* \text{id}_2 \$$ | Shift |
| $\$ T *$ | $\text{id}_2 \$$ | Shift |
| $\$ T * \text{id}_2$ | $\$$ | Reduce by $F \to \text{id}$ |
| $\$ T * F$ | $\$$ | Reduce by $T \to T * F$ |
| $\$ T$ | $\$$ | Reduce by $E \to T$ |
| $\$ E$ | $\$$ | **Accept** |

#### Example 2: Exam-Style Variation (Handles)
Find the rightmost derivation in reverse (reductions) for $a + b$ with grammar $S \to E, E \to E+E | \text{id}$.
1. Input: $\text{id} + \text{id}$
2. Reduce first $\text{id}$ to $E$: $E + \text{id}$
3. Reduce second $\text{id}$ to $E$: $E + E$
4. Reduce $E + E$ to $E$: $E$
5. Reduce $E$ to $S$: $S$
**Common Wrong Approach:** Reducing the second $\text{id}$ before the first. Remember, bottom-up parsing follows a **Rightmost derivation in reverse**, so we always look for the "handle" which corresponds to the leftmost reduction in the reverse sequence.

### D. How to Write in Exam
*   **Start With:** Define Bottom-Up parsing as the process of building a parse tree from leaves to root. Mention it corresponds to the reverse of a Rightmost Derivation. Draw a simple diagram showing the stack and input buffer.
*   **Body:** Explain the four actions (Shift, Reduce, Accept, Error) clearly. Use a table to trace a simple expression like $\text{id} + \text{id}$.
*   **Traps:** 
    *   Do not forget the $\$$ symbol at the bottom of the stack and end of input.
    *   Ensure that every reduction corresponds to a valid production rule.
    *   Avoid "Reducing too early" – make sure the entire RHS of a production is on the stack before reducing.
*   **Close With:** Mention that this is the basis for powerful parsers like Yacc and Bison.

**Mark Split Plan:**
*   Definition & Logic: 2 Marks
*   4 Actions Explanation: 3 Marks
*   Traced Example: 4 Marks
*   Comparison Table: 2 Marks

**Upgrade Layer:** Mention that Shift-Reduce parsing is inherently non-deterministic unless guided by a **Parsing Table** (which leads into LR parsing).

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Bottom-up = Leaves to Root. LR = Left-to-right, Rightmost-reverse. Actions: Shift, Reduce, Accept, Error.
*   **Flash Questions:**
    1. What data structure is used in SR parsing? (Stack)
    2. What is a reduction? (Replacing RHS with LHS of a production)
    3. What is the initial configuration? ($\$, w\$$)
    4. What does L in LR stand for? (Left-to-right scan)
    5. What is the final stack content for success? (Start symbol)
*   **Practice Prompts:**
    1. Trace $i+i*i$ using the standard expression grammar.
    2. Explain why bottom-up parsing is called "Rightmost derivation in reverse."

---

## 2. Handle, Handle Pruning, and Viable Prefixes
**[HIGH PROBABILITY | ↻ REPEATED PYQ]**

### A. What is this?
If a shift-reduce parser is a surgeon, the "Handle" is the exact piece of tissue that needs to be removed (reduced) at any given moment. Identifying the handle is the most critical part of bottom-up parsing. If you reduce the wrong string, or reduce too early, you'll never reach the start symbol.

> Imagine you are building a Lego castle. You have a pile of bricks (tokens). You see four bricks that perfectly form a window. That specific group of four bricks is your "Handle." "Handle Pruning" is the act of snapping those bricks together to form the window non-terminal.

**Viable Prefixes** are the strings that can appear on the parser's stack. They are called "viable" because they do not contain any symbols past the end of a handle. As long as the stack contains a viable prefix, the parser hasn't made a mistake yet.

### B. Exam-Ready Theory

#### 1. Formal Definition of a Handle
A **handle** is a substring that matches the right-hand side of a production AND whose reduction to the non-terminal on the left-hand side represents one step in the reverse of a rightmost derivation.
*   Formally: If $S \Rightarrow^*_{rm} \alpha Aw \Rightarrow_{rm} \alpha \beta w$, then $A \to \beta$ at the position following $\alpha$ is a handle of $\alpha \beta w$.
*   **Crucial Note:** A substring that matches a production's RHS is NOT necessarily a handle. It must be part of a valid rightmost derivation.

#### 2. Handle Pruning
The process of repeatedly finding a handle and reducing it is called **Handle Pruning**. 
*   If $w$ is a sentence, then $w = \gamma_n \Rightarrow \gamma_{n-1} \Rightarrow \dots \Rightarrow \gamma_0 = S$.
*   To parse $w$, we find the handle $\beta_n$ in $\gamma_n$ and replace it with $A_n$ to get $\gamma_{n-1}$.

#### 3. Viable Prefixes
A **Viable Prefix** is a prefix of a right sentential form that does not continue past the right end of the rightmost handle of that sentential form.
*   **Significance:** In shift-reduce parsing, the stack always contains a viable prefix.
*   If the parser sees something that is NOT a viable prefix, it knows a syntax error has occurred.

#### 4. Shift-Reduce Conflicts
A conflict occurs when the parser doesn't know whether to shift or reduce.
*   **Shift-Reduce Conflict:** Both a shift and a reduction are valid actions for the same state/input.
*   **Reduce-Reduce Conflict:** Two or more different reductions are possible.
*   *Cause:* Usually ambiguous grammars or grammars that are not LR.

### C. Worked Examples

#### Example 1: Identifying Handles
**Grammar:** $E \to E + E, E \to E * E, E \to (E), E \to \text{id}$
**Right Sentential Form:** $\text{id}_1 + E_2 * \text{id}_3$
*   Is $\text{id}_1$ a handle? Yes, it can be reduced to $E$.
*   Is $E_2 * \text{id}_3$ a handle? No, because $\text{id}_3$ must be reduced first in a rightmost derivation.
*   *Trace of Pruning:*
    1. $\text{id}_1 + \text{id}_2 * \text{id}_3$ (Handle: $\text{id}_1$)
    2. $E + \text{id}_2 * \text{id}_3$ (Handle: $\text{id}_2$)
    3. $E + E * \text{id}_3$ (Handle: $\text{id}_3$)
    4. $E + E * E$ (Handle: $E * E$)
    5. $E + E$ (Handle: $E + E$)
    6. $E$ (Start Symbol)

#### Example 2: Viable Prefix Trace
For grammar $S \to (S) | a$:
Input: $((a))$
1. Stack: $($ (Viable prefix)
2. Stack: $(($ (Viable prefix)
3. Stack: $((a$ (Viable prefix, $a$ is the handle)
4. Stack: $((S$ (Viable prefix, after reduction)

### D. How to Write in Exam
*   **Start With:** Define a Handle formally using the $S \Rightarrow^*_{rm} \alpha Aw$ notation. This is what professors look for.
*   **Body:** Explain Handle Pruning as the "reduction process." Clearly define Viable Prefixes and their relationship to the stack.
*   **Traps:** 
    *   Do not confuse a simple RHS match with a Handle.
    *   When defining Viable Prefixes, emphasize that they "do not cross the right end of the handle."
*   **Close With:** Explain that the GOTO graph of an LR parser is actually a DFA that recognizes viable prefixes.

**Mark Split Plan:**
*   Handle Definition: 2 Marks
*   Handle Pruning Process: 3 Marks
*   Viable Prefix Concept: 3 Marks
*   Example Trace: 4 Marks

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Handle = Reducible RHS in a RM derivation. Pruning = Repeated reduction. Viable Prefix = Stack content (handle-capped).
*   **Flash Questions:**
    1. Is every RHS match a handle? (No)
    2. What derivation does bottom-up parsing reverse? (Rightmost)
    3. What is the property of a viable prefix? (Does not go past the handle's end)
    4. What causes a Reduce-Reduce conflict? (Ambiguity or weak grammar)
*   **Practice Prompts:**
    1. Define Viable Prefix and explain its role in error detection.
    2. For $S \to aABe, A \to Abc|b, B \to d$, find handles for $abbcde$.

---

## 3. Operator Precedence Parsing
**[MODERATE | ↻ REPEATED PYQ]**

### A. What is this?
Operator Precedence Parsing is a "quick and dirty" bottom-up parsing method designed specifically for mathematical expressions. It completely ignores non-terminals (treating them as transparent) and focuses entirely on the precedence of operators ($+, -, *, /$). It's like a bouncer at a club who only cares about the VIP status (precedence) of the people in line, not their names or roles.

> Imagine a PEMDAS calculator. When it sees $2 + 3 * 4$, it knows that $*$ has a higher "rank" than $+$. It doesn't care that $2$ and $3$ are numbers; it just waits to perform the multiplication before the addition. That is the essence of operator precedence.

### B. Exam-Ready Theory

#### 1. Operator Grammars
A grammar is an **Operator Grammar** if:
1.  It has no $\epsilon$-productions.
2.  No two non-terminals are adjacent on the RHS of any production.
*   *Example:* $E \to E + E$ is okay. $E \to AB$ is NOT (two non-terminals).

#### 2. Precedence Relations
We define three relations between terminals $a$ and $b$:
*   $a <. b$: $a$ has lower precedence than $b$ (yields to $b$).
*   $a =. b$: $a$ and $b$ have equal precedence (part of the same handle).
*   $a .> b$: $a$ has higher precedence than $b$ (takes precedence over $b$).

#### 3. Precedence Table
A table is constructed for all terminals (including $\$$). 
*   $*$ and $/$ have higher precedence than $+$ and $-$.
*   Operators are usually left-associative ($+ .> +$).
*   $($ has high precedence on the right, but low on the left.

#### 4. The Parsing Algorithm
1.  Insert precedence relations between all terminals in the input string.
2.  Scan from left to right until the first $.>$ is found.
3.  Scan backwards until the first $<.$ is found.
4.  The string between $<.$ and $.>$ is the **Handle**.
5.  Reduce the handle (ignoring non-terminals).

#### 5. Comparison: LR vs Operator Precedence
| Feature | LR Parsing | Operator Precedence |
| :--- | :--- | :--- |
| **Generality** | Very High | Low (Math only) |
| **Table Size** | Large | Small |
| **Handle Identification** | Complex (Items/DFA) | Simple (Relations) |
| **Error Detection** | Immediate | Delayed |

### C. Worked Examples

#### Example 1: Precedence Table Construction
For operators $+$, $*$:
| | $+$ | $*$ | $\text{id}$ | $\$$ |
| :--- | :--- | :--- | :--- | :--- |
| **$+$** | $.>$ | $<.$ | $<.$ | $.>$ |
| **$*$** | $.>$ | $.>$ | $<.$ | $.>$ |
| **$\text{id}$** | $.>$ | $.>$ | - | $.>$ |
| **$\$$** | $<.$ | $<.$ | $<.$ | - |

#### Example 2: Parsing $id + id * id$
1. Insert relations: $\$ <. \text{id} .> + <. \text{id} .> * <. \text{id} .> \$$
2. First handle is the first $\text{id}$ (between $<.$ and $.>$).
3. Reduce: $\$ + <. \text{id} .> * <. \text{id} .> \$$
4. Next handle is the second $\text{id}$.
5. Continue until $\$ E \$$ is reached.

### D. How to Write in Exam
*   **Start With:** Define Operator Grammar (the two rules are mandatory). Mention that this parser is specifically for expressions.
*   **Body:** List the three relations ($<., =., .>$). Draw an example precedence table.
*   **Traps:** 
    *   Do not include non-terminals in the precedence table.
    *   Remember that $\epsilon$ is forbidden.
*   **Close With:** State that while simple, it cannot handle all CFGs and is less robust than LR parsers.

**Mark Split Plan:**
*   Operator Grammar Rules: 2 Marks
*   Relation Definitions: 2 Marks
*   Table Construction: 3 Marks
*   Parsing Example: 3 Marks

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** No $\epsilon$, no adjacent NTs. $<., =., .>$ relations. Handle is between $<.$ and $.>$.
*   **Flash Questions:**
    1. Can an operator grammar have $S \to \epsilon$? (No)
    2. What is the relation between $+$ and $*$? ($+ <. *$)
    3. How is the handle found in OP parsing? (Between $<.$ and $.>$)
    4. Is OP parsing top-down or bottom-up? (Bottom-up)
*   **Practice Prompts:**
    1. Construct a precedence table for $+$, $-$, $*$, $/$, $($, $)$, and $\text{id}$.
    2. Trace the string $(\text{id} + \text{id}) * \text{id}$.

---

## 4. LR(0) and SLR(1) Parsing
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
LR(0) and SLR (Simple LR) are the foundation of modern parsing. They use a "State Machine" (DFA) to keep track of where the parser is within various production rules. Imagine you are following a recipe. At any point, you know exactly which ingredients you've already added and which one is next. An **LR(0) Item** is exactly that—a production rule with a "dot" ($\cdot$) showing your current progress.

> Imagine you are building a bookshelf. The instruction says: "Attach side A, then attach side B, then add shelves." 
> *   `Shelf -> . SideA SideB Shelves` (You haven't started yet)
> *   `Shelf -> SideA . SideB Shelves` (Side A is attached; you're waiting for Side B)
> *   `Shelf -> SideA SideB Shelves .` (Everything is done; time to "reduce" this to a completed Shelf!)

**SLR(1)** is a slightly smarter version of LR(0). While LR(0) blindly tries to reduce as soon as it sees a completed rule, SLR(1) checks the "FOLLOW" set to make sure the reduction actually makes sense in the context of what comes next.

### B. Exam-Ready Theory

#### 1. Augmented Grammar
To ensure the parser has a unique starting point, we add a new production $S' \to S$. This is called an **Augmented Grammar**. It tells the parser exactly when to "Accept."

#### 2. LR(0) Items
An LR(0) item of a grammar $G$ is a production of $G$ with a dot at some position on the right side.
*   Example: $A \to XYZ$ has items: $[A \to \cdot XYZ], [A \to X \cdot YZ], [A \to XY \cdot Z], [A \to XYZ \cdot]$.

#### 3. Closure and GOTO Functions
*   **Closure(I):** If $[A \to \alpha \cdot B \beta]$ is in $I$, then for every production $B \to \gamma$, add $[B \to \cdot \gamma]$ to the closure. This represents "predicting" what might come next.
*   **GOTO(I, X):** The set of items you get by moving the dot over the symbol $X$ in all items in $I$.

#### 4. Canonical Collection of LR(0) Items
This is a collection of sets of items (States) that represent all possible configurations of the parser. They are connected by transitions (GOTO) to form a DFA.

#### 5. SLR(1) Parsing Table Construction
*   **Shift Actions:** If $[A \to \alpha \cdot a \beta] \in I_i$ and $GOTO(I_i, a) = I_j$, set $ACTION[i, a] = \text{shift } j$.
*   **Reduce Actions (The SLR Difference):** If $[A \to \alpha \cdot] \in I_i$, set $ACTION[i, a] = \text{reduce by } A \to \alpha$ for all terminals $a \in \text{FOLLOW}(A)$. 
*   **Accept Action:** If $[S' \to S \cdot] \in I_i$, set $ACTION[i, \$] = \text{accept}$.

### C. Worked Examples

#### Example 1: LR(0) Item Sets
**Grammar:**
1. $E \to E + T$
2. $E \to T$

**Augmented:** $E' \to E$
**$I_0$ (Initial State):**
```text
E' -> . E
E  -> . E + T
E  -> . T
```

**$I_1$ (GOTO($I_0, E$)):**
```text
E' -> E .
E  -> E . + T
```
*Note: $E' \to E \cdot$ is the accept state.*

#### Example 2: SLR Table Conflict Resolution
Consider $[A \to \alpha \cdot]$ in state $i$.
*   **LR(0):** Puts "reduce" in EVERY column for row $i$.
*   **SLR(1):** Only puts "reduce" in columns $a \in \text{FOLLOW}(A)$.
*   *Why this matters:* If state $i$ also has $[B \to \beta \cdot a \gamma]$, LR(0) would have a **Shift-Reduce conflict** at column 'a'. SLR(1) avoids this IF $a \notin \text{FOLLOW}(A)$.

### D. How to Write in Exam
*   **Start With:** Define Augmented Grammar and LR(0) Items. Mention that SLR is "Simple LR" because it uses FOLLOW sets.
*   **Body:** Provide the algorithms for `Closure` and `GOTO`. Draw a clear DFA (GOTO Graph) with numbered states.
*   **Traps:** 
    *   Do not forget to add items starting with $\cdot$ when you move a dot over a non-terminal (this is the `Closure` step).
    *   In the SLR table, ensure reductions only go in the FOLLOW set columns.
*   **Close With:** Explain that SLR(1) is more powerful than LR(0) but still weaker than CLR(1).

**Mark Split Plan:**
*   Augmented Grammar & Definitions: 2 Marks
*   Item Set Construction (DFA): 5 Marks
*   Parsing Table Construction: 4 Marks
*   Comparison/Conflict Explanation: 3 Marks

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Augmented = $S' \to S$. Items = Productions with dots. Closure = Predict rules. SLR = Reduce only if in FOLLOW.
*   **Flash Questions:**
    1. What is an LR(0) item? (Production with a dot)
    2. Why augment the grammar? (Unique accept state)
    3. How does SLR differ from LR(0) in the table? (Uses FOLLOW for reductions)
    4. What does the GOTO function represent? (State transition)
*   **Practice Prompts:**
    1. For $S \to AA, A \to aA|b$, construct the LR(0) items and check for conflicts.
    2. Explain the shift-reduce conflict in $E \to E+E | \text{id}$ using SLR.

---

## 5. CLR(1) and LALR(1) Parsing
**[HIGH PROBABILITY | ↻ REPEATED PYQ]**

### A. What is this?
If SLR(1) is a smart student, **CLR(1)** (Canonical LR) is a PhD expert. It doesn't just look at the FOLLOW set (which is global); it looks at the specific **Lookahead** that is valid for that exact moment in the parse. This makes it the most powerful LR parser, but it comes at a cost: the number of states explodes!

**LALR(1)** (Look-Ahead LR) is the "efficient genius." It takes the massive CLR(1) table and merges states that have the same core rules but different lookaheads. It has the same number of states as SLR(1) but is significantly more powerful.

> Imagine a GPS. 
> *   **SLR:** "You can turn left because there is a road there." (General FOLLOW)
> *   **CLR:** "You can turn left because your specific destination is that way." (Specific Lookahead)
> *   **LALR:** Merges "Turn left to go to the Mall" and "Turn left to go to the Gym" into a single "Turn Left" state to save memory, while still knowing you shouldn't turn left if you're going to the Airport.

### B. Exam-Ready Theory

#### 1. LR(1) Items
An LR(1) item is an LR(0) item plus a **Lookahead terminal**.
*   Format: $[A \to \alpha \cdot \beta, a]$
*   The lookahead $a$ has no effect on shift moves, but it tells the parser exactly when to reduce: **only if the next token is $a$**.

#### 2. CLR(1) Table Construction
*   Uses a specialized `Closure` rule: If $[A \to \alpha \cdot B \beta, a] \in I$, then for each $B \to \gamma$, add $[B \to \cdot \gamma, b]$ where $b \in \text{FIRST}(\beta a)$.
*   **Power:** Can handle any LR(1) grammar.
*   **Downside:** Can have thousands of states for a real programming language.

#### 3. LALR(1) Merging Rule
If two sets of CLR(1) items have the same **Core** (the LR(0) part), merge them into a single state. The new lookahead set is the union of the original lookaheads.
*   *Property:* LALR(1) will never introduce a Shift-Reduce conflict that wasn't in the CLR(1) table, but it MIGHT introduce a Reduce-Reduce conflict.

#### 4. Comparison Table
| Feature | SLR(1) | LALR(1) | CLR(1) |
| :--- | :--- | :--- | :--- |
| **Power** | Lowest | Medium | Highest |
| **States** | Few (Core) | Few (Core) | Many |
| **Lookahead** | Global (FOLLOW) | Merged Specific | Specific |
| **Used In** | Textbooks | Yacc/Bison | Rarely (Too big) |

### C. Worked Examples

#### Example 1: LR(1) Item vs LR(0) Item
*   LR(0): $A \to a \cdot$
*   LR(1): $[A \to a \cdot, \$]$ (Reduce ONLY if next symbol is \$)
*   LR(1): $[A \to a \cdot, +]$ (Reduce ONLY if next symbol is +)

#### Example 2: LALR Merging
*   State $I_4$: $\{[C \to d \cdot, c], [C \to d \cdot, d]\}$
*   State $I_7$: $\{[C \to d \cdot, \$]\}$
*   **Merged State $I_{47}$:** $\{[C \to d \cdot, c/d/\$]\}$
*   *Result:* States 4 and 7 are now one, reducing memory usage.

### D. How to Write in Exam
*   **Start With:** Define LR(1) items and the lookahead component. State that CLR is the most powerful.
*   **Body:** Explain the LALR merging process. This is a common 5-7 mark question. Use the term "Core" frequently.
*   **Traps:** 
    *   In CLR closure, calculating the lookahead $b \in \text{FIRST}(\beta a)$ is where most students fail. Practice this!
    *   Do not say LALR is as powerful as CLR. It is slightly less powerful due to potential RR conflicts.
*   **Close With:** Mention that Yacc and Bison are LALR(1) parser generators.

**Mark Split Plan:**
*   LR(1) Item Definition: 2 Marks
*   CLR Construction Logic: 4 Marks
*   LALR Merging Algorithm: 4 Marks
*   Comparison Table: 4 Marks

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** LR(1) = Core + Lookahead. CLR = Full power, huge table. LALR = Merged Cores, Yacc's choice.
*   **Flash Questions:**
    1. What is the lookahead in $[A \to \alpha \cdot \beta, a]$? ($a$)
    2. Which parser is used by Yacc? (LALR)
    3. What happens when we merge states in LALR? (Lookaheads are unioned)
    4. Can LALR introduce a Shift-Reduce conflict? (No)
*   **Practice Prompts:**
    1. Compare SLR, CLR, and LALR with respect to state count and power.
    2. Explain the closure rule for LR(1) items with an example.

---

## 6. Parsing Conflicts and Error Recovery
**[MODERATE | ↻ REPEATED PYQ]**

### A. What is this?
Conflicts are the "Red Lights" of parsing. They happen when your grammar is ambiguous or simply too complex for the parser type you chose.

> **Shift-Reduce Conflict:** "Should I eat the appetizer now, or wait for the main course to be served so I can eat them together?"
> **Reduce-Reduce Conflict:** "I have two coupons. One says 'Free Drink' and one says '10% Off'. Both are valid, but I can only use one. Which one?"

### B. Exam-Ready Theory

#### 1. Shift-Reduce (SR) Conflict
Occurs when the parser can either shift a terminal or reduce a production.
*   *Example:* The "Dangling Else" problem. When the parser sees `else`, should it shift it (attach to the innermost `if`) or reduce the current `if` (attach to the outer `if`)?
*   *Resolution:* Most parsers default to **Shift** (favors innermost nesting).

#### 2. Reduce-Reduce (RR) Conflict
Occurs when two different productions can be reduced in the same state for the same input.
*   *Example:* $A \to a, B \to a$. If the stack has $a$, should it become $A$ or $B$?
*   *Resolution:* Usually defaults to the production that appears **first** in the grammar.

#### 3. Why they happen in LR(0)/SLR
LR(0) and SLR are weak. They often flag conflicts in perfectly valid grammars because they don't have enough lookahead context to distinguish between the two options. Upgrading to CLR usually solves these.

#### 4. Error Recovery Strategies
1.  **Panic Mode:** Discard input tokens until a "synchronizing" token (like `;` or `}`) is found.
2.  **Phrase Level:** Perform local correction (e.g., insert a missing semicolon).
3.  **Error Productions:** Add rules to the grammar that catch common mistakes (e.g., `E -> E + + E`).
4.  **Global Correction:** Find the minimum number of changes to make the string valid (too expensive for real compilers).

### C. Worked Examples

#### Example 1: Dangling Else SR Conflict
Grammar:
$S \to \text{if } E \text{ then } S$
$S \to \text{if } E \text{ then } S \text{ else } S$
Input: `if E1 then if E2 then S1 else S2`
The `else` could belong to either `if`. This is a classic SR conflict.

#### Example 2: RR Conflict in Type Declarations
Grammar:
$\text{stmt} \to \text{id} (\text{args})$
$\text{expr} \to \text{id} (\text{args})$
In many languages, a function call and a type cast look the same. This leads to an RR conflict.

### D. How to Write in Exam
*   **Start With:** Define SR and RR conflicts clearly with simple examples.
*   **Body:** Explain how parsers (like Yacc) resolve them by default. List the four error recovery strategies.
*   **Traps:** 
    *   Do not confuse SR conflicts with ambiguity alone; some unambiguous grammars still have SR conflicts in weak parsers.
    *   Panic mode recovery is the most common answer; explain it well.
*   **Close With:** State that a conflict-free grammar is the goal of a good language designer.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** SR = Shift vs Reduce. RR = Reduce vs Reduce. Dangling else = SR. Yacc resolves SR by shifting.
*   **Flash Questions:**
    1. How does Yacc resolve an SR conflict by default? (Shift)
    2. What is "Panic Mode" recovery? (Skip to sync token)
    3. Which is worse: SR or RR? (RR usually indicates a deeper grammar flaw)
*   **Practice Prompts:**
    1. Explain the "Dangling Else" problem and how it's resolved.
    2. List and explain three error recovery techniques in parsing.

