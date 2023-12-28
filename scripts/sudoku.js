/***
*Sudoku solving functions and webpage functionality
***/

/*
    CURRENT_SQUARE - binds with the last clicked on square by the user
    Functions that use it -  window.addEvenListener("load", () => {}) 
*/
var CURRENT_SQUARE = 0;

/*
    window.addEventListener("load", () => {}) - Adds event listeners to each of the squares and buttons
    Functions that use it - none
*/
window.addEventListener("load", () => {    
    const subtiles = document.getElementsByClassName("subtile");
    let subtile_counter = 0;
    let value_counter = 0;
    
    while(subtile_counter < 9){
        let squaresInSubtile = subtiles[subtile_counter].getElementsByTagName("td");
        
        while(value_counter < 9){
            let currentTD = squaresInSubtile[value_counter];
            let square = currentTD.getElementsByTagName("input")[0];
            
            square.addEventListener("click", () => {
                let ID = currentTD.getAttribute("id");
                CURRENT_SQUARE = Number(ID);
            })
            
            value_counter++; 
        }

        value_counter = 0;
        subtile_counter++;
    }
    
    let numPad = document.getElementById("numpad");
    let numpadRows = numPad.getElementsByTagName("tr");
    let rowCounter = 0;
    let buttonCounter = 0;

    while(rowCounter < 3){
        let buttonRow = numpadRows[rowCounter].getElementsByTagName("button");
        
        while(buttonCounter < 3){
            let button = buttonRow[buttonCounter];
            button.addEventListener("click", () => {
                let squareID = document.getElementById(CURRENT_SQUARE);
                let square = squareID.getElementsByTagName("input");
                square[0].value = button.innerHTML;
            });
            buttonCounter++;
        }
        
        buttonCounter = 0;
        rowCounter++;
    }

    let sudoku = [82];
    let currentUtility = document.getElementById("_submit");

    currentUtility.addEventListener("click", (sudoku) => {
        submit(sudoku);
    });

    currentUtility = document.getElementById("_hint");

    currentUtility.addEventListener("click", (sudoku) => {
        hint(sudoku);
    });

    currentUtility = document.getElementById("_clear");
    
    currentUtility.addEventListener("click", () => {
        CURRENT = 0;
        let squareValueId;
        let currentSquare;
    
        for(let counter = 1; counter <= 81; counter++){
            squareValueId = "square" + counter;
            currentSquare = document.getElementById(squareValueId);
            currentSquare.value = "";
        }
    });
});

/*
submit - outputs the values of the solved sudoku
arg1 - sudoku - the array representation of a sudoku
return - nothing
Checks if the sudoku has already been solved and can be initialized successfully. If both are false, makes a call to solve().
*/
function submit(sudoku){
    let isSolved = checkSolved(sudoku);
    
    if(!isSolved && initializeSudoku(sudoku)){
        solve(sudoku);
        outputUI(sudoku); 
    }
    else if(isSolved){
        outputUI(sudoku);
    }    
}

/*
checkSolved - checks if the sudoku puzzle has been solved
arg1 - sudoku - the array representation of a sudoku
return - bool - returns false if sudoku has not been solved and true if it has been
traverses the array from both ends at once. If undefined is found in either half, returns false
functions that use it - hint(), submit(), outputHint()
*/
function checkSolved(sudoku){
    let currentIndex = 1;
    let isSolved = false;
    
    while(sudoku[currentIndex] != undefined && sudoku[81 - currentIndex] != undefined && currentIndex < Math.ceil(81 / 2)){
        ++currentIndex;
    }
    
    isSolved = sudoku[currentIndex] === undefined || sudoku[81 - currentIndex] === undefined ? false : true;
    return isSolved;
}

/*
initializeSudoku - collects user input in the squares and fills an array representation
arg1 - sudoku - the sudoku to initialize
return - bool - returns true if successful otherwise false
If the user input falls out of sudoku rules, an alert is given and further execution is canceled
Functions that use it - hint(), submit()
*/
function initializeSudoku(sudoku){
    let squareValueId;
    let currentSquare;
    let currentIndex = 1;
    let isSuccessful = true;
    
    while(currentIndex <= 81 && isSuccessful != false){
        squareValueId = "square" + currentIndex;
        currentSquare = document.getElementById(squareValueId);
        if(currentSquare.value.length === 0){
            sudoku[currentIndex] = 0;
        }
        else if(Number(currentSquare.value) === NaN){
            alert("Only integer numbers between 1 and 9 can be accepted as input!");
            isSuccessful = false;
        }
        else if(Number(currentSquare.value) > 9 || Number(currentSquare.value) < 1 || Number.isInteger(Number(currentSquare.value)) === false){
            alert("Given values cannot be less than 1 nor greater than 9 and must be integers!");
            isSuccessful = false;
        }
        else if(findContradiction(currentIndex, sudoku, Number(currentSquare.value))){
            alert("Only one copy of a digit between 1 and 9 can be allowed in a given row, column, or subtile!");
            isSuccessful = false;
        }
        else{
            sudoku[currentIndex] = Number(currentSquare.value) + 10; 
        }
        currentIndex++;
    }
    return isSuccessful;
}

