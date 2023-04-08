document.addEventListener("touchstart", evt => handleTouchStart(evt));
document.addEventListener("touchend", evt =>  handleTouchEnd(evt));
document.addEventListener("touchmove", evt => handleTouchMove(evt));

// let pees = document.querySelectorAll("p");

let catalouge_container = document.querySelector(".catalouge-container");
let width = document.querySelector("body").offsetWidth;
let midpoint = document.querySelector("#midpoint");
let toolbox_div = document.querySelector(".toolbox");
let toolbox_input = document.querySelector(".toolbox input");
toolbox_input.value = "1";
let imgs;
let activepage = 0;

toolbox_input.addEventListener("focusout", manualPage);

let touchpoints = {
  posx0: -1,
  timestamp0: -1,
  posx1: -1,
  timestamp1: -1,
};

function manualPage() {
  if (!imgsrc[toolbox_input.value-1]) {
    toolbox_input.value = activepage+1;
    return;
  }
  activepage = toolbox_input.value -1;
  for (all of imgs){
    all.style.left = "0px";
  }
  for (i=0; i<activepage; i++){
    imgs[99-i].style.left = `${-width}px`;
  }
  loadPage();
}

function turnPage(index) {
  console.log(arguments[2]);
  if (activepage+index<0 || activepage+index>imgsrc.length-1){
    putPage(imgs[99-activepage], 0);
    return;
  }
  if (index>0){
    putPage(imgs[99-activepage], -width);
    activepage++;
  }
  if (index<0){
    putPage(imgs[99-activepage], 0);
    putPage(imgs[100-activepage], 0);
    activepage--;
  }
  toolbox_input.value = activepage+1;
  loadPage(activepage);
}

function loadPage() {
  // totalpage used below
  for (i=0; imgs[i]; i++){
    if (absVal(activepage-i)<2){
      if (imgs[99-i].src != imgsrc[i]) imgs[99-i].src = imgsrc[i];
      continue;
    }
    imgs[99-i].src = "";
  }
}

function pageMaker() {
  for (i=0; imgsrc[i]; i++){
    let img = document.createElement("img");
    catalouge_container.appendChild(img);
  }
  imgs = document.querySelectorAll(".catalouge-container img")
  pagePositioner();
}

function pagePositioner() {
  for (all of imgs){
    all.style.width = `${min(width*95/100, 700)}px`;
    // all.style.top = `${midpoint.offsetTop - width*95/200}px`;
    // all.style.left = `${midpoint.offsetLeft - width*95/200}px`;
  }
  catalouge_container.style.width = `${min(width*95/100, 700)}px`;
  catalouge_container.style.height = `${min(width*95/100, 700)}px`;
  catalouge_container.style.top = `${midpoint.offsetTop - min(width*95/100, 700)/2}px`;
  catalouge_container.style.left = `${midpoint.offsetLeft - min(width*95/100, 700)/2}px`;
  toolbox_div.style.top = `${midpoint.offsetTop + (min(width*95/100, 700)/2)*1721/1950}px`;
  loadPage();
}

function handleTouchStart(event) {
  // pees[0].style.color = "red";
  // pees[1].style.color = "black";
  touchpoints.posx0 = event.touches[0].clientX;
  touchpoints.timestamp0 = event.timeStamp;
  if (event.touches[1]) touchpoints.posx0 = -1;
}

function handleTouchEnd(event) {
  let x = touchpoints.posx1 - touchpoints.posx0;
  let t = touchpoints.timestamp1 - touchpoints.timestamp0;
  if (touchpoints.posx1 == -1 || touchpoints.posx0 == -1) return;
  // pees[1].style.color = "red";
  // pees[0].style.color = "black";
  // pees[2].textContent = `V = ${x/t}`;
  // pees[3].textContent = `X = ${x}`;
  if (absVal(x)>width/2 || absVal(x/t)>0.5)
    turnPage(-x/absVal(x));
  else putPage(imgs[99-activepage], 0);
  touchpoints.posx0 = -1;
  touchpoints.posx1 = -1;
  touchpoints.timestamp1 = -1;
  touchpoints.timestamp0 = -1;
}

function handleTouchMove(event) {
  touchpoints.posx1 = event.touches[0].clientX;
  touchpoints.timestamp1 = event.timeStamp;
  if (event.target.parentElement == catalouge_container){
    movePage(event.target);
  }
}

function movePage(target) {
  target.style.left = `${-touchpoints.posx0 + touchpoints.posx1}px`;
}

function putPage(target, posx) {
  let currentposx = +(target.style.left.slice(0,-2));
  let percunit = (posx - currentposx)/100;
  let framecount = 10;
  let i=0;
  let mover = setInterval(() => {
    target.style.left = `${currentposx + percunit*returnLeft(i)}px`;
    i++;
    if (i>framecount) clearInterval(mover);
  }, 10);
}

function returnLeft(x) {
  return Math.sqrt(10*x)*10;
}

function min(...args) {
  let result = +Infinity;
  for (i=0; i<args.length; i++){
    if (result>args[i]) result=args[i];
  }
  return result;
}

function absVal(val) {
  if (val<0) return -val;
  return val;
}

pageMaker();
