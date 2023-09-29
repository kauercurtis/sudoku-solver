/***
*Test functions for sudoku.js
***/

function testGetRow(){
    console.log("Testing getRow(5) === 1");
    console.log(getRow(5));
    console.log("Testing getRow(18) === 2");
    console.log(getRow(18));
    console.log("Testing getRow(58) === 7");
    console.log(getRow(58));
}

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

function testGetColumn(){
    console.log("getColumn(3) === 3");
    console.log(getColumn(3)); //column 3
    console.log("getColumn(41) === 5");
    console.log(getColumn(41)); //column 5
    console.log("getColumn(70) === 7");
    console.log(getColumn(70)); //column 7
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



function testCheckSolved(){

    let sudoku1 = [82];
    let sudoku2 = [82];
    let sudoku3 = [82];
    let sudoku4 = [82];

    for(let index = 1; index <= 81; index++){
        sudoku1[index] = index;
    }

    for(let index = 1; index <= 40; index++){
        sudoku2[index] = index;
    }

    sudoku2[41] = undefined;

    for(let index = 42; index <= 81; index++){
        sudoku2[index] = index;
    }
    for(let index = 1; index <= 15; index++){
        sudoku3[index] = index;
    }
    sudoku3[16] = undefined;
    for(let index = 17; index <= 30; index++){
        sudoku3[index] = index;
    }
    sudoku3[31] = undefined;
    for(let index = 32; index <= 45; index++){
        sudoku3[index] = index;
    }
    sudoku3[46] = undefined;
    for(let index = 47; index <= 60; index++){
        sudoku3[index] = index;
    }
    sudoku3[61] = undefined;
    for(let index = 62; index <= 81; index++){
        sudoku3[index] = index;
    }
    console.log("checkSolved(sudoku1) === true\n");
    console.log(checkSolved(sudoku1));
    console.log("checkSolved(sudoku2) === false\n");
    console.log(checkSolved(sudoku2));
    console.log("checkSolved(sudoku3) === false\n");
    console.log(checkSolved(sudoku3));
    console.log("checkSolved(sudoku4) === false\n");
    console.log(checkSolved(sudoku4));
}