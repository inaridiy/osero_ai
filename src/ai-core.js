import { Field } from "./osero/field";
import { deepCopy } from "./osero/deep-copy";

export class AI {
  constructor(color, weight) {
    this.color = color;

    this.weight = weight || [
      [2500, 767, 607, 642, 642, 607, 767, 2500],
      [767, 344, 284, 103, 103, 284, 344, 767],
      [607, 284, 114, 182, 182, 114, 284, 607],
      [642, 103, 182, 202, 202, 182, 103, 642],
      [642, 103, 182, 202, 202, 182, 103, 642],
      [607, 284, 114, 182, 182, 114, 284, 607],
      [767, 344, 284, 103, 103, 284, 344, 767],
      [2500, 767, 607, 642, 642, 607, 767, 2500],
    ];
  }

  searchThree(field, depth = 4) {
    let Three = [{ field: field, history: [] }];
    for (let i = 0; i < depth; i++) {
      Three = this.searchBranch(Three, this.color * (-1) ** i);
    }
    return;
  }

  searchBranch(branchs, color) {
    const newBranchs = branchs
      .map((branch) => {
        const branchLeaf = this.searchLeafs(branch.field, color).map((leaf) => {
          return {
            field: leaf.field,
            history: [...branch.history, { x: leaf.x, y: leaf.y }],
          };
        });
        return branchLeaf;
      })
      .flat();

    return newBranchs;
  }

  searchLeafs(field, color) {
    const logic = new Field();
    logic.field = deepCopy(field);

    const backup = deepCopy(logic.field);
    const list = [];

    logic.field.forEach((line, x) => {
      line.forEach((cell, y) => {
        if (!cell) {
          const count = logic.canPut({ x, y }, color);
          if (count) {
            list.push({ field: deepCopy(logic.field), x, y });
          }
          logic.field = deepCopy(backup);
        }
      });
    });
    return list;
  }

  evaluate(field) {
    const fieldScore = field.reduce((score, line, x) => {
      const lineScore = line.reduce((linescore, cell, y) => {
        const thisWeight = this.weight[x][y];
        const thisScore =
          cell === 0 ? 0 : this.color === cell ? thisWeight : thisWeight * -1;
        return linescore + thisScore;
      });

      return score + lineScore;
    }, 0);

    return fieldScore;
  }
}
