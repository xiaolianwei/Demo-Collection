// logo动画
var logoAnimation = {
    data : {},
    init : function(){
        this.data = this.initData();
        this.event(this.data)
    },
    initData : function(){
        var oLogo = document.getElementById('logo'),
            oLogo_img = oLogo.getElementsByClassName('logo_img')[0],
            oLogo_text =oLogo.getElementsByClassName('logo_text')[0];
        return {
            oLogo : oLogo,
            oLogo_img : oLogo_img,
            oLogo_text : oLogo_text
        }
    },
    event : function(data){
        var oLogo = data.oLogo,
            oLogo_img = data.oLogo_img,
            oLogo_text = data.oLogo_text,
            fistTime,
            lastTime,
            key = false,
            fistTimeL;
        (function(){
            oLogo_img.children[0].style.opacity = 0;
            setTimeout(function(){
                oLogo_img.children[0].src = 'images/07.gif';
                oLogo_img.children[0].style.cssText = 'height:120px;width:auto;opacity:1';
                oLogo_text.style.cssText = 'opacity:1;transition:all 1s 2.7s';
            },500)
            setTimeout(function(){
                oLogo_img.children[0].style.opacity = 0;
                oLogo_text.style.cssText = 'opacity:0;transition:all 0.8s';
                setTimeout(function(){
                    oLogo_img.children[0].src = 'images/06.png';
                    oLogo_img.children[0].style.cssText = 'width:190px;opacity:1';
                    setTimeout(function(){key = true},800)
                },500)
            },6000)
        }())
        oLogo.onmouseenter = function(){
            if(key){
                fistTime = new Date().getTime();
                if(oLogo_img.children[0].getAttribute('src')=='images/06.png') oLogo_img.children[0].style.opacity = 0;
                setTimeout(function(){
                    oLogo_img.children[0].src = 'images/07.gif';
                    oLogo_img.children[0].style.cssText = 'height:120px;width:auto;opacity:1';
                    oLogo_text.style.cssText = 'opacity:1;transition:all 1s 2.7s';
                },500)
            }
        }
        oLogo.onmouseleave = function(){
            if(key && fistTimeL!=fistTime){
                key = false;
                lastTime = new Date().getTime();
                var time = lastTime - fistTime;
                fistTimeL = fistTime;
                if(time < 6000){
                    setTimeout(function(){
                        oLogo_img.children[0].style.opacity = 0;
                        oLogo_text.style.cssText = 'opacity:0;transition:all 0.8s';
                        setTimeout(function(){
                            oLogo_img.children[0].src = 'images/06.png';
                            oLogo_img.children[0].style.cssText = 'width:190px;opacity:1'
                            setTimeout(function(){key = true},800)
                        },500)
                    },6000-time)
                }else{
                    oLogo_img.children[0].style.opacity = 0;
                        oLogo_text.style.cssText = 'opacity:0;transition:all 0.8s';
                        setTimeout(function(){
                            oLogo_img.children[0].src = 'images/06.png';
                            oLogo_img.children[0].style.cssText = 'width:190px;opacity:1'
                            setTimeout(function(){key = true},800)
                        },500)
                }
            }
        }
    }
};