/*
solve - driving function for traversalDirector()
arg1 - sudoku - array repesentation of sudoku
return - nothing
Continues function calls to traversalDirector until the index returned is greater than 81.
funtions that use it - hint(), submit()
*/
function solve(sudoku){
    let startingIndex = traverseDown(0, sudoku);
    
    while(startingIndex <= 81){
        startingIndex = traversalDirector(startingIndex, sudoku, sudoku[startingIndex] + 1);
    }
}

/*
outputUI - outputs the contents of an array repesentation of sudoku to the Document Object Model
arg1 - sudoku - the array representation of a sudoku
return - nothing
functions that use it - submit()
*/
function outputUI(sudoku){
    let currentSquare;
    let index = 1;
    
    while(index <= 81){
        currentSquare = document.getElementById("square" + index);
        currentSquare.value = convertConstantValue(sudoku[index]);
        index++;
    }
}

/*
findContradiction - Wrapper function for all individual checkContradiction functions
arg1 - the current index of the sudoku
arg2 - the array representation of the sudoku
arg3 - the value that is being attempted to be put at the index position
return - bool - returns true if any contradiction is found and false if no contradiction is found
functions that use it - initializeSudoku(), hint(), submit(), traversalDirector()
*/
function findContradiction(index, sudoku, value){
    if(checkSubtileContradiction(index, sudoku, value)){
        return true;
    }
    else if(checkRowContradiction(index, sudoku, value)){
        return true;
    }
    else if(checkColumnContradiction(index, sudoku, value)){
        return true;
    }
    else{
        return false;
    }
}

/*
checkSubtileContradiction - checks a ninetile (3 X 3 area of a sudoku) for a contradiction
arg1 - index - current index position of the array repesentation of the sudoku
arg2 - sudoku - the array representation of the sudoku
arg3 - value - the current value being attempted to be put at the index position
return - bool - returns true if a contradiction is found and false if not
functions that use it - findContradiction()
*/
function checkSubtileContradiction(sudokuIndex, sudoku, value){
    let subtile = Array.from(getNinetile(sudokuIndex, sudoku));
    let subtileIndex = 0;
    
    while(subtileIndex <= 8){
        if(convertConstantValue(subtile[subtileIndex]) === value){
            return true;
        }
        subtileIndex++;
    }
    return false;
}

/*
traverseDown - traverses an array representation of a sudoku for the next non constant value
arg1 - index - the index to start traversal from (exclusive)
arg2 - sudoku - the array representation of a sudoku
return - int - the index position of the next non constant value
functions that use it - traversalDirector()
*/
function traverseDown(index, sudoku){
    do{
        ++index;
    }while(index <= 81 && sudoku[index] > 9);
    return index;
}

/*
peekValue - Checks the value at the index position in the sudoku if its between 1 and 9
param1 - index - the index of the value in question
param2 - sudoku - the array representation of a sudoku
return - bool - false if the value at the index position is greater or equal to 9 and true if not.
The value at the index is a constant if the value is greater than 9 meaning that we arent allowed to change it per sudoku rules.
If the value at the index is 9, that means all possible values that can be given to this square have been exhausted and it resets the value at the index to 0 (representation of empty square during runtime)
If the value at the index is below 9, this means that all possible values that can be attempted to insert have not been exhausted.
functions that use it - backTrack()
*/
function peekValue(index, sudoku){
    if(sudoku[index] > 9){
        return false;
    }
    else if(sudoku[index] === 9){
        sudoku[index] = 0;
        return false;
    }
    else{
        return true;
    }
}

