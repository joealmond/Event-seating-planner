// Global Variables:

// User Selectable Variables:
let diameter = 180;
let rw = 45;
let rh = 50;
let seats = 12;
let roundSeatGap = 30;
let gap = 100;
let oszlop = 2;
let sor = 3;

let hw = 2000;
let hl = 1500;
let hPos = 180;
let vPos = 180;

// Internal Variables:
let scale = 2000; // Svg Viewbox parameter
let cr = diameter / 2;
let cx = diameter / 2;
let cy = diameter / 2;
let rx = 0;
let ry = 0;
let tx = 0;
let ty = 0;
let roundSeatGapCorrected = roundSeatGap + rh / 2;
let gapCorrected = diameter + gap + roundSeatGap + rh + rh / 2;

// Global templates:

const noTableMenuContent = `<label for="width">Széleség:</label>
<input
  type="number"
  id="width"
  name="width"
  required
  minlength="3"
  maxlength="3"
  size="10"
/>`;
const roundTableMenuContent = `
<label for="hallWidth">Terem szélessége:</label>
<input
  type="number"
  id="hallWidth"
  name="hallWidth"
  required
  minlength="2"
  maxlength="5"
  size="10"
/>
<label for="hallLength">Terem hossza:</label>
<input
  type="number"
  id="hallLength"
  name="hallLength"
  required
  minlength="2"
  maxlength="5"
  size="10"
/>
<label for="diameter">Asztal átmérő:</label>
<input
  type="number"
  id="diameter"
  name="diameter"
  required
  minlength="3"
  maxlength="3"
  size="10"
/>
<label for="seatWidth">Szék szélesség:</label>
<input
  type="number"
  id="seatWidth"
  name="seatWidth"
  required
  minlength="2"
  maxlength="2"
  size="10"
/>
<label for="seatDepth">Szék mélyég:</label>
<input
  type="number"
  id="seatDepth"
  name="seatDepth"
  required
  minlength="2"
  maxlength="2"
  size="10"
/>
<label for="seatPerTable">Szék asztalonként:</label>
<input
  type="number"
  id="seatPerTable"
  name="seatPerTable"
  required
  minlength="1"
  maxlength="2"
  size="10"
/>
<label for="seatPos">Szék távolság:</label>
<input
  type="number"
  id="seatPos"
  name="seatPos"
  required
  minlength="1"
  maxlength="2"
  size="10"
/>
<label for="passway">Járás:</label>
<input
  type="number"
  id="passway"
  name="passway"
  required
  minlength="1"
  maxlength="2"
  size="10"
/>
<label for="oszlop">Oszlopok száma:</label>
<input
  type="number"
  id="oszlop"
  name="oszlop"
  required
  minlength="1"
  maxlength="3"
  size="10"
/>
<label for="sor">Sorok száma:</label>
<input
  type="number"
  id="sor"
  name="sor"
  required
  minlength="1"
  maxlength="3"
  size="10"
/>
<label for="horizontalPos">Vízszintes helyzet:</label>
<input
  type="range"
  id="horizontalPos"
  name="horizontalPos"
  required
  min="1"
  max="10000"
  size="10"
/>
<label for="verticalPos">Függőleges helyzet:</label>
<input
  type="range"
  id="verticalPos"
  name="verticalPos"
  required
  min="1"
  max="10000"
  size="10"
/>
<input type="submit" value="Küld" />
`;

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
  for (let i = 0; i < sor; i++) {
    for (let k = 0; k < oszlop; k++) {
      drawCircle(
        hPos + i * gapCorrected + cx,
        vPos + k * gapCorrected + cy,
        cr
      );
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
          hPos + i * gapCorrected + tx,
          vPos + k * gapCorrected + ty,
          angle
        );
        angle += 360 / seats;
      }
    }
  }
}

function renderNoTables() {
  drawClear();
}

function renderSelectedMode() {
  if (modeInput.options.selectedIndex === 0) {
    if (formInput.innerHTML !== roundTableMenuContent) renderRoundTables();
  } else if (modeInput.options.selectedIndex === 1) {
    if (formInput.innerHTML !== noTableMenuContent) renderNoTables();
  }
}

// Event Handlers:

// Mode Input:
const modeInput = document.querySelector("#mode");

modeInput.addEventListener("input", modeInputHandler);
function modeInputHandler(e) {
  e.preventDefault();
  drawClear();
  renderSelectedMode();
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

// Zoom on mouse Wheel:
const svgWindowAll = document.querySelector(".svgWindow");
svgWindowAll.addEventListener("wheel", zoomWheelHandler);
function zoomWheelHandler(e) {
  e.preventDefault();
  scale += e.deltaY;
  svgWindow.height = scale;
  svgWindow.width = scale * 2;
}

// User Input:
const formInput = document.querySelector("#userInput");

const hallWidthInput = document.querySelector("#hallWidth");
hallWidthInput.defaultValue = 20000;
const hallLengthInput = document.querySelector("#hallLength");
hallLengthInput.defaultValue = 15000;
const diameterInput = document.querySelector("#diameter");
diameterInput.defaultValue = 180;
const seatWidthInput = document.querySelector("#seatWidth");
seatWidthInput.defaultValue = 45;
const seatDepthInput = document.querySelector("#seatDepth");
seatDepthInput.defaultValue = 50;
const seatPerTableInput = document.querySelector("#seatPerTable");
seatPerTableInput.defaultValue = 12;
const seatPosInput = document.querySelector("#seatPos");
seatPosInput.defaultValue = 30;
const passwayInput = document.querySelector("#passway");
passwayInput.defaultValue = 100;
const oszlopInput = document.querySelector("#oszlop");
oszlopInput.defaultValue = 2;
const sorInput = document.querySelector("#sor");
sorInput.defaultValue = 3;
const horizontalPosInput = document.querySelector("#horizontalPos");
horizontalPosInput.defaultValue = 180;
const verticalPosInput = document.querySelector("#verticalPos");
verticalPosInput.defaultValue = 180;

formInput.addEventListener("submit", formInputHandler);
function formInputHandler(e) {
  e.preventDefault();
  console.log("fire");
  drawClear();
  hw = parseInt(hallWidthInput.value);
  hl = parseInt(hallLengthInput.value);
  diameter = parseInt(diameterInput.value);
  rw = parseInt(seatWidthInput.value);
  rh = parseInt(seatDepthInput.value);
  seats = parseInt(seatPerTableInput.value);
  roundSeatGap = parseInt(seatPosInput.value);
  gap = parseInt(passwayInput.value);
  oszlop = parseInt(oszlopInput.value);
  sor = parseInt(sorInput.value);
  hPos = parseInt(horizontalPosInput.value);
  vPos = parseInt(verticalPosInput.value);

  cr = diameter / 2;
  cx = diameter / 2;
  cy = diameter / 2;
  gapCorrected = diameter + gap + roundSeatGap + rh + rh / 2;
  renderSelectedMode();
}

// Main program:

renderSelectedMode();
