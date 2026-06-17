---
subject: PIP
module: '2'
title: 'Functions, Strings, and recursion'
order: 2
---

# Module 2: Functions, Strings, and recursion

## 1. Topic 1: Dictionary Operations
**[SURE SHOT | ↻ REPEATED PYQ: Jun '22, May '24, Apr '25]**

### A. What is this?
**CST362 Programming in Python - Comprehensive Study Guide**

*Welcome to Module 2. In Python, data is rarely handled as single, isolated variables. We organize data into structures. According to our PYQ analysis, this module gives you a clear strategic choice. The exam almost always pairs complex string manipulation (like Caesar Cipher on the Odd side) against built-in Data Structures (Lists and Dictionaries on the Even side). We recommend focusing heavily on mastering the Even slot (Q14) to secure fast, reliable marks.*

---

Unlike a list where items are accessed by their numerical position (index 0, 1, 2), a Dictionary organizes information by **association**. It stores data in pairs: a "Key" and a "Value". You use the unique Key to instantly find its corresponding Value.

> Think of a dictionary like a real-world phonebook. If you want to find Nathaniel's phone number, you don't start at page 1 and read every single entry until you reach him (that would be a List). Instead, you look up the exact name "Nathaniel" (the Key) to instantly find "351-7743" (the Value).

### B. Exam-Ready Theory
A Python dictionary is an unordered, mutable collection of key-value pairs.
*   **Syntax:** Written enclosed in curly braces `{}`. Keys and values are separated by a colon `:`, and entries are separated by commas.
    *   Example: `phone_book = {'Savannah': '476-3321', 'Nathaniel': '351-7743'}`
*   **Properties of Keys:** Keys MUST be unique and immutable (like strings, numbers, or tuples).
*   **Adding/Updating Entries:** Use the subscript operator `[]`.
    *   `dict[new_key] = new_value`
*   **Removing Entries:**
    *   `dict.pop(key)`: Removes the key and returns its value. Raises an error if the key doesn't exist (unless a default value is provided: `dict.pop(key, None)`).
*   **Accessing Values Safely:** 
    *   `dict.get(key, default)`: Returns the value for the key. If the key is missing, it returns the `default` value instead of crashing the program.
*   **Traversing (Looping):**
    *   By Keys: `for key in dict:`
    *   By Items (Tuples): `for key, value in dict.items():`

### C. Worked Examples
**Question:** Write a program to count how many times each character appears in a given string and store the count in a dictionary.

```python
# Step 1: Accept the input string
text = input("Enter a string: ")

# Step 2: Create an empty dictionary to store the frequencies
freq_dict = {}

# Step 3: Iterate through each character in the string
for char in text:
    
    # Step 4: Check if the character is already a key in the dictionary
    if char in freq_dict:
        # If it exists, increment its count (value) by 1
        freq_dict[char] += 1
    else:
        # If it's a new character, add it to the dictionary with a count of 1
        freq_dict[char] = 1

# Step 5: Display the final dictionary
print("Character frequencies:", freq_dict)
```

### D. How to Write in Exam
*   **Start With:** Define it clearly: "A dictionary in Python is an unordered collection of data values, used to store data values like a map, which unlike other Data Types that hold only a single value as an element, Dictionary holds key:value pairs."
*   **Body:** When asked to write a program (like matching names to birthdays), always initialize an empty dictionary `my_dict = {}` first. Use a loop to populate it. 
*   **Traps:** 
    *   **The Access Trap:** Never use `my_dict[key]` if you aren't 100% sure the key exists; it will throw a `KeyError`. Always use `if key in my_dict:` first, or use the `get()` method.
*   **Close With:** Write a quick example showing how to print the dictionary using `.items()`.

### E. Rapid Recall & Self-Test
* 1-Minute Recall: 
  + Dictionary: unordered, mutable collection of key-value pairs.
  + Syntax: `{key: value}`.
  + Keys: unique, immutable (strings, numbers, tuples).
  + Adding/Updating: `dict[new_key] = new_value`.
  + Removing: `dict.pop(key)`.
  + Accessing: `dict.get(key, default)`.
* Flash Questions:
  1. What is the primary difference between a list and a dictionary in Python?
  2. How do you safely access a value in a dictionary without risking a KeyError?
  3. What method is used to remove a key-value pair from a dictionary?
* Practice Prompts:
  1. Write a Python program to store student names as keys and their corresponding ages as values in a dictionary. Then, print out the names of students who are above 18 years old.
  2. Create a dictionary to store the prices of items in a shop. Write a function to update the price of a specific item and another function to remove an item from the dictionary.
  3. Given a string, create a dictionary where the keys are the unique characters in the string and the values are the frequencies of each character.

---

## 2. Topic 2: List Methods & Slicing
**[SURE SHOT | ↻ REPEATED PYQ: Apr '25, Jun '22, May '23, May '24]**

### A. What is this?
A List is a sequence of data values called items or elements. Each item in a list is ordered by its position (index), starting from 0. Lists are highly flexible—they can grow, shrink, and hold mixed types of data.

> Think of a list like a row of lockers in a school hallway. Each locker has a specific number printed on the front (the index: 0, 1, 2...). You can open any locker to see what's inside, you can put new things in, or take things out, but the locker numbers stay perfectly in order.

### B. Exam-Ready Theory
Lists are **mutable** (changeable) sequences enclosed in square brackets `[]`.

**1. Slicing**
Slicing extracts a sublist from the main list. 
*   **Syntax:** `<list>[<start> : <stop> : <step>]`
*   It extracts elements from `start` up to, but NOT including, `stop`.
*   Example: If `L = [10, 20, 30, 40, 50]`, then `L[1:4]` returns `[20, 30, 40]`.

**2. Essential Built-in Methods**
*   **Adding Elements:**
    *   `L.append(element)`: Adds one element to the exact end of the list.
    *   `L.extend(aList)`: Merges another list onto the end of the current list.
    *   `L.insert(index, element)`: Inserts an element at a specific position.
*   **Removing Elements:**
    *   `L.pop([index])`: Removes and returns the element at the given index. If no index is provided, it pops the very last element.
    *   `L.remove(element)`: Removes the *first occurrence* of the specified element.
*   **Utility:**
    *   `L.sort()`: Sorts the list in ascending order (mutates the original list).
    *   `L.index(element)`: Returns the index position of the element.

### C. Worked Examples
**Question:** Write a Python program to read N integers into a list and separate the positive and negative numbers into two different lists.

```python
# Step 1: Initialize the three required lists
main_list = []
positive_list = []
negative_list = []

# Step 2: Read N elements
n = int(input("Enter number of elements: "))
for i in range(n):
    val = int(input("Enter integer: "))
    main_list.append(val)

# Step 3: Traverse the main list and separate
for num in main_list:
    if num >= 0:
        positive_list.append(num)
    else:
        negative_list.append(num)

# Step 4: Display results
print("Original List:", main_list)
print("Positive List:", positive_list)
print("Negative List:", negative_list)
```

### D. How to Write in Exam
*   **Start With:** If it's a theory question, define a list as a "mutable, ordered sequence of elements accessed via zero-based indexing."
*   **Body:** For programming questions, explicitly show the initialization of empty lists `[]` before your loops. Use `.append()` heavily, as it's the safest way to build lists dynamically based on `if` conditions.
*   **Traps:** 
    *   **The Slicing Trap:** `L[0:2]` returns exactly 2 elements (index 0 and 1). It does NOT include index 2.
    *   **The Search Trap:** The `.index(target)` method throws an error if the target isn't found. Always write `if target in L:` before calling `.index()`.
*   **Close With:** Show the output trace.

### E. Rapid Recall & Self-Test
* **1-Minute Recall:** 
  + Lists are mutable sequences enclosed in square brackets `[]`.
  + Slicing syntax: `<list>[<start> : <stop> : <step>]`.
  + Essential built-in methods: `append()`, `extend()`, `insert()`, `pop()`, `remove()`, `sort()`, and `index()`.
* **Flash Questions:**
  1. What is the difference between the `append()` and `extend()` methods in lists?
  2. How do you remove the last element from a list using the `pop()` method?
  3. What is the purpose of the `sort()` method in lists?
* **Practice Prompts:**
  1. Write a Python program to create a list of numbers and then use slicing to extract the first three elements.
  2. Create a list of strings and use the `index()` method to find the position of a specific string.
  3. Write a Python program to read a list of integers from the user, sort the list in ascending order, and then print the sorted list.

---

## 3. Topic 3: Caesar Cipher Encryption
**[HIGH PROB | ↻ REPEATED PYQ: Apr '25, May '23]**

### A. What is this?
Data traveling on networks is vulnerable to spies. Encryption translates plaintext into a secret code (ciphertext). A Caesar Cipher is one of the oldest and simplest encryption methods. It takes every letter in a message and shifts it a certain number of places down the alphabet. 

> Imagine a secret decoder ring with two alphabet wheels. If you set the "shift" to 3, then 'a' becomes 'd', 'b' becomes 'e', and so on. If you reach the end of the alphabet ('z'), you just wrap back around to the start ('c').

### B. Exam-Ready Theory
To implement a Caesar cipher in Python, we don't use a physical ring; we use the underlying ASCII numeric codes of characters.
*   **`ord(character)`:** Converts a single character into its integer ASCII value. (e.g., `ord('a')` is 97).
*   **`chr(integer)`:** Converts an integer ASCII value back into a character. (e.g., `chr(97)` is 'a').

**The Mathematical Wrap-Around Logic:**
Because the alphabet loops back around (after 'z' comes 'a'), we cannot just add the shift distance blindly. We must use the modulo operator `% 26`.
1.  Convert the character to a 0-25 scale: `ord(char) - ord('a')`
2.  Add the shift distance: `+ distance`
3.  Wrap it around the 26 letters: `% 26`
4.  Convert it back to the ASCII scale: `+ ord('a')`

### C. Worked Examples
**Question:** Write a program to implement Caesar cipher encryption and decryption for a lowercase string.

```python
def encrypt(text, distance):
    cipher_text = ""
    for char in text:
        # Ensure it's a lowercase letter before shifting
        if 'a' <= char <= 'z':
            # Apply the mathematical shift formula
            shifted_ascii = (ord(char) - ord('a') + distance) % 26 + ord('a')
            cipher_text += chr(shifted_ascii)
        else:
            # If it's a space or punctuation, don't shift it
            cipher_text += char
    return cipher_text

def decrypt(cipher_text, distance):
    plain_text = ""
    for char in cipher_text:
        if 'a' <= char <= 'z':
            # Subtract the distance to reverse the shift
            shifted_ascii = (ord(char) - ord('a') - distance) % 26 + ord('a')
            plain_text += chr(shifted_ascii)
        else:
            plain_text += char
    return plain_text

# Example Usage
message = input("Enter lowercase message: ")
dist = int(input("Enter distance: "))

encrypted = encrypt(message, dist)
print("Encrypted:", encrypted)
print("Decrypted:", decrypt(encrypted, dist))
```

### D. How to Write in Exam
*   **Start With:** Define the cipher: "A Caesar cipher replaces each character in plaintext with a character that occurs a given distance away in the sequence, wrapping around to the beginning if necessary."
*   **Body:** You MUST write the core formula clearly in your code. The examiner is scanning exactly for `(ord(char) - ord('a') + distance) % 26 + ord('a')`. If you try to write 26 massive `if` statements, you will run out of time and likely lose marks.
*   **Traps:** 
    *   **The Hardcode Trap:** Students often hardcode `97` instead of `ord('a')`. While `97` works for lowercase, using `ord('a')` shows the examiner you actually understand the logic.
    *   **The Punctuation Trap:** Remember to handle spaces or numbers by just passing them through unchanged.
*   **Close With:** Provide a clear input/output example showing the shift working.

---
*End of Module 2 Notes. Your priority here is absolute fluency with List and Dictionary methods. They form the backbone of almost all data handling in Python and are guaranteed to yield high marks.*

### E. Rapid Recall & Self-Test
* 1-Minute Recall: 
  + The Caesar Cipher is a simple encryption method that shifts each letter in a message by a certain number of places down the alphabet.
  + The shift is achieved using the ASCII numeric codes of characters, with `ord(character)` converting a character to its integer ASCII value and `chr(integer)` converting an integer ASCII value back to a character.
  + The mathematical wrap-around logic uses the modulo operator `% 26` to ensure the alphabet loops back around after 'z'.
* Flash Questions: 
  1. What is the purpose of the `ord()` function in implementing a Caesar cipher?
  2. How does the modulo operator `% 26` contribute to the Caesar cipher's wrap-around logic?
  3. What happens to non-alphabet characters (such as spaces or punctuation) during the Caesar cipher encryption process?
* Practice Prompts: 
  1. Write a Python function to implement a Caesar cipher decryption for a given ciphertext and shift distance, handling both lowercase and uppercase letters.
  2. Explain how the Caesar cipher's shift distance affects the encryption and decryption processes, providing examples to illustrate your points.
  3. Develop a Python program that uses the Caesar cipher to encrypt and decrypt a message, allowing the user to input the message and shift distance.
