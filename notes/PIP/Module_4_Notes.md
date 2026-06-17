---
subject: PIP
module: '4'
title: Classes and Objects
order: 4
---

# Module 4: Classes and Objects

## 1. Topic 1: Exception Handling (Resilience)
**[SURE SHOT | ↻ EXACT REPEAT IN ALL 4 PAPERS]**

### A. What is this?
**CST362 Programming in Python - Comprehensive Study Guide**

*Welcome to Module 4. This module shifts focus from procedural scripts to Object-Oriented Programming (OOP) and code resilience. According to our PYQ analysis, this module contains the absolute highest predictability in the entire syllabus: Exception Handling. By mastering the `try-except` lifecycle and the `ABC` module, you can confidently secure the Even slot (Q18) marks every time.*

---

Even perfectly written code can crash if it encounters something unexpected from the outside world—like a user typing a letter when asked for a number, or trying to divide a number by zero. Instead of letting the program instantly die (crash), Python allows us to "catch" these errors, handle them gracefully, and keep the program running. This process is called Exception Handling.

> Think of a program like an airplane in flight. A syntax error is a missing wing—the plane can never take off. An exception is a bird striking the engine mid-flight. If the plane doesn't have an emergency protocol (an Exception Handler), it crashes. If it does, the pilot can safely divert the plane to the nearest runway and save the passengers.

### B. Exam-Ready Theory
An exception is an event that disrupts the normal flow of the program's instructions.

**1. The Exception Lifecycle Blocks:**
*   **`try`:** This block encloses the code that might raise an exception. Python monitors this block for errors.
*   **`except`:** If an error occurs in the `try` block, execution immediately jumps to this block. You specify the *type* of exception you want to catch here.
*   **`else`:** (Optional) This block executes *only* if the `try` block completed successfully without raising any exceptions.
*   **`finally`:** (Optional) This block *always* executes, regardless of whether an exception was raised or not. It is typically used for cleanup actions (like closing files or network connections).

**2. Common Built-in Exceptions to Memorise:**
*   `ValueError`: Raised when a function receives an argument of the right type but an inappropriate value (e.g., `int("apple")`).
*   `ZeroDivisionError`: Raised when dividing by zero.
*   `FileNotFoundError`: Raised when trying to open a file that doesn't exist.
*   `TypeError`: Raised when an operation is applied to an object of an inappropriate type (e.g., adding a string to an integer).

**3. Raising Exceptions Forcefully:**
*   You can manually trigger an exception using the `raise` keyword (e.g., `raise ValueError("Invalid age")`).

### C. Worked Examples
**Question:** What are exceptions? How does Python catch them? Illustrate with a program that handles multiple exceptions.

```python
# A robust division calculator
def safe_divide():
    try:
        # Code that might crash
        num = int(input("Enter numerator: "))
        den = int(input("Enter denominator: "))
        result = num / den
        
    except ValueError:
        # Catches cases where user types letters instead of numbers
        print("Error: Please enter valid integers only.")
        
    except ZeroDivisionError:
        # Catches division by zero
        print("Error: Cannot divide by zero. The universe will implode.")
        
    else:
        # Runs ONLY if the try block succeeded
        print(f"Success! The result is {result}")
        
    finally:
        # Runs no matter what happens
        print("Division operation concluded. Thank you.")

# Execute
safe_divide()
```

### D. How to Write in Exam
*   **Start With:** "An exception is an error that occurs during the execution of a program, disrupting the normal flow of instructions. Python catches these using the try-except-else-finally blocks."
*   **Body:** Do not just write the code. You MUST explain what each block (`try`, `except`, `finally`) does. The examiner is specifically looking for the definition of the `finally` block to prove you understand the full lifecycle.
*   **Traps:** 
    *   **The Bare Except Trap:** Do not write a bare `except:` clause without specifying the error type (like `except ValueError:`). While Python allows it, it's considered terrible practice because it catches everything, including system exit signals. Mentioning specific errors shows deep knowledge.
*   **Close With:** Provide the exact example above. It is compact and demonstrates handling two different specific errors, which guarantees full marks.

### E. Rapid Recall & Self-Test
* 1-Minute Recall: 
  + Exception handling is a process in Python that prevents a program from crashing when it encounters an error.
  + The `try` block encloses code that might raise an exception.
  + The `except` block catches and handles specific exceptions.
  + The `else` block executes if the `try` block completes successfully.
  + The `finally` block always executes, used for cleanup actions.
  + Common exceptions include `ValueError`, `ZeroDivisionError`, `FileNotFoundError`, and `TypeError`.
