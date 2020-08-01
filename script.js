const body = document.querySelector("body");
const container = document.querySelector("#container");
let black = true;
let reset;
addButton("Reset",reset,resetFunc);
let selectGridSize;
addButton("Select Grid Size",selectGridSize,selectGridSizeFunc);
let setColor = document.createElement("button");
setColor.innerHTML = "Black";
setColor.addEventListener('click', setColorFunc);
body.appendChild(setColor);

//function to add buttons to page
function addButton(btnName,btn,btnFunction) {
    btn = document.createElement("button");
    btn.innerHTML = btnName;
    btn.addEventListener('click', btnFunction);
    body.appendChild(btn);        
}
//initializes sketch pad
setUpSketch(16);

//main function to set up sketchpad
function setUpSketch(x) {
    createGrid(x);
    createNewDivs(x**2);
}
//creates divs to go inside the grid
function createNewDivs(numDivs) {
    for (i=0;i<numDivs;i++) {
        const newDiv = document.createElement('div');
        container.appendChild(newDiv);     
        newDiv.classList.add("newDiv");
        newDiv.style.height = `${960/Math.sqrt(numDivs)}px`;
        newDiv.style.width = `${960/Math.sqrt(numDivs)}px`;
        if (black === true) {
            newDiv.addEventListener('mouseover', draw);
        } else {
            newDiv.addEventListener('mouseover', drawRainbow);
        }
    }
}
//creates an x by y grid where x = y within the container
function createGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

//resets sketch
function resetFunc() {
    container.innerHTML = "";
    setUpSketch(16);
}

//allows you to set the grid size
function selectGridSizeFunc() {
    container.innerHTML = "";
    const input = prompt("Please select a grid resolution. (input 64 for a 64 x 64 sketchpad)", 16);
    setUpSketch(input);
}
//draws based on random rgb shades
function drawRainbow(e) {
        let R;
        let G;
        let B;
        let rgbExtract = extractRGB(e);
        if (e.target.style.backgroundColor === "") {
            e.target.style.backgroundColor = `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`;
        } else {
            //darkens divs that have already have color
            R = rgbExtract[0];
            G = rgbExtract[1];
            B = rgbExtract[2];
            e.target.style.backgroundColor = `rgb(${R*.7},${G*.7},${B*.7})`
        }
        
}
//extracts RGB values as an array
function extractRGB(event) {
    let currentDivColor = event.target.style.backgroundColor;
    rgbExtract = currentDivColor.slice(4,currentDivColor.length - 1);
    indexOfSpace = rgbExtract.indexOf(" ");
    rgbExtract = rgbExtract.split(", ");
    return rgbExtract;
}

//allows you to draw
function draw(e) {
    e.target.style.backgroundColor = "rgb(0,0,0)";
}
//toggles black and rainbow
function setColorFunc() {
    newDivs = document.querySelectorAll('.newDiv');
    newDivs = Array.from(newDivs);
    if (black === true) {
        setColor.innerHTML = "Rainbow";
        black = false;
        newDivs.forEach(div => {
            div.removeEventListener('mouseover', draw);
            div.addEventListener('mouseover',drawRainbow);
        });
    } else {
        setColor.innerHTML = "Black";
        black = true;
        newDivs.forEach(div => {
            div.removeEventListener('mouseover', drawRainbow);
            div.addEventListener('mouseover',draw);
        });
    }
}