// 轮播图区域的轮播图
var lunbotu = {
    data : {},
    init: function(dom){
        this.data = this.initData(dom);
        this.Event(this.data);
    },
    initData : function (dom) {
        var oA = dom.getElementsByTagName('a'),
            oButton = dom.getElementsByTagName('button'),
            oDiv = dom.getElementsByClassName('buttons')[0],
            oImg = [];
        for(var i = 0; i < oA.length; i++){
            oImg.push(oA[i].getElementsByTagName('img'));
        }
        return {
            oA : oA,
            oButton : oButton,
            oDiv : oDiv,
            oImg : oImg
        }
    },
    Event : function (data) {
        var imgIndex = 0,
            timeId;
        function click(e) {
            e = e || window.event; 
            var lastindex = imgIndex,
                value = e.target.getAttribute('value');
            if(value == 'right'){
                imgIndex = (imgIndex === data.oImg[0].length - 1) ? 0 : imgIndex+1;
            }else{
                imgIndex = (imgIndex === 0) ? data.oImg[0].length - 1 : imgIndex-1;
            }
            if(data.oImg.length === 1){
                data.oImg[0][lastindex].style.opacity = '0';
                data.oImg[0][imgIndex].style.opacity = '1';
            }else{
                for(var i = 0; i < data.oImg[0].length; i++){
                    data.oImg[i][lastindex].style.opacity = '0';
                    data.oImg[i][imgIndex].style.opacity = '1';
                }
            }
            if(!!data.oDiv){
                data.oDiv.children[lastindex].classList.remove('Highlight');
                data.oDiv.children[imgIndex].classList.add('Highlight');
            };
            e.stopPropagation();
        };
        data.oButton[1].onclick = click;
        data.oButton[0].onclick = click;
        if(!!data.oDiv){
            var len = data.oDiv.children.length;
            for(var i = 0; i < len; i++){
                (function (i){
                    data.oDiv.children[i].onmouseenter = function () {
                        data.oDiv.children[imgIndex].className = '';
                        data.oDiv.children[i].className = 'Highlight';
                        data.oImg[0][imgIndex].style.opacity = '0';
                        data.oImg[0][i].style.opacity = '1';
                        imgIndex = i;
                    }
                }(i))
            }
            timeId = setInterval(function(){
                data.oButton[1].click();
            },3000);
            data.oA[0].onmouseenter = function () {
                clearInterval(timeId);
            };
            data.oA[0].onmouseleave = function () {
                timeId = setInterval(function(){
                    data.oButton[1].click();
                },3000)
            }
        }else{
            timeId = setInterval(function(){
                data.oButton[1].click();
            },9000);
            data.oA[0].parentNode.onmouseenter = function () {
                clearInterval(timeId);
            };
            data.oA[0].parentNode.onmouseleave = function () {
                timeId = setInterval(function(){
                    data.oButton[1].click();
                },9000)
            }
        }
    }
};

// 轮播图区域的服务
var fuwu_Hover = {
    data : {},
    init : function(){
        this.data = this.initData();
        this.Event(this.data);
    },
    initData : function(){
        var oFuwu = document.getElementById('fuwu'),
            oLi = oFuwu.getElementsByClassName('special'),
            oDiv = oFuwu.getElementsByClassName('fuwu_2')[0],
            oMain = oDiv.getElementsByClassName('main')[0];
        return {
            oFuwu : oFuwu,
            oLi : oLi,
            oDiv : oDiv,
            oMain : oMain
        }
    },
    Event : function (data) {
        var lastindex = 0,
            key = true;
        for(var i = 0; i < 3; i++){
            (function(i){
                var timeId,
                    fistTime,
                    lastTime;
                data.oLi[i].onmouseenter = function (){
                    fistTime = new Date().getTime();
                    data.oMain.children[lastindex].style.display = 'none';
                    data.oMain.children[i].style.display = 'inline-block';
                    data.oLi[lastindex].classList.remove('special_hover');
                    if(getComputedStyle(data.oDiv).top=='32px'){
                        data.oLi[i].classList.add('special_hover');
                    }
                    timeId && clearTimeout(timeId);
                    timeId = setTimeout(function(){
                        if(key){
                            data.oLi[i].classList.add('special_hover');
                            data.oDiv.style.top = '32px';
                            for (var j = 0; j < 3; j++) {
                                data.oLi[j].style.top = '-38px';
                            }
                            key = false;
                        };
                        
                    },500)
                    lastindex = i;
                }
                data.oLi[i].onmouseleave = function () {
                    lastTime = new Date().getTime();
                    if(lastTime - fistTime < 500){
                        clearTimeout(timeId);
                    }
                }
                data.oDiv.children[1].onclick = function () {
                    data.oDiv.style.top = '238px';
                    for (var j = 0; j < 3; j++) {
                        data.oLi[j].style.top = '0px';
                    }
                    data.oLi[lastindex].classList.remove('special_hover');
                    key = true;
                };
                (function (){
                    var dKey = false;
                    function dClick(e) {
                        if(dKey){
                            e = e || window.event;
                            data.oDiv.children[1].click();
                            dKey = false;
                           e.stopPropagation();
                        }
                    }
                    data.oFuwu.onmouseenter = function(){
                        dKey = true;
                        document.removeEventListener('click',dClick,false)
                    }
                    data.oFuwu.onmouseleave = function(){
                        document.addEventListener('click',dClick,false)
                    }
                }())
                
                
            }(i))
        }
    }
}

