/** 
Test file for algorithm and its member functions
**/

//Returns the sudoku row the index belongs to
function getRow(index){
    return Math.ceil(index / 9);
}

//tests getRow function
function testGetRow(){
    console.log("Testing getRow(5) === 1");
    console.log(getRow(5));
    console.log("Testing getRow(18) === 2");
    console.log(getRow(18));
    console.log("Testing getRow(58) === 7");
    console.log(getRow(58));
}

//true = contradiction
//false = no contradiction found
//looks for a contradiction in the row of the index
function checkRowContradiction(index, sudoku, value){
    let row = getRow(index);
    console.log(1 + (9 * (row - 1)));
    let startingIndex = 1 + (9 * (row - 1));
    let counter = 1;
    while(counter <= 9  /*(startingIndex % 9 != 0)*/){
        console.log(counter);
        if(convertConstant(sudoku[startingIndex]) === value){
            return true;
        }
        startingIndex++;
        counter++;
    }
    return false;
}

//constant values are represented by double digit teen numbers
//converts constants to single digit
function convertConstant(value){
    if(value <= 9){
        return value;
    }
    return value - 10;
}

//test function for checkRowContradiction
function testCheckRowContradiction(){
    let testSudoku = [82];
    testSudoku[10] = 2;
    testSudoku[11] = 4;
    testSudoku[12] = 8;
    testSudoku[13] = 9;
    testSudoku[14] = 1;
    testSudoku[15] = 0;//7 OR 3
    testSudoku[16] = 0;//7 OR 3
    testSudoku[17] = 5;
    testSudoku[18] = 6;

    console.log("checkRowContradiction(15, testSudoku, 7) === false")
    console.log(checkRowContradiction(15, testSudoku, 7));
    console.log("checkRowContradiction(11, testSudoku, 5) === true");
    console.log(checkRowContradiction(11, testSudoku, 5));

    testSudoku[28] = 0
    testSudoku[29] = 0
    testSudoku[30] = 11
    testSudoku[31] = 2
    testSudoku[32] = 7
    testSudoku[33] = 0
    testSudoku[34] = 18
    testSudoku[35] = 0
    testSudoku[36] = 0

    console.log("checkRowContradiction(33, testSudoku, 6) === false");
    console.log(checkRowContradiction(33, testSudoku, 6));
    console.log("checkRowContradiction(36, testSudoku, 1) === true");
    console.log(checkRowContradiction(36, testSudoku, 1));

    testSudoku[1] = 0;
    testSudoku[2] = 0;
    testSudoku[3] = 8;
    testSudoku[4] = 0;
    testSudoku[5] = 0;
    testSudoku[6] = 0;
    testSudoku[7] = 0
    testSudoku[8] = 3;
    testSudoku[9] = 1;

    console.log("checkRowContradiction(1, testSudoku, 1) === true");
    console.log(checkRowContradiction(1, testSudoku, 1));
}

//finds the column that contains the index
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

//test function for getColumn function
function testGetColumn(){
    console.log("getColumn(3) === 3");
    console.log(getColumn(3)); //column 3
    console.log("getColumn(41) === 5");
    console.log(getColumn(41)); //column 5
    console.log("getColumn(70) === 7");
    console.log(getColumn(70)); //column 7
}

//checks the column containing the index for any contradictions with the value
function checkColumnContradiction(index, sudoku, value){
//every column starts with the # of column    
    let startingIndex = getColumn(index);
//every column ends with its starting index + 72 because after 72 is the last row    
    let endingIndex = startingIndex + 72;
    while(startingIndex <= endingIndex){
        if(convertConstant(sudoku[startingIndex]) === value){
            return true;
        }
        startingIndex += 9;
    }
    return false; 
}

