---
subject: PIP
module: '5'
title: 'Scientific Computing (Numpy, Pandas, Matplotlib)'
order: 5
---

# Module 5: Scientific Computing (Numpy, Pandas, Matplotlib)

## 1. Topic 1: Pandas CSV Analytics
**[SURE SHOT | ↻ REPEATED IN EVERY PAPER]**

### A. What is this?
**CST362 Programming in Python - Comprehensive Study Guide**

*Welcome to the final module. This module transitions you from basic programming to data science. It introduces three massive external libraries: `numpy` for matrix math, `matplotlib` for graphing, and `pandas` for data manipulation. According to our PYQ analysis, you face a distinct choice here: Odd (Q19) focuses heavily on Numpy matrix math, while Even (Q20) focuses entirely on Pandas CSV operations. We strongly recommend committing to the Even slot, as Pandas logic reads like simple English, whereas Numpy slicing can easily trap you in syntax errors during an exam.*

---

Pandas is a library built on top of Numpy, designed specifically for data analysis. While Numpy is great for grids of numbers, Pandas is great for tabular data—like an Excel spreadsheet. 

> Imagine you have a massive Excel file with 10,000 employees. If your boss asks you to "Find all the employees in the HR department making over $50k and sort them by name", doing this line-by-line in pure Python using a `for` loop would be exhausting. Pandas allows you to treat the entire spreadsheet as a single object (a DataFrame) and ask it that question in just one line of code.

### B. Exam-Ready Theory
**1. Core Data Structures**
*   **Series:** A one-dimensional labeled array capable of holding any data type (essentially a single column in an Excel sheet).
*   **DataFrame:** A two-dimensional, size-mutable, tabular data structure with labeled axes (rows and columns). Think of it as a complete Excel table.

**2. Essential Pandas Functions to Memorise:**
*   `import pandas as pd`: Standard import alias.
*   **File I/O:**
    *   `df = pd.read_csv("filename.csv")`: Loads a CSV into a DataFrame.
    *   `df.to_csv("filename.csv")`: Saves a DataFrame back to a CSV.
*   **Viewing Data:**
    *   `df.head(n)`: Returns the first `n` rows.
    *   `df.tail(n)`: Returns the last `n` rows.
*   **Selecting & Filtering Data:**
    *   `df['Column_Name']`: Selects a single column (returns a Series).
    *   `df[ df['Age'] > 40 ]`: Filters the DataFrame, keeping only rows where Age > 40.
*   **Sorting:**
    *   `df.sort_values(by='Column_Name')`: Sorts the DataFrame based on a specific column. (Add `ascending=False` for descending order).
*   **Missing Data (NaN):**
    *   `df.fillna(value)`: Replaces missing (`NaN`) values with the specified value.

### C. Worked Examples
**Question:** Consider a CSV file `employee.csv` with columns: `name`, `gender`, `salary`, `institution`. Write pandas commands to: 
1) Read the file. 
2) Print all employee names in alphabetical order. 
3) Print names of employees with the highest salary.

```python
import pandas as pd

# 1. Read the file
df = pd.read_csv("employee.csv")

# 2. Print all employee names in alphabetical order
# Extract the 'name' column, sort it, and print
sorted_names = df['name'].sort_values()
print("Alphabetical Names:\n", sorted_names)

# 3. Print names of employees with the highest salary
# Find the maximum salary value
max_salary = df['salary'].max()

# Filter the dataframe to only include rows matching that max salary
highest_earners = df[df['salary'] == max_salary]

# Print just the 'name' column of those highest earners
print("Highest Earners:\n", highest_earners['name'])
```

### D. How to Write in Exam
*   **Start With:** Always start your answer with `import pandas as pd`.
*   **Body:** For filtering questions (e.g., "Find male employees"), you MUST write the syntax as `df[df['gender'] == 'Male']`. Do not write `if gender == 'Male'`—Pandas uses vectorized operations, not standard `for/if` loops.
*   **Traps:** 
    *   **The CSV Trap:** Don't write your own custom Python file reader (`open()`, `readline()`) unless the question specifically bans Pandas (which it won't). `pd.read_csv()` does all the work for you.
*   **Close With:** If asked to display the result, simply write `print(df)`.

### E. Rapid Recall & Self-Test
* 1-Minute Recall: 
  + Pandas is used for data analysis, especially with tabular data.
  + Core data structures include Series (1-dimensional labeled array) and DataFrame (2-dimensional, size-mutable, tabular data structure).
  + Essential functions include `pd.read_csv()`, `df.to_csv()`, `df.head()`, `df.tail()`, `df['Column_Name']`, `df[ df['Age'] > 40 ]`, `df.sort_values()`, and `df.fillna()`.
* Flash Questions: 
  1. What is the primary use of the Pandas library in Python?
  2. How do you read a CSV file into a DataFrame using Pandas?
  3. What function is used to sort a DataFrame based on a specific column in Pandas?
