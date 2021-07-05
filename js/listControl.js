(function (root) {
  function listControl(data, wrap) {
    const list = document.createElement('div');
    const dl = document.createElement('dl');
    const dt = document.createElement('dt');
    const close = document.createElement('div');
    const musicList = [];
    list.className = 'list';
    dt.innerText = '播放列表';
    close.className = 'close';
    close.innerText = '关闭';

    dl.appendChild(dt);
    data.forEach((item, index) => {
      const dd = document.createElement('dd');
      dd.innerText = item.name;
      dd.addEventListener('touchend', () => {
        changeSelect(index);
      });
      dl.appendChild(dd);
      musicList.push(dd);
    });

    list.appendChild(dl);
    list.appendChild(close);
    wrap.appendChild(list);

    changeSelect(0);

    close.addEventListener('touchend', slideDown);
    // 列表滑动显示
    function slideUp() {
      list.style.transform = 'translateY(0)';
    }
    // 列表滑动隐藏
    function slideDown() {
      list.style.transform = 'translateY(100%)';
    }
    // 切换选中的元素
    function changeSelect(index) {
      for (let i = 0; i < musicList.length; i++) {
        musicList[i].className = '';
      }
      musicList[index].className = 'active';
    }

    return {
      musicList,
      slideUp,
      slideDown,
      changeSelect,
    };
  }
  root.listControl = listControl;
}(window.player || (window.player = {})));
