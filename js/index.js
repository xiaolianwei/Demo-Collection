const oBird = document.querySelector('.bird');
const oScore = document.querySelector('.score');
const oEnd = document.querySelector('.end');
const oEndScore = document.querySelector('.end .end-score');
const oRankList = document.querySelector('.end .rank-list');
const oReset = document.querySelector('.end .reset');
const oStart = document.querySelector('.start');

const bird = new Bird(oBird);
const sky = new Sky(document.getElementById('game'));
// 定义页面上的所有管道并把他们都放在数组里
const pipeArr = new Array(7);
const pipeArrLength = pipeArr.length;
// 页面上最后一根管道的索引值
let pipeLastIndex = pipeArrLength - 1;
// 页面刷新后从sessionStorage里获取分数排名数组
let scoreArr = getStorage();
// 定义分数
let score = 0;

let timeId = null;
// 在开始界面就让小鸟上下动
bird.initMover();

window.onclick = function (e) {
  // 如果点击的是开始按钮
  if (e.target.classList.contains('start')) {
    e.target.classList.add('d-none');
    oScore.classList.remove('d-none');
    oScore.classList.add('d-block');
    bird.state();
    initPipe();
    // 控制小鸟、管道和天空的移动
    timeId = setInterval(() => {
      // 天空移动
      sky.move();
      // 让小鸟移动并检测小鸟是否撞到边界
      const result = bird.mover();
      // 小鸟要过去的那根管道
      const nextPipe = pipeArr[score % pipeArrLength];
      // 边界检测和管道碰撞检测
      if (result
                || (Bird.left + bird.width >= nextPipe.left && bird.top <= nextPipe.upHeight)
                || (Bird.left + bird.width >= nextPipe.left && bird.top + bird.height >= nextPipe.upHeight + 150)
      ) {
        over();
      }
      pipeArr.forEach((pipe) => {
        const isReset = pipe.move();
        if (isReset) {
          pipe.reset(pipeArr[pipeLastIndex].left);
          pipeLastIndex = ++pipeLastIndex % pipeArrLength;
        }
      });
      if (nextPipe.left + Pipe.width < Bird.left) {
        oScore.innerText = ++score;
      }
    }, 30);
  } else {
    // 点击一下就让小鸟跳一下
    bird.iSeepY = -10;
  }
};

// 小鸟死了之后点击重新开始的事件
oReset.onclick = function () {
  location.reload();
};

// 如果是点击重新开始按钮后的那么在刷新页面后就直接开始游戏
if (getStorage()) {
  oStart.click();
}

// 当小鸟死了需要执行的内容
function over() {
  clearInterval(timeId);
  setStorage(score);
  bird.stopFly();

  oScore.classList.remove('d-block');
  oScore.classList.add('d-none');
  oBird.classList.add('d-none');
  oEnd.classList.remove('d-none');
  oEnd.classList.add('d-block');

  scoreArr = getStorage();
  // 对排名进行降序排序
  scoreArr.sort((a, b) => b.score - a.score);

  oEndScore.innerText = score;
  // 生成排名的元素
  let template = '';
  for (let i = 0; i < scoreArr.length; i++) {
    // 最多只显示8个排名
    if (i >= 8) break;
    const scoreObj = scoreArr[i];
    template += `
            <li>
                <span class="rank-degree">${i + 1}</span>
                <span class="rank-score">${scoreObj.score}</span>
                <span class="rank-time">${scoreObj.time}</span>
            </li>
        `;
  }
  oRankList.innerHTML = template;
}

// 初始化管道
function initPipe() {
  for (let i = 0; i < pipeArr.length; i++) {
    const pipe = new Pipe((i + 1) * 300);
    pipe.create();
    pipeArr[i] = pipe;
  }
}

// 把分数排名都存到sessionStorage里
function setStorage(score) {
  scoreArr = scoreArr || [];
  const scoreObj = {
    score,
    time: getTime(),
  };
  scoreArr.push(scoreObj);
  sessionStorage.setItem('scoreArr', JSON.stringify(scoreArr));
}

// 获取sessionStorage里的分数排名数组
function getStorage() {
  const scoreArr = sessionStorage.getItem('scoreArr');
  return scoreArr ? JSON.parse(scoreArr) : null;
}

function getTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}
