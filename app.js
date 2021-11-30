// import { saveAs } from ".FileSaver";
// I culd not make the import work, so i copied the code.
// TODO: fix the modul.
// Sorry

/*
 * FileSaver.js
 * A saveAs() FileSaver implementation.
 *
 * By Eli Grey, http://eligrey.com
 *
 * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
 * source  : http://purl.eligrey.com/github/FileSaver.js
 */
// The one and only way of getting global scope in all environments
// https://stackoverflow.com/q/3277182/1008999
var _global =
  typeof window === "object" && window.window === window
    ? window
    : typeof self === "object" && self.self === self
    ? self
    : typeof global === "object" && global.global === global
    ? global
    : void 0;

function bom(blob, opts) {
  if (typeof opts === "undefined")
    opts = {
      autoBom: false,
    };
  else if (typeof opts !== "object") {
    console.warn("Deprecated: Expected third argument to be a object");
    opts = {
      autoBom: !opts,
    };
  } // prepend BOM for UTF-8 XML and text/* types (including HTML)
  // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF

  if (
    opts.autoBom &&
    /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
      blob.type
    )
  ) {
    return new Blob([String.fromCharCode(0xfeff), blob], {
      type: blob.type,
    });
  }

  return blob;
}

function download(url, name, opts) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";

  xhr.onload = function () {
    saveAs(xhr.response, name, opts);
  };

  xhr.onerror = function () {
    console.error("could not download file");
  };

  xhr.send();
}

function corsEnabled(url) {
  var xhr = new XMLHttpRequest(); // use sync to avoid popup blocker

  xhr.open("HEAD", url, false);

  try {
    xhr.send();
  } catch (e) {}

  return xhr.status >= 200 && xhr.status <= 299;
} // `a.click()` doesn't work for all browsers (#465)

function click(node) {
  try {
    node.dispatchEvent(new MouseEvent("click"));
  } catch (e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(
      "click",
      true,
      true,
      window,
      0,
      0,
      0,
      80,
      20,
      false,
      false,
      false,
      false,
      0,
      null
    );
    node.dispatchEvent(evt);
  }
} // Detect WebView inside a native macOS app by ruling out all browsers
// We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
// https://www.whatismybrowser.com/guides/the-latest-user-agent/macos

var isMacOSWebView =
  _global.navigator &&
  /Macintosh/.test(navigator.userAgent) &&
  /AppleWebKit/.test(navigator.userAgent) &&
  !/Safari/.test(navigator.userAgent);
var saveAs =
  _global.saveAs || // probably in some web worker
  (typeof window !== "object" || window !== _global
    ? function saveAs() {}
    : /* noop */
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView
    "download" in HTMLAnchorElement.prototype && !isMacOSWebView
    ? function saveAs(blob, name, opts) {
        var URL = _global.URL || _global.webkitURL;
        var a = document.createElement("a");
        name = name || blob.name || "download";
        a.download = name;
        a.rel = "noopener"; // tabnabbing
        // TODO: detect chrome extensions & packaged apps
        // a.target = '_blank'

        if (typeof blob === "string") {
          // Support regular links
          a.href = blob;

          if (a.origin !== location.origin) {
            corsEnabled(a.href)
              ? download(blob, name, opts)
              : click(a, (a.target = "_blank"));
          } else {
            click(a);
          }
        } else {
          // Support blobs
          a.href = URL.createObjectURL(blob);
          setTimeout(function () {
            URL.revokeObjectURL(a.href);
          }, 4e4); // 40s

          setTimeout(function () {
            click(a);
          }, 0);
        }
      } // Use msSaveOrOpenBlob as a second approach
    : "msSaveOrOpenBlob" in navigator
    ? function saveAs(blob, name, opts) {
        name = name || blob.name || "download";

        if (typeof blob === "string") {
          if (corsEnabled(blob)) {
            download(blob, name, opts);
          } else {
            var a = document.createElement("a");
            a.href = blob;
            a.target = "_blank";
            setTimeout(function () {
              click(a);
            });
          }
        } else {
          navigator.msSaveOrOpenBlob(bom(blob, opts), name);
        }
      } // Fallback to using FileReader and a popup
    : function saveAs(blob, name, opts, popup) {
        // Open a popup immediately do go around popup blocker
        // Mostly only available on user interaction and the fileReader is async so...
        popup = popup || open("", "_blank");

        if (popup) {
          popup.document.title = popup.document.body.innerText =
            "downloading...";
        }

        if (typeof blob === "string") return download(blob, name, opts);
        var force = blob.type === "application/octet-stream";

        var isSafari =
          /constructor/i.test(_global.HTMLElement) || _global.safari;

        var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

        if (
          (isChromeIOS || (force && isSafari) || isMacOSWebView) &&
          typeof FileReader !== "undefined"
        ) {
          // Safari doesn't allow downloading of blob URLs
          var reader = new FileReader();

          reader.onloadend = function () {
            var url = reader.result;
            url = isChromeIOS
              ? url
              : url.replace(/^data:[^;]*;/, "data:attachment/file;");
            if (popup) popup.location.href = url;
            else location = url;
            popup = null; // reverse-tabnabbing #460
          };

          reader.readAsDataURL(blob);
        } else {
          var URL = _global.URL || _global.webkitURL;
          var url = URL.createObjectURL(blob);
          if (popup) popup.location = url;
          else location.href = url;
          popup = null; // reverse-tabnabbing #460

          setTimeout(function () {
            URL.revokeObjectURL(url);
          }, 4e4); // 40s
        }
      });
