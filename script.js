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

function color() {
    container.addEventListener("mouseover", (event) => {
        if (event.target.classList.contains("grid")) {
            event.target.style.backgroundColor = "black";
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

const container = document.querySelector(".container");
createGrid(16);
getSize();
color();