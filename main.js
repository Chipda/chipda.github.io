/*find references to all the buttons and ball */
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const resetBtn = document.querySelector("#resetBtn");
const ball = document.querySelector("#ball");
var ballX = ballY = 0; //assign initial position of ball
//functions to update variables to control ball position
function ResetPos() {
ballX=ballY=0; //reset to zero
UpdateBallStyle();
}
function MovePos(leftInc, topInc) {
ballX += leftInc;
ballY += topInc;
UpdateBallStyle();
}
//function to update ball css as well as display text
function UpdateBallStyle(){
ball.style.left = ballX+"px"; //set left property to ball x variable
ball.style.top = ballY+"px"; //set top property to ball x variable
ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
}


/*JS for hamMenu */
//get the "open menu" button (meant for hamIcon)
const hamBtn=document.querySelector("#hamIcon");
//connect hamBtn click to toggleMenus function
hamBtn.addEventListener("click",toggleMenus);
//get the menuItem list
const menuItemsList=document.querySelector("nav ul");
/*toggle, just like light switch, off becomes on, on becomes off*/
/*if menu is shown, hide it, if hidden, show it*/
function toggleMenus(){
  if(menuItemsList.classList.contains("menuShow")){
    hamBtn.innerHTML="Open Menu"; // showing means button should now say open
    menuItemsList.classList.remove("menuShow");
  } else {
    hamBtn.innerHTML="Close Menu";
    menuItemsList.classList.add("menuShow");
  }
}


//function just to move left (decrease left style)
function MoveLeft(){
MovePos(-10,0);
}
//eventlisteners to activate MovePos
leftBtn.addEventListener("click", MoveLeft);
//leftBtn.addEventListener("click", MoveLeft(-10,0)); //wrong
//cannot do like this. MoveLeft(-10,0) will execute immediately
//using anonymous function to pass in arguments from eventlistener
rightBtn.addEventListener("click", function () {
MovePos(+10, 0)
});
upBtn.addEventListener("click", function () {
MovePos(0, -10)
});
downBtn.addEventListener("click", function () {
MovePos(0, +10)
});
resetBtn.addEventListener("click", ResetPos);
document.addEventListener('keydown', (e) => {
console.log(e);
if (e.code === "ArrowRight"){
MovePos(10,0);
}
if (e.code === "ArrowLeft"){
MoveLeft();
}
if (e.code === "ArrowDown"){
MovePos(0, +10);
}
if (e.code === "ArrowUp"){
MovePos(0, -10);
}
//Need to inform user what keys to press. Better option: use switch case instead
});