// Global Variables:

// User Selectable Variables:
let diameter = 180;
let rw = 45;
let rh = 50;
let seats = 12;
let roundSeatGap = 30;
let gap = 100;
let oszlop = 5;
let sor = 6;
let rxGap = gap;
let ryGap = roundSeatGap;

let hw = 3000;
let hl = 2000;
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
// hallWidthInput.defaultValue = 3000;
const hallLengthInput = document.querySelector("#hallLength");
// hallLengthInput.defaultValue = 2000;
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
const saveFileInput = document.querySelector(".saveFile");
const formSharedInput = document.querySelector(".formShared");

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
  value: "3000",
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
  value: "2000",
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
  value: "Frissít",
});
const saveFile = Object.assign(document.createElement("button"), {
  id: "saveFile",
  textContent: "Mentés fájlba",
});
const userInput = Object.assign(document.createElement("form"), {
  id: "userInput",
});
const userInputNoTable = Object.assign(document.createElement("form"), {
  id: "userInputNoTable",
});

function renderRountableMenu() {
  clearMenu();
  // formInputNoTable.remove();
  formSharedInput.appendChild(userInput);
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
  saveFileInput.appendChild(saveFile);

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

  // File Saver:
  saveFile.addEventListener("click", saveFileInputHandler);
  function saveFileInputHandler(e) {
    e.preventDefault();
    const svgWindow = document.getElementsByClassName("svgWindow")[0].innerHTML;
    const svgContent =
      `<svg
    class="svgWindow"
    width="100%"
    height="100%"
    viewBox="0 0 4000 2000"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"
  >` +
      svgWindow +
      `</svg>`;
    const blob = new Blob([svgContent], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "notfinal.svg");
  }
}

function renderNoTableMenu() {
  clearMenu();
  // formInput.remove();
  formSharedInput.appendChild(userInputNoTable);
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
  saveFileInput.appendChild(saveFile);

  formInputNoTable.addEventListener("submit", formInputNoTableHandler);
  function formInputNoTableHandler(e) {
    e.preventDefault();
    hw = parseInt(e.target.hallWidth.value);
    hl = parseInt(e.target.hallLength.value);

    rw = parseInt(e.target.seatWidth.value);
    rh = parseInt(e.target.seatDepth.value);

    ryGap = parseInt(e.target.seatPos.value);
    rxGap = parseInt(e.target.passway.value);

    oszlop = parseInt(e.target.oszlop.value);
    sor = parseInt(e.target.sor.value);
    hPos = parseInt(e.target.horizontalPos.value);
    vPos = parseInt(e.target.verticalPos.value);

    renderNoTables();
    renderNoTableMenu();
  }

  // File Saver:
  saveFile.addEventListener("click", saveFileInputHandler);
  function saveFileInputHandler(e) {
    e.preventDefault();
    const svgWindow = document.getElementsByClassName("svgWindow")[0].innerHTML;
    const svgContent =
      `<svg
    class="svgWindow"
    width="100%"
    height="100%"
    viewBox="0 0 4000 2000"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"
  >` +
      svgWindow +
      `</svg>`;
    const blob = new Blob([svgContent], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "notfinal.svg");
  }
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

function clearMenu() {
  const formInput = document.querySelector("#userInput");
  formInput.textContent = "";
}

// Draw Functions:

function drawClear() {
  let clear = ``;
  document.getElementsByClassName("svgWindow")[0].innerHTML = clear;
}

function drawCircle(
  cx,
  cy,
  cr,
  fill = "none",
  stroke = "black",
  strokeWidth = "2"
) {
  let circle = `<circle cx="${cx}" cy="${cy}" r="${cr}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
  document
    .getElementsByClassName("svgWindow")[0]
    .insertAdjacentHTML("beforeend", circle);
}

function drawRectangle(
  rx,
  ry,
  rw,
  rh,
  tx = 0,
  ty = 0,
  angle = 0,
  fill = "none",
  stroke = "black",
  strokeWidth = "2"
) {
  let rect = `<rect x="${roundSeatGap + rx - rw / 2}" y="${
    ry - rh / 2
  }" width="${rw}" height="${rh}" fill="${fill}" stroke ="${stroke}" stroke-width="${strokeWidth}" transform="translate(${tx}, ${ty}) rotate(${angle})"/>`;
  document
    .getElementsByClassName("svgWindow")[0]
    .insertAdjacentHTML("beforeend", rect);
}

function renderRoundTables() {
  drawClear();
  drawRectangle(hw / 2, hl / 2, hw, hl);
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
  drawRectangle(hw / 2, hl / 2, hw, hl);
  for (let i = 0; i < sor; i++) {
    for (let k = 0; k < oszlop; k++) {
      drawRectangle(
        hPos + i * rx * ((rxGap + rw) / 100),
        vPos + k * ry * ((ryGap + rh) / 100),
        rw,
        rh
      );
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

// Tale Variables:
let mode = modeInput.options.selectedIndex;

// Main program:

renderRountableMenu();
renderRoundTables();
