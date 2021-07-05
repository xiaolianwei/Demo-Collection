class Bird {
    // 开始游戏后鸟离左侧的距离
    static left = 80;

    constructor(dom) {
      this.dom = dom;
      this.width = dom.offsetWidth;
      this.height = dom.offsetHeight;
      // 鸟的下落速度
      this.iSeepY = 0;
      this.top = 220;
      // 设置开始游戏前鸟的上下运动
      this.initMover = function () {
        setTimeout(() => {
          this.dom.style.top = '260px';
        }, 0);
        this.dom.ontransitionend = () => {
          this.top = parseFloat(getComputedStyle(this.dom).top);
          this.dom.style.top = this.top === 260 ? '220px' : '260px';
        };
      };
      // 点击开始按钮后需要的初始化的一些东西
      this.state = function () {
        this.dom.style.transition = 'none';
        this.dom.ontransitionend = null;
        this.dom.style.left = `${Bird.left}px`;
        this.dom.style.top = `${this.top}px`;
      };
      // 开始游戏后鸟的运动，并进行边界检查
      this.mover = function () {
        this.top += ++this.iSeepY;
        const result = this.judgeBoundary();
        if (result) {
          return true;
        }
        this.dom.style.top = `${this.top}px`;
        return false;
      };
      // 停止鸟的扇翅膀
      this.stopFly = function () {
        this.dom.style.animationPlayState = 'paused';
      };
      // 进行边界检测
      this.judgeBoundary = function () {
        const maxTop = 600 - this.height;
        if (this.top <= 0 || this.top >= maxTop) {
          return true;
        }
        return false;
      };
    }
}