* Flash Questions: 
  1. What is the purpose of the `try` block in exception handling?
  2. How do you manually trigger an exception in Python?
  3. What is the difference between the `else` and `finally` blocks in exception handling?
* Practice Prompts: 
  1. Write a Python program that handles the `FileNotFoundError` exception when trying to open a file.
  2. Create a function that divides two numbers and handles the `ZeroDivisionError` exception.
  3. Explain the difference between `ValueError` and `TypeError` exceptions with examples.

---

## 2. Topic 2: Abstract Classes & Methods
**[SURE SHOT | ↻ REPEATED PYQ: Jun '22, May '24]**

### A. What is this?
An abstract class is a blueprint for other classes. It allows you to define a set of methods that *must* be created within any child classes built from the abstract class. However, the abstract class itself cannot be instantiated (you cannot create a direct object from it). 

> Imagine a blueprint for a "Vehicle". The blueprint states that every vehicle MUST have a `move()` method. However, you can't go to a dealership and buy a generic "Vehicle". You can only buy a "Car" or a "Bicycle" (the subclasses). The abstract class forces the Car and Bicycle to explain exactly *how* they move.

### B. Exam-Ready Theory
**1. The `abc` Module:**
*   Python does not support abstract classes natively in its core syntax. We must import the `ABC` (Abstract Base Class) meta-class and the `@abstractmethod` decorator from the built-in `abc` module.
    *   `from abc import ABC, abstractmethod`

**2. Key Rules:**
*   A class that inherits from `ABC` and contains at least one `@abstractmethod` becomes an abstract class.
*   You **cannot** create an object (instantiate) an abstract class. (`v = Vehicle()` will throw an error).
*   Any child class that inherits from the abstract class **must** implement all the abstract methods. If it doesn't, Python will throw an error when you try to instantiate the child class.

### C. Worked Examples
**Question:** Create an Abstract Base Class called `Shape` with abstract methods `area()` and `perimeter()`. Derive `Rectangle` and `Circle` classes from it and implement the methods.

```python
from abc import ABC, abstractmethod
import math

# Step 1: Define the Abstract Base Class
class Shape(ABC):
    
    # Step 2: Define abstract methods (no implementation needed)
    @abstractmethod
    def area(self):
        pass
        
    @abstractmethod
    def perimeter(self):
        pass

# Step 3: Create a concrete subclass
class Rectangle(Shape):
    def __init__(self, length, width):
        self.length = length
        self.width = width
        
    # MUST implement area
    def area(self):
        return self.length * self.width
        
    # MUST implement perimeter
    def perimeter(self):
        return 2 * (self.length + self.width)

# Step 4: Create another concrete subclass
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
        
    def area(self):
        return math.pi * (self.radius ** 2)
        
    def perimeter(self):
        return 2 * math.pi * self.radius

# Execution
# s = Shape() # This would cause an Error!
rect = Rectangle(10, 5)
print("Rectangle Area:", rect.area())

circ = Circle(7)
print("Circle Area:", circ.area())
```

### D. How to Write in Exam
*   **Start With:** Explicitly state the two rules: "1. Abstract classes cannot be instantiated. 2. Subclasses must implement all abstract methods."
*   **Body:** Write the code clearly. You absolutely MUST include the import statement `from abc import ABC, abstractmethod`. Without this, the code is invalid. Ensure you pass `ABC` into the parent class definition: `class Shape(ABC):`.
*   **Traps:** 
    *   **The Decorator Trap:** Forgetting the `@abstractmethod` decorator above the methods in the parent class. If you forget this, it's just a normal class.
    *   **The Constructor Trap:** Do not forget the `__init__` constructor in your subclasses to accept the dimensions (length, width, radius).
*   **Close With:** Note at the bottom of your code that attempting to do `obj = Shape()` will raise a `TypeError`.

### E. Rapid Recall & Self-Test
**1-Minute Recall**
* Abstract classes are blueprints for other classes and cannot be instantiated.
* They define a set of methods that must be implemented by any child classes.
* The `abc` module is used to create abstract classes in Python.
* A class that inherits from `ABC` and contains at least one `@abstractmethod` becomes an abstract class.
* Child classes must implement all abstract methods.

**Flash Questions**
1. What is the purpose of the `@abstractmethod` decorator in Python?
2. Can an abstract class be instantiated in Python? Why or why not?
3. What happens if a child class does not implement all the abstract methods of its parent class?

