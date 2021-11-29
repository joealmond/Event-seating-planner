// Global Variables:

// User Selectable Variables:
let diameter = 180;
let rw = 45;
let rh = 50;
let seats = 12;
let roundSeatGap = 30;
let gap = 100;
let oszlop = 5;
let sor = 10;
let rxGap = gap;
let ryGap = roundSeatGap;

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

// Menu Functions:

// User Input:
const formInput = document.querySelector("#userInput");
const formInputNoTable = document.querySelector("#userInputNoTable");
const formSubmitInput = document.querySelector("#submit");
const hallWidthInput = document.querySelector("#hallWidth");
// hallWidthInput.defaultValue = 20000;
const hallLengthInput = document.querySelector("#hallLength");
// hallLengthInput.defaultValue = 15000;
const diameterInput = document.querySelector("#diameter");
// diameterInput.defaultValue = 180;
const seatWidthInput = document.querySelector("#seatWidth");
// seatWidthInput.defaultValue = 45;
const seatDepthInput = document.querySelector("#seatDepth");
// seatDepthInput.defaultValue = 50;
const seatPerTableInput = document.querySelector("#seatPerTable");
// seatPerTableInput.defaultValue = 12;
const seatPosInput = document.querySelector("#seatPos");
// seatPosInput.defaultValue = 30;
const passwayInput = document.querySelector("#passway");
// passwayInput.defaultValue = 100;
const oszlopInput = document.querySelector("#oszlop");
// oszlopInput.defaultValue = 2;
const sorInput = document.querySelector("#sor");
// sorInput.defaultValue = 3;
const horizontalPosInput = document.querySelector("#horizontalPos");
// horizontalPosInput.defaultValue = 180;
const verticalPosInput = document.querySelector("#verticalPos");
// verticalPosInput.defaultValue = 180;

