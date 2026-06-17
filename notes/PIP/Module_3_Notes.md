---
subject: PIP
module: '3'
title: 'Lists, Tuples, Dictionaries, and files'
order: 3
---

# Module 3: Lists, Tuples, Dictionaries, and files

## 1. Topic 1: Turtle Graphics (Drawing Polygons)
**[SURE SHOT | ↻ REPEATED PYQ: Apr '25, May '24, May '23, Jun '22]**

### A. What is this?
**CST362 Programming in Python - Comprehensive Study Guide**

*Welcome to Module 3. This module introduces you to three distinct external libraries: `turtle` for vector graphics, `images` (or `PIL`) for pixel manipulation, and `tkinter` for Graphical User Interfaces. According to our PYQ analysis, this module has a "Golden Overlap": Image Processing appears constantly. We strongly advise focusing on the Odd slot (Turtle + Image Processing), as writing full Tkinter GUI code (Even slot) under time pressure is a massive trap.*

---

Turtle graphics is a popular way to introduce programming to beginners. It was originally part of the Logo programming language in the 1960s. 

> Imagine a robotic turtle sitting in the exact center of a giant sheet of paper, holding a pen attached to its tail. You give the turtle simple commands like "move forward 50 steps," "turn right 90 degrees," and "put the pen down." By combining these simple instructions, you can draw complex geometric shapes.

### B. Exam-Ready Theory
Turtle graphics use a standard Cartesian coordinate system `(x, y)` with the origin `(0, 0)` at the center of the window (known as "home").

**1. Core Objects:**
*   **Turtle Object:** The pen/cursor that moves on the screen (`t = turtle.Turtle()`).
*   **Screen Object:** The window associated with the turtle (`t.screen`).
*   **Canvas:** The actual drawing area within the window.

**2. Essential Turtle Methods:**
*   **Movement:**
    *   `t.forward(distance)`: Moves the turtle forward in the current direction.
    *   `t.goto(x, y)`: Moves the turtle to the specified absolute coordinates.
*   **Orientation:**
    *   `t.right(degrees)` / `t.left(degrees)`: Rotates the turtle from its current heading.
    *   `t.setheading(degrees)`: Points the turtle in an absolute direction (0 = East, 90 = North).
*   **Pen Control:**
    *   `t.up()`: Lifts the pen (moves without drawing).
    *   `t.down()`: Lowers the pen (draws while moving).
    *   `t.width(pixels)`: Changes the thickness of the line.
*   **Colors & Shapes:**
    *   `t.pencolor("color")`: Changes the line color.
    *   `t.fillcolor("color")`: Changes the color used to fill shapes.
    *   `t.begin_fill()` / `t.end_fill()`: Encloses a set of drawing commands to create a solid colored shape.
    *   `t.hideturtle()`: Makes the turtle icon invisible to speed up drawing or hide the cursor.

### C. Worked Examples
**Question:** Write a Python program to draw a hexagon and fill it with color.

**Mathematical Logic for Polygons:** 
To draw any regular polygon, the turtle must turn by an angle equal to `360 / number_of_sides`.
*   Square: `360 / 4 = 90` degrees.
*   Hexagon: `360 / 6 = 60` degrees.
*   Star (5-point): `144` degrees.

```python
import turtle

def draw_hexagon():
    # Step 1: Create the turtle object
    t = turtle.Turtle()
    
    # Step 2: Set colors and begin fill process
    t.pencolor("black")
    t.fillcolor("green")
    t.begin_fill()
    
    # Step 3: Draw the 6 sides using a loop
    for i in range(6):
        t.forward(100) # Move forward 100 pixels
        t.left(60)     # Turn left by 360/6 = 60 degrees
        
    # Step 4: Complete the fill and hide the turtle
    t.end_fill()
    t.hideturtle()
    
    # Step 5: Keep the window open (Crucial for exams!)
    turtle.done()

# Execute the function
draw_hexagon()
```

