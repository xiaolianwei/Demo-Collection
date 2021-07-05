const Game_start = {
  data: {
    oGameBox: null,
    oF_max: null,
    oF: null,
    over: null,
    oF_max_Num: 0,
    oF_Num: 0,
    snakeArr: [],
    indexObj: {},
    oFood: null,
  },
  resetData(max) {
    this.data = this.initData();
    this.data.oF_max_Num = max || 0;
    this.data.oF_Num = 0;
    this.data.snakeArr = [];
    this.data.indexObj = {};
    this.data.oFood = null;
  },
  init(max) {
    this.resetData(max);
    this.start(this.data);
    this.food(this.data);
  },
  initData() {
    const oGameBox = document.getElementById('Game');
    const oF_max = document.getElementById('fraction');
    const oF = document.getElementById('current_fraction');
    const over = document.getElementById('over');
    return {
      oGameBox,
      oF_max,
      oF,
      over,
    };
  },
  createSnake(i) {
    const oSpan = document.createElement('span');
    let left;
    let top;
    oSpan.classList.add('snake');
    oSpan.setAttribute('index', i);
    left = Number(i.split(',')[0]);
    top = Number(i.split(',')[1]);
    oSpan.style.top = `${top * 15}px`;
    oSpan.style.left = `${left * 15}px`;
    this.data.oGameBox.appendChild(oSpan);
    this.data.snakeArr.push(oSpan);
    this.data.indexObj[i] = true;
    return oSpan;
  },
  start(data) {
    for (let i = 0; i < 3; i++) {
      const index = `${20 - i},15`;
      const dom = this.createSnake(index);
      if (i === 0) dom.classList.add('head');
    }
    this.motion(data);
  },
  motion(data) {
    const oArr = data.snakeArr;
    let timeId;
    let directionX = 15;
    let directionY = 0;
    let left;
    let top;
    let index;
    let lastIndex;
    const _this = this;
    let speed = 100;
    timeId = setInterval(() => {
      timeFn();
    }, 100);
    function timeFn() {
      const directionLeft = directionX;
      const directionTop = directionY;
      oArr.forEach((value, i) => {
        if (i === 0) {
          left = parseInt(getComputedStyle(value).left),
          top = parseInt(getComputedStyle(value).top);
          index = value.getAttribute('index');
          const str = index.split(',');
          if (directionLeft) {
            value.style.left = `${left + directionLeft}px`;
            directionLeft > 0 ? str[0]++ : str[0]--;
            str.join(',');
            value.setAttribute('index', str);
          } else {
            value.style.top = `${top + directionTop}px`;
            directionTop > 0 ? str[1]++ : str[1]--;
            str.join(',');
            value.setAttribute('index', str);
          }
          data.indexObj[value.getAttribute('index')] = true;
        } else {
          lastIndex = value.getAttribute('index');
          const x = Number(index.split(',')[0]);
          const y = Number(index.split(',')[1]);
          value.style.left = `${x * 15}px`;
          value.style.top = `${y * 15}px`;
          value.setAttribute('index', index);
          index = lastIndex;
        }
      });
      delete data.indexObj[lastIndex];
      (function () {
        const foodIndex = data.oFood.getAttribute('index');
        const headIndex = data.snakeArr[0].getAttribute('index');
        x = Number((headIndex.split(','))[0]),
        y = Number((headIndex.split(','))[1]),
        indexArr = [];
        for (const prop in data.indexObj) indexArr.push(prop);
        if (foodIndex == headIndex) {
          data.oFood.parentNode.removeChild(data.oFood);
          _this.food(data);
          _this.createSnake(lastIndex);
          data.oF.innerText = ++data.oF_Num;
          if (data.snakeArr.length % 5 == 0) {
            speed -= 10;
            clearInterval(timeId);
            timeId = setInterval(() => {
              timeFn();
            }, speed);
          }
        }
        if (x > 79 || x < 0 || y > 39 || y < 0 || indexArr.lastIndexOf(headIndex, indexArr.length - 2) !== -1) {
          clearInterval(timeId);
          data.over.style.display = 'inline-block';
          getComputedStyle(data.over).opacity;
          data.over.style.opacity = '1';
          if (data.oF_Num > data.oF_max_Num) {
            data.oF_max.innerText = data.oF_Num;
          }
        }
      }());
    }
    document.addEventListener('keydown', (e) => {
      e = e || window.event;
      if (directionX) {
        if (e.keyCode === 38 || e.keyCode === 87) {
          directionY = -15;
          directionX = 0;
        } else if (e.keyCode === 40 || e.keyCode === 83) {
          directionY = 15;
          directionX = 0;
        }
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        directionY = 0;
        directionX = -15;
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        directionY = 0;
        directionX = 15;
      }
    }, false);
  },
  food(data) {
    function createFood() {
      const oF = document.createElement('span');
      const x = Math.floor(Math.random() * 80);
      const y = Math.floor(Math.random() * 40);
      const str = `${x},${y}`;
      oF.classList.add('food');
      if (!data.indexObj[str]) {
        oF.setAttribute('index', str);
        oF.style.left = `${x * 15}px`;
        oF.style.top = `${y * 15}px`;
        data.oFood = oF;
        data.oGameBox.appendChild(oF);
      } else { createFood(); }
    }
    createFood();
  },
};
