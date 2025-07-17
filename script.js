const navbarToggle = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");

navbarToggle.addEventListener("click", () => {
  navbarToggle.classList.toggle("active");
  navbarMenu.classList.toggle("active");
});

// calculator
let display = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let buttonsArray = Array.from(buttons);
let string = "";

function adjustFontSize() {
  const maxFontSize = 65; // Maximum font size
  const minFontSize = 20; // Minimum font size
  const inputWidth = display.offsetWidth;
  const textWidth = display.scrollWidth;

  if (textWidth > inputWidth) {
    let newFontSize = Math.max(
      minFontSize,
      (inputWidth / textWidth) * maxFontSize
    );
    display.style.fontSize = `${newFontSize}px`;
  } else {
    display.style.fontSize = `${maxFontSize}px`;
  }
}

function handleInput(input) {
  const validInputs = "0123456789+-*/.%=ACDEL"; // Define valid inputs for the calculator
  if (!validInputs.includes(input)) {
    return; // Ignore invalid inputs
  }

  if (input === "DEL") {
    string = string.substring(0, string.length - 1);
    display.value = string;
  } else if (input === "AC") {
    string = "";
    display.value = string;
  } else if (input === "=") {
    try {
      string = eval(string);
      display.value = string;
    } catch {
      display.value = "Error";
      string = "";
    }
  } else {
    string += input;
    display.value = string;
  }
  adjustFontSize(); // Adjust font size after every input
}

buttonsArray.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const button = e.target;

    // Ensure the button is part of the calculator
    if (!button.closest(".calculator")) {
      return;
    }

    // Add the 'clicked' class
    button.classList.add("clicked");

    // Remove the 'clicked' class after 200ms
    setTimeout(() => {
      button.classList.remove("clicked");
    }, 200);

    // Handle the input
    handleInput(button.innerHTML);
  });
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  const allowedKeys = "0123456789+-*/.%=";
  if (allowedKeys.includes(e.key)) {
    handleInput(e.key);
  } else if (e.key === "Backspace") {
    handleInput("DEL");
  } else if (e.key === "Enter") {
    handleInput("=");
  } else if (e.key === "Escape") {
    handleInput("AC");
  }
});

// for zooming effect

// Select the "Open Calculator" button
const openCalculatorButton = document.querySelector(".navbar-menu li a.active");

// Add a click event listener to the button
openCalculatorButton.addEventListener("click", (e) => {
  // Add the zoom-effect class to the button
  openCalculatorButton.classList.add("zoom-effect");

  // Remove the zoom-effect class after the animation ends
  setTimeout(() => {
    openCalculatorButton.classList.remove("zoom-effect");
  }, 500); // Match the duration of the animation (0.5s)
});

// for reloading the page each time ;

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
