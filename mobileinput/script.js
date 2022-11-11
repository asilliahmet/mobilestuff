let input = document.querySelector("input");
input.addEventListener("input", x => getkey(x));
let para = document.querySelector("#log");

function getkey(x) {
  console.log(x);
  para.innerText = `${x.data}|${x.inputType}|${input.value}|${input.value[1]}`
}