/*
backtrack - traverses an array representation of a sudoku backwards to the last index position from the starting index, that hasn't exhausted all possible values (1, 2, 3, 4, 5, 6, 7, 8, 9)
param1 - index - the starting index to traverse from (exclusive)
param2 - sudoku - the array representation of a sudoku
return - int - the index position of the last index position, from the starting index, that has not exhausted all possible values (1, 2, 3, 4, 5, 6, 7, 8, 9)
functions that use it - traversalDirector()
*/
function backTrack(index, sudoku){
    do{
        index--;
    }while(sudoku[index] > 9 && index >= 1 && !peekValue(index, sudoku));
    return index;
}

/*
convertConstantValue - converts the program representation of constant values to normal integers
param1 - value - the constant value to convert
return - int - the value after conversion
Constant values are represented at run time as double digit teen numbers. 
Conversion is calculated by subtracting the value, if greater than nine, by 10.
functions that use it - checkRowContradiction(), checkColumnContradiction(), checkNintileContradiction(), outputUI()
*/
function convertConstantValue(value){
    if(value <= 9){
        return value;
    }
    return value - 10;
}

/*
getColumn - returns the column that would have the index in a traditional sudoku 
param1 - index - the current index position in an array representation of a sudoku
return - int - returns the column number the index would be blong to in a traditional sudoku
Calculates the column, if not perfectly divisible by 9, by counting until the index + the counter is perfectly divisible by 9 and then subtracts the counter by 9
Functions that use it - getNinetile(), checkColumnContradiction()
*/
function getColumn(index){
    if(index % 9 === 0){
        return 9;
    }
    
    let counter = 1;
    
    while((index + counter) % 9 != 0){
        counter++;
    }
    return 9 - counter;
}

/*
checkColumnContradiction - checks for a contradiction in the index's column with a value
param1 - index - the known index position in an array representation of a sudoku
param2 - sudoku - array representation of sudoku
param3 - value - the value to compare to the other values already in the column
return - bool - returns true if a contradiction is found and false if not
Calculates the endingIndex of a column by adding the starting index to 72. Column 1 = {1, 73}. Column 2 = {2, 74}. Column 3 = {3, 75}. Column 4 = {4, 76}. Column 5 = {5, 77}. Column 6 = {6, 78}. Column 7 = {7, 79}. Column 8 = {8, 80}. Column 9 = {9, 81}.
functions that use it - findContradiction()
*/
function checkColumnContradiction(index, sudoku, value){
    //every column starts with the # of column    
    let startingIndex = getColumn(index);
    //every column ends with its starting index + 72 because after 72 is the last row    
    let endingIndex = startingIndex + 72;
        
    while(startingIndex <= endingIndex){
        if(convertConstantValue(sudoku[startingIndex]) === value){
            return true;
        }
        startingIndex += 9;
    }
        return false; 
}

/*
getRow - returns the row that the index would belong to 
param1 - index - the current index position in an array representation of a sudoku
return - int - returns the row number the index would belong to in a traditional sudoku 
Calculates the row by dividing the index by 9, rounding down
functions that use it - getNinetile(), checkRowContradiction()
*/
function getRow(index){
    return Math.ceil(index / 9);
}

/*
checkRowContradiction - checks for a contradiction in the index's row in a traditional sudoku 
param1 - index - the known index position of an array representation of a sudoku
param2 - sudoku - an array representation of a sudoku
param3 - value - the value attempted to insert at index position and to compare with other row values
return - bool - returns true if contradiction is found and returns false if not
Calculates the starting index of the row before traversing the row. Either 1, 10, 19, 28, 37, 46, 55, 64, 73
functions that use it - findContradiction()
*/
function checkRowContradiction(index, sudoku, value){
    let row = getRow(index);
    let startingIndex = 1 + (9 * (row - 1));
    let counter = 1;
    
    while(counter <= 9){
        if(convertConstantValue(sudoku[startingIndex]) == value){
            return true;
        }
        startingIndex++;
        counter += 1;
    }
    return false;
}

/*
getNinetileStartingRow - returns the first row of the ninetile that the row belongs to
param1 - row - the known row number
return - int - returns the top row of the ninetile that the row belongs to
Rows 1, 2, 3 start with row 1. Rows 4, 5, 6, start with row 4. Rows 7, 8, 9, start with row 7 
functions that use it - getNinetile()
*/
function getNinetileStartingRow(row){
    if(row <= 3){
        return 1;
    }
    else if(row <= 6){
        return 4;
    }
    else{
        return 7;
    }
}

