# Module 1: Introduction to Compilers and Lexical Analysis
**CST302 Compiler Design | KTU B.Tech CSE**

---

## 1. Introduction to Compilers & Language Processing Systems
**[MODERATE | ↻ REPEATED PYQ]**

### A. What is this?
A compiler is essentially a high-tech translator. Just as a human translator might convert a book from German to English while preserving the meaning, a compiler converts a program from a High-Level Language (like C++ or Java) into a Low-Level Language (like Machine Code) that the computer hardware can actually execute.

> **Analogy:** Imagine you are writing a recipe in a fancy, descriptive language (High-Level Language). However, your robot chef only understands a series of basic binary commands like "move hand to 0,1" or "apply heat for 5 seconds" (Machine Code). You need a translator (Compiler) to turn your eloquent recipe into a list of specific, executable robotic movements.

A compiler doesn't work alone; it's part of a larger team called the **Language Processing System**, which includes preprocessors, assemblers, and linkers.

### B. Exam-Ready Theory

#### 1. Language Processors
*   **Compiler:** Translates the entire source program into target code before execution. Faster at run-time.
*   **Interpreter:** Directly executes the operations specified in the source program statement-by-statement. Gives better error diagnostics but is slower at run-time.

#### 2. The Language Processing System
An executable program is created through these steps:
1.  **Preprocessor:** Handles file inclusions (e.g., `#include`), macro expansions, and stripping comments.
2.  **Compiler:** Translates modified source code into Assembly Language.
3.  **Assembler:** Translates assembly into relocatable machine code.
4.  **Linker/Loader:** Combines object files and library files into a single target machine code file and loads it into memory.

#### 3. Comparison: Compiler vs Interpreter
| Feature | Compiler | Interpreter |
| :--- | :--- | :--- |
| **Execution** | Translates once, then runs | Translates and runs simultaneously |
| **Speed** | Very Fast (Native execution) | Slower (Overhead of translation) |
| **Memory** | Uses more (Generates target file) | Uses less (No intermediate file) |
| **Errors** | Reports all errors after scanning | Reports errors line-by-line |

### C. Worked Examples

#### Example 1: The Processing Chain
Trace the path of `hello.c`:
1.  `hello.c` $\xrightarrow{\text{Preprocessor}}$ `hello.i` (Macros expanded)
2.  `hello.i` $\xrightarrow{\text{Compiler}}$ `hello.s` (Assembly code)
3.  `hello.s` $\xrightarrow{\text{Assembler}}$ `hello.o` (Object code)
4.  `hello.o` + `libc.a` $\xrightarrow{\text{Linker}}$ `hello.exe` (Executable)

#### Example 2: Common Wrong Approach
*   *Mistake:* Thinking the compiler produces binary directly. 
*   *Correction:* Most compilers produce Assembly, which is then handled by an Assembler. This makes the compiler easier to design and debug.

### D. How to Write in Exam
*   **Start With:** Define a compiler and draw the basic diagram (Source $\to$ Compiler $\to$ Target).
*   **Body:** List and briefly define the Preprocessor, Assembler, and Linker. This is a common 5-mark question.
*   **Traps:** 
    *   Do not forget to mention that compilers report errors.
    *   Clearly distinguish between a compiler and an interpreter.
*   **Close With:** Mention that the result of the system is an "Executable Target Program."

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Compiler = Global translation. Interpreter = Line-by-line. Chain: Pre $\to$ Comp $\to$ Asm $\to$ Link.
*   **Flash Questions:**
    1. What handles `#define` in C? (Preprocessor)
    2. Which is faster at run-time, compiled or interpreted code? (Compiled)
    3. What does a Linker do? (Combines object files and libraries)
    4. What is relocatable machine code? (Code that can be loaded anywhere in memory)
*   **Practice Prompts:**
    1. Explain the various components of a Language Processing System with a diagram.
    2. Differentiate between a compiler and an interpreter.

---

## 2. Phases of a Compiler
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Compiling is a complex job, so the compiler breaks it down into a series of smaller "Phases." Each phase takes the output of the previous one, transforms it, and passes it along. It's like an assembly line in a car factory.