// 京东秒杀区域
var jd_seckill = (function (){
    var key = true;
    function countdown(){
        var oTime = document.querySelectorAll('#jd_seckill .countDown span.time'),
            oHour = oTime[0].children[0],
            oMinute = oTime[0].children[1],
            oSecond = oTime[0].children[2],
            timeId;
        timeId = setInterval(function(){
            var sNum = Number(oSecond.innerText),
                mNum = Number(oMinute.innerText),
                hNum = Number(oHour.innerText);
            if(sNum === 0) {
                if(mNum===0) {
                    if(hNum===0){
                        clearInterval(timeId);
                        return;
                    };
                    mNum = 60;
                    // oHour.innerText = `0${--hNum}`;
                    oHour.innerText = '0' + --hNum;
                }
                sNum = 60;
                // oMinute.innerText = ((mNum-1)<10)?`0${mNum-1}`:mNum-1;
                oMinute.innerText = ((mNum-1)<10)?'0'+(mNum-1):mNum-1
            }
            // oSecond.innerText = ((sNum-1)<10)?`0${sNum-1}`:sNum-1;
            oSecond.innerText = ((sNum-1)<10)?'0'+(sNum-1):sNum-1;
        },1000)
    }
    function wufeng_lunbotu (){
        var oTotal = document.getElementById('jd_seckill'),
            oUl = oTotal.getElementsByClassName('wrapper')[0],
            obtn_left = oTotal.getElementsByClassName('button_left')[0],
            obtn_right = oTotal.getElementsByClassName('button_right')[0],
            index = 1;
        obtn_right.onclick = function () {
            if(key){
                key = false;
                var left = parseInt(getComputedStyle(oUl).left);
                if(left === -4000){
                    oUl.style.transitionDuration = '0S';
                    oUl.style.left = '0px';
                    parseInt(getComputedStyle(oUl).width);
                    index = 1;
                }
                oUl.style.transitionDuration = '.7s';
                oUl.style.left = index * -800 + 'px';
                console.log(index);
                index ++;
                setTimeout(function(){
                    key = true
                },700)
            }
        }
        obtn_left.onclick = function () {
            if(key){
                key = false;
                index --;
                var left = parseInt(getComputedStyle(oUl).left);
                if(left === 0){
                    oUl.style.transitionDuration = '0S';
                    oUl.style.left = '-4000px';
                    parseInt(getComputedStyle(oUl).width);
                    index = 5;
                }
                oUl.style.transitionDuration = '.7s';
                oUl.style.left = index * -800 + 800 + 'px';
                
                setTimeout(function(){
                    key = true
                },700)
            }
        }
    }
    function brand () {
        var oTotal = document.getElementById('jd_seckill'),
            oDiv = oTotal.getElementsByClassName('seckill-brand')[0],
            oUl = oDiv.getElementsByTagName('ul')[0],
            oSpan = document.querySelectorAll('#jd_seckill .seckill-brand>div.ico>span'),
            left = 0,
            index = 0,
            timeId;
        timeId = setInterval(function(){
            left = (left===0)?-180:0;
            oUl.style.left = left + 'px';
            oSpan[index].className = '';
            index = index===0 ? 1 : 0;
            oSpan[index].className = 'gaoLian';
        },4000)
    }
    return function (){
        countdown();
        wufeng_lunbotu();
        brand();
    }
}())

