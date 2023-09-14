# sudoku-solver

A web sudoku solver

# Inspiration

Alot of Sudoku websites allow players to make 3 mistakes and then play an ad until the player gets to play again. The hints given are sometimes non applicable to the current situation. And on top of that, after being stuck on a puzzle for an hour, sudoku websites don't give the player the answer when they throw in the towel. This project is a reflection of my last two CS courses, Web Development and Algorithms. 

# Naming Schema - A brief rundown on certain vocabulary used and their meanings:

Row: A row in a sudoku puzzle (there are a total of 9 of these).
Column: A column in a sudoku puzzle (there are a total of 9 of these).
ninetile: A 3x3 area in a sudoku puzzle (there are a total of 9 of these).  
Contradiction: Something that doesn't follow the rules of a sudoku puzzle.
constantValue: A given Value from the sudoku puzzle. During algorithmic runtime, represented as constantValue + 10. 

# Development Updates

-8/5/2023-
Input and output of data is implemented and works. Algorithm and helper functions are implemented and works. Algorithm successfully solves Sudoku problems. 

-8/16/2023
Added and implemented rest of keypad buttons with Functionality. Created and applied a coherent/responsive styling. Changed constant to constantValue in naming schema. Added a little dictionary for key definitions used throughout code. 

-9/5/2023
Added appropriate instructions to id="text".
