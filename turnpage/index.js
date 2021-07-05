(function () {

    function TurnPage(options, wrap) {
        this.total = options.total;
        this.current = options.current;
        this.wrap = wrap;
        this.change = options.change || function(){};
    }
    //创建结构
    TurnPage.prototype.fillHTML = function () {
        var ul = $('<ul class="my-page"></ul>');
        if (this.current > 1) {
            $('<li class="prev-btn">上一页</li>').appendTo(ul)
        }
        $('<li class="my-page-num">1</li>').appendTo(ul).addClass(this.current === 1 ? 'my-page-current' : '');
        if (this.current - 3 > 1){
            $('<span>...</span>').appendTo(ul)
        }
        for(var i = this.current-2; i <= this.current+2; i++){
            if(i > 1 && i < this.total){
                $('<li class="my-page-num"></li>').text(i).appendTo(ul).addClass(this.current === i ? 'my-page-current' : '');
            }
        }
        if (this.total - this.current - 2 > 1){
            $('<span>...</span>').appendTo(ul)
        }
        if(this.total > 1){
            $('<li class="my-page-num"></li>').text(this.total).appendTo(ul).addClass(this.current === this.total ? 'my-page-current' : '');
        }
        if (this.total > this.current) {
            $('<li class="next-btn">下一页</li>').appendTo(ul)
        }
        // ul.appendTo(this.wrap);
        this.wrap.empty().append(ul);
    }
    // 绑定事件
    TurnPage.prototype.bindEvent = function(){
        var self = this
        this.wrap.find('.prev-btn').on('click',function(){
            self.current>1 && self.current --;
            self.init();
            self.change(self.current);
        })
        this.wrap.find('.next-btn').on('click',function(){
            self.current<self.total && self.current ++;
            self.init();
            self.change(self.current);
        })
        this.wrap.find('.my-page-num').on('click',function(){
            self.current = Number($(this).text());
            self.init()
            self.change(self.current);
        })
    }
    // 初始化
    TurnPage.prototype.init = function(){
        this.fillHTML();
        this.bindEvent();
    }


    $.fn.extend({
        page: function (options) {
            var obj = new TurnPage(options, this);
            obj.init();
            // options.change()
        }
    })
}())