function testCheckColumnContradiction(){
    let testSudoku = [82];
    testSudoku[2] = 0;
    testSudoku[11] = 4;
    testSudoku[20] = 0;
    testSudoku[29] = 12;
    testSudoku[38] = 5;
    testSudoku[47] = 0;
    testSudoku[56] = 4;
    testSudoku[65] = 5;
    testSudoku[74] = 17;

    console.log("checkColumnContradiction(47, testSudoku, 6) === false");
    console.log(checkColumnContradiction(47, testSudoku, 6)); //false
    console.log("checkColumnContradiction(11, testSudoku, 9) === true");
    console.log(checkColumnContradiction(11, testSudoku, 9)); //true
    console.log("checkColumnContradiction(2, testSudoku, 4) === true");
    console.log(checkColumnContradiction(2, testSudoku, 4));

    testSudoku[7] = 11
    testSudoku[16] = 0
    testSudoku[25] = 17
    testSudoku[34] = 0
    testSudoku[43] = 0
    testSudoku[52] = 0
    testSudoku[61] = 0
    testSudoku[70] = 14
    testSudoku[79] = 0

    console.log("checkColumnContradiction(43, testSudoku, 3) === false");
    console.log(checkColumnContradiction(43, testSudoku, 3)); //false
    console.log("checkColumnContradiction(79, testSudoku, 4) === true");
    console.log(checkColumnContradiction(79, testSudoku, 4)); //true
}