### D. How to Write in Exam
*   **Start With:** Always start with `import turtle` and initializing the object `t = turtle.Turtle()`. 
*   **Body:** Use a `for` loop. Do not write `t.forward()` and `t.right()` 6 separate times. The examiner wants to see you use iteration.
*   **Traps:** 
    *   **The Polygon Angle Trap:** Students often confuse interior angles with exterior turn angles. A hexagon has 120-degree interior angles, but the turtle must turn *60 degrees* relative to its current straight path. Always use `360/n`.
    *   **The Window Closing Trap:** Programs without `turtle.done()` or `screen.mainloop()` will instantly close the window upon finishing. Mentioning this method shows practical knowledge.
*   **Close With:** Provide a small sketch of the expected output next to your code.

### E. Rapid Recall & Self-Test
**1-Minute Recall**
* Turtle graphics uses a Cartesian coordinate system with the origin at the center of the window.
* The turtle object moves on the screen, and its methods control movement, orientation, pen control, colors, and shapes.
* Essential methods include `forward()`, `goto()`, `right()`, `left()`, `setheading()`, `up()`, `down()`, `width()`, `pencolor()`, `fillcolor()`, `begin_fill()`, and `end_fill()`.
* To draw regular polygons, use the formula `360 / number_of_sides` to calculate the turn angle.

**Flash Questions**
1. What is the purpose of the `turtle.done()` method in a turtle graphics program?
2. How do you calculate the turn angle to draw a regular polygon with n sides?
3. What is the difference between `t.setheading()` and `t.right()` or `t.left()` methods?

**Practice Prompts**
1. Write a Python program to draw a square with a side length of 100 pixels, filled with red color, using a `for` loop.
2. Draw a triangle with each side of length 150 pixels, using the `turtle` module, and fill it with blue color.
3. Create a program to draw a star (5-point) with each side of length 120 pixels, using the `turtle` module, and fill it with yellow color.

---

## 2. Topic 2: Image Processing (Pixels & Filters)
**[SURE SHOT | ↻ GOLDEN OVERLAP: Appears in Both Odd and Even Slots]**

### A. What is this?
A digital image is just a massive grid of tiny colored squares called "pixels" (picture elements). Image processing is the mathematical manipulation of these pixels to enhance or alter the image.

> Think of an image as a giant mosaic made of thousands of tiny colored tiles. If you want to make the image "grayscale" (black and white), you look at every single tile one by one, calculate the average brightness of its colors, and replace it with a gray tile of that exact brightness.

### B. Exam-Ready Theory
**1. The RGB System & Digital Representation:**
*   An image is defined as a two-dimensional function `F(x,y)`, where `x` and `y` are spatial coordinates.
*   The coordinate system starts at `(0, 0)` in the **upper-left corner** (unlike standard math graphs).
*   Each pixel contains a color value represented as a tuple of Red, Green, and Blue `(R, G, B)`.
*   Each color channel ranges from `0` (total absence) to `255` (maximum saturation). E.g., `(0, 0, 0)` is Black, `(255, 255, 255)` is White.

**2. Basic Image Operations (via the custom `images` module or standard `PIL/Pillow`):**
*   **Loading:** `Image("filename.gif")` or `Image.open()`.
*   **Pixel Access:** `image.getPixel(x, y)` returns the `(R, G, B)` tuple.
*   **Pixel Modification:** `image.setPixel(x, y, (r, g, b))` changes the color.
*   **Dimensions:** `image.getWidth()` and `image.getHeight()`.

**3. Common Image Algorithms:**
*   **Black and White:** Calculate the average `(R+G+B)/3`. If average `< 128`, set to Black `(0,0,0)`. Else, set to White `(255,255,255)`.
*   **Grayscale:** Apply luminance weighting instead of a simple average to account for human eye sensitivity: `Lum = R*0.299 + G*0.587 + B*0.114`.
*   **Blurring:** Mitigates rough, jagged edges (pixilation). The algorithm resets each pixel's color to the average of the colors of the surrounding neighboring pixels.
*   **Edge Detection:** Detects sharp boundaries by examining adjacent pixels. If the difference in their luminance exceeds a threshold, an edge is detected and the pixel is set to black; otherwise, it is set to white.

