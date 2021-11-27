const markup = `<svg width="5cm" height="4cm" version="1.1"
xmlns="http://www.w3.org/2000/svg">
<desc>Four separate rectangles
</desc>
<rect x="0.5cm" y="0.5cm" width="2cm" height="1cm"/>
<rect x="0.5cm" y="2cm" width="1cm" height="1.5cm"/>
<rect x="3cm" y="0.5cm" width="1.5cm" height="2cm"/>
<rect x="3.5cm" y="3cm" width="1cm" height="0.5cm"/>

<!-- Show outline of viewport using 'rect' element -->
<rect x=".01cm" y=".01cm" width="4.98cm" height="3.98cm"
   fill="none" stroke="blue" stroke-width=".02cm" />

</svg>
`;

// document
//   .getElementsByClassName("it")[0]
//   .insertAdjacentHTML("beforeend", markup);

let diameter = 180;
let cr = diameter / 2;
let cx = 210;
let cy = 210;
let rx = 200;
let ry = 200;
let rw = 20;
let rh = 20;
let tx = 0;
let ty = 0;
let seats = 12;
let gap = 100;
let pGap = diameter + gap;

function drawCircle(cx, cy, cr) {
  let circle = `<circle cx="${cx}" cy="${cy}" r="${cr}"/>`;
  document
    .getElementsByClassName("it")[0]
    .insertAdjacentHTML("beforeend", circle);
}

function drawRectangle(rx, ry, rw, rh, tx, ty, angle) {
  let rect = `<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" transform="rotate(${
    1 / angle / 360
  }, ${180 - angle}, ${360 + angle}) translate(${tx},${ty}) 
  "/>`;
  document
    .getElementsByClassName("it")[0]
    .insertAdjacentHTML("beforeend", rect);
}

for (let i = 0; i < 4; i++) {
  for (let k = 0; k < 4; k++) {
    let angle = 0;

    drawCircle(i * pGap + cx, k * pGap + cy, cr);
    angle = 360 / seats;
    let a = 360 / seats;
    for (let seat = 0; seat < seats; seat++) {
      tx = (cr + 20) * Math.cos((angle / 180) * Math.PI);
      ty = (cr + 20) * Math.sin((angle / 180) * Math.PI);
      drawRectangle(i * pGap + rx, k * pGap + ry, rw, rh, tx, ty, angle);
      console.log(angle);
      angle += a;
    }
  }
}
