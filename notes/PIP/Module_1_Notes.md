---
subject: PIP
module: '1'
title: 'Basics, Selection Structures, and Iteration'
order: 1
---

# Module 1: Basics, Selection Structures, and Iteration

## 1. Topic 1: Standard Number Algorithms (Prime, Armstrong, Factorial)
**[SURE SHOT | ↻ REPEATED PYQ: Apr '25, May '24, Jun '22, May '23]**

### A. What is this?
**CST362 Programming in Python - Comprehensive Study Guide**

*Welcome. This module is the foundation of your Python journey. According to the PYQ analysis, Module 1 is highly predictable. The exam heavily favors algorithmic logic (Even slot) over pure theory (Odd slot). We will focus on mastering control structures and the mathematical algorithms that appear in every single paper.*

---

Before we can build complex software, we need to know how to solve basic mathematical puzzles using code. This involves using loops to repeat actions and `if-else` statements to make decisions. Standard number algorithms test your ability to break down a math problem into a sequence of logical steps that a computer can execute.

> Think of a number algorithm like a recipe. If you want to check if a number is an "Armstrong" number, you can't just look at it. You have to slice the number into its individual ingredients (digits), cube each ingredient, and add them all together to see if the final cake matches the original recipe.

### B. Exam-Ready Theory
To solve these algorithms, you must master **Indefinite Iteration (`while` loops)** and **Digit Extraction**.

*   **Digit Extraction Logic:** In Python, to process a number digit by digit, we use the modulo `%` and integer division `//` operators inside a `while` loop.
    *   `digit = n % 10` extracts the last digit.
    *   `n = n // 10` removes the last digit from the number.
*   **Prime Number Logic:** A number greater than 1 is prime if it cannot be formed by multiplying two smaller natural numbers. We use a `for` loop to check divisibility from 2 up to the square root of the number.
*   **Factorial Logic:** The product of an integer and all the integers below it. Usually solved with a `for` loop accumulating a product.

### C. Worked Examples
**1. Armstrong Number Checker**
An Armstrong number (of 3 digits) is an integer such that the sum of the cubes of its digits is equal to the number itself. For example, 153 = 1^3 + 5^3 + 3^3.

```python
# Step 1: Accept input
num = int(input("Enter a number: "))
sum_of_cubes = 0

# Step 2: Store original number to compare later
temp = num

# Step 3: Extract digits and compute sum of cubes
while temp > 0:
    digit = temp % 10        # Extract the last digit
    sum_of_cubes += digit ** 3 # Cube it and add to sum
    temp = temp // 10        # Remove the last digit

# Step 4: Compare and output
if num == sum_of_cubes:
    print(num, "is an Armstrong number")
else:
    print(num, "is not an Armstrong number")
```

**2. Prime Number Generator (Up to N)**
```python
lower = int(input("Enter lower limit: "))
upper = int(input("Enter upper limit: "))

print("Prime numbers between", lower, "and", upper, "are:")

for num in range(lower, upper + 1):
   # all prime numbers are greater than 1
   if num > 1:
       for i in range(2, int(num**0.5) + 1): # Check up to the square root for efficiency
           if (num % i) == 0:
               break # Not prime, exit the inner loop
       else:
           print(num, end=" ") # Executed if the loop completes without breaking
```

### D. How to Write in Exam
*   **Start With:** If asked to write a program, write the code directly. If asked to "Explain the logic", write 2-3 lines of text explaining the mathematical property before diving into the code.
*   **Body:** For Armstrong, the examiner is specifically looking for the `while temp > 0:` loop and the `temp % 10` logic. For Prime numbers, the examiner is checking your loop bounds (`range(2, n)` or `range(2, int(n**0.5)+1)`). 
*   **Traps:** 
    *   **The Modifying Trap:** In the Armstrong program, students often perform operations on `num` directly and then try to do `if num == sum`. Since `num` was reduced to `0` by the while loop, this always fails. ALWAYS use a `temp` variable.
    *   **The Prime Trap:** 1 is NOT a prime number. Ensure your logic explicitly handles or skips 1.
*   **Close With:** Provide a quick trace of the output. E.g., "Output: Enter a number: 153 -> 153 is an Armstrong number."

### E. Rapid Recall & Self-Test
* 1-Minute Recall: 
  + Standard number algorithms include Prime, Armstrong, and Factorial numbers.
  + Prime numbers are greater than 1 and cannot be formed by multiplying two smaller natural numbers.
  + Armstrong numbers are equal to the sum of the cubes of their digits.
  + Factorial of a number is the product of all positive integers less than or equal to that number.
