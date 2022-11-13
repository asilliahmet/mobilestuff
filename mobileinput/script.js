let input = document.querySelector("input");
input.addEventListener("input", x => getkey(x));
let para = document.querySelector("#log");
let para2 = document.querySelector("#log2");
let fcs = document.querySelector("#focus");
fcs.addEventListener("click", x => clickhandler(x));

function getkey() {
  para.innerText += `|${input.value}|`
  para2.innerText += `|${input.value[input.value.length-1]}`
}

function iclear() {
  input.value = "";
  input.focus();
}

function clickhandler(...ar) {
  input.focus();
}
