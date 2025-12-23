export function attachLongPress(button, handler, pause = 500, delay = 50) {
  let timeoutID = null;
  let intervalID = null;

  const begin = () => {
    handler();

    timeoutID = setTimeout(() => {
      intervalID = setInterval(() => {
        if (button.disabled) {
          end();

          return;
        }
        handler();
      }, delay);
    }, pause);
  };

  const end = () => {
    clearTimeout(timeoutID);

    clearInterval(intervalID);
  };

  button.addEventListener("pointerdown", begin);

  button.addEventListener("pointerup", end);
  button.addEventListener("pointerleave", end);
  button.addEventListener("pointercancel", end);

  button.addEventListener("contextmenu", (event) => event.preventDefault());
}