**Practice Prompts**
1. Create an abstract base class called `Vehicle` with abstract methods `start_engine()` and `accelerate()`. Derive `Car` and `Motorcycle` classes from it and implement the methods.
2. Write a Python program to demonstrate the use of abstract classes and methods. Include a parent class `Shape` with abstract methods `area()` and `perimeter()`, and child classes `Rectangle` and `Circle` that implement these methods.
3. Explain the difference between an abstract class and a concrete class in Python, including examples of when to use each.

---

## 3. Topic 3: OOP Fundamentals (Inheritance, Polymorphism, Constructors)
**[HIGH PROB | ↻ CORE KNOWLEDGE FOR Q17]**

### A. What is this?
Object-Oriented Programming (OOP) is a paradigm based on "objects" that contain data (attributes) and code (methods). 

> Imagine a Factory. The "Class" is the blueprint for a robot. The "Object" (or Instance) is the actual physical robot built from that blueprint. "Attributes" are its physical specs (color=red, battery=100%). "Methods" are the actions it can perform (walk, grab). "Inheritance" is making a specialized blueprint (Flying Robot) by copying the original blueprint and just adding wings.

### B. Exam-Ready Theory
**1. Constructors & `self`**
*   **`__init__(self)`:** The constructor method. It is automatically called when an object is instantiated. Used to initialize the object's attributes.
*   **`self`:** The first parameter of *every* instance method in a class. It is a reference to the current object itself, used to access variables that belong to the class.

**2. Inheritance**
Allows a child class to acquire properties (attributes and methods) from a parent class, promoting code reusability.
*   **Syntax:** `class Child(Parent):`
*   **Types:** Single, Multiple (Python supports this: `class Child(P1, P2):`), Multilevel, Hierarchical, Hybrid.
*   **`super()`:** A built-in function that returns a proxy object allowing you to refer to the parent class. Used in the child's constructor to call the parent's constructor: `super().__init__(args)`.

**3. Polymorphism & Method Overriding**
*   Polymorphism means "many forms." It allows functions to use objects of different types at different times.
*   **Method Overriding:** If a child class provides a specific implementation of a method that is already provided by its parent class, it is called method overriding. The child's method will be executed instead of the parent's.

### C. Worked Examples
**Question:** Illustrate Inheritance and Method Overriding with a Python program.

```python
# Parent Class
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        
    def display_role(self):
        print(f"{self.name} is a generic Employee.")

# Child Class inheriting from Employee
class Manager(Employee):
    def __init__(self, name, salary, department):
        # Call Parent constructor using super()
        super().__init__(name, salary)
        self.department = department
        
    # Method Overriding: Redefining the parent's method
    def display_role(self):
        print(f"{self.name} manages the {self.department} department.")

# Execution
emp = Employee("John", 50000)
emp.display_role() # Output: John is a generic Employee.

mgr = Manager("Alice", 90000, "IT")
mgr.display_role() # Output: Alice manages the IT department.
```

### D. How to Write in Exam
*   **Start With:** Define the core pillars. "Inheritance provides code reusability. Polymorphism allows the same method name to execute different behaviors based on the object."
*   **Body:** When demonstrating inheritance, ALWAYS use the `__init__` constructor in both parent and child, and explicitly show the use of `super().__init__()` to link them.
*   **Traps:** 
    *   **The `self` Trap:** The most common syntax error in handwritten Python exams is forgetting to put `self` as the first argument in method definitions, or forgetting to use `self.variable_name` when accessing attributes.
    *   **Method Overloading:** Be careful! Python does NOT natively support "Method Overloading" (having multiple methods with the same name but different parameters in the same class) like Java or C++. If asked about Polymorphism, always demonstrate "Method Overriding" (Child replacing Parent's method) instead.
*   **Close With:** Clearly label the Overridden method in your code comments for the examiner.

---
*End of Module 4 Notes. This module is your highest-yielding theoretical area. Master the `try-except` syntax and the `ABC` module imports, and you will easily clear the Even slot questions.*

### E. Rapid Recall & Self-Test
* 1-Minute Recall: 
  + Inheritance allows a child class to inherit properties from a parent class.
  + Polymorphism enables functions to work with different data types.
  + Constructors (`__init__`) initialize objects, and `self` refers to the object itself.
  + `super()` is used to call the parent class constructor.
* Flash Questions: 
  1. What is the purpose of the `__init__` method in a class?
  2. How does Python support polymorphism?
  3. What is the difference between method overriding and method overloading?
* Practice Prompts: 
  1. Create a parent class `Vehicle` and a child class `Car` that inherits from `Vehicle`. Demonstrate method overriding by redefining a method in the `Car` class.
  2. Write a Python program that showcases polymorphism using a function that works with different object types.
  3. Design a class hierarchy with multiple levels of inheritance and demonstrate the use of `super()` to call parent class constructors.
