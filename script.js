function hexToRGBA(hex, alpha = 1) {
    hex = parseInt(hex.substring(1), 16);
    let r = (hex >> 16) & 255;
    let g = (hex >> 8) & 255;
    let b = hex & 255;
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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

function setColor(value, isShade = false) {
    function handleEvent(event) {
        if (isDrawing && event.target.classList.contains("grid")) {
            let target = event.target;
            if (typeof value === "function") {
                target.style.backgroundColor = value();
                target.dataset.opacity = 0;
            } else if (isShade) {
                // Get current opacity or start with 0
                let currOpacity = parseFloat(target.dataset.opacity) || 0;
                currOpacity = Math.min(1, currOpacity + 0.1); // Increment opacity by 0.1
                target.dataset.opacity = currOpacity.toString();

                // Apply shading by adjusting alpha
                let currColor = target.style.backgroundColor || value;
                target.style.backgroundColor = hexToRGBA(value, currOpacity);
            } else {
                target.style.backgroundColor = value;
                target.dataset.opacity = 0;
            }
        }
    }

    // Attach the event listeners only if they are not already attached
    if (container._handleEvent !== handleEvent) {
        container.removeEventListener("mouseover", container._handleEvent);
        container.removeEventListener("mousedown", container._handleEvent);
        
        container.addEventListener("mouseover", handleEvent);
        container.addEventListener("mousedown", handleEvent);
        
        container._handleEvent = handleEvent; // Store reference to prevent duplicates
    }
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

function toolbar() {
    const tools = document.querySelector(".toolbar");
    tools.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            if (event.target.id !== "gridlines" && event.target.id !== "clear") {
                const buttons = document.querySelectorAll(".tool:not(#gridlines)");
                buttons.forEach(element => element.classList.remove("active"));
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
                    setColor(colorPicker.value, true);
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
    if (event.button === 0) {
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
    });
});

createGrid(16);
getSize();
setColor("black");
toolbar();
