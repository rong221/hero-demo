var showPage = (function(){
var pageIndex = 1;
var pages = $$('.page_container .page');
var nextIndex = null;
/**
 * 设置静止状态下的各种样式
 */
function setStatic(){
    nextIndex = null;
    for(var i = 0;i<pages.length;i++){
        var page = pages[i];
        if(i === pageIndex){
            page.style.zIndex = 1;
        }else{
            page.style.zIndex = 10;
        }
        page.style.top = (i-pageIndex) * height() + 'px';
    }
}
setStatic();
/**
 * 移动中
 * @param {*} dis 移动的偏移量（相对正确位置）
 */
function moving(dis){
    for(var i = 0; i<pages.length;i++){
        var page = pages[i];
        if(i!==pageIndex){
            page.style.top = ((i-pageIndex) * height() + dis )+ 'px';
        }
    }
        //设置下一个页面
    if (dis > 0 && pageIndex > 0) {
        // 往下在移动  同时，目前不是第一页
        nextIndex = pageIndex - 1;
    } else if (dis < 0 && pageIndex < pages.length - 1) {
        // 往上移动，同时，目前不是最后一页
        nextIndex = pageIndex + 1;
    } else {
        nextIndex = null;
    }
}
function finishMove(){
    if(nextIndex === null){
        setStatic();
        return;
    }
    var nextPage = pages[nextIndex];
    nextPage.style.transition = '.5s';
    nextPage.style.top = 0;
    setTimeout(function () {
        // 当前页面变了
        pageIndex = nextIndex;
        // 动画完了
        nextPage.style.transition = "";
        setStatic();
    }, 500);
}
//事件
var pageContainer = $('.page_container');
pageContainer.ontouchstart = function(e){
    var y = e.touches[0].clientY ;
    function handler(e){
        var dis = e.touches[0].clientY - y;
        //防止误触
        if(Math.abs(dis)<20){
            dis = 0;
        }
        moving(dis);
        // 阻止事件的默认行为
      if (e.cancelable) {
        // 如果事件可以取消
        e.preventDefault(); // 取消事件 - 阻止默认行为
      }
    }
    // 手指按下，监听移动
    pageContainer.addEventListener("touchmove",handler,{
        passive:false
    });
    // 手指松开，完成移动
    pageContainer.ontouchend = function () {
        finishMove();
        pageContainer.removeEventListener("touchmove",handler); // 手指离开了，不用监听移动了
    };
}
//自动切换到某个板块
//index:页面索引
function showPage(index){
    var nextPage = pages[index];
    if(index < pageIndex){
        nextPage.style.top = -height() + 'px';
    }else if(index > pageIndex){
        nextPage.style.top = height() + 'px';
    }else{
        if(pageIndex === 0){
            pageIndex++;
        }else{
            pageIndex--;
        }
        setStatic();
    }
    //强行让浏览器渲染
    nextPage.clientHeight;
    nextIndex = index;
    finishMove();
}
    return showPage;
})();