* Practice Prompts: 
  1. Write a Pandas command to read a CSV file named "students.csv" and print the first 5 rows.
  2. Consider a DataFrame "employees" with columns "name", "age", and "salary". Write Pandas commands to filter the DataFrame to include only employees older than 30 and sort them by salary in descending order.
  3. Given a CSV file "sales.csv" with columns "product", "quantity", and "price", write Pandas commands to calculate the total sales for each product and print the results.

---

## 2. Topic 2: Matplotlib Visualization
**[HIGH PROB | ↻ REPEATED IN Apr '25, May '24]**

### A. What is this?
Matplotlib is a 2D plotting library that produces publication-quality figures. It turns raw numerical data into visual graphs.

> If Pandas is the accountant that organizes the data, Matplotlib is the artist that paints the picture. It takes lists of X and Y coordinates and connects the dots to build line graphs, scatter plots, or bar charts.

### B. Exam-Ready Theory
**1. The `pyplot` Module:**
Matplotlib relies heavily on its `pyplot` module, which provides a MATLAB-like interface. 
*   `from matplotlib import pyplot as plt` (or `import matplotlib.pyplot as plt`).

**2. Essential Plotting Commands:**
*   `plt.plot(x, y)`: Creates a line graph connecting the `x` and `y` coordinate arrays.
*   `plt.scatter(x, y)`: Creates a scatter plot (individual dots, no connecting lines).
*   `plt.bar(x, y)`: Creates a vertical bar chart.
*   `plt.pie(data)`: Creates a pie chart.

**3. Enhancing the Plot:**
*   `plt.xlabel("text")` / `plt.ylabel("text")`: Labels the axes.
*   `plt.title("text")`: Adds a title to the top of the graph.
*   `plt.legend()`: Displays a legend (requires you to add `label='text'` inside the `plot()` command).
*   `plt.show()`: **Crucial.** This actually renders and opens the window displaying the plot.

### C. Worked Examples
**Question:** Create a Matplotlib plot with two lines representing `y=sin(x)` (solid line) and `y=cos(x)` (dashed line) for `0 <= x <= 2π`. Add legends, labels, and ticks.

```python
import matplotlib.pyplot as plt
import numpy as np
import math

# Step 1: Generate X axis data (0 to 2*pi with small steps)
x = np.arange(0, math.pi * 2, 0.05)

# Step 2: Generate Y axis data using numpy trig functions
y_sin = np.sin(x)
y_cos = np.cos(x)

# Step 3: Plot both lines. 
# '-' is solid (default), '--' is dashed. Add labels for the legend.
plt.plot(x, y_sin, '-', label='Sine Wave')
plt.plot(x, y_cos, '--', label='Cosine Wave')

# Step 4: Add customizations (Ticks, Labels, Legend)
plt.title("Trigonometric Functions")
plt.xlabel("X Axis (Radians)")
plt.ylabel("Y Axis (Amplitude)")

# Customizing ticks (optional unless specifically asked, but shows expertise)
plt.xticks([0, math.pi, 2*math.pi], ['0', 'π', '2π'])

plt.legend() # Displays the labels we defined in plt.plot()

# Step 5: Render the plot
plt.show()
```

### D. How to Write in Exam
*   **Start With:** Import `matplotlib.pyplot` and `numpy` (you almost always need numpy to generate the `x` data range easily).
*   **Body:** The examiner is checking for three specific things: 1) Did you generate `x` correctly using `np.arange` or `np.linspace`? 2) Did you use the `--` format string for the dashed line? 3) Did you include `plt.legend()` and `plt.show()`?
*   **Traps:** 
    *   **The Invisible Graph Trap:** Forgetting `plt.show()`. Without it, the script calculates the graph in memory but immediately exits without drawing anything on the screen.
*   **Close With:** Draw a rough sketch of a sine and cosine wave crossing each other in your answer booklet. Visuals secure marks.

### E. Rapid Recall & Self-Test
* 1-Minute Recall: Matplotlib is a 2D plotting library used to create publication-quality figures from raw numerical data. It relies on the `pyplot` module and essential plotting commands like `plt.plot()`, `plt.scatter()`, and `plt.bar()`. Enhancements include labeling axes with `plt.xlabel()` and `plt.ylabel()`, adding titles with `plt.title()`, and displaying legends with `plt.legend()`. Rendering the plot requires `plt.show()`.
* Flash Questions:
 1. What is the primary function of the `pyplot` module in Matplotlib?
 2. How do you create a scatter plot in Matplotlib?
 3. What command is used to display a legend in a Matplotlib plot?
* Practice Prompts:
 1. Write a Python script using Matplotlib to plot the function `y = 2x` and `y = x^2` for `0 <= x <= 10`. Include appropriate labels, title, and legend.
 2. Create a Matplotlib plot to visualize the data of a simple bar chart representing the scores of five students. Use `plt.bar()` and customize the plot with labels and a title.
 3. Generate a pie chart using Matplotlib to show the distribution of three categories (A, B, C) with values 30, 40, and 30 respectively. Add a title and ensure the chart is properly labeled.

