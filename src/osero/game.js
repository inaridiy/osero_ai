import { Field } from "./field";
import { Drawer } from "./drawer";
import { deepCopy } from "./deep-copy";
import { AI } from "../ai-core";

export class Game extends Field {
  constructor() {
    super();
    this.drawer = new Drawer();
    this.init();
    this.turn = 1;
  }

  init() {
    this.field[3][3] = 1;
    this.field[3][4] = -1;
    this.field[4][3] = -1;
    this.field[4][4] = 1;
    this.drawer.draw(this.field);
  }

  put(location) {
    const { x, y } = location;
    if (this.field[x][y]) return;

    const backup = deepCopy(this.field);
    const putCount = this.canPut(location, this.turn);

    if (!putCount) {
      this.field = deepCopy(backup);
      return;
    }
    this.field[x][y] = this.turn;
    this.drawer.draw(this.field);

    this.changeTurn();
    const ai = new AI(this.turn);
    const hands = ai.searchThree(this.field);
  }

  changeTurn() {
    this.turn *= -1;
    const backup = deepCopy(this.field);

    let whiteCount = 0,
      blackCount = 0,
      putCount = 0;

    this.field.forEach((line, x) => {
      line.forEach((cell, y) => {
        switch (cell) {
          case 1:
            blackCount++;
            break;
          case -1:
            whiteCount++;
            break;
          case 0:
            putCount += this.canPut({ x, y }, this.turn);
            this.field = deepCopy(backup);
            break;
        }
      });
    });
    if (whiteCount + blackCount === 64 || !blackCount || !whiteCount) {
      const winner =
        whiteCount === blackCount
          ? "引き分けです"
          : whiteCount > blackCount
          ? "白の勝ちです"
          : "黒の勝ちです";
      const point = `${whiteCount}対${blackCount}で`;
      console.log(point + winner);
    }

    if (!putCount) {
      this.turn *= -1;
      const msg =
        this.turn === 1
          ? "黒が置けないので白のターンです"
          : "白が置けないので黒のターンです";
      console.log(msg);
    }
  }
}
