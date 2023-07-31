var scewedTree = [82];

window.addEventListener("load", () => {
    let submit = document.getElementById("input");
    submit.addEventListener("click", () => {
        console.log("Data being submitted");
        initializeScewedTree();
    });
});

function initializeScewedTree(){
    let squareValueId;
    let currentSquare;

    for(let counter = 1; counter <= 81; counter++){
        squareValueId = "square" + counter;
        currentSquare = document.getElementById(squareValueId);
        if(currentSquare.value === ""){
            scewedTree[counter] = 0;
        }
        else{
            scewedTree[counter] = Number(currentSquare.value) + 10; 
        }
    }
    
    outputScewedTreeConsole();
}

function outputScewedTreeConsole(){
        for(let counter = 1; counter <= 81; counter++){
            console.log(scewedTree[counter]);
        }   
}