//returns the starting column for a given column's quartile
function getQuartileStartingColumn(column){
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

//returns the starting row of the quartile
function getQuartileStartingRow(row){
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

//returns an array of numbers of all values in the quartile
//array starts tradtionally from 0
function getQuartile(index, sudoku){
    let row = getRow(index);
    let column = getColumn(index);
    let startingRow = getQuartileStartingRow(row);
    let startingColumn = getQuartileStartingColumn(column);
    let startingIndex = startingColumn + (9 * (startingRow - 1));
    let quartile = [9];

    for(let counter = 0; counter <= 2; counter++){
        quartile[counter] = sudoku[startingIndex + counter];
    }
    
    startingIndex += 9;

    for(let counter = 3; counter <= 5; counter++){
        quartile[counter] = sudoku[startingIndex + (counter - 3)];
    }

    startingIndex += 9;

    for(let counter = 6; counter <= 8; counter++){
        quartile[counter] = sudoku[startingIndex + (counter - 6)];
    }

    return quartile;
}

//tests getQuartile function
function testGetQuartile(){
    let testSudoku = [82];
    testSudoku[1] = 0;
    testSudoku[2] = 0;
    testSudoku[3] = 0;
    testSudoku[10] = 4;
    testSudoku[11] = 2;
    testSudoku[12] = 6
    testSudoku[19] = 19;
    testSudoku[20] = 0; 
    testSudoku[21] = 0;
    let testQuartile = Array.from(getQuartile(19, testSudoku));
    for(let counter = 0; counter < 9; counter++){
        console.log(testQuartile[counter]);
    }

    testSudoku[31] = 1;
    testSudoku[32] = 0;
    testSudoku[33] = 0;
    testSudoku[40] = 19;
    testSudoku[41] = 14;
    testSudoku[42] = 0;
    testSudoku[49] = 5;
    testSudoku[50] = 0;
    testSudoku[51] = 13;
    let testQuartile2 = Array.from(getQuartile(33, testSudoku));
    for(let counter = 0; counter < 9; counter++){
        console.log(testQuartile2[counter]);
    }
}

//looks for a contradiction given a value in the quartile of an index
function checkQuartileContradiction(index, sudoku, value){
    let quartile = Array.from(getQuartile(index, sudoku));
    let counter = 0;
    while(counter <= 8){
        if(convertConstant(quartile[counter]) === value){
            return true;
        }
        counter++;
    }
    return false;
}

function testCheckQuartileContradiction(){
    let testSudoku = [82];
    testSudoku[1] = 0;
    testSudoku[2] = 0;
    testSudoku[3] = 0;
    testSudoku[10] = 4;
    testSudoku[11] = 2;
    testSudoku[12] = 6
    testSudoku[19] = 19;
    testSudoku[20] = 0; 
    testSudoku[21] = 0;

    console.log(checkQuartileContradiction(1, testSudoku, 8)); //false
    console.log(checkQuartileContradiction(20, testSudoku, 4));//true

    testSudoku[31] = 1;
    testSudoku[32] = 0;
    testSudoku[33] = 0;
    testSudoku[40] = 19;
    testSudoku[41] = 14;
    testSudoku[42] = 0;
    testSudoku[49] = 5;
    testSudoku[50] = 0;
    testSudoku[51] = 13;
    
    console.log(checkQuartileContradiction(42, testSudoku, 2));
    console.log(checkQuartileContradiction(33, testSudoku, 3));
}

function findContradiction(index, sudoku, value){
    if(checkQuartileContradiction(index, sudoku, value)){
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

//traverses an skewed tree array representation of a sudoku
//returns the next index that does not have a constant
//index = index to traverse from
function traverseDown(index, sudoku){
    do{
        index++; 
    }while(sudoku[index] > 9 && index <= 81);
    return index;
}

function testTraverseDown(){
    let testSudoku = [82];
    testSudoku[19] = 2;
    testSudoku[20] = 0;
    testSudoku[21] = 15;
    testSudoku[22] = 0;
    testSudoku[23] = 0;
    testSudoku[24] = 19;
    testSudoku[25] = 0;
    testSudoku[26] = 0;
    testSudoku[27] = 0;

    console.log("traverseDown(19, testSudoku) === 20");
    console.log(traverseDown(19, testSudoku)); // = 20

    testSudoku[1] = 13;
    testSudoku[2] = 19;
    testSudoku[3] = 18;
    testSudoku[4] = 12;
    testSudoku[5] = 11;
    testSudoku[6] = 14;
    testSudoku[7] = 0;
    testSudoku[8] = 0;
    testSudoku[9] = 0;

    console.log("traverseDown(0, testSudoku) === 7");
    console.log(traverseDown(0, testSudoku)); // = 7

    testSudoku[73] = 11;
    testSudoku[74] = 12;
    testSudoku[75] = 13;
    testSudoku[76] = 14;
    testSudoku[77] = 15;
    testSudoku[78] = 16;
    testSudoku[79] = 17;
    testSudoku[80] = 18;
    testSudoku[81] = 19;

    console.log("traverseDown(72, testSudoku)");
    console.log(traverseDown(72, testSudoku)); // = 82
}

function backTrack(index, sudoku){
    do{
        index--;
    }while(sudoku[index] > 9 && index >= 1);
    return index;
}

function testBackTrack(){
    let testSudoku = [82];
    testSudoku[19] = 2;
    testSudoku[20] = 3;
    testSudoku[21] = 15;
    testSudoku[22] = 1;
    testSudoku[23] = 4;
    testSudoku[24] = 19;
    testSudoku[25] = 0;
    testSudoku[26] = 0;
    testSudoku[27] = 0;

    console.log("backTrack(25, testSudoku) === 23");
    console.log(backTrack(25, testSudoku)); // = 23

    testSudoku[1] = 13;
    testSudoku[2] = 19;
    testSudoku[3] = 18;
    testSudoku[4] = 12;
    testSudoku[5] = 11;
    testSudoku[6] = 14;
    testSudoku[7] = 0;
    testSudoku[8] = 0;
    testSudoku[9] = 0;

    console.log("backTrack(7, testSudoku) === 0");
    console.log(backTrack(7, testSudoku)); // = 0

    testSudoku[72] = 8;
    testSudoku[73] = 11;
    testSudoku[74] = 12;
    testSudoku[75] = 13;
    testSudoku[76] = 14;
    testSudoku[77] = 15;
    testSudoku[78] = 16;
    testSudoku[79] = 17;
    testSudoku[80] = 18;
    testSudoku[81] = 0;

    console.log("backTrack(81, testSudoku) === 72");
    console.log(backTrack(81, testSudoku)); // = 72   
}

function traversalDirector(index, sudoku, value){
    if(index > 81){
        return true;
    }
    if(value > 9){
       sudoku[index] = 0;
       index = backTrack(index, sudoku);
       return traversalDirector(index, sudoku, sudoku[index] + 1);        
    }
    if(findContradiction(index, sudoku, value) === true){
        return traversalDirector(index, sudoku, ++value);
    }
    else{
        sudoku[index] = value;
        index = traverseDown(index, sudoku);
        return traversalDirector(index, sudoku, sudoku[index] + 1);
    }
}

//-------------------------------------------------------------------------
window.addEventListener(onload, testCheckColumnContradiction());