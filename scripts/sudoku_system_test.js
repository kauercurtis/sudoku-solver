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

    let submissionButton = document.getElementById("_submit");
    submissionButton.click();
});
