class Poster{
  constructor(poster, initialPosX, initialPosY, currentPosX, currentPosY, offsetX, offsetY){
    this.poster = poster;
    this.initialPosX = initialPosX;
    this.initialPosY = initialPosY;
    this.currentPosX = currentPosX;
    this.currentPosY = currentPosY;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }
}



// Container where the element can move
var container = document.querySelector("#design-room-container");
// Element to move
var posterContainer = document.querySelector("#design-room-poster-container");
// Container button
var posterContainerBtn = document.querySelector("#container-btn");
// Poster array
var posters = posterContainer.querySelectorAll(".design-room-poster");

var activeDrag = false;
var activeDragElement;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

// Event listeners for touch
container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

// Event listeners for mouse
container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

// Change and style the active and non-active elements
function activatePoster(element){
  activeDragElement = element;

  posters.forEach(function(poster){
    poster.style.opacity = 1;
  });

  activeDragElement.style.opacity = 0.8;
}

// Set new initial position and activate drag when element is clicked
function dragStart(e) {
  e.preventDefault();

  // If target is the container
  if(e.target === posterContainerBtn){
    activeDragElement = posterContainer;
    activeDrag = true;

  // If target is a poster
  }else{ 
    posters.forEach(function(element){
      if (e.target === element) {
        activeDrag = true;
      
        if(e.target != activeDragElement){
          activatePoster(element);
        }
      }   
    });
  }

  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }
}

function drag(e) {
  if (activeDrag) {
    e.preventDefault();
    posterContainer.style.border = "2px dotted white";

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    posterContainer.style.opacity = 0.8;

    setTranslate(currentX, currentY, activeDragElement);
  }
}

// Set new initial position when pointer is released
function dragEnd(e) {
  e.preventDefault();

  initialX = currentX;
  initialY = currentY;

  activeDrag = false;
  posterContainer.style.opacity = 1;
  posterContainer.style.border = "2px dotted transparent";
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function addPoster(){
  var newPoster = document.createElement("div");
  newPoster.className = "design-room-poster";
  posterContainer.appendChild(newPoster);
  newPoster.classList.add("template");
  activeDragElement = newPoster;
  posters = posterContainer.querySelectorAll(".design-room-poster");

  changePoster();
  changeSize();
  changeBorder();
}

function removePoster(){
  posterContainer.removeChild(posters[posters.length - 1]);
  posters = posterContainer.querySelectorAll(".design-room-poster");
}

var changeRoom = function(){
  var roomBg = document.getElementById("design-room-container");
  var bgSelector = document.getElementById("backgrounds");

  if(bgSelector.value === "vardagsrum-1"){
    roomBg.style.backgroundImage = "url(images/room1.jpg)";
  }
  else if(bgSelector.value === "sovrum-1"){
    roomBg.style.backgroundImage = "url(images/room2.jpg)";
  }
  else if(bgSelector.value === "sovrum-2"){
    roomBg.style.backgroundImage = "url(images/room3.jpg)";
  }
}

var changePoster = function(){
  var posterSelector = document.getElementById("posters");

  if(posterSelector.value === "poster-1"){
    activeDragElement.style.backgroundImage = "url(images/img_1.jpg)";
  }
  else if(posterSelector.value === "poster-2"){
    activeDragElement.style.backgroundImage = "url(images/img_2.jpg)";
  }
  else if(posterSelector.value === "poster-3"){
    activeDragElement.style.backgroundImage = "url(images/img_3.jpg)";
  }

    activeDragElement.classList.remove("template");
}

var changeBorder = function(){
  var borderSelector = document.getElementById("borders")

  if(borderSelector.value === "border-1"){
    activeDragElement.style.border = "8px solid black";
  }
  else if(borderSelector.value === "border-2"){
    activeDragElement.style.border = "8px inset white";
  }
  else if(borderSelector.value === "border-3"){
    activeDragElement.style.border = "8px inset #a63";
  }
}

var changeSize = function(){
  var sizeSelector = document.getElementById("measurement")

  if(sizeSelector.value === "size-1"){
    activeDragElement.style.width = "120px";
    activeDragElement.style.height = "100px";
  }
  else if(sizeSelector.value === "size-2"){
    activeDragElement.style.width = "150px";
    activeDragElement.style.height = "180px";
  }
  else if(sizeSelector.value === "size-3"){
    activeDragElement.style.width = "190px";
    activeDragElement.style.height = "250px";
  }
}

let screenLog = document.querySelector('#debug');
document.addEventListener('mousemove', logKey);

function logKey(e) {
  screenLog.innerText = `
    Screen X/Y: ${e.screenX}, ${e.screenY}
    Client X/Y: ${e.clientX}, ${e.clientY}`;
}




changeRoom();
changePoster ();
changeBorder();
activeDragElement();

