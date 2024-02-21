let masterSystemTest = [82];

masterSystemTest[1] = 9;
masterSystemTest[5] = 4;
masterSystemTest[6] = 3;
masterSystemTest[7] = 1;
masterSystemTest[8] = 6;

masterSystemTest[15] = 2;

masterSystemTest[21] = 8;
masterSystemTest[26] = 9;

masterSystemTest[28] = 8;
masterSystemTest[32] = 1;
masterSystemTest[33] = 9;
masterSystemTest[34] = 3;

masterSystemTest[38] = 5;
masterSystemTest[45] = 7;

masterSystemTest[49] = 6;

masterSystemTest[58] = 8;
masterSystemTest[61] = 6;

masterSystemTest[66] = 7;
masterSystemTest[68] = 6;
masterSystemTest[69] = 4;
masterSystemTest[72] = 3;

masterSystemTest[73] = 4;
masterSystemTest[76] = 2;

let masterSystemTestNonConstants = [];
masterSystemTestNonConstants.push(2);
masterSystemTestNonConstants.push(5);
masterSystemTestNonConstants.push(7);
masterSystemTestNonConstants.push(8);

masterSystemTestNonConstants.push(1);
masterSystemTestNonConstants.push(6);
masterSystemTestNonConstants.push(4);
masterSystemTestNonConstants.push(9);
masterSystemTestNonConstants.push(8);
masterSystemTestNonConstants.push(7);
masterSystemTestNonConstants.push(3);
masterSystemTestNonConstants.push(5);

masterSystemTestNonConstants.push(7);
masterSystemTestNonConstants.push(3);
masterSystemTestNonConstants.push(1);
masterSystemTestNonConstants.push(5);
masterSystemTestNonConstants.push(6);
masterSystemTestNonConstants.push(4);
masterSystemTestNonConstants.push(2);

masterSystemTestNonConstants.push(7);
masterSystemTestNonConstants.push(2);
masterSystemTestNonConstants.push(4);
masterSystemTestNonConstants.push(5);
masterSystemTestNonConstants.push(6);

masterSystemTestNonConstants.push(6);
masterSystemTestNonConstants.push(1);
masterSystemTestNonConstants.push(3);
masterSystemTestNonConstants.push(2);
masterSystemTestNonConstants.push(8);
masterSystemTestNonConstants.push(9);
masterSystemTestNonConstants.push(4);

masterSystemTestNonConstants.push(3);
masterSystemTestNonConstants.push(4);
masterSystemTestNonConstants.push(9);
masterSystemTestNonConstants.push(7);
masterSystemTestNonConstants.push(5);
masterSystemTestNonConstants.push(2);
masterSystemTestNonConstants.push(8);
masterSystemTestNonConstants.push(1);

masterSystemTestNonConstants.push(5);
masterSystemTestNonConstants.push(1);
masterSystemTestNonConstants.push(3);
masterSystemTestNonConstants.push(9);
masterSystemTestNonConstants.push(7);
masterSystemTestNonConstants.push(2);
masterSystemTestNonConstants.push(4);

masterSystemTestNonConstants.push(2);
masterSystemTestNonConstants.push(9);
masterSystemTestNonConstants.push(5);
masterSystemTestNonConstants.push(8);
masterSystemTestNonConstants.push(1);

masterSystemTestNonConstants.push(8);
masterSystemTestNonConstants.push(6);
masterSystemTestNonConstants.push(3);
masterSystemTestNonConstants.push(1);
masterSystemTestNonConstants.push(5);
masterSystemTestNonConstants.push(7);
masterSystemTestNonConstants.push(9);


window.addEventListener("load", () => {
    let square;
    
    for(let masterSystemTestCounter = 1; masterSystemTestCounter < 82; masterSystemTestCounter++){

        if(masterSystemTest[masterSystemTestCounter] == null || masterSystemTest[masterSystemTestCounter] == undefined){
            continue;
        }
        else{
            square = document.getElementById(`square${masterSystemTestCounter}`);
            square.attributes[1].value = String(masterSystemTest[masterSystemTestCounter]);
        }

    }

    fill_Sudoku_System_Test_With_Non_Constant_Values(masterSystemTest, masterSystemTestNonConstants);
    let submissionButton = document.getElementById("_submit");
    submissionButton.click();
    console.log(`System Test 1 Results: ${compare_System_Test_With_Sudoku(masterSystemTest)}\n`);
});

function fill_Sudoku_System_Test_With_Non_Constant_Values(currentSudokuTest, otherSudokuValues){
    let otherSudokuValuesCounter = 0;
    
    for(let currentSudokuTestCounter = 1; currentSudokuTestCounter < currentSudokuTest.length; currentSudokuTestCounter++){

        if(currentSudokuTest[currentSudokuTestCounter] == null || masterSystemTest[otherSudokuValuesCounter] == undefined){
            currentSudokuTest[currentSudokuTestCounter] = otherSudokuValues[otherSudokuValuesCounter];
            otherSudokuValuesCounter++;
        }

    }
}

function compare_System_Test_With_Sudoku(masterSystemTest){
    let comparisonResult = true;
    let square = undefined;
    let sudokuSquareIdCounter = 1, systemTestCounter = 1;

    while(comparisonResult === true && sudokuSquareIdCounter <= 81){
        square = document.getElementById(`square${sudokuSquareIdCounter}`);
        
        if(square.attributes[1].value === masterSystemTest[systemTestCounter]){
            console.log(`${Number(square.attributes[1].value)} != ${masterSystemTest[systemTestCounter]}\n`);
            comparisonResult = false;
        }

        sudokuSquareIdCounter++;
        systemTestCounter++;
    }

    return comparisonResult; 
}