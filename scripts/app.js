import { generatePassword } from "./generatePassword.js";

document.addEventListener("DOMContentLoaded", () => {
  const passwordOutput = document.getElementById("password-output");
  const copyTrigger = document.getElementById("copy-trigger");

  const lengthValue = document.getElementById("length-value");

  const lengthSlider = document.getElementById("length-slider");

  const passwordGenerationTrigger = document.getElementById(
    "password-generation-trigger"
  );

  const ul = document.querySelector("ul");

  function setPassword(password) {
    passwordOutput.value = password;
  }

  function setLength() {
    lengthValue.textContent = lengthSlider.value;
  }

  setLength();

  function getLength() {
    return Number(lengthSlider.value);
  }

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

  function afterCopyAction() {
    const icon = copyTrigger.querySelector("i");

    icon.classList.remove("fa-regular", "fa-copy");
    icon.classList.add("fa-solid", "fa-check");

    setTimeout(() => {
      icon.classList.remove("fa-solid", "fa-check");
      icon.classList.add("fa-regular", "fa-copy");
    }, 1000);
  }

  copyTrigger.addEventListener("click", async (ev) => {
    if (!passwordOutput.value) {
      return;
    }

    await navigator.clipboard.writeText(passwordOutput.value);

    afterCopyAction();
  });

  lengthSlider.addEventListener("input", setLength);
  lengthSlider.addEventListener("input", generateAndSetNewPassword);

  ul.addEventListener("change", (ev) => {
    if (!ev.target.matches('input[type="checkbox"]')) return;

    generateAndSetNewPassword();
  });
});
