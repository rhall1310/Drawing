// Set up canvas

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Drawing based on mouse or touch

window.addEventListener("load", function () {
  let draw = false;
  toggleItem(document.querySelectorAll(".colour"));
  toggleItem(document.querySelectorAll(".brush"));
  function drawstart(event) {
    context.beginPath();
    context.moveTo(
      event.pageX - canvas.offsetLeft,
      event.pageY - canvas.offsetTop
    );
    draw = true;
  }
  function drawmove(event) {
    if (!draw) return;
    context.lineTo(
      event.pageX - canvas.offsetLeft,
      event.pageY - canvas.offsetTop
    );
    context.stroke();
  }
  function drawend(event) {
    if (!draw) return;
    drawmove(event);
    draw = false;
  }
  function touchstart(event) {
    drawstart(event.touches[0]);
  }
  function touchmove(event) {
    drawmove(event.touches[0]);
    event.preventDefault();
  }
  function touchend(event) {
    drawend(event.changedTouches[0]);
  }

  canvas.addEventListener("touchstart", touchstart, false);
  canvas.addEventListener("touchmove", touchmove, false);
  canvas.addEventListener("touchend", touchend, false);

  canvas.addEventListener("mousedown", drawstart, false);
  canvas.addEventListener("mousemove", drawmove, false);
  canvas.addEventListener("mouseup", drawend, false);
});

// Colour choices

let colours = document.querySelectorAll(".colour");
colours = Array.from(colours);
colours.forEach((colour) => {
  colour.addEventListener("click", () => {
    context.strokeStyle = colour.dataset.colour;
  });
});

// Brush choices

let brushes = document.querySelectorAll(".brush");
brushes = Array.from(brushes);
brushes.forEach((brush) => {
  brush.addEventListener("click", () => {
    context.lineCap = brush.dataset.brush;
    context.lineWidth = brush.dataset.size;
  });
});

// Clear button

let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

// Save button
let saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", () => {
  let data = canvas.toDataURL("imag/png");
  let a = document.createElement("a");
  a.href = data;

  a.download = "drawing.png";
  a.click();
});

// Toggle class

function toggleItem(elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      let current = this;
      for (let i = 0; i < elem.length; i++) {
        if (current != elem[i]) {
          elem[i].classList.remove("active");
        } else {
          current.classList.add("active");
        }
      }
    });
  }
}