/*
getNinetileStartingColumn - returns the starting column of the ninetile that the column belongs to
param1 - column - the known column number
return - int - returns the leftmost column of the ninetile that the column belongs to
Columns 1, 2, 3 start with column 1. Columns 4, 5, 6, start with column 4. Columns 7, 8, 9 start with column 7.
functions that use it - getNinetile()
*/
function getNinetileStartingColumn(column){
    if(column <= 3){
        return 1;
    }
    else if(column <= 6){
        return 4;
    }
    else{
        return 7;
    }
}

/*
getNinetile - returns an Array of all the values in the ninetile (3 x 3 area of a sudoku) that the index position is in
param1 - index - the known index inside the ninetile
param2 - sudoku - the array representation of a sudoku
return - Array - returns an array containing the values of the ninetile
functions that use it - checkNinetileContradiction()
*/
function getNinetile(index, sudoku){
    let row = getRow(index);
    let column = getColumn(index);
    let startingRow = getNinetileStartingRow(row);
    let startingColumn = getNinetileStartingColumn(column);
    let startingIndex = startingColumn + (9 * (startingRow - 1));
    let ninetile = [9];
    
    for(let counter = 0; counter <= 2; counter++){
        ninetile[counter] = sudoku[startingIndex + counter];
    }
    
    startingIndex += 9;
    for(let counter = 3; counter <= 5; counter++){
        ninetile[counter] = sudoku[startingIndex + (counter - 3)];
    }
    
    startingIndex += 9;
    for(let counter = 6; counter <= 8; counter++){
        ninetile[counter] = sudoku[startingIndex + (counter - 6)];
    }
    return ninetile;
}

/*
outputHint - outputs the next value in sequence to the first none valued square in UI 
param1 - sudoku - the array representation of a sudoku
return - nothing
If the sudoku has not been solved yet, it will return nothing before any traversal is done
Traverses the sudoku puzzle until it finds the first square without a value by the length of the string value.
functions that use it - hint()
*/
function outputHint(sudoku){

    if(checkSolved(sudoku) === false){
        return;
    }

    let counter = 1;
    let squareValueId = "square" + counter;
    let currentSquare = document.getElementById(squareValueId);
    
    while(counter <= 81 && currentSquare.value.length != 0){
        
        ++counter;
        squareValueId = "square" + counter;
        currentSquare = document.getElementById(squareValueId);

    }
//if the length is 0, it cannot be a constant value since the constant values would have a length of 1
    if(currentSquare.value.length === 0){
        currentSquare.value = "" + sudoku[counter];
    }

}

/*
traversalDirector - Determines the next index (representation of a square), of an array representation of sudoku, to solve
param1 - index - the current index to plug in numbers to 
param2 - sudoku - the array representation of sudoku
param3 - value - starting value to try 
return - int - the index of the next square to solve for
Trys values 1 - 9. If a contradiction is found it will keep plugging in integers until 10
If the value inserted at the index position does not trigger a contradiction, function call to traverseDown() to return the next index to solve for
If the value is going over 9, reverts value at the index to 0 (runtime representation of empty square) and function call to backTrack() to return the last index with non exhausted values
functions that use it - solve()
*/
function traversalDirector(index, sudoku, value){
    if(index > 81){
        return index;
    }
    
    while(value < 10){
        if(findContradiction(index, sudoku, value) === true){
            ++value;
        }
        else{
            sudoku[index] = value;
            break;
        }
    }

//this conditional makes sure the value at an index returned is not greater than 9
    if(value > 9){
        sudoku[index] = 0;
        return backTrack(index, sudoku);
    }
    else{
        return traverseDown(index, sudoku);
    }
}

/*
outputSudokuConsole - outputs the contents of an array representation of a sudoku to the console
param1 - sudoku - the array representation of a sudoku
return - nothing
functions that use it - none
*/
function outputSudokuConsole(sudoku){
    for(let counter = 1; counter <= 81; counter++){
        console.log(convertConstantValue(sudoku[counter]));
    }   
}

/*
hint - outputs a hint (the next value in sequence to be revealed to the user)
param1 - sudoku - the array representation of a sudoku
return - nothing
Checks if the sudoku is already solved and if the sudoku can be initialized, if both are false, makes a call to solve().
functions that use it - window.addEventListener("load", () => {})
*/
function hint(sudoku){
    if(checkSolved(sudoku) === false && initializeSudoku(sudoku) === true){
        solve(sudoku);
    }
    
    outputHint(sudoku);
}

function outputSudokuConsole(sudoku){
    for(let counter = 1; counter <= 81; counter++){
        console.log(convertConstantValue(sudoku[counter]));
    }   
}
