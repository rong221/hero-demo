(function(){
    var divSwitch = $('.menu_switch');
    var ulNav = $('.menu_nav');

    function toggleNav(){
        divSwitch.classList.toggle('menu_switch--expand');
        ulNav.classList.toggle('menu_nav--expand');
    }
    divSwitch.onclick = toggleNav;
    ulNav.addEventListener('click',function(){
        toggleNav();
    })
})();