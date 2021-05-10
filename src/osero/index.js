import { Game } from "./game";

const init = () => {
  const game = new Game();
  game.drawer.canvas.addEventListener("click", (e) => {
    const location = game.drawer.getLocation(e);
    game.put(location);
  });
};

window.onload = init;
