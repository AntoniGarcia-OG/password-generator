import { attachLongPress } from "./helpers/attachLongPress.js";

import { generatePassword } from "./generatePassword.js";

document.addEventListener("DOMContentLoaded", () => {
  const passwordOutput = document.getElementById("password-output");
  const copyTrigger = document.getElementById("copy-trigger");

  const lengthValue = document.getElementById("length-value");

  const lengthSlider = document.getElementById("length-slider");

  const decrementTrigger = document.getElementById("decrement-trigger");
  const incrementTrigger = document.getElementById("increment-trigger");

  const ul = document.querySelector("ul");

  function setPassword(password) {
    passwordOutput.value = password;
  }

  function afterCopyAction() {
    const icon = copyTrigger.querySelector("i");

    icon.classList.remove("fa-regular", "fa-copy");
    icon.classList.add("fa-solid", "fa-check");

    setTimeout(() => {
      icon.classList.remove("fa-solid", "fa-check");
      icon.classList.add("fa-regular", "fa-copy");
    }, 1000);
  }

  function setLength() {
    lengthValue.textContent = lengthSlider.value;
  }

  setLength();

  function getLength() {
    return Number(lengthSlider.value);
  }

  const decrement = () => {
    lengthSlider.value = Math.max(
      lengthSlider.min,
      Number(lengthSlider.value) - Number(lengthSlider.step)
    );

    lengthSlider.dispatchEvent(new Event("input"));
  };

  const increment = () => {
    lengthSlider.value = Math.min(
      lengthSlider.max,
      Number(lengthSlider.value) + Number(lengthSlider.step)
    );

    lengthSlider.dispatchEvent(new Event("input"));
  };

  function protectLengthSlider() {
    const min = Number(lengthSlider.min);
    const max = Number(lengthSlider.max);

    const value = Number(lengthSlider.value);

    decrementTrigger.disabled = value <= min;
    incrementTrigger.disabled = value >= max;
  }

  protectLengthSlider();

  const options = ["lowercase", "uppercase", "numeric", "special"];

  function getOptions() {
    return options.reduce((options, currentValue) => {
      options[currentValue] = document.getElementById(currentValue).checked;

      return options;
    }, {});
  }

  const generateAndSetNewPassword = () => {
    const password = generatePassword(getLength(), getOptions());

    setPassword(password);
  };

  generateAndSetNewPassword();

  copyTrigger.addEventListener("click", async (ev) => {
    if (!passwordOutput.value) {
      return;
    }

    await navigator.clipboard.writeText(passwordOutput.value);

    afterCopyAction();
  });

  lengthSlider.addEventListener("input", setLength);

  lengthSlider.addEventListener("input", protectLengthSlider);
  lengthSlider.addEventListener("input", generateAndSetNewPassword);

  attachLongPress(decrementTrigger, decrement);
  attachLongPress(incrementTrigger, increment);

  ul.addEventListener("change", (ev) => {
    if (!ev.target.matches('input[type="checkbox"]')) return;

    generateAndSetNewPassword();
  });
});
