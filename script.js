function createGrid(size) {
    container.textContent = "";
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < size; j++) {
            let square = document.createElement("div");
            square.classList.add("grid");
            row.append(square);
        }
        container.append(row);
    }
}

function color(value) {
    container.addEventListener("mouseover", (event) => {
        if (event.target.classList.contains("grid")) {
            event.target.style.backgroundColor = value;
        }
    });
}

function getSize() {
    let button = document.querySelector("#size");
    button.addEventListener("click", () => {
        let size = prompt("Enter size (Smaller than 100) : ");
        size = parseInt(size);
        if (size > 0 && size < 100) {
            createGrid(size);
        } else {
            alert("Invalid size!");
        }
    })
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
                    color("black");
                    break;
                case "eraser":
                    color("white");
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
createGrid(16);
getSize();
color("black");
toolbar();