// 特价闪购
var tejia_enter = function () {
    var oTejia = document.getElementById('teJia_shanGo'),
        oLi = oTejia.getElementsByTagName('li'),
        oDiv = oTejia.querySelectorAll('.box>div'),
        index = 0;
    for(var i = 0; i < oLi.length; i++){
        (function (i){
            oLi[i].onmouseenter = function () {
                oLi[index].classList.remove('enter');
                oDiv[index].classList.remove('visible');
                oLi[i].classList.add('enter');
                oDiv[i].classList.add('visible');
                index = i;
            }
        }(i))
    }
}

//商品橱窗展示
var goods_list = {
    data : {},
    init : function () {
        this.data = this.initData();
        this.Event(this.data);
        this.Time(this.data);
    },
    initData : function () {
        var oBox = document.getElementById('haoHuo').children[0],
            oUl  = oBox.querySelector('.goods_list>ul'),
            oScroll = oBox.querySelector('.scroll>span');
        return {
            oBox : oBox,
            oUl : oUl,
            oScroll : oScroll
        }
    },
    Event : function (data) {
        var $this = this,
            key = true;
        data.oScroll.onmousedown = function (e) {
            e = e || window.event;
            key = false;
            var offsetX = e.offsetX,
                pageX = e.pageX,
                left = parseInt(getComputedStyle(data.oScroll).left);
            document.onmousemove = function (e) {
                e = e || window.event;
                var X = e.pageX - pageX + left,
                    oUlX;
                // oUl的移动距离 = OScroll的移动距离 * OUl的移动范围 / oScroll的移动范围
                X = X < 0 ? 0 : X;
                X = X > 861 ? 861 : X;
                oUlX = X * 2000 / 861;
                data.oScroll.style.left = X + 'px';
                data.oUl.style.left = -oUlX + 'px';
                e.preventDefault();
            }
            document.onmouseup = function () {
                document.onmousemove = null;
                key = true;
            }
            e.preventDefault();
        }; 
        data.oBox.onmouseenter = function () {
            clearInterval(data.timeId);
        };
        data.oBox.onmouseleave = function () {
            data.timeId = setInterval(function (){
                if(key) $this.timeFn($this);
            },50)
        }
    },
    Time : function (data) {
        var $this = this;
        // console.log(this)
        var timeId = setInterval(function(){
            $this.timeFn($this);
        },50);
        this.data.timeId = timeId;
    },
    timeFn : function($this){
        var X = 1,
            left = parseInt(getComputedStyle($this.data.oScroll).left),
            oUlX = (left + X) * 2000 / 861;
        if(left === 861){
            $this.data.oScroll.style.left = '0px';
            $this.data.oUl.style.left = '0px';
        }else{
            $this.data.oScroll.style.left = left + X + 'px';
            $this.data.oUl.style.left = -oUlX + 'px';
        }
    },
}