### C. Worked Examples
**Question:** Write a Python program to convert a color image to Grayscale.

```python
# Note: Using the standard PIL (Pillow) library logic as it is widely accepted
from PIL import Image

def convert_to_grayscale(filename):
    # Step 1: Open the original image
    original_img = Image.open(filename)
    
    # Step 2: Get dimensions
    width, height = original_img.size
    
    # Step 3: Create a blank image to hold the grayscale result
    gray_img = Image.new("RGB", (width, height))
    
    # Step 4: Nested loops for Row-Major traversal (visit every pixel)
    for y in range(height):
        for x in range(width):
            
            # Step 5: Get current RGB values
            r, g, b = original_img.getpixel((x, y))
            
            # Step 6: Calculate weighted luminance for grayscale
            # Using standard weights: Red=0.299, Green=0.587, Blue=0.114
            lum = int(r * 0.299 + g * 0.587 + b * 0.114)
            
            # Step 7: Set the new pixel (R, G, B must be identical for gray)
            gray_img.putpixel((x, y), (lum, lum, lum))
            
    # Step 8: Save or show the result
    gray_img.show()

# Execute
convert_to_grayscale("my_photo.jpg")
```

### D. How to Write in Exam
*   **Start With:** Define what an image is: "A digital image is a two-dimensional grid of pixels, where each pixel is represented by an RGB tuple."
*   **Body:** For programming questions, you MUST demonstrate the nested `for` loops (`for y in range(height): for x in range(width):`). This proves you understand "Row-Major Traversal".
*   **Traps:** 
    *   **The Coordinate Trap:** Remember that image processing libraries use `(x, y)` where `x` is the column (width) and `y` is the row (height). 
    *   **The Grayscale Trap:** A simple average `(R+G+B)/3` is technically wrong for true grayscale (though sometimes accepted for simple Black & White conversions). Use the luminance weights (`0.299`, `0.587`, `0.114`) to guarantee full marks.
*   **Close With:** Mention that this process alters the arrangement and information of the pixels to achieve visual enhancement.

### E. Rapid Recall & Self-Test
* 1-Minute Recall: 
  + Digital images are grids of pixels, each with an RGB value.
  + Image processing involves manipulating these pixels.
  + Key concepts include RGB system, pixel access and modification, and common algorithms like grayscale and edge detection.
* Flash Questions: 
  1. What does the RGB system represent in digital images?
  2. How do you calculate the luminance for grayscale conversion?
  3. What is the purpose of the nested for loops in image processing?
* Practice Prompts: 
  1. Write a Python function to apply a blur filter to an image by averaging the RGB values of neighboring pixels.
  2. Describe the steps to detect edges in an image, including the calculation of luminance differences between adjacent pixels.
  3. Explain the difference between simple averaging and luminance weighting for grayscale conversion, providing examples of each.

---

## 3. Topic 3: Graphical User Interfaces (Tkinter)
**[SURE SHOT | ↻ REPEATS IN EVEN SLOTS]**

### A. What is this?
Unlike a terminal program where the computer asks you questions one by one in a strict sequence, a GUI (Graphical User Interface) presents a visual window with buttons, text boxes, and menus. It waits for the user to interact with it.

> Think of a terminal program like a fast-food drive-thru speaker—you must answer the questions in the exact order they are asked. A GUI is like walking into a buffet—you can look at all the options, click on the salad bar, then jump to the dessert section, and hit "Checkout" whenever you are ready. This is called **Event-Driven Programming**.

### B. Exam-Ready Theory
**1. Event-Driven Programming Characteristics:**
*   Programs are inactive until the user interacts with GUI components.
*   Inputs can be entered in any order.
*   Results can be recalculated with different data without restarting the program.

