function createGrid(size) {
    container.textContent = "";
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < size; j++) {
            let square = document.createElement("div");
            square.classList.add("grid", "gridlines");
            square.dataset.opacity = "0";
            row.append(square);
        }
        container.append(row);
    }
}

function setColor(value) {
    container.removeEventListener("mouseover", handleEvent);
    container.removeEventListener("mousedown", handleEvent);
    function handleEvent(event) {
        if (isDrawing && event.target.classList.contains("grid")) {
            event.target.style.backgroundColor = typeof value === "function"? value(): value;
        }
    }
    container.addEventListener("mouseover", handleEvent);
    container.addEventListener("mousedown", handleEvent);
}

function getSize() {
    let slider = document.querySelector("#size-range");
    let label = document.querySelector("#size-label");
    slider.addEventListener("input", (event) => {
        let size = event.target.value;
        createGrid(size);
        let gridlines = document.querySelector("#gridlines");
        gridlines.classList.add("active");
        label.textContent = `${size} x ${size}`;
    });
}

function colorGenerator() {
    const maxVal = 0xFFFFFF;
    let color = Math.random() * maxVal;
    color = Math.floor(color);
    color = color.toString(16);
    color = color.padStart(6, '0');
    return `#${color}`;
}

function hexToRGBA(hex) {
    hex = parseInt(hex.substring(1), 16);
    let r = (hex >> 16) & 255;
    let g = (hex >> 8) & 255;
    let b = hex & 255;
    return `rgb (${r}, ${g}, ${b})`;
}

function shade() {
    
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
            activeTool = event.target.id;
            switch (activeTool) {
                case "brush":
                    setColor(colorPicker.value);
                    break;
                case "eraser":
                    setColor("white");
                    break;
                case "rainbow":
                    setColor(colorGenerator);
                    break;
                case "clear":
                    let grid = document.querySelectorAll(".grid");
                    grid.forEach(element => {
                        element.style.backgroundColor = "white";
                        element.dataset.opacity = "0";
                    });
                    break;
                case "shade":
                    shade();
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
container.addEventListener("mousedown", (event) => {
    if(event.button === 0) {
        event.preventDefault();
        isDrawing = true;
    }
});
container.addEventListener("mouseup", () => isDrawing = false);
container.addEventListener("mouseleave", () => isDrawing = false);
let activeTool = "brush";
const colorPicker = document.querySelector("#select-color");
colorPicker.addEventListener("change", (event) => {
    setColor(event.target.value);
    const tool = document.querySelectorAll(".tool:not(#gridlines)");
    tool.forEach(element => {
        if (element.id === "brush")
            element.classList.add("active");
        else
            element.classList.remove("active");
    })
});
createGrid(16);
getSize();
setColor("black");
toolbar();