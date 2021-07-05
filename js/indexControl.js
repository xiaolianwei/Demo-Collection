(function (root) {
  class Index {
    constructor(len) {
      this.len = len;
      this.index = 0;
    }

    // 这个方法用来取上一个索引（上一首）
    prev() {
      return this.get(+1);
    }

    // 这个方法用来取下一个索引（下一首）
    next() {
      return this.get(-1);
    }

    // 用来获取索引，参数为+1或者-1
    get(val) {
      this.index = (this.index + val + this.len) % this.len;
      return this.index;
    }
  }
  root.controlIndex = Index;
}(window.player || (window.player = {})));
