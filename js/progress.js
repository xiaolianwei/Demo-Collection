(function (root) {
  class Progress {
    constructor() {
      this.durTime = 0; // 存储总时长
      this.startTime = 0;// 开始播放的时间
      this.frameId = null; // 定时器
      this.lastPercent = 0; // 暂停时已经走的百分比

      this.init();
    }

    init() {
      this.getDom();
    }

    getDom() {
      this.curTime = document.querySelector('.curTime');
      this.circle = document.querySelector('.circle');
      this.frontBg = document.querySelector('.frontBg');
      this.totalTime = document.querySelector('.totalTime');
    }

    renderAllTime(time) {
      this.durTime = time;
      time = this.formatTime(time);
      this.totalTime.innerText = time;
    }

    formatTime(time) {
      time = Math.round(time);

      const m = Math.floor(time / 60).toString().padStart(2, '0');
      const s = (time % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }

    move(per) {
      cancelAnimationFrame(this.frameId);
      this.startTime = new Date().getTime();
      this.lastPercent = per === undefined ? this.lastPercent : per;
      var frame = () => {
        const curTime = new Date().getTime();
        const per = this.lastPercent + (curTime - this.startTime) / (this.durTime * 1000);
        if (per <= 1) {
          this.update(per);
        } else {
          cancelAnimationFrame(this.frameId);
        }
        this.frameId = requestAnimationFrame(frame);
      };
      frame();
    }

    update(per) {
      const time = this.formatTime(per * this.durTime);
      this.curTime.innerText = time;
      this.frontBg.style.width = `${per * 100}%`;
      const l = per * this.circle.parentNode.offsetWidth;
      this.circle.style.transform = `translateX(${l}px)`;
    }

    stop() {
      cancelAnimationFrame(this.frameId);
      const stopTime = new Date().getTime();
      this.lastPercent += (stopTime - this.startTime) / (this.durTime * 1000);
    }
  }
  class Drag {
    constructor(obj) {
      this.obj = obj; // 要拖拽的DOM元素
      this.startPointX = 0; // 拖拽时按下的坐标的位置
      this.startLeft = 0; // 按下时已经走的距离
      this.percent = 0;
    }

    init() {
      const This = this;
      this.obj.style.transform = 'translateX(0)';
      this.obj.addEventListener('touchstart', function (ev) {
        This.startPointX = ev.changedTouches[0].pageX;
        This.startLeft = parseFloat(this.style.transform.split('(')[1]);
        This.start && This.start();
      });
      this.obj.addEventListener('touchmove', function (ev) {
        This.disPointX = ev.changedTouches[0].pageX - This.startPointX;
        let l = This.startLeft + This.disPointX;
        if (l < 0) {
          l = 0;
        } else if (l > this.offsetParent.offsetWidth) {
          l = this.offsetParent.offsetWidth;
        }
        this.style.transform = `translateX(${l}px)`;
        This.percent = l / this.offsetParent.offsetWidth;
        This.move && This.move(This.percent);
        ev.preventDefault();
      });
      this.obj.addEventListener('touchend', () => {
        This.end && This.end(This.percent);
      });
    }
  }

  root.progress = {
    pro() {
      return new Progress();
    },
    drag(obj) {
      return new Drag(obj);
    },
  };
}(window.player || (window.player = {})));