// Creating Elements:
const hallWidthLabel = Object.assign(document.createElement("label"), {
  for: "hallWidth",
  textContent: "Terem szélessége:",
});
const hallWidthNode = Object.assign(document.createElement("input"), {
  type: "number",
  id: "hallWidth",
  name: "hallWidth",
  required: "",
  minlength: "2",
  maxlength: "5",
  value: "20000",
  size: "10",
});
const hallLengthLabel = Object.assign(document.createElement("label"), {
  for: "hallLength",
  textContent: "Terem hossza:",
});
const hallLengthNode = Object.assign(document.createElement("input"), {
  type: "number",
  id: "hallLength",
  name: "hallLength",
  required: "",
  minlength: "2",
  maxlength: "5",
  value: "15000",
  size: "10",
});
const diameterLabel = Object.assign(document.createElement("label"), {
  for: "diameter",
  textContent: "Asztal átmérő:",
});
const diameterNode = Object.assign(document.createElement("input"), {
  type: "number",
  id: "diameter",
  name: "diameter",
  required: "",
  minlength: "3",
  maxlength: "3",
  value: "180",
  size: "10",
});
const seatWidthLabel = Object.assign(document.createElement("label"), {
  for: "seatWidth",
  textContent: "Szék szélesség:",
});
const seatWidthNode = Object.assign(document.createElement("input"), {
  type: "number",
  id: "seatWidth",
  name: "seatWidth",
  required: "",
  minlength: "2",
  maxlength: "2",
  value: "45",
  size: "10",
});
const seatDepthLabel = Object.assign(document.createElement("label"), {
  for: "seatDepth",
  textContent: "Szék mélyég:",
});
const seatDepthNode = Object.assign(document.createElement("input"), {
  type: "number",
  id: "seatDepth",
  name: "seatDepth",
  required: "",
  minlength: "2",
  maxlength: "2",
  value: "50",
  size: "10",
});
const seatPerTableLabel = Object.assign(document.createElement("label"), {
  for: "seatPerTable",
  textContent: "Szék asztalonként:",
});
const seatPerTableNode = Object.assign(document.createElement("input"), {
  type: "number",
  id: "seatPerTable",
  name: "seatPerTable",
  required: "",
  minlength: "1",
  maxlength: "2",
  value: "12",
  size: "10",
});
const seatPosLabel = Object.assign(document.createElement("label"), {
  for: "seatPos",
  textContent: "Szék illesztés:",
});
const seatPosNode = Object.assign(document.createElement("input"), {
  type: "number",
  id: "seatPos",
  name: "seatPos",
  required: "",
  minlength: "1",
  maxlength: "2",
  value: "30",
  size: "10",
});
const passwayLabel = Object.assign(document.createElement("label"), {
  for: "passway",
  textContent: "Járás/szék távolság:",
});
const passwayNode = Object.assign(document.createElement("input"), {
  type: "number",
  id: "passway",
  name: "passway",
  required: "",
  minlength: "1",
  maxlength: "2",
  value: "100",
  size: "10",
});
const oszlopLabel = Object.assign(document.createElement("label"), {
  for: "oszlop",
  textContent: "Oszlopok száma:",
});
const oszlopNode = Object.assign(document.createElement("input"), {
  type: "number",
  id: "oszlop",
  name: "oszlop",
  required: "",
  minlength: "1",
  maxlength: "3",
  value: "2",
  size: "10",
});
const sorLabel = Object.assign(document.createElement("label"), {
  for: "sor",
  textContent: "Sorok száma:",
});
const sorNode = Object.assign(document.createElement("input"), {
  type: "number",
  id: "sor",
  name: "sor",
  required: "",
  minlength: "1",
  maxlength: "3",
  value: "3",
  size: "10",
});
const horizontalPosLabel = Object.assign(document.createElement("label"), {
  for: "horizontalPos",
  textContent: "Vízszintes helyzet:",
});
const horizontalPosNode = Object.assign(document.createElement("input"), {
  type: "number",
  id: "horizontalPos",
  name: "horizontalPos",
  required: "",
  minlength: "1",
  maxlength: "4",
  value: "180",
  size: "10",
});
const verticalPosLabel = Object.assign(document.createElement("label"), {
  for: "verticalPos",
  textContent: "Függőleges helyzet:",
});
const verticalPosNode = Object.assign(document.createElement("input"), {
  type: "number",
  id: "verticalPos",
  name: "verticalPos",
  required: "",
  minlength: "1",
  maxlength: "4",
  value: "180",
  size: "10",
});
const submitNode = Object.assign(document.createElement("input"), {
  type: "submit",
  id: "submit",
  value: "Küld",
});

function renderRountableMenu() {
  clearMenu();
  formInput.appendChild(submitNode);
  formInput.appendChild(hallWidthLabel);
  formInput.appendChild(hallWidthNode);
  formInput.appendChild(hallLengthLabel);
  formInput.appendChild(hallLengthNode);
  formInput.appendChild(diameterLabel);
  formInput.appendChild(diameterNode);
  formInput.appendChild(seatWidthLabel);
  formInput.appendChild(seatWidthNode);
  formInput.appendChild(seatDepthLabel);
  formInput.appendChild(seatDepthNode);
  formInput.appendChild(seatPerTableLabel);
  formInput.appendChild(seatPerTableNode);
  formInput.appendChild(seatPosLabel);
  formInput.appendChild(seatPosNode);
  formInput.appendChild(passwayLabel);
  formInput.appendChild(passwayNode);
  formInput.appendChild(oszlopLabel);
  formInput.appendChild(oszlopNode);
  formInput.appendChild(sorLabel);
  formInput.appendChild(sorNode);
  formInput.appendChild(horizontalPosLabel);
  formInput.appendChild(horizontalPosNode);
  formInput.appendChild(verticalPosLabel);
  formInput.appendChild(verticalPosNode);
}

