(function (player) {
  class MusicPlayer {
    constructor(dom) {
      this.wrap = dom;
      this.dataList = [];
      this.indexObj = null;
      this.rotateTime = null;
      this.list = null;
      this.curIndex = 0;
      this.progress = player.progress.pro();
    }

    // 初始化
    init() {
      this.getDom(); // 获取元素
      this.getDate('../mock/data.json'); // 请求数据
    }

    // 获取页面里的元素
    getDom() {
      this.record = document.querySelector('.songImg img'); // 旋转图片
      this.controlBtns = document.querySelectorAll('.control li'); // 获取导航里的按钮
    }

    // 获取数据
    getDate(url) {
      fetch(url).then((reult) => reult.json()).then((data) => {
        this.dataList = data;
        this.listPlay();
        this.indexObj = new player.controlIndex(data.length);
        this.loadMusic(this.indexObj.index);
        this.musicControl();
        this.dragProgrss();
      }, (err) => {
        console.log('数据请求失败');
      });
    }

    //  加载音乐
    loadMusic(index) {
      player.render(this.dataList[index]); // 渲染图片及歌曲信息
      player.music.load(this.dataList[index].audioSrc); // 播放音乐（只有音乐的状态为play的时候才能播放）
      this.progress.renderAllTime(this.dataList[index].duration);
      if (player.music.status == 'play') {
        player.music.play();
        this.controlBtns[2].className = 'playing';
        this.imgRotate(0);
        this.progress.move(0);
      }
      this.curIndex = index;
      this.list.changeSelect(index);
      player.music.end(() => {
        this.loadMusic(this.indexObj.next());
      });
    }

    // 控制音乐
    musicControl() {
      // 上一首
      this.controlBtns[1].addEventListener('touchend', () => {
        player.music.status = 'play';

        this.loadMusic(this.indexObj.prev());
      });
      // 播放、暂停
      this.controlBtns[2].addEventListener('touchend', () => {
        const that = this.controlBtns[2];
        if (player.music.status == 'play') {
          player.music.pause();
          that.className = '';
          this.imgStop();
          this.progress.stop();
        } else {
          player.music.play();
          that.className = 'playing';
          const deg = this.record.dataset.rotate || 0;
          this.imgRotate(deg);
          this.progress.move();
        }
      });
      // 下一首
      this.controlBtns[3].addEventListener('touchend', () => {
        player.music.status = 'play';
        this.loadMusic(this.indexObj.next());
      });
    }

    // 旋转唱片
    imgRotate(deg) {
      clearInterval(this.rotateTime);
      this.rotateTime = setInterval(() => {
        deg = +deg + 0.2;
        this.record.style.transform = `rotate(${deg}deg)`;
        this.record.dataset.rotate = deg;
      }, 1000 / 60);
    }

    // 停止旋转唱片
    imgStop() {
      clearInterval(this.rotateTime);
    }

    // 列表切歌
    listPlay() {
      this.list = player.listControl(this.dataList, this.wrap);
      this.controlBtns[4].addEventListener('touchend', () => {
        this.list.slideUp();
      });
      this.list.musicList.forEach((item, index) => {
        item.addEventListener('touchend', () => {
          if (this.curIndex === index) {
            return;
          }
          player.music.status = 'play';
          this.curIndex = index;
          this.loadMusic(index);
          this.list.slideDown();
        });
      });
    }

    // 拖拽
    dragProgrss() {
      const circle = player.progress.drag(document.querySelector('.circle'));
      circle.init();
      // 按下圆点
      circle.start = () => {
        // console.log('starat');
        this.progress.stop();
      };
      // 拖拽圆点
      circle.move = (per) => {
        this.progress.update(per);
      };
      // 抬起圆点
      circle.end = (per) => {
        const cutTime = per * this.dataList[this.indexObj.index].duration;
        player.music.playTo(cutTime);
        player.music.play();

        this.progress.move(per);
        const deg = this.record.dataset.rotate || 0;
        this.imgRotate(deg);	// 旋转图片

        this.controlBtns[2].className = 'playing';	// 按钮状态变成播放状态
      };
    }
  }
  const musicPlayer = new MusicPlayer(document.getElementsByClassName('wrap')[0]);
  musicPlayer.init();
}(window.player));
