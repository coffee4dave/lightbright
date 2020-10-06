function initDraw(canvas) {

  const refresh = document.querySelector("#refresh");
  const random = document.querySelector("#random");
  const shades = document.querySelector("#shades");
  const tints = document.querySelector("#tints");

  let elts = [];
  const mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
  };

  const board = {
    x: 0,
    y: 0,
    cellWidth: 0,
    maxCells: 0
  };

  let color = {
    r: 0,
    g: 0,
    b: 0,
    rgb: "rgb(0, 0, 0)"
  }

  let element = null;

  function plusPx(value) {
    return value + "px";
  };

  refresh.addEventListener("click", (e) => {
    location.reload();
  });

  window.addEventListener("DOMContentLoaded", (e) => {
    drawAll();
  });

  function drawAll() {
    board.cellWidth = 20;

    const boardWidth = parseInt(getComputedStyle(canvas).width.replace("px", ''));
    const boardHeight = parseInt(getComputedStyle(canvas).height.replace("px", ''));

    board.maxCells = Math.pow(boardWidth / board.cellWidth, 2);

    for (let i = 0; i < board.maxCells; i++) {
      element = document.createElement("div");
      element.className = "circle vcenter lightblue";
      element.style.left = plusPx(board.x);
      element.style.width = plusPx(board.cellWidth);
      element.style.top = plusPx(board.y);
      element.style.height = plusPx(board.cellWidth);

      element.addEventListener("click", (e) => {
        e.stopPropagation();
        e.target.style.backgroundColor = "";
        rotate3d(e);
        if (e.target.classList[2] === "lightblue") {
          e.target.classList.add("blue");
          e.target.classList.remove("lightblue");
        } else if (e.target.classList[2] === "blue") {
          e.target.classList.add("green");
          e.target.classList.remove("blue");
        } else if (e.target.classList[2] === "green") {
          e.target.classList.add("red");
          e.target.classList.remove("green");
        } else if (e.target.classList[2] === "red") {
          e.target.classList.add("yellow");
          e.target.classList.remove("red");
        } else if (e.target.classList[2] === "yellow") {
          e.target.classList.add("lightblue");
          e.target.classList.remove("yellow");
        } else {
          e.target.style.backgroundColor = "";
          e.target.classList.add("lightblue");
        }

        // rotate3d(e);

      });

      canvas.appendChild(element);
      elts.push(element);
      board.x += board.cellWidth;
    }
  }



  function rotate3d(e) {
    e.currentTarget.classList.toggle("rotated");
  }

  let interval = 0;
  let running = false;
  let period = 400;


  random.addEventListener("click", (e) => {
    if (running) {
      clearInterval(interval);
      running = false;
    } else {
      running = true;
      interval = setInterval(() => {
        colorRandomly();
      }, period);
    }
  });

  function colorRandomly() {
    let randCell;

    for (let i = 0; i < canvas.childNodes.length * 3; i++) {
      randCell = Math.floor(Math.random() * canvas.childNodes.length);

      canvas.childNodes[randCell].classList.remove("lightblue");

      canvas.childNodes[randCell].style.backgroundColor = randomColor(color).rgb;
      if (randCell === Math.floor(Math.random() * canvas.childNodes.length)) {
        canvas.childNodes[randCell].classList.toggle("rotated");
      }
    }
  }

  function randomColor(col) {
    col.r = Math.floor(Math.random() * 256) + 1;
    col.g = Math.floor(Math.random() * 256) + 1;
    col.b = Math.floor(Math.random() * 256) + 1;
    col.rgb = `rgb(${color.r}, ${color.g}, ${color.b})`;
    return col;
  }

  shades.addEventListener("click", (e) => {
    if (running) {
      clearInterval(interval);
      running = false;
    } else {
      running = true;
      interval = setInterval(() => {
        color = randomColor(color);
        colorShades(color);
      }, period);

    }
  });

  function colorShades(col) {
    const shade_factor = 0.009 / (canvas.childNodes.length / 50);
    // const shade_factor = 0.0005 / board.maxCells;
    for (let i = canvas.childNodes.length - 1; i >= 0; i--) {
      col.r = col.r * (1 - shade_factor);
      col.g = col.g * (1 - shade_factor);
      col.b = col.b * (1 - shade_factor);
      col.rgb = `rgb(${col.r}, ${col.g}, ${col.b})`;
      canvas.childNodes[i].classList.remove("lightblue");
      canvas.childNodes[i].style.backgroundColor = col.rgb;
      if (i % Math.floor(Math.random() * canvas.childNodes.length) === 0) {
        canvas.childNodes[i].classList.toggle("rotated");
      }
    }
  }

  tints.addEventListener("click", (e) => {
    if (running) {
      clearInterval(interval);
      running = false;
    } else {
      running = true;
      interval = setInterval(() => {
        color = randomColor(color);
        colorTints(color);
      }, period);

    }
  });

  function colorTints(col) {
    const tint_factor = 0.01 / (canvas.childNodes.length / 50);
    for (let i = 0; i < canvas.childNodes.length; i++) {
      col.r = col.r + (255 - col.r) * tint_factor;
      col.g = col.g + (255 - col.g) * tint_factor;
      col.b = col.b + (255 - col.b) * tint_factor;
      col.rgb = `rgb(${col.r}, ${col.g}, ${col.b})`;
      canvas.childNodes[i].classList.remove("lightblue");
      canvas.childNodes[i].style.backgroundColor = col.rgb;
      if (i % Math.floor(Math.random() * canvas.childNodes.length) === 0) {
        canvas.childNodes[i].classList.toggle("rotated");
      }
    }
  }



  // function setMousePosition(e) {
  //   const ev = e || window.event; //Moz || IE

  //   let style = getComputedStyle(canvas);
  //   const borderWidth = style.borderWidth.replace('px', '');

  //   style = getComputedStyle(body);
  //   const bodyBorderWidth = style.borderWidth.replace('px', '');

  //   pos.innerText = `Client \nX: ${plusPx(e.clientX)},\n Y: ${plusPx(e.clientY)}`;

  //   if (ev.pageX) {
  //     //Moz
  //     mouse.x = ev.pageX + window.pageXOffset - borderWidth - bodyBorderWidth;
  //     mouse.y = ev.pageY + window.pageYOffset - borderWidth - bodyBorderWidth;
  //   } else if (ev.clientX) {
  //     //IE
  //     mouse.x = ev.clientX + document.body.scrollLeft - borderWidth - bodyBorderWidth;
  //     mouse.y = ev.clientY + document.body.scrollTop - borderWidth - bodyBorderWidth;
  //   }
  // };


  // canvas.onmousemove = function (e) {
  //   setMousePosition(e);
  //   if (element !== null) {
  //     const left = parseInt(getComputedStyle(element).left.replace('px', ''));
  //     const top = parseInt(getComputedStyle(element).top.replace('px', ''));
  //     const width = parseInt(getComputedStyle(element).width.replace('px', ''));
  //     const height = parseInt(getComputedStyle(element).height.replace('px', ''));


  //     element.style.width = Math.abs(mouse.x - mouse.startX) + "px";
  //     element.style.height = Math.abs(mouse.y - mouse.startY) + "px";
  //     element.style.left =
  //       mouse.x - mouse.startX < 0 ? mouse.x + "px" : mouse.startX + "px";
  //     element.style.top =
  //       mouse.y - mouse.startY < 0 ? mouse.y + "px" : mouse.startY + "px";
  //     element.innerText = `${elts.length}`;
  //   }
  // };

  // canvas.onmousedown = function (e) {


  //   if (element !== null) {
  //     element = null;
  //     canvas.style.cursor = "default";

  //   } else {

  //     mouse.startX = mouse.x;
  //     mouse.startY = mouse.y;
  //     canvas.style.cursor = "crosshair";

  //     element = document.createElement("div");
  //     element.className = "rectangle vcenter";
  //     element.style.left = plusPx(mouse.x);
  //     element.style.top = plusPx(mouse.y);

  //     //dragElement(element); //make draggable


  //     elts.push(element);
  //     canvas.appendChild(element);

  //   }
  // };

  // canvas.onmouseup = function (e) {

  //   if (element !== null) {
  //     const width = parseInt(getComputedStyle(element).width.replace('px', ''));
  //     const height = parseInt(getComputedStyle(element).height.replace('px', ''));
  //     if (width < 2 || height < 2) {
  //       console.log("less than 2x2");
  //       elts = elts.filter(item => item !== element);

  //       //=============        maybe here?

  //       canvas.removeChild(element);
  //       // canvas.removeChild(canvas.lastChild);
  //       element = null;
  //     } else {
  //       element.addEventListener("dblclick", (e) => {
  //         elts = elts.filter(item => item !== element);
  //         canvas.removeChild(e.currentTarget);
  //       });
  //       element = null;
  //       canvas.style.cursor = "default";
  //     }



  //   }
  // }
}

console.log("JS connected");

const canvasID = document.querySelector("#canvas");
const board = document.querySelector("#board");
initDraw(board);