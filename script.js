// Set up canvas

const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d");

let prevX = null;
let prevY = null;

ctx.lineWidth = 4;
ctx.lineCap = "round";

let draw = false;

// Set draw on mouse up/down
window.addEventListener("mousedown", (e) => (draw = true));

window.addEventListener("mouseup", (e) => (draw = false));

window.addEventListener("mousemove", (e) => {
  if (prevX == null || prevY == null || !draw) {
    prevX = e.clientX;
    prevY = e.clientY;
    return;
  }

  let currentX = e.clientX;
  let currentY = e.clientY;

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  prevX = currentX;
  prevY = currentY;
});

// Colour choices

let colours = document.querySelectorAll(".colour");
colours = Array.from(colours);
colours.forEach((colour) => {
  colour.addEventListener("click", () => {
    ctx.strokeStyle = colour.dataset.colour;
    colour.classList.add("active");
  });
});

// Brush choices

let brushes = document.querySelectorAll(".brush");
brushes = Array.from(brushes);
brushes.forEach((brush) => {
  brush.addEventListener("click", () => {
    ctx.lineCap = brush.dataset.brush;
    ctx.lineWidth = brush.dataset.size;
  });
});

// Clear button

let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save button
let saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", () => {
  let data = canvas.toDataURL("imag/png");
  let a = document.createElement("a");
  a.href = data;
  // what ever name you specify here
  // the image will be saved as that name
  a.download = "drawing.png";
  a.click();
});