* Flash Questions: 
  1. What is the condition for a number to be a Prime number?
  2. How do you extract the last digit of a number in Python?
  3. What is the mathematical property that defines an Armstrong number?
* Practice Prompts: 
  1. Write a Python program to check if a given number is a Prime number.
  2. Develop an algorithm to find the Factorial of a given integer.
  3. Create a function to determine if a number is an Armstrong number, explaining the logic behind the code.

---

## 2. Topic 2: Control & Selection Theory (Iteration & Conditionals)
**[HIGH PROB | ↻ FREQUENT PART A & B MIX]**

### A. What is this?
A computer program normally executes line by line, from top to bottom. Control and selection structures allow the program to break this straight line. They allow the code to make decisions (branching) or repeat actions (looping). Without these, a computer would just be a very fast, very dumb calculator that can only do one thing once.

> Imagine driving a car. A straight road is standard sequential execution. An intersection with a traffic light is a **Selection Structure** (if it's red, stop; else, go). A roundabout that you circle three times looking for an exit is an **Iteration Structure** (a loop).

### B. Exam-Ready Theory
**1. Selection Structures (`if`, `elif`, `else`)**
These statements allow the computer to select an action based on the evaluation of a Boolean condition (True/False).
*   **One-way (`if`):** Executes a block of code only if the condition is True.
*   **Two-way (`if-else`):** Directs the computer to choose between two mutually exclusive alternative courses of action.
*   **Multi-way (`if-elif-else`):** Tests multiple conditions sequentially. Execution stops as soon as one condition evaluates to True.

**2. Iteration Structures (Loops)**
Iteration means repeating a set of actions. Each repetition is called a "pass" or an "iteration".
*   **Definite Iteration (`for` loop):** Repeats an action a predefined number of times. In Python, this is usually achieved using the `range()` function or iterating over a sequence.
    *   Syntax: `for <variable> in range(<integer expression>):`
*   **Indefinite / Conditional Iteration (`while` loop):** Performs an action *until* the program determines it needs to stop (when the continuation condition becomes False). It is an "entry-control" loop because the condition is tested at the top.
    *   Syntax: `while <condition>:`

**3. Loop Control Statements**
*   **`break`:** Instantly terminates the loop entirely, bypassing the continuation condition.
*   **`continue`:** Skips the rest of the code inside the current iteration and jumps back to the top of the loop to evaluate the condition again.

**4. Short-Circuit / Lazy Evaluation**
Python uses short-circuit evaluation for logical operators (`and`, `or`). It stops evaluating an expression as soon as the final result is determined.
*   In `A and B`, if `A` is False, Python knows the whole expression is False, so it never evaluates `B`.
*   In `A or B`, if `A` is True, Python knows the whole expression is True, so it never evaluates `B`.

### C. Worked Examples
**Demonstrating Definite Iteration and Multi-way Selection**
Let's write a program that iterates through numbers 1 to 5 and categorizes them.

```python
for num in range(1, 6): # Definite iteration (1 to 5)
    if num == 3:        # Multi-way selection
        print("Found the middle number!")
    elif num % 2 == 0:
        print(num, "is an Even number")
    else:
        print(num, "is an Odd number")
```

**Demonstrating Indefinite Iteration with a Break**
```python
theSum = 0.0
while True: # Infinite loop setup
    data = input("Enter a number (or press Enter to quit): ")
    if data == "":
        break # Exit the loop if input is empty
    theSum += float(data)

print("The total sum is", theSum)
```

### D. How to Write in Exam
*   **Start With:** Define the term clearly. For loops, state: "Iteration structures repeat a set of actions. There are two types: definite (for) and indefinite (while)."
*   **Body:** For an 8-mark theory question, you MUST provide the syntax for both `for` and `while` loops. 
*   **Traps:** 
    *   **The Indentation Trap:** When writing Python syntax blocks in your answer sheet, physically draw spaces or use arrows to show indentation. The examiner will dock marks if your `if` and the code beneath it are on the same vertical margin.
    *   **Off-by-One Error:** If explaining the `range(start, stop)` function, explicitly state that it stops at `stop - 1`. `range(1, 4)` produces 1, 2, 3.
*   **Close With:** Provide a 3-line example code snippet for whichever structure you just explained.

### E. Rapid Recall & Self-Test
**1-Minute Recall**
- Control structures allow a program to make decisions or repeat actions.
- Selection structures (`if`, `elif`, `else`) execute different blocks of code based on conditions.
- Iteration structures (loops) repeat actions, with `for` loops being definite and `while` loops being indefinite.
- Loop control statements (`break`, `continue`) manage loop execution.
- Short-circuit evaluation optimizes logical operations.

**Flash Questions**
1. What is the primary purpose of control and selection structures in programming?
2. How do `for` and `while` loops differ in terms of iteration?
3. What is the effect of the `break` statement in a loop?

**Practice Prompts**
1. Write a Python program using a `for` loop to print the numbers 1 to 10, and then explain the syntax and functionality of the loop.
2. Describe a scenario where an `if-elif-else` structure would be appropriate, and provide a simple code example to illustrate its use.
3. Explain the concept of short-circuit evaluation with an example, highlighting how it improves program efficiency.

---

## 3. Topic 3: Number & Star Pattern Printing
**[HIGH PROB | ↻ REPEATS IN ODD SLOTS]**

### A. What is this?
Pattern printing is a classic computer science exercise used to teach nested iteration. It requires visualizing a 2D grid and controlling the rows and columns using two separate loop variables. 

> Think of pattern printing like a typewriter. The "Outer Loop" is the carriage return—it moves the paper down to the next line. The "Inner Loop" represents the keys striking the paper—it prints the characters across the current line from left to right.

### B. Exam-Ready Theory
Pattern printing relies entirely on **Nested Definite Iteration**.
*   **Outer Loop (`i`):** Controls the number of rows.
*   **Inner Loop (`j`):** Controls the number of columns (the characters printed on a specific row). The limit of the inner loop is almost always mathematically dependent on the current value of the outer loop `i`.
*   **`print(..., end=" ")`:** By default, Python's `print()` function appends a newline character (`\n`) at the end. To print multiple items on the *same* horizontal line (which is required for patterns), we must override this behavior by setting `end=" "`.
*   **`print()`:** An empty print statement is used at the end of the outer loop to force the cursor to the next line after the inner loop finishes printing the columns.

### C. Worked Examples
**Question:** Write a Python program to print the following pattern:
```text
5 4 3 2 1
4 3 2 1
3 2 1
2 1
1
```

**Step-by-Step Logic:**
1.  We have 5 rows. We need an outer loop that counts down from 5 to 1.
2.  In row 5, the inner loop prints from 5 down to 1.
3.  In row 4, the inner loop prints from 4 down to 1.
4.  Therefore, the inner loop always starts at the current value of the outer row `i`, and counts down to 1.

```python
# Outer loop: Controls the rows (i goes 5, 4, 3, 2, 1)
for i in range(5, 0, -1):
    
    # Inner loop: Controls the columns. Starts at 'i', counts down to 1.
    for j in range(i, 0, -1):
        # Print the column number 'j', keep cursor on the same line
        print(j, end=" ")
        
    # After inner loop finishes, print a newline to move to the next row
    print()
```

### D. How to Write in Exam
*   **Start With:** Do not write theory unless asked. Just write the code.
*   **Body:** Ensure your `range()` parameters are perfectly accurate. If you need to count backward, you MUST provide the third step argument as `-1`. e.g., `range(5, 0, -1)`.
*   **Traps:** 
    *   **The `end` parameter:** The most common reason students lose marks here is forgetting `end=" "`. Without it, your pattern will just print in a single massive vertical line.
    *   **The empty `print()`:** Students often forget to put the empty `print()` inside the outer loop, causing the next row to print on the same line as the previous one.
*   **Close With:** No conclusion needed for a pure code question. Just ensure your indentation is unambiguous.

---
*End of Module 1 Notes. Review these concepts thoroughly, execute the codes mentally, and focus heavily on the 'while' loop logic for digit extraction to secure your Even-slot marks.*

### E. Rapid Recall & Self-Test
**1-Minute Recall**
* Pattern printing involves nested loops: outer loop for rows and inner loop for columns.
* The inner loop's limit depends on the outer loop's current value.
* Use `print(..., end=" ")` to print on the same line and an empty `print()` to move to the next line.

**Flash Questions**
1. What is the purpose of the outer loop in pattern printing?
2. How do you print multiple items on the same horizontal line in Python?
3. What is the function of the empty `print()` statement in pattern printing?

**Practice Prompts**
1. Write a Python program to print the following pattern:
```
1 
2 3 
4 5 6 
7 8 9 10 
```
2. Print the pattern:
```
A 
B B 
C C C 
D D D D 
```
3. Create a Python program to print a pattern of numbers where each row contains one more number than the previous row, starting from 1 and incrementing by 1 for each new number.
