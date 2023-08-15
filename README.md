# sudoku-solver
A web sudoku solver

________________________________________________________________________________________________________________________________________________________________________________

Naming Schema - A brief rundown on certain vocabulary used and their meanings:

Row: A row in a sudoku puzzle (there are a total of 9 of these).
Column: A column in a sudoku puzzle (there are a total of 9 of these).
Quartile: A 3x3 area in a sudoku puzzle (there are a total of 9 of these).  
Contradiction: Something that doesn't follow the rules of a sudoku puzzle.
constantValue: A given Value from the sudoku puzzle. During algorithmic runtime, represented as constantValue + 10. 
________________________________________________________________________________________________________________________________________________________________________________
-8/5/2023-
Input and output of data is implemented and works. Algorithm and helper functions are implemented and works. Algorithm successfully solves Sudoku problems. Algorithim being based on recusion is causing to many calls in the call stack for above medium difficult puzzles. 

To Do:
- index.html - Add rest of keypad buttons and add descriptive text to div id="text".
- styles/sudoku.css - Create a permanent style to the webpage and improve responsiveness to different screens/devices (mobile and tablets).
- scripts/sudoku.js - Provide functionality to the remaining buttons in the keypad corresponding to their ids and refactor algorithm.

-8/16/2023
Added and implemented rest of keypad buttons with Functionality. Created and applied a coherent/responsive styling. Refactored the sudoku algorithm to not exceed the call stack by having traversalDirector return the next traversed index (in relation to either backtracked or traversed) with a loop in driver function solve. Refactored sudoku.js, changed constant to constantValue in naming schema and got rid of debugging console.log outputs. Added a little dictionary for key definitions used throughout code. 

To Do:
- index.html - add descriptive text to div id="text".
- styles/sudoku.css - add responsive styling to id="text".
- scripts/sudoku.js - after submit is pressed, disable event listeners and reactivate them when clear is pushed (in that particular instance). Add checks so that no bad input goes through!