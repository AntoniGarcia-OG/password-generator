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

  button.addEventListener("mousedown", begin);
  button.addEventListener("touchstart", function (event) {
    event.preventDefault();

    begin();
  });

  button.addEventListener("mouseup", end);
  button.addEventListener("mouseleave", end);
  button.addEventListener("touchend", end);
  button.addEventListener("touchcancel", end);
}
