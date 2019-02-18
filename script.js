"use strict";
document.addEventListener("DOMContentLoaded", init);

const imageAddress = document.querySelector("#url");
//   "http://www.dumpaday.com/wp-content/uploads/2016/09/baptism-baby.jpg";

const numOfXPieces = 3;
const numOfYPieces = 3;

function init() {
  document.querySelector("button").addEventListener("click", loadTheImage);
}

function loadTheImage() {
  document.querySelector("img").src = imageAddress;
  document.querySelector("img").onload = theImageHasLoaded;

  const container_width = getImgDimensions().width;
  const container_height = getImgDimensions().height;

  console.log(container_height);
  console.log(container_width);

  generateDropzones(container_width, container_height);
  generatePieces(container_width, container_height);
}

function theImageHasLoaded() {
  alert("THE IMAGE HAS LOADED");
}

function getImgDimensions() {
  const height = document.querySelector("img").naturalHeight;
  const width = document.querySelector("img").naturalWidth;

  return { height, width };
}

function generateDropzones(container_width, container_height) {
  document.querySelector(
    "#container"
  ).style.gridTemplateColumns = `repeat(${numOfXPieces}, 1fr)`;
  document.querySelector("#container").style.width = `${container_width}px`;
  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      let dropzone = document.createElement("div");
      dropzone.dataset.xyid = `${x}${y}`;

      dropzone.style.height = container_height / numOfYPieces + "px";

      dropzone.textContent = `${x}${y}`;
      dropzone.classList.add("dropzone");

      document.querySelector("#container").appendChild(dropzone);
    }
  }
}

function generatePieces(container_width, container_height) {
  document.querySelector(
    "#container"
  ).style.gridTemplateColumns = `repeat(${numOfXPieces}, 1fr)`;
  document.querySelector("#container").style.width = `${container_width}px`;
  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      let piece = document.createElement("div");
      piece.dataset.xyid = `${x}${y}`;

      piece.style.height = container_height / numOfYPieces + "px";
      piece.style.width = container_width / numOfXPieces + "px";
      piece.style.backgroundImage = `url('${imageAddress}')`;

      let piecePosWidth = x * (container_width / numOfXPieces);
      let piecePosHeight = y * (container_height / numOfYPieces);

      console.log(piecePosWidth);
      console.log(piecePosHeight);

      piece.style.backgroundPosition = `-${piecePosWidth}px -${piecePosHeight}px`;

      piece.textContent = `${x}${y}`;
      piece.classList.add("piece");

      piece.draggable = true;

      document.querySelector("#container").appendChild(piece);
    }
  }
}

let dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {});

document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.style.opacity = 0.5;
});

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.style.opacity = "";
});

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
});
document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  console.log("DROP", event.target.className);
  // move dragged elem to the selected drop target
  if (event.target.className == "dropzone") {
    event.target.style.background = "";
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
    dragged.style.left = event.target.style.left;
    dragged.style.top = event.target.style.top;
  } else if (event.target.className == "theBody") {
    // park the dragged elem somewhere on the body
    dragged.style.left = event.pageX + "px";
    dragged.style.top = event.pageY + "px";
  }
});

// document.querySelectorAll(".piece").forEach(eachPiece => {
//   eachPiece.style.left = `${Math.random() * 500 + 250}px`;
// });
