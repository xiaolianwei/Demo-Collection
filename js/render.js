(function (root) {
  // 渲染图片
  function renderImg(src) {
    root.blurImg(src);
    const img = document.querySelector('.songImg img');
    img.src = src;
  }
  // 渲染音乐信息
  function renderInfo(data) {
    const songInfoChildren = document.querySelector('.songInfo').children;
    songInfoChildren[0].innerText = data.name;
    songInfoChildren[1].innerText = data.singer;
    songInfoChildren[2].innerText = data.album;
  }
  // 渲染是否喜欢
  function renderIsLike(isLike) {
    const list = document.querySelectorAll('.control li');
    list.className = isLike ? 'liking' : '';
  }

  root.render = function (data) {
    renderImg(data.image);
    renderInfo(data);
    renderIsLike(data.isLike);
  };
}(window.player || (window.player = {})));