---

## 3. Topic 3: Numpy Array Math
**[SURE SHOT | ↻ GUARANTEED IN ODD SLOT]**

### A. What is this?
NumPy (Numerical Python) is the core library for scientific computing in Python. It provides a high-performance multidimensional array object called `ndarray`. 

> Python's standard Lists are like a Swiss Army Knife—they can hold anything (numbers, strings, other lists), but they are relatively slow when doing heavy math. A Numpy Array is like a scalpel—it only holds one type of data (usually numbers), but it allows you to do massive matrix calculations instantly without writing `for` loops.

### B. Exam-Ready Theory
**1. The `ndarray` Object Attributes:**
*   `ndarray.ndim`: Returns the number of dimensions (axes). (e.g., 1 for a line, 2 for a matrix).
*   `ndarray.shape`: Returns a tuple representing the size of each dimension (e.g., `(3, 4)` for a 3x4 matrix).
*   `ndarray.size`: Total number of elements.

**2. Array Creation & Operations:**
*   **Creation:** `np.array([1, 2, 3])`
*   **Element-wise Math:** If `A = [1, 2]` and `B = [3, 4]`, then `A + B` results in `[4, 6]`. (Unlike standard Python lists, where `A + B` would result in `[1, 2, 3, 4]`).
*   **Hadamard Product (Element-wise multiplication):** `A * B` results in `[3, 8]`.
*   **Dot Product (Matrix Multiplication):** `A.dot(B)`. The number of columns in A must equal the number of rows in B.
*   **Transpose:** `A.T` or `A.transpose()`.

**3. Slicing Arrays:**
Numpy slicing works similarly to Python lists but extends to multiple dimensions: `array[row_start:row_end, col_start:col_end]`.

### C. Worked Examples
**Question:** Write a program to create a 3x3 matrix `A` with random integers. Multiply each element by 2, and then calculate its transpose.

```python
import numpy as np

# Step 1: Create a 3x3 array of random integers between 0 and 10
# Note: np.random.randint(low, high, size=(rows, cols))
A = np.random.randint(0, 10, size=(3, 3))
print("Original Matrix A:\n", A)

# Step 2: Multiply each element by a scalar (element-wise operation)
A_scaled = A * 2
print("\nScaled Matrix (A * 2):\n", A_scaled)

# Step 3: Calculate the transpose
A_transposed = A.T
print("\nTransposed Matrix:\n", A_transposed)
```

### D. How to Write in Exam
*   **Start With:** "NumPy arrays (`ndarray`) allow for vectorized mathematical operations, eliminating the need for explicit Python `for` loops when performing matrix math."
*   **Body:** Pay close attention to the question. Are they asking for Matrix Multiplication (Dot Product: `A.dot(B)`) or Element-wise Multiplication (`A * B`)? This is the most common mistake.
*   **Traps:** 
    *   **The Random Trap:** The syntax for generating a random array is highly specific: `np.random.randint(low, high, size=(rows, cols))`. Do not mix this up with standard Python `random.randint()`.
*   **Close With:** Write out a sample matrix (e.g., `[[1,2],[3,4]]`) to show you understand how rows and columns are structured visually.

---
*End of Module 5 Notes. If you commit to the Even slot (Q20), focus entirely on Pandas and CSV operations. If you are highly confident in linear algebra and matrix slicing, the Odd slot (Q19) with Numpy is a viable alternative.*

### E. Rapid Recall & Self-Test
**1-Minute Recall:**
* NumPy arrays (`ndarray`) enable vectorized mathematical operations.
* Key attributes: `ndarray.ndim`, `ndarray.shape`, `ndarray.size`.
* Array creation: `np.array()`.
* Element-wise math: `A + B`, `A * B`.
* Dot product (matrix multiplication): `A.dot(B)`.
* Transpose: `A.T` or `A.transpose()`.

**Flash Questions:**
1. What is the primary advantage of using NumPy arrays over standard Python lists for mathematical operations?
2. How do you calculate the dot product of two matrices `A` and `B` in NumPy?
3. What is the purpose of the `ndarray.shape` attribute in NumPy?

**Practice Prompts:**
1. Create a 2x2 matrix `A` with elements [1, 2; 3, 4] and a 2x2 matrix `B` with elements [5, 6; 7, 8]. Calculate the element-wise sum and product of `A` and `B`.
2. Write a Python program to generate a 3x3 matrix with random integers between 0 and 10, calculate its transpose, and then perform element-wise multiplication by a scalar value (e.g., 2).
3. Given two matrices `A` (2x3) and `B` (3x2), calculate the dot product `A.dot(B)` and explain the resulting matrix dimensions.
