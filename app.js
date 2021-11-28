// Global Variables:

let diameter = 180;
let cr = diameter / 2;
let cx = diameter / 2;
let cy = diameter / 2;
let rx = 0;
let ry = 0;
let rw = 30;
let rh = 30;
let tx = 0;
let ty = 0;
let seats = 12;
let gap = 100;
let roundSeatGap = 30;
let roundSeatGapCorrected = roundSeatGap + rh / 2;
let gapCorrected = diameter + gap + roundSeatGap + rh + rh / 2;

// Draw Functions:

function drawClear() {
  let clear = ``;
  document.getElementsByClassName("svgWindow")[0].innerHTML = clear;
}

function drawCircle(cx, cy, cr) {
  let circle = `<circle cx="${cx}" cy="${cy}" r="${cr}"/>`;
  document
    .getElementsByClassName("svgWindow")[0]
    .insertAdjacentHTML("beforeend", circle);
}

function drawRectangle(rx, ry, rw, rh, tx, ty, angle) {
  let rect = `<rect x="${roundSeatGap + rx - rw / 2}" y="${
    ry - rh / 2
  }" width="${rw}" height="${rh}" transform="translate(${tx}, ${ty}) rotate(${angle})"/>`;
  document
    .getElementsByClassName("svgWindow")[0]
    .insertAdjacentHTML("beforeend", rect);
}

function renderRoundTables() {
  for (let i = 0; i < 12; i++) {
    for (let k = 0; k < 6; k++) {
      drawCircle(i * gapCorrected + cx, k * gapCorrected + cy, cr);
      let angle = 0;
      rx = cx;
      ry = cy;
      for (let seat = 0; seat < seats; seat++) {
        tx = rx + cr * Math.sin((angle * Math.PI) / 180);
        ty = ry - cr * Math.cos((angle * Math.PI) / 180);
        drawRectangle(
          rx,
          ry,
          rw,
          rh,
          i * gapCorrected + tx,
          k * gapCorrected + ty,
          angle
        );
        angle += 360 / seats;
      }
    }
  }
}

// Event Handlers:

// Mode Input:
const modeInput = document.querySelector("#mode");

modeInput.addEventListener("input", modeInputHandler);
function modeInputHandler(e) {
  e.preventDefault();
  drawClear();
  if (modeInput.options.selectedIndex === 0) renderRoundTables();
  else if (modeInput.options.selectedIndex === 1) renderNoTables();
}

// Zoom:
const zoom = document.querySelector("#zoom");
zoom.defaultValue = 2000;
const svgWindow =
  document.getElementsByClassName("svgWindow")[0].viewBox.baseVal;

zoom.addEventListener("input", zoomHandler);

function zoomHandler(e) {
  svgWindow.height = zoom.value;
  svgWindow.width = zoom.value * 2;
}

// User Input:
const formInput = document.querySelector(".userInput");
const diameterInput = document.querySelector("#diameter");
diameterInput.defaultValue = 180;

formInput.addEventListener("submit", formInputHandler);
function formInputHandler(e) {
  e.preventDefault();
  drawClear();
  diameter = parseInt(diameterInput.value);
  render();
}

// Main program:

if (modeInput.options.selectedIndex === 0) renderRoundTables();
else if (modeInput.options.selectedIndex === 1) renderNoTables();
