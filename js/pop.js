var showPop = (function(){
    function showPop(id){
        var container = $('#' + id);
        container.style.display = "";
        if(id === 'popVideo'){
            var vdo = container.querySelector('video');
            vdo.play();
        }
    }
// 获取所有的关闭按钮
    var closes = $$('.pop_close');
    for (var i = 0;i < closes.length;i++){
        closes[i].onclick = function(){
            var container = this.parentElement.parentElement;
            container.style.display = 'none';
        }
    }
//wx qq 二选一
    var popWx = $('.pop_wx');
    var popQq = $('.pop_qq');
    popWx.onclick = function(){
        popWx.classList.add('selected');
        popQq.classList.remove('selected');
    }
    popQq.onclick = function(){
        popWx.classList.remove('selected');
        popQq.classList.add('selected');
    }
    //处理关闭视频弹窗时视频暂停
    var closeBut = $("#popVideo .pop_close");
    closeBut.addEventListener("click",function(){
        $('#popVideo video').pause();
    });
    return showPop;
})();