var indexArr = [0,1,2,3,4,5,6,7];
var whiteIndex = 8;
indexArr.sort(function(){
    return Math.random() - 0.5;
})
var wrap = $('.wrapper');

for(var i = 0; i < indexArr.length; i ++){
    var startPosition = getPositioin(indexArr[i]);
    $(`<div class="item" index="${indexArr[i]}">${i + 1}</div>`).css({
        top:startPosition.top+'px',
        left:startPosition.left+'px'
    }).appendTo(wrap)
}
$(wrap).on('click','.item',function(){
    var thisIndex = Number($(this).attr('index'));
    var endPosition = getPositioin(whiteIndex);
    // console.log(thisIndex);
    if(thisIndex+1==whiteIndex || thisIndex-1==whiteIndex || thisIndex+3==whiteIndex || thisIndex-3==whiteIndex){
        // console.log(thisIndex,whiteIndex);
        if(whiteIndex%3==0&&thisIndex+1==whiteIndex) return;
        if(whiteIndex%3==2&&thisIndex-1==whiteIndex) return;
        
        $(this).animate({
            top:endPosition.top+'px',
            left:endPosition.left+'px'
        },100,function(){
            win()
        })
        $(this).attr('index',whiteIndex)
        whiteIndex = thisIndex;
        // console.log(Number($(this).attr('index'))+1,$(this).text(),Number($(this).attr('index'))+1==$(this).text());
    }
})
function getPositioin(index){
    var left = (index % 3)*100,
        top = Math.floor(index / 3)*100;
    return {left:left,top:top}
}
function win(){
    var items = $('.item');
    var key = true;
    // console.log(items.length);
    // console.log(self.attr('index'));
    // console.log($(items[index]).attr('index'))
    // console.log($(items[i]),$(items[i]).text());
    for(var i = 0; i < items.length; i ++){
        // console.log($(items[i]).attr('index'),$(items[i]).text());
        if(Number($(items[i]).attr('index'))+1 != $(items[i]).text()) key=false;
    }
    if(key) alert('恭喜你赢了！');
    // return;
}