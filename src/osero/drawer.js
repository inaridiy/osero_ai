import { drawerConst } from "./const";
import { global } from "./const";

export class Drawer {
  constructor() {
    this.canvas = document.getElementById("oseroCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = drawerConst.width;
    this.canvas.height = drawerConst.height;
    this.width = drawerConst.width;
    this.height = drawerConst.height;
    this.setField();
  }
  getLocation(e) {
    const rect = e.target.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / (this.width / global.size));
    const y = Math.floor((e.clientY - rect.top) / (this.height / global.size));
    return { x, y };
  }

  draw(field) {
    const cellSizeWidth = drawerConst.width / global.size,
      cellSizeHeight = drawerConst.height / global.size;

    this.setField();

    field.forEach((line, x) => {
      line.forEach((cell, y) => {
        if (!cell) return;

        this.ctx.fillStyle =
          drawerConst.colorList[cell] || drawerConst.colorList[2];

        this.ctx.beginPath();
        this.ctx.arc(
          cellSizeWidth * (0.5 + x),
          cellSizeHeight * (0.5 + y),
          drawerConst.cellSize,
          (0 * Math.PI) / 180,
          (360 * Math.PI) / 180,
          false
        );
        this.ctx.fill();
        this.ctx.closePath();
      });
    });
  }

  setField() {
    const cellSizeWidth = drawerConst.width / global.size,
      cellSizeHeight = drawerConst.height / global.size;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgb(0,128,0)";
    this.ctx.fillRect(0, 0, drawerConst.width, drawerConst.height);

    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    for (let i = 1; global.size > i; i++) {
      this.ctx.moveTo(cellSizeWidth * i, 0);
      this.ctx.lineTo(cellSizeWidth * i, drawerConst.height);
      this.ctx.moveTo(0, cellSizeHeight * i);
      this.ctx.lineTo(drawerConst.width, cellSizeHeight * i);
    }
    this.ctx.closePath();
    this.ctx.stroke();
  }
}