// 新品首发轮播图
var xinping_lubo = {
    data : {},
    init : function () {
        this.data = this.initData();
        this.Event(this.data);
    },
    initData : function () {
        var oBox = document.getElementById('youxuan'),
            oUl = oBox.getElementsByClassName('xinpin_ul')[0],
            oBtn = oBox.querySelectorAll('.xinpin>button');
        return {
            oUl : oUl,
            oBtn : oBtn
        }
    },
    Event : function (data) {
        var index = 1,
            key = true,
            $this = this
        data.oBtn[1].onclick = function (e){
            if(key){
                e = e || window.event;
                key = false;
                setTimeout(function(){key = true},500);
                againTime();
                var oImg = data.oUl.children[1].children[0],
                oText = data.oUl.children[1].children[1],
                oUlLeft;
                if(index === 5){
                    data.oUl.style.transitionDuration = '0s';
                    oImg.style.transitionDuration = '0s';
                    oText.style.transitionDuration = '0s';
                    data.oUl.children[1].className = 'core';
                    data.oUl.style.left = '-41px';
                    data.oUl.children[5].className = '';
                    oUlLeft = parseInt(getComputedStyle(data.oUl).left);
                    data.oUl.style.transitionDuration = '0.4s';
                    oImg.style.transitionDuration = '0.4s';
                    oText.style.transitionDuration = '0.4s';
                    index = 1;
                }else{
                    oUlLeft = parseInt(getComputedStyle(data.oUl).left);
                }
                data.oUl.children[index].className = '';
                data.oUl.children[++index].className = 'core';
                data.oUl.style.left = oUlLeft + -134 + 'px'; 
                e.stopPropagation()
            }
        }
        data.oBtn[0].onclick = function (){
            if(key){
                key = false;
                setTimeout(function(){key = true},500);
                againTime();
                var oImg = data.oUl.children[5].children[0],
                    oText = data.oUl.children[5].children[1],
                    oUlLeft;
                if(index === 1){
                    data.oUl.style.transitionDuration = '0s';
                    oImg.style.transitionDuration = '0s';
                    oText.style.transitionDuration = '0s';
                    data.oUl.children[5].className = 'core';
                    data.oUl.style.left = '-577px';
                    data.oUl.children[1].className = '';
                    oUlLeft = parseInt(getComputedStyle(data.oUl).left);
                    data.oUl.style.transitionDuration = '0.4s';
                    oImg.style.transitionDuration = '0.4s';
                    oText.style.transitionDuration = '0.4s';
                    index = 5;
                }else{
                    oUlLeft = parseInt(getComputedStyle(data.oUl).left);
                }
                data.oUl.children[index].className = '';
                data.oUl.children[--index].className = 'core';
                data.oUl.style.left = oUlLeft + 134 + 'px'; 
            }
        }
        this.data.timeId = setInterval(function(){
            data.oBtn[1].click();
        },5000)
        function againTime(){
            clearInterval($this.data.timeId);
            $this.data.timeId = setInterval(function(){
                data.oBtn[1].click();
            },5000);
        }
        
    }
}

// 排行榜鼠标滑动切换效果
var paihang_enter = function () {
    var oBox = document.getElementById('youxuan'),
        oUl = oBox.querySelectorAll('.paihang>.box>ul'),
        oA = oBox.querySelectorAll('.paihang>.nav>a'),
        index = 0;
    for(var i = 0; i < oA.length; i++){
        (function (i){
            oA[i].onmouseenter = function () {
                oA[index].classList.remove('enter');
                oUl[index].classList.remove('visble');
                oA[i].classList.add('enter');
                oUl[i].classList.add('visble');
                index = i;
            }
        }(i))
    }
}

