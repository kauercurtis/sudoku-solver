/**
 *  sudoku_event_listeners.js - Event listeners for the sudoku grid on homepage (index.html)
 *  Author: Curtis Kauer 2024
*/

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
    addEventListenersToSudokuGrid();
    addEventListenersToNumberPad();
    addEventListenersToUtility();
});

function addEventListenersToSudokuGrid(){
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
}

function addEventListenersToNumberPad(){
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
}

function addEventListenersToUtility(){
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
        clearSudokuGrid();
    });
}

/*
    submit - outputs the values of the solved sudoku
    arg1 - sudoku - the array representation of a sudoku
    return - nothing
    Checks if the sudoku has already been solved and can be initialized successfully. If both are false, makes a call to solve().
*/
function submit(sudoku){
    let isSolved = checkSolved(sudoku);
    
    if(!isSolved && initializeSudokuToSolve(sudoku)){
        solveSudoku(sudoku);
        outputUI(sudoku); 
    }
    else if(isSolved){
        outputUI(sudoku);
    }    
}

/*
    hint - driving function for a hint (the next value in sequence to be revealed to the user)
    arg1 - sudoku - the array representation of a sudoku
    return - nothing
    Checks if the sudoku is already solved and if the sudoku can be initialized, if both are false, makes a call to solve().
    functions that use it - window.addEventListener("load", () => {})
*/
function hint(sudoku){
    if(checkSolved(sudoku) === false && initializeSudokuToSolve(sudoku) === true){
        solveSudoku(sudoku);
    }
    
    outputHint(sudoku);
}

function clearSudokuGrid(){
    CURRENT_SQUARE = 0;
    let squareValueId = null;
    let currentSquare = null;

    for(let counter = 1; counter <= 81; counter++){
        squareValueId = "square" + counter;
        currentSquare = document.getElementById(squareValueId);
        currentSquare.value = "";
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