function renderNoTableMenu() {
  clearMenu();
  formInputNoTable.appendChild(submitNode);
  formInputNoTable.appendChild(hallWidthLabel);
  formInputNoTable.appendChild(hallWidthNode);
  formInputNoTable.appendChild(hallLengthLabel);
  formInputNoTable.appendChild(hallLengthNode);
  formInputNoTable.appendChild(seatWidthLabel);
  formInputNoTable.appendChild(seatWidthNode);
  formInputNoTable.appendChild(seatDepthLabel);
  formInputNoTable.appendChild(seatDepthNode);
  formInputNoTable.appendChild(seatPosLabel);
  formInputNoTable.appendChild(seatPosNode);
  formInputNoTable.appendChild(passwayLabel);
  formInputNoTable.appendChild(passwayNode);
  formInputNoTable.appendChild(oszlopLabel);
  formInputNoTable.appendChild(oszlopNode);
  formInputNoTable.appendChild(sorLabel);
  formInputNoTable.appendChild(sorNode);
  formInputNoTable.appendChild(horizontalPosLabel);
  formInputNoTable.appendChild(horizontalPosNode);
  formInputNoTable.appendChild(verticalPosLabel);
  formInputNoTable.appendChild(verticalPosNode);
}

// Event Handlers:

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

formInput.addEventListener("submit", formInputHandler);
function formInputHandler(e) {
  e.preventDefault();
  hw = parseInt(e.target.hallWidth.value);
  hl = parseInt(e.target.hallLength.value);
  diameter = parseInt(e.target.diameter.value);
  rw = parseInt(e.target.seatWidth.value);
  rh = parseInt(e.target.seatDepth.value);
  seats = parseInt(e.target.seatPerTable.value);
  roundSeatGap = parseInt(e.target.seatPos.value);
  gap = parseInt(e.target.passway.value);
  oszlop = parseInt(e.target.oszlop.value);
  sor = parseInt(e.target.sor.value);
  hPos = parseInt(e.target.horizontalPos.value);
  vPos = parseInt(e.target.verticalPos.value);

  cr = diameter / 2;
  cx = diameter / 2;
  cy = diameter / 2;
  gapCorrected = diameter + gap + roundSeatGap + rh + rh / 2;
  renderRoundTables();
  renderRountableMenu();
}

formInputNoTable.addEventListener("submit", formInputNoTableHandler);
function formInputNoTableHandler(e) {
  e.preventDefault();
  hw = parseInt(e.target.hallWidth.value);
  hl = parseInt(e.target.hallLength.value);

  rw = parseInt(e.target.seatWidth.value);
  rh = parseInt(e.target.seatDepth.value);

  rygap = parseInt(e.target.seatPos.value);
  rxGap = parseInt(e.target.passway.value);

  oszlop = parseInt(e.target.oszlop.value);
  sor = parseInt(e.target.sor.value);

  renderNoTables();
  renderNoTables();
}

function clearMenu() {
  const formInput = document.querySelector("#userInput");
  formInput.textContent = "";
}

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

function drawRectangle(rx, ry, rw, rh, tx = 0, ty = 0, angle = 0) {
  let rect = `<rect x="${roundSeatGap + rx - rw / 2}" y="${
    ry - rh / 2
  }" width="${rw}" height="${rh}" transform="translate(${tx}, ${ty}) rotate(${angle})"/>`;
  document
    .getElementsByClassName("svgWindow")[0]
    .insertAdjacentHTML("beforeend", rect);
}

function renderRoundTables() {
  drawClear();
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
  for (let i = 0; i < sor; i++) {
    for (let k = 0; k < oszlop; k++) {
      drawRectangle(
        hPos + i * rx * ((rxGap + rw) / 100),
        vPos + k * ry * ((ryGap + rh) / 100),
        rw,
        rh
        // hPos + i * gapCorrected + tx,
        // vPos + k * gapCorrected + ty
      );
      // drawCircle(
      //   hPos + i * gapCorrected + cx,
      //   vPos + k * gapCorrected + cy,
      //   cr
      // );
    }
  }
}

// Mode Input:
const modeInput = document.querySelector("#mode");

modeInput.addEventListener("input", modeInputHandler);
function modeInputHandler(e) {
  e.preventDefault();
  if (e.target.value === "roundTale") {
    renderRountableMenu();
    renderRoundTables();
  }
  if (e.target.value === "noTable") {
    renderNoTableMenu();
    renderNoTables();
  }
}
let mode = modeInput.options.selectedIndex;
// Main program:
renderRountableMenu();
renderRoundTables();
