let diameter = 180;
let cr = diameter / 2;
let cx = 90;
let cy = 90;
let rx = 0;
let ry = 0;
let rw = 40;
let rh = 40;
let tx = 0;
let ty = 0;
let seats = 12;
let roundSeatGap = 30;
let roundSeatGapCorrected = roundSeatGap + rh / 2;
let gap = 100;
let gapCorrected = diameter + gap + roundSeatGap + rh + rh / 2;

function drawCircle(cx, cy, cr) {
  let circle = `<circle cx="${cx}" cy="${cy}" r="${cr}"/>`;
  document
    .getElementsByClassName("svgWindow")[0]
    .insertAdjacentHTML("beforeend", circle);
}

function drawRectangle(rx, ry, rw, rh, tx, ty, angle) {
  let rect = `<rect x="${roundSeatGap + rx - rw / 2}" y="${
    ry - rh / 2
  }" width="${rw}" height="${rh}" transform="translate(${tx},${ty}) rotate(${angle})"/>`;
  document
    .getElementsByClassName("svgWindow")[0]
    .insertAdjacentHTML("beforeend", rect);
}

for (let i = 0; i < 2; i++) {
  for (let k = 0; k < 2; k++) {
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
