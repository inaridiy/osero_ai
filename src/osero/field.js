import { global } from "./const";
import { deepCopy } from "./deep-copy";
export class Field {
  constructor(field) {
    this.field = field || new Array(8).fill(0).map(() => new Array(8).fill(0));
    this.rotates = [
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
    ];
  }

  canPut(location, color) {
    let putCount = 0;
    this.rotates.map((rotate) => {
      const count = this.getTurnCount(location, rotate, color);
      putCount += count;
    });

    return putCount;
  }
  getTurnCount(location, rotate, color) {
    const { x, y } = location,
      [rotate_x, rotate_y] = rotate;
    const backup = deepCopy(this.field);
    let turn_count = 0,
      turn_flag = false;

    for (
      let check_x = x + rotate_x, check_y = y + rotate_y;
      check_x < global.size &&
      0 <= check_x &&
      check_y < global.size &&
      0 <= check_y;
      check_x += rotate_x, check_y += rotate_y
    ) {
      if (!this.field[check_x][check_y]) {
        break;
      } else if (this.field[check_x][check_y] === color) {
        turn_flag = true;
        break;
      } else {
        this.field[check_x][check_y] *= -1;
        turn_count++;
      }
    }

    if (turn_count) {
      if (!turn_flag) {
        this.field = deepCopy(backup);
        turn_count = 0;
      } else {
        this.field[x][y] = color;
      }
    }
    return turn_count;
  }
}
