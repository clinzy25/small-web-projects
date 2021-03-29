var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var css = document.querySelector("h3");
var body = document.getElementById("gradient");
var random = document.getElementById("random");

/**
 * Set background colors and display css property on screen
 */
function setGradient() {
  body.style.background = `linear-gradient(to right, ${color1.value}, ${color2.value})`;
  css.textContent = body.style.background + ";";
}

function randomGenerator() {
  return Math.floor(100000 + Math.random() * 900000);
}

function randomGradient() {
  body.style.background = `linear-gradient(to right, #${randomGenerator()}, #${randomGenerator()})`;
}

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

random.addEventListener("click", randomGradient);