// 滚动条滚动事件
var scroll_roll = {
    data : {},
    init : function () {
        this.data = this.initData();
        this.Event(this.data);
    },
    initData : function () {
        var oForm = document.getElementById('search_top'),
            oTopDiv = document.getElementById('fixed_search'),
            oSideNav = document.getElementById('Side_nav'),
            oUl = document.querySelector('header .topSearch-major .search>div>ul');
        return {
            oForm : oForm,
            oTopDiv : oTopDiv,
            oSideNav : oSideNav,
            oUl : oUl
        }
    },
    Event : function (data) {
        var pageY,
            arr = [],
            oSideNavLi = data.oSideNav.children[0].children,
            index = 0,
            _this = this;
        document.addEventListener('scroll',function(){
            pageY = pageYOffset;
            if(pageY > 260){
                data.oForm.className = 'fixed_form';
                data.oForm.style.top = '-52px';
                data.oTopDiv.style.top = '-60px';
                arr.push('a');
                if(arr.length === 1){
                    getComputedStyle(data.oForm).top;
                }
                data.oForm.style.transition = 'top .4s';
                data.oUl.style.marginTop = '41px';
            }else{
                data.oForm.style.transitionDuration = '0';
                data.oForm.className = '';
                data.oUl.style.marginTop = '5px';
            }
            if(pageY > 550){
                data.oForm.style.top = '8px';
                data.oTopDiv.style.top = '0px';
            }
        },false)
        document.addEventListener('scroll',function(){
            if(pageY > 614){
                data.oSideNav.style.transitionDuration = '0.3s';
                getComputedStyle(data.oSideNav).top;
                data.oSideNav.style.position = 'fixed';
                data.oSideNav.style.top = '74px';
                oSideNavLi[6].style.display = 'block';
            }else{
                data.oSideNav.style.transitionDuration = '0s';
                getComputedStyle(data.oSideNav).top;
                data.oSideNav.style.position = 'absolute';
                data.oSideNav.style.top = '0px';
                oSideNavLi[6].style.display = 'none';
            }
            if(pageY > 2930){
                index && oSideNavLi[index].classList.remove('region');
                oSideNavLi[3].classList.add('region');
                index = 3;
            }else if(pageY > 1900){
                index && oSideNavLi[index].classList.remove('region');
                oSideNavLi[2].classList.add('region');
                index = 2;
            }else if(pageY > 900){
                index && oSideNavLi[index].classList.remove('region');
                oSideNavLi[1].classList.add('region');
                index = 1;
            }else if(pageY > 614){
                index && oSideNavLi[index].classList.remove('region');
                oSideNavLi[0].classList.add('region');
                index = '0';
            }else{
                oSideNavLi[0].classList.remove('region');
            };
        },false);
        data.oSideNav.children[0].onclick = function (e) {
            e = e || window.event;
            var targetName = e.target.nodeName,
                targetValue = e.target.getAttribute('value'),
                pageY;
                // console.log(targetName)
            if (targetName == 'SPAN' || targetName == 'I'){
                var lastPageY,
                        num;
                if(targetValue == '1'){
                    clearInterval(_this.timeId);
                    _this.timeId = setInterval(function(){timeFn(620)},10)
                }else if(targetValue == '2'){
                    clearInterval(_this.timeId);
                    _this.timeId = setInterval(function(){timeFn(905)},10)
                }else if(targetValue == '3'){
                    clearInterval(_this.timeId);
                    _this.timeId = setInterval(function(){timeFn(1905)},10)
                }else if(targetValue == '4'){
                    clearInterval(_this.timeId);
                    _this.timeId = setInterval(function(){timeFn(2935)},10)
                }else if(targetValue == '5'){
                    clearInterval(_this.timeId);
                    _this.timeId = setInterval(function(){timeFn(0)},10)
                }
                function timeFn(End){
                    
                    pageY = window.pageYOffset;
                    num = (End - pageY) * 0.3;
                    scrollBy(0,num);
                    if(lastPageY == pageY) clearInterval(_this.timeId);
                    lastPageY = pageY;
                }
            }
        }
    }
}

// 用jQuery和mock渲染轮播图区域左侧导航条内容区域
function renderMenuContent(data){
    var divLeft = $('<div class="menu-content-left"></div>'),
        divRight = $('<div class="menu-content-right"></div>'),
        tabs = $('<div class="tabs clearfix"></div>'),
        subs = $('<div class="subs"></div>');
    data.tabs.forEach(function (val){
        $(`<a href="#" class="tabs_item">${val.name}
                <i class="iconfont">&#xe7dc;</i>
            </a>`).appendTo(tabs)
    });
    data.subs.forEach(function (val){
        var dl = $('<dl></dl>');
        $(`
            <dd>${val.category}<i class="iconfont">&#xe7dc;</i></dd>
        `).appendTo(dl);
        var dt = $('<dt class="clearfix"></dt>');
        val.items.forEach(function (val){
            $(`<a href="${val.href}">${val.name}</a>`).appendTo(dt)
        })
        dl.append(dt).appendTo(subs);
    })
    divLeft.append(tabs).append(subs);
    data.img.forEach(function(val){
        $(`<img src="${val}">`).appendTo(divRight)
    })
    $('.menu-content').empty().append(divLeft).append(divRight);
}