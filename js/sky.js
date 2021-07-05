class Sky {
    // 定义填空的移动速度
    static speed = 5;

    constructor(dom) {
      this.dom = dom;
      this.skyPosition = 0;
      this.move = function () {
        this.skyPosition -= Sky.speed;
        this.dom.style.backgroundPositionX = `${this.skyPosition}px`;
      };
    }
}