> **Analogy:** Imagine a factory assembly line.
> 1.  **Lexical:** Sorts the raw metal and rubber (characters) into parts like "wheels" and "engines" (tokens).
> 2.  **Syntax:** Checks if the parts are put together in the right order (e.g., wheels on the bottom, not the roof).
> 3.  **Semantic:** Checks if the car actually works (e.g., an engine for a truck shouldn't be put in a bike).
> 4.  **Generation:** Paints the car and prepares it for the road (Machine Code).

### B. Exam-Ready Theory

#### 1. Analysis (Front-End)
This part is "Language Specific."
*   **Lexical Analysis (Scanning):** Breaks the character stream into **Tokens**.
*   **Syntax Analysis (Parsing):** Checks the grammatical structure and builds a **Parse Tree**.
*   **Semantic Analysis:** Checks for logical errors like type mismatches.
*   **Intermediate Code Generation:** Creates a "neutral" code like Three Address Code (TAC).

#### 2. Synthesis (Back-End)
This part is "Machine Specific."
*   **Code Optimization:** Makes the code faster/smaller.
*   **Code Generation:** Produces the final assembly or machine code.

#### 3. Support Components
*   **Symbol Table:** A data structure containing information about every identifier (variables, functions).
*   **Error Handler:** Manages errors found in any phase.

### C. Worked Examples

#### Example 1: Tracing the Expression `position = initial + rate * 60`
1.  **Lexical:** `<id, 1> <=> <id, 2> <+> <id, 3> <*> <60>`
2.  **Syntax:** Builds a tree with `=` at the root, `+` as a child, etc.
3.  **Semantic:** Discovers `60` is an integer but `rate` is a float; inserts an `inttofloat` conversion.
4.  **Intermediate Code:**
    `t1 = inttofloat(60)`
    `t2 = id3 * t1`
    `t3 = id2 + t2`
    `id1 = t3`

### D. How to Write in Exam
*   **Start With:** Draw the "Phases of a Compiler" block diagram. This diagram alone is often worth 3-4 marks.
*   **Body:** Explain each of the 6 phases briefly. Use a running example (like the one above) to show how a single line of code changes through the phases.
*   **Traps:** 
    *   Do not skip the Symbol Table and Error Handler boxes in your diagram.
    *   Make sure to group the first four as "Analysis" and the last two as "Synthesis."
*   **Close With:** State that modern compilers often combine several phases into "passes" to save time.

**Mark Split Plan:**
*   Phases Diagram: 4 Marks
*   Explanation of 6 Phases: 6 Marks (1 each)
*   Symbol Table/Error Handler: 2 Marks
*   Traced Example: 2 Marks

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Lex (Tokens) $\to$ Syn (Tree) $\to$ Sem (Check) $\to$ Int (TAC) $\to$ Opt (Clean) $\to$ Gen (Target).
*   **Flash Questions:**
    1. What is the output of the Lexical phase? (Tokens)
    2. Which phase builds the Parse Tree? (Syntax Analysis)
    3. What does the Symbol Table store? (Information about identifiers/variables)
    4. Which phase performs Type Checking? (Semantic Analysis)
*   **Practice Prompts:**
    1. List and explain the various phases of a compiler with a diagram.
    2. Trace the statement `a = b + c * d` through all phases.

---

## 3. Lexical Analysis: Tokens, Patterns, and Lexemes
**[SURE SHOT | ↻ REPEATED PYQ]**

### A. What is this?
Lexical Analysis is the "Reading" phase. Imagine you are reading a book. Your brain doesn't see a page as a single massive image; it sees individual words, punctuation, and numbers. In a compiler, the Lexical Analyzer (Scanner) does the same thing—it reads the "alphabet soup" of your source code and groups characters into meaningful "words."

> **Analogy:** Imagine you have a bag of alphabet magnets. 
> *   **Lexemes:** The actual magnets stuck together, like `i`, `n`, `t`.
> *   **Tokens:** The category of the word, like "Keyword."
> *   **Pattern:** The rule that says "three specific letters in that order mean a Keyword."

### B. Exam-Ready Theory

#### 1. Definitions (The Big Three)
*   **Token:** A pair consisting of a **token name** and an optional **attribute value**. It is an abstract symbol representing a lexical unit. (e.g., `<id, pointer_to_symbol_table>`).
*   **Lexeme:** A sequence of characters in the source program that matches the pattern for a token. (e.g., the actual text `count` or `123`).
*   **Pattern:** A description of the form that the lexemes of a token may take. Patterns are specified using **Regular Expressions**.

#### 2. Role of Lexical Analyzer
*   Main task: Read input characters and produce tokens for the parser.
*   Secondary tasks:
    *   Stripping out comments and white spaces.
    *   Mapping error messages to line numbers.
    *   Expanding macros.

#### 3. Attributes of Tokens
When multiple lexemes match a single pattern (like many different variable names matching the `id` pattern), the scanner must provide an **attribute value** to distinguish them. This usually points to a symbol table entry.

### C. Worked Examples

#### Example 1: Token Counting
**Code:** `int result = a + b * 10;`
1.  `int` $\to$ Keyword
2.  `result` $\to$ Identifier
3.  `=` $\to$ Operator
4.  `a` $\to$ Identifier
5.  `+` $\to$ Operator
6.  `b` $\to$ Identifier
7.  `*` $\to$ Operator
8.  `10` $\to$ Number
9.  `;` $\to$ Punctuation
**Total Tokens:** 9.

#### Example 2: Lexical Error
Input: `fi (a == 10)`
The scanner identifies `fi` as an identifier (matching the `id` pattern). It doesn't know it was a misspelling of `if`. The error will be caught later by the Syntax or Semantic analyzer.

### D. How to Write in Exam
*   **Start With:** Definitions of Token, Lexeme, and Pattern. This is a "Sure Shot" 3-mark or 5-mark question.
*   **Body:** Explain the interaction between the Scanner and Parser. Use the "getNextToken" command analogy.
*   **Traps:** 
    *   Do not count white spaces or comments as tokens!
    *   Make sure to mention that patterns are defined by Regular Expressions.
*   **Close With:** State that Lexical Analysis is separated from Syntax Analysis for design simplicity and efficiency.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Token = Category. Lexeme = Actual text. Pattern = Rule. Scanner removes comments/spaces.
*   **Flash Questions:**
    1. What is the rule for a token called? (Pattern)
    2. Is `main` a token or a lexeme? (Lexeme)
    3. What does the scanner do with white space? (Strips it out)
    4. Where does the scanner store identifier details? (Symbol Table)
*   **Practice Prompts:**
    1. Distinguish between Token, Lexeme, and Pattern with examples.
    2. Count the tokens in: `float area = 3.14 * r * r;`.

---

## 4. Input Buffering & Sentinals
**[MODERATE | ↻ REPEATED PYQ]**

### A. What is this?
Reading code one character at a time from a hard drive is incredibly slow. To speed things up, the compiler uses "Buffering." It reads a large chunk of code into memory all at once. The tricky part is knowing where one word ends and the next begins, especially if a word is split between two chunks of memory.

> **Analogy:** Imagine reading a long scroll through a tiny window. You can only see 10 letters at a time. To understand a long word like "Communication," you might have to slide the scroll while keeping track of where the word started. "Sentinels" are like a red "STOP" sign at the end of each scroll chunk so you don't accidentally keep reading past the end.

### B. Exam-Ready Theory

#### 1. Two-Buffer Scheme
To handle lookahead (checking the next character to see if a lexeme is over), we use two buffers of size $N$. 
*   **Pointers:**
    *   `lexemeBegin`: Marks the start of the current lexeme.
    *   `forward`: Scans ahead until a pattern is matched.
*   If `forward` reaches the end of one buffer, the other buffer is filled with new data.

#### 2. Sentinels
In the basic scheme, we have to check twice for every character:
1.  Is it the end of the buffer?
2.  What character is it?
**Optimization:** We add a special character (usually `EOF`) at the end of each buffer. This is called a **Sentinel**. Now, we only check if the character is `EOF`. If it is, we handle the buffer reload; otherwise, we just process the character. This reduces the number of checks by half!

### C. Worked Examples

#### Example 1: Lookahead Requirement
In C, if the scanner sees `>`, it doesn't know if the token is `>` or `>=`. It must use the `forward` pointer to look at the next character. If the next character is `=`, the token is `>=`. If it's a space or a letter, the token is `>`.

#### Example 2: Sentinel Algorithm
```text
switch (*forward++) {
    case EOF:
        if (at end of buffer 1) { reload buffer 2; forward = start of buffer 2; }
        else if (at end of buffer 2) { reload buffer 1; forward = start of buffer 1; }
        else terminate; // Real end of file
        break;
    default:
        process character;
}
```

### D. How to Write in Exam
*   **Start With:** Explain why buffering is needed (Input/Output efficiency).
*   **Body:** Describe the two-pointer system (`lexemeBegin` and `forward`). Explain how Sentinels reduce the overhead of character processing.
*   **Traps:** 
    *   Draw the buffer diagram (two blocks of memory with pointers).
    *   Clearly state that the `EOF` sentinel is different from the actual end of the file.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** Buffering = Speed. 2 Pointers: Begin and Forward. Sentinel = `EOF` at buffer end to skip boundary checks.
*   **Flash Questions:**
    1. Why use two buffers? (To handle lookahead across boundaries)
    2. What does `lexemeBegin` point to? (Start of the current word)
    3. How do sentinels improve performance? (Reduce boundary tests from 2 to 1 per char)
    4. What character is typically used as a sentinel? (EOF)
*   **Practice Prompts:**
    1. Explain the input buffering technique with the help of a diagram.
    2. Write the algorithm for a lexical analyzer using sentinels.

---

## 5. Specification and Recognition of Tokens
**[HIGH PROBABILITY | ↻ REPEATED PYQ]**

### A. What is this?
How do we tell a computer what an "identifier" looks like? We use a formal language called **Regular Expressions (RE)**. It's a way of saying "a letter, followed by any number of letters or digits." 

Once we have the rule (Specification), we need a machine to actually find it in the code (Recognition). That machine is called a **Finite Automaton**. It's like a flowchart where you follow arrows based on the characters you see until you reach an "Accept" state.

### B. Exam-Ready Theory

#### 1. Regular Expressions (RE)
RE is the notation used to specify patterns.
*   **Operations:**
    *   **Union ($|$ or $+$):** $L \cup M$. Either $L$ or $M$.
    *   **Concatenation ($LM$):** $L$ followed by $M$.
    *   **Kleene Closure ($L^*$):** Zero or more occurrences of $L$.
    *   **Positive Closure ($L^+$):** One or more occurrences of $L$.

#### 2. Transition Diagrams
A transition diagram (Finite Automaton) consists of:
*   **States:** Represented by circles.
*   **Edges:** Transitions between states based on input.
*   **Start State:** Marked with a "start" arrow.
*   **Accepting State:** Represented by a double circle.

#### 3. Formal Recognition Process
1.  Define the language using RE.
2.  Convert RE to a Nondeterministic Finite Automaton (NFA).
3.  Convert NFA to a Deterministic Finite Automaton (DFA).
4.  Implement the DFA in code (using a `switch-case` or transition table).

### C. Worked Examples

#### Example 1: RE for C Identifiers
**Rule:** Starts with a letter or underscore, followed by any number of letters, digits, or underscores.
**RE:** `(letter | _) (letter | _ | digit)*`

#### Example 2: DFA for Comparison Operators (`<`, `<=`, `<>`)
1.  **State 0:** See `<`. Go to State 1.
2.  **State 1:** 
    *   See `=`. Go to State 2 (Accept `<=`).
    *   See `>`. Go to State 3 (Accept `<>`).
    *   See `other`. Go to State 4 (Accept `<` and retract).

### D. How to Write in Exam
*   **Start With:** Define Regular Expressions and their operations (Union, Concat, Closure).
*   **Body:** Draw transition diagrams for common tokens like identifiers, numbers, and relops. This is a very common 10-mark question.
*   **Traps:** 
    *   In transition diagrams, remember to mark the **Retract** state with a `*` if you look ahead and then go back.
    *   Double circle for accepting states is mandatory.
*   **Close With:** Mention that Lexical Generator tools like **Lex** or **Flex** automate this process.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** RE = Rules. DFA = Implementation. Ops: $|$, Concat, $*$. Accept = Double circle. Retract = `*`.
*   **Flash Questions:**
    1. What is the RE for "at least one 'a'"? ($a^+$ or $aa^*$)
    2. What does a double circle represent? (Accepting state)
    3. Can an identifier start with a digit in C? (No)
    4. What does the `*` symbol mean in a transition diagram? (Retract the forward pointer by one)
*   **Practice Prompts:**
    1. Construct a transition diagram for unsigned numbers.
    2. Write regular definitions for identifiers and constants.

---

## 6. Bootstrapping & Compiler Tools
**[MODERATE | ↻ REPEATED PYQ]**

### A. What is this?
The "Chicken and Egg" problem of compilers: To write a C compiler, you usually write it in C. But how do you compile the compiler if you don't have a compiler yet? The solution is **Bootstrapping**. It's the process of using a simple, existing compiler to build a more complex one.

**Compiler Construction Tools** are specialized software that helps you build a compiler. Instead of writing the scanner and parser by hand, you just give these tools the rules, and they generate the code for you.

### B. Exam-Ready Theory

#### 1. T-Diagrams (Tombstone Diagrams)
Used to represent compilers. A compiler is characterized by three languages:
1.  **Source Language (S):** What it reads.
2.  **Target Language (T):** What it produces.
3.  **Implementation Language (I):** What it is written in.
**Notation:** $C^S_{T,I}$

#### 2. Bootstrapping Process
To build a compiler for language $L$ on machine $M$:
1.  Write a compiler for a small subset of $L$ (let's call it $L_0$) in assembly or machine code.
2.  Use this $L_0$ compiler to compile a compiler for a larger subset $L_1$ written in $L_0$.
3.  Repeat until the full compiler for $L$ is built.

#### 3. Compiler Construction Tools
*   **Scanner Generators (e.g., LEX):** Produce lexical analyzers from regular expressions.
*   **Parser Generators (e.g., YACC):** Produce syntax analyzers from grammars.
*   **Syntax-Directed Translation Engines:** Generate code for walking parse trees.
*   **Data-Flow Analysis Engines:** Help with code optimization.

### C. Worked Examples

#### Example 1: Cross-Compiler T-Diagram
Suppose we want a compiler that runs on machine $A$ but produces code for machine $B$.
*   Source: $C$
*   Target: $B$
*   Implementation: $A$
*   Diagram: $C$ at left, $B$ at right, $A$ at bottom.

#### Example 2: Bootstrapping a New Language
To create a Pascal compiler for a new machine:
1.  Write a Pascal $\to$ Machine code compiler in C.
2.  Compile it with an existing C compiler.
3.  Now you have a Pascal compiler running on your machine.

### D. How to Write in Exam
*   **Start With:** Explain the T-diagram notation clearly.
*   **Body:** Define Bootstrapping and provide a step-by-step example using T-diagrams. List 4-5 compiler construction tools.
*   **Traps:** 
    *   Ensure the "arms" of the T-diagrams match up in your bootstrapping diagrams.
    *   Don't confuse "Cross-Compiler" with "Bootstrapping."
*   **Close With:** State that YACC and LEX are the most famous tools used in industry.

### E. Rapid Recall & Self-Test
*   **1-Minute Recall:** T-Diagram = S, T, I. Bootstrapping = Self-compiling. Lex = Scanner gen. Yacc = Parser gen.
*   **Flash Questions:**
    1. What are the three parts of a T-diagram? (Source, Target, Implementation)
    2. What does LEX generate? (A Lexical Analyzer/Scanner)
    3. What does YACC stand for? (Yet Another Compiler Compiler)
    4. What is a Cross-Compiler? (Runs on one machine, targets another)
*   **Practice Prompts:**
    1. Explain bootstrapping with the help of T-diagrams.
    2. List and explain any four compiler construction tools.

