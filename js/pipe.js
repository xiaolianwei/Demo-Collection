class Pipe {
    static wrap = document.querySelector('.pipes');

    // 管道的默认宽度
    static width = 52;

    // 管道的移动速度
    static speed = 5;

    constructor(left) {
      this.wrap = document.createElement('div');
      this.up = document.createElement('div');
      this.bottom = document.createElement('div');
      this.upHeight = this.randomHeight();
      this.bottomHeight = 600 - this.upHeight - 150;
      this.left = left;
    }

    // 控制管道的移动
    move() {
      this.left -= Pipe.speed;
      this.wrap.style.left = `${this.left}px`;
      if (this.left < -Pipe.width) {
        return true;
      }
      return false;
    }

    // 当管道移动到屏幕外时，把这跟管道放在所有管道的末尾，并重新随机一个高度
    reset(left) {
      this.left = left + 300;
      this.upHeight = this.randomHeight();
      this.bottomHeight = 600 - this.upHeight - 150;
      this.up.style.height = `${this.upHeight}px`;
      this.bottom.style.height = `${this.bottomHeight}px`;
    }

    // 创建管道
    create() {
      this.wrap.className = 'pipe';
      this.up.className = 'pipe-up';
      this.bottom.className = 'pipe-bottom';
      this.up.style.height = `${this.upHeight}px`;
      this.bottom.style.height = `${this.bottomHeight}px`;
      this.wrap.style.left = `${this.left}px`;

      this.wrap.appendChild(this.up);
      this.wrap.appendChild(this.bottom);

      Pipe.wrap.appendChild(this.wrap);
    }

    // 随机一个管道的高度，最大225最小50
    randomHeight() {
      const max = 225;
      const min = 50;
      return Math.floor(Math.random() * (max - min) + min);
    }
}
