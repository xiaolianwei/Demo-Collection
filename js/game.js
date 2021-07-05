var gameStart = {
  data: {
    otdArr: [],
    objLei: {},
    maxH: null,
    minL: null,
    oTable: null,
    gSecond: null,
    gMinute: null,
    gNumL: null,
    oMantle: null,
    timeId: null,
    oWinMantle: null,
  },
  init(numL) {
    this.initData();
    this.Time(numL);
  },
  initData() {
    const otr = document.getElementsByTagName('tr');
    const oTable = document.getElementsByTagName('table')[0];
    const gSecond = document.getElementById('second');
    const gMinute = document.getElementById('minute');
    const oMantle = document.getElementsByClassName('Mantle')[0];
    const oWinMantle = document.getElementsByClassName('WinMantle')[0];
    const gNumL = document.getElementById('numL');
    let otd;
    for (let i = 0; i < otr.length; i++) {
      this.data.otdArr.push([]);
      otd = otr[i].getElementsByTagName('td');
      for (let j = 0; j < otd.length; j++) {
        this.data.otdArr[i].push(otd[j]);
        otd[j].setAttribute('index', `${i},${j}`);
      }
    }
    this.data.oTable = oTable;
    this.data.maxH = this.data.otdArr.length;
    this.data.minL = this.data.otdArr[0].length;
    this.data.gSecond = gSecond;
    this.data.gMinute = gMinute;
    this.data.oMantle = oMantle;
    this.data.gNumL = gNumL;
    this.data.oWinMantle = oWinMantle;
  },
  generateL(obj) {
    const oArr = obj.otdArr;
    const { maxH } = obj;
    const { minL } = obj;
    const x = Math.floor(Math.random() * maxH);
    const y = Math.floor(Math.random() * minL);
    const _this = oArr[x][y];
    const str = `${x}${y}`;
    // console.log(maxH,minL)
    if (!obj.objLei[str]) {
      obj.objLei[str] = 1;
      _this.setAttribute('value', 'NaN');
      // _this.innerText =  _this.getAttribute('value');
      // _this.className = 'iconfont icon-saoleix';
      _this.classList.add('iconfont', 'icon-saoleix');
      for (let i = -1; i < 2; i++) {
        const $x = x + i;
        for (let j = -1; j < 2; j++) {
          const $y = y + j;
          if ($x > -1 && $x <= maxH - 1 && $y > -1 && $y <= minL - 1) {
            const num = Number(oArr[$x][$y].getAttribute('value')) + 1;
            oArr[$x][$y].setAttribute('value', num);
            // oArr[$x][$y].innerText = oArr[$x][$y].getAttribute('value');
          }
        }
      }
    } else {
      this.generateL(this.data);
    }
  },
  Time(numL) {
    const self = this;
    let count = 0;
    var timeid = setInterval(() => {
      if (count < numL) {
        self.generateL(self.data);
      } else {
        // console.log(self.data.gNumL)
        self.data.gNumL.innerText = numL;
        self.clickEvent(self.data);
        clearInterval(timeid);
      }
      count++;
    }, 1);
  },
  gameTime() {
    const { gSecond } = this.data;
    const { gMinute } = this.data;
    let minute = 0;
    let second = 0;
    let strM;
    let strS;
    this.data.timeId = setInterval(() => {
      second++;
      strS = second < 10 ? `0${second}` : second;
      gSecond.innerText = strS;
      if (second === 60) {
        minute++;
        strM = minute < 10 ? `0${minute}` : minute;
        gMinute.innerText = strM;
        second = 0;
      }
    }, 1000);
  },
  clickEvent(obj) {
    const oTab = obj.oTable;
    const { otdArr } = obj;
    let gemaTimeKey = true;
    otdArr.forEach((value, index) => {
      const x = index;
      value.forEach((value, index) => {
        // var odiv = value.childNodes[1];
        const y = index;
        (function () {
          let num = 0;
          value.oncontextmenu = function (event) {
            const e = event || window.event;
            const targetValue = e.target.nodeName;
            ospan = document.createElement('span'),
            odiv = document.createElement('div'),
            valueChild = this.childNodes[1],
            gNumL = Number(obj.gNumL.innerText);
            if (targetValue == 'DIV' || targetValue == 'SPAN') {
              if (gemaTimeKey) {
                gameStart.gameTime();
                gemaTimeKey = false;
              }
              num++;
              if (num === 1) {
                ospan.classList.add('plate1', 'iconfont', 'icon-hongqi');
                this.replaceChild(ospan, valueChild);
                gNumL--;
                obj.gNumL.innerText = gNumL;
              } else if (num === 2) {
                ospan.classList.add('plate2', 'iconfont', 'icon-wenhao');
                this.replaceChild(ospan, valueChild);
                gNumL++;
                obj.gNumL.innerText = gNumL;
                num = -1;
              } else {
                odiv.classList.add('plate');
                this.replaceChild(odiv, valueChild);
              }
            }
            e.preventDefault();
          };
        }());
      });
    });
    oTab.onclick = (function (obj) {
      const total = obj.maxH * obj.minL - Number(obj.gNumL.innerHTML);
      let clickNum = 0;
      let zuobiKey = true;
      return function (event) {
        if (gemaTimeKey) {
          gameStart.gameTime();
          gemaTimeKey = false;
        }
        if (zuobiKey) {
          zuobi();
          zuobiKey = false;
        }
        const e = event || window.event;
        const { target } = e;
        const targetValue = target.parentNode.getAttribute('value');
        const targetName = target.nodeName;
        const { maxH } = obj;
        const { minL } = obj;
        if (targetName == 'DIV') {
          if (targetValue == 'NaN') {
            target.parentNode.style.backgroundColor = 'red';
            // target.parentNode.classList.add('iconfont','icon-saoleix');
            target.parentNode.innerHTML = '';
            obj.otdArr.forEach((value) => {
              value.forEach((value) => {
                const lei = value.getAttribute('value');
                if (lei === 'NaN') {
                  value.style.backgroundColor = 'red';
                  value.innerHTML = '';
                }
              });
            });
            clearInterval(obj.timeId);
            setTimeout(() => {
              obj.oMantle.style.display = 'inline-block';
            }, 200);
          } else if (targetValue == '0') {
            const str = target.parentNode.getAttribute('index');
            const indexArr = str.split(',');
            const x = Number(indexArr[0]);
            const y = Number(indexArr[1]);
            target.parentNode.style.backgroundColor = '#fff';
            // console.log(indexArr)
            target.parentNode.innerHTML = '';
            // console.log(x,y);
            for (let i = -1; i < 2; i++) {
              const $x = x + i;
              // console.log($x)
              for (let j = -1; j < 2; j++) {
                const $y = y + j;
                if ($x > -1 && $x <= maxH - 1 && $y > -1 && $y <= minL - 1) {
                  if (obj.otdArr[$x][$y].childNodes[1]) {
                    obj.otdArr[$x][$y].childNodes[1].click();
                  }
                }
              }
            }
            clickNum++;
          } else {
            target.parentNode.style.backgroundColor = '#fff';
            switch (targetValue) {
              case '1': target.parentNode.style.color = '#34AABD';
                break;
              case '2': target.parentNode.style.color = '#94BA08';
                break;
              case '3': target.parentNode.style.color = '#58C439';
                break;
              case '4': target.parentNode.style.color = '#AE55BD';
                break;
              case '5': target.parentNode.style.color = '#f5cd87';
                break;
              case '6': target.parentNode.style.color = '#0f0';
                break;
              case '7': target.parentNode.style.color = '#8B59BD';
                break;
              case '8': target.parentNode.style.color = '#ce2010';
                break;
            }
            target.parentNode.innerText = targetValue;
            clickNum++;
            if (clickNum === total) {
              clearInterval(obj.timeId);
              setTimeout(() => {
                obj.oWinMantle.style.display = 'inline-block';
              }, 200);
            }
          }
        }
      };
    }(obj));
  },
};
// 随机开头动画延迟
function randomAnim() {
  const { otdArr } = gameStart.data;
  const x = otdArr.length;
  const y = otdArr[0].length;
  const num = parseInt(x * y / 5);
  let str = '';
  const obj = {};
  for (let i = 1; i <= 4; i++) {
    for (let j = 0; j < num; j++) {
      const $x = Math.floor(Math.random() * x);
      const $y = Math.floor(Math.random() * y);
      str = `${$x},${$y}`;
      if (!obj[str]) {
        obj[str] = 1;
        otdArr[$x][$y].classList.add(`item${i}`);
      }
    }
  }
}
// 作弊方式
function zuobi() {
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;
    const { key } = e;
    const arr = gameStart.data.otdArr;
    if (key === 'Alt') {
      arr.forEach((value) => {
        value.forEach((value) => {
          const L = value.getAttribute('value');
          const valueChild = value.childNodes[1];
          if (L === 'NaN') {
            e.preventDefault();
            valueChild.style.opacity = '0.5';
          }
        });
      });
    }
  }, false);
  document.addEventListener('keyup', (event) => {
    const e = event || window.event;
    const { key } = e;
    const arr = gameStart.data.otdArr;
    if (key === 'Alt') {
      arr.forEach((value) => {
        value.forEach((value) => {
          const L = value.getAttribute('value');
          const valueChild = value.childNodes[1];
          if (L === 'NaN') {
            e.preventDefault();
            valueChild.style.opacity = '1';
          }
        });
      });
    }
  }, false);
}
