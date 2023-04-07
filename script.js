document.addEventListener("touchstart", evt => handleTouchStart(evt));
document.addEventListener("touchend", evt =>  handleTouchEnd(evt));
document.addEventListener("touchmove", evt => handleTouchMove(evt));

let pees = document.querySelectorAll("p");

let touchpoints = {
  posx0: 0,
  timestamp0: 0,
  posx1: 0,
  timestamp1: 0,
};

function handleTouchStart(event) {
  pees[0].style.color = "red";
  pees[1].style.color = "black";
  // console.log(event.timeStamp);
  touchpoints.posx0 = event.touches[0].clientX;
  touchpoints.timestamp0 = event.timeStamp;
}

function handleTouchEnd(event) {
  pees[1].style.color = "red";
  pees[0].style.color = "black";
  let x = touchpoints.posx1 - touchpoints.posx0;
  let t = touchpoints.timestamp1 - touchpoints.timestamp0;
  pees[2].textContent = `V = ${x/t}`;
  pees[3].textContent = `X = ${x}`;
}

function handleTouchMove(event) {
  console.log(event.touches[0].clientX);
  console.log(event.timeStamp);
  touchpoints.posx1 = event.touches[0].clientX;
  touchpoints.timestamp1 = event.timeStamp;
}
