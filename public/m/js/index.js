$(function () {

    /*创建一个乐淘对象管理所有的方法*/
    var lt = new LeTao();
    lt.slider();
    lt.scroll();


})
/*声明一个LeTao构造函数*/
var LeTao = function () {

}

LeTao.prototype = {
    /*轮播图初始化*/
    slider: function () {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    },
    /*区域滚动初始化*/
    scroll: function () {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            indicators: false, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        });
    }
}

