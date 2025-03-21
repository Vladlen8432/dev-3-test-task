const displayText = () => {
  const input = document.querySelector(".input");
  const output = document.querySelector(".output");

  output.innerHTML = "";

  input.value.split("").forEach((item) => {
    const span = document.createElement("span");
    span.textContent = item === " " ? "\u00A0" : item;
    output.appendChild(span);
    span.classList.add("draggable");
    span.draggable = true;
    span.addEventListener("click", toggleHighlight);
    span.addEventListener("dragstart", handleDragStart);
    span.addEventListener("dragend", handleDragEnd);
    output.appendChild(span);
  });
};

document.querySelector(".button").addEventListener("click", displayText);
document
  .querySelector(".output")
  .addEventListener("dragover", (event) => event.preventDefault());

let selectedItem = [];
let isSelecting = false;
let selectionBox = null;
let startX = 0;
let startY = 0;

const toggleHighlight = (event) => {
  const target = event.target;

  if (event.ctrlKey) {
    target.classList.toggle("highlight");

    if (target.classList.contains("highlight")) {
      selectedItem.push(target);
    } else {
      selectedItem = selectedItem.filter((item) => item !== target);
    }
  } else {
    document.querySelectorAll(".highlight").forEach((item) => {
      item.classList.remove("highlight");
    });

    target.classList.add("highlight");
    selectedItem = [target];
  }
};

const hightlightAll = () => {
  const output = document.querySelector(".output");
  output.querySelectorAll(".draggable").forEach((item) => {
    item.classList.add("highlight");
  });

  console.log(selectedItem);
};

let dragged;
let isDragging = false;

const handleDragStart = (event) => {
  dragged = event.target;
  isDragging = true;
};

document
  .querySelector(".output")
  .addEventListener("dragstart", handleDragStart);

const handleDragEnd = (event) => {
  event.preventDefault();
};

const handleDrop = (event) => {
  event.preventDefault();
  if (event.target.classList.contains("draggable") && isDragging) {
    selectedItem.forEach((element) => {
      event.target.parentElement.insertBefore(
        element,
        event.target.nextSibling
      );
    });
    selectedItem.forEach((element) => {
      element.style.visibility = "visible";
    });
    isDragging = false;
  }
};

document.querySelector(".output").addEventListener("drop", handleDrop);
