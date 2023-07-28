let submit = document.getElementById("input");

window.addEventListener("load", () => {
    let submit = document.getElementById("input");
    submit.addEventListener("click", () => {
        console.log("Data being submitted");
        let test = document.getElementById("square1");
        console.log(square1.value);
        test = document.getElementById("square2");
        console.log(square2.value);
        console.log(square3.value);
    });
});