**2. Standard Widgets (Components):**
*   `Label`: Displays text or images.
*   `Entry` / `TextField`: A single-line box for user input.
*   `Button`: A clickable command area that triggers a function when pressed.
*   `Text` / `TextArea`: A scrollable box for multi-line text.

**3. Layout Management (Grid):**
*   Components are placed in a 2D grid.
*   `row` and `column` arguments specify the position.
*   `columnspan` and `rowspan` allow a widget to stretch across multiple cells.
*   `sticky` controls alignment within the cell (N, S, E, W for compass directions).

### C. Worked Examples
**Question:** Write a GUI program that takes user input for the radius of a circle, and when a button is pressed, calculates and displays the Area.

*Note: The official notes use a custom wrapper called `breezypythongui`. However, standard `tkinter` is universally accepted and often safer to use in KTU exams.*

```python
import tkinter as tk
import math

# Step 1: Define the event handler function
def calculate_area():
    try:
        # Get data from entry field and convert to float
        radius = float(radius_entry.get())
        
        # Calculate area
        area = math.pi * (radius ** 2)
        
        # Update the result label
        result_label.config(text=f"Area: {area:.2f}")
    except ValueError:
        # Handle invalid input (like letters instead of numbers)
        result_label.config(text="Error: Invalid Input")

# Step 2: Create the main window
window = tk.Tk()
window.title("Circle Area Calculator")

# Step 3: Create and place the Radius Label and Entry (Row 0)
tk.Label(window, text="Enter Radius:").grid(row=0, column=0, padx=10, pady=10)
radius_entry = tk.Entry(window)
radius_entry.grid(row=0, column=1, padx=10, pady=10)

# Step 4: Create and place the Command Button (Row 1, spanning 2 columns)
calc_btn = tk.Button(window, text="Compute Area", command=calculate_area)
calc_btn.grid(row=1, column=0, columnspan=2, pady=10)

# Step 5: Create and place the Result Label (Row 2, spanning 2 columns)
result_label = tk.Label(window, text="Area: 0.0")
result_label.grid(row=2, column=0, columnspan=2, pady=10)

# Step 6: Start the Event Loop
window.mainloop()
```

### D. How to Write in Exam
*   **Start With:** Define Event-Driven programming briefly if asked.
*   **Body:** Writing GUI code is long. Follow a strict sequence: Import -> Define calculation function -> Create Window -> Add Label -> Add Entry -> Add Button -> Start `mainloop()`. 
*   **Traps:** 
    *   **The Command Trap:** When creating a button, `command=calculate_area` is correct. DO NOT write `command=calculate_area()`. Adding the parentheses calls the function instantly when the button is created, rather than waiting for the click event.
    *   **The Data Extraction Trap:** Data pulled from an `Entry` widget is always a string. You MUST convert it using `int()` or `float()` before doing math on it.
*   **Close With:** Always ensure your code ends with `window.mainloop()`. Without this, the GUI will flash and disappear instantly.

---
*End of Module 3 Notes. Remember the blueprint strategy: If you have a choice, pick the Turtle or Image Processing question over the Tkinter GUI question. GUI code requires writing massive amounts of boilerplate layout code, increasing the chance of syntax errors under pressure.*

### E. Rapid Recall & Self-Test
* 1-Minute Recall: 
  + Event-Driven Programming allows users to interact with GUI components in any order.
  + Standard widgets include `Label`, `Entry`, `Button`, and `Text`.
  + Layout management uses a 2D grid with `row`, `column`, `columnspan`, `rowspan`, and `sticky` arguments.
* Flash Questions: 
  1. What is the primary characteristic of Event-Driven Programming in GUIs?
  2. What is the purpose of the `command` argument when creating a `Button` widget?
  3. How do you extract and convert data from an `Entry` widget for mathematical operations?
* Practice Prompts: 
  1. Write a GUI program that takes two numbers as input and displays their sum when a button is clicked.
  2. Create a GUI that calculates the area of a rectangle given the length and width as user input.
  3. Design a simple GUI with a label, entry field, and button that displays a greeting message with the user's name when the button is pressed.
