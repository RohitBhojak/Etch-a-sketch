function createGrid(size) {
    container.textContent = "";
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < size; j++) {
            let square = document.createElement("div");
            square.classList.add("grid", "gridlines");
            row.append(square);
        }
        container.append(row);
    }
}

function setColor(value) {
    container.removeEventListener("pointerover", handleEvent);
    container.removeEventListener("pointerdown", handleEvent);
    function handleEvent(event) {
        if (isDrawing && event.target.classList.contains("grid")) {
            event.target.style.backgroundColor = typeof value === "function"? value(): value;
        }
    }
    container.addEventListener("pointerover", handleEvent);
    container.addEventListener("pointerdown", handleEvent);
}

function getSize() {
    let slider = document.querySelector("#size-range");
    slider.addEventListener("input", (event) => createGrid(event.target.value));
}

function colorGenerator() {
    const maxVal = 0xFFFFFF;
    let color = Math.random() * maxVal;
    color = Math.floor(color);
    color = color.toString(16);
    color = color.padStart(6, '0');
    return `#${color}`;
}

function toolbar() {
    const tools = document.querySelector(".toolbar");
    tools.addEventListener("click", (event) => {
        if (event.target.tagName == "BUTTON") {
            if (event.target.id != "gridlines" && event.target.id != "clear") {
                const buttons = document.querySelectorAll(".tool:not(#gridlines)");
                buttons.forEach(element => element.classList.remove("active"))
                event.target.classList.add("active");
            }
            switch (event.target.id) {
                case "brush":
                    setColor("black");
                    break;
                case "eraser":
                    setColor("white");
                    break;
                case "rainbow":
                    setColor(colorGenerator);
                    break;
                case "clear":
                    let grid = document.querySelectorAll(".grid");
                    grid.forEach(element => element.style.backgroundColor = "white");
                    break;
                case "gridlines":
                    event.target.classList.toggle("active");
                    let grids = document.querySelectorAll(".grid");
                    grids.forEach(element => element.classList.toggle("gridlines"));
                    break;
            }
        }
    });
}

const container = document.querySelector(".container");
let isDrawing = false;
container.addEventListener("pointerdown", (event) => {
    if(event.button === 0) 
        event.preventDefault();
        isDrawing = true
});
container.addEventListener("pointerup", () => isDrawing = false);
container.addEventListener("pointerleave", () => isDrawing = false);
createGrid(16);
getSize();
setColor("black");
toolbar();