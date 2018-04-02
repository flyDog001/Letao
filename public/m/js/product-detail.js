var lt, id;
$(function () {
    lt = new Letao();
    // 获取地址栏中传递的参数
    id = getQueryString('id');
    // 根据地址栏传递的id 获取对应的商品信息
    lt.getProductDetail(id);

})

var Letao = function () {};

Letao.prototype = {
    /*轮播图初始化*/
    initSlider: function () {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    },

    /*根据id获取对应的商品的信息*/
    getProductDetail: function (id) {

        $.ajax({
            url: '/product/queryProductDetail',
            data: {
                id: id
            },
            success: function (data) {
                // console.log(data);
                // 渲染页面
                var html = template('sliderTemp', data);
                // console.log(html);
                $('#main').append(html);
                // 克隆第一张图片和最后一张图片
                $fist = $('.mui-slider .mui-slider-group').find('.mui-slider-item').first().clone();
                $last = $('.mui-slider .mui-slider-group').find('.mui-slider-item').last().clone();
                // console.log($fist,$last);
                $('.mui-slider-group').append($fist);
                $('.mui-slider-group').prepend($last);
                // 初始化轮播图
                lt.initSlider();
                // console.log(data.size);
                var sizeArr = data.size.split('-');
                var min = sizeArr[0];
                var max = sizeArr[1];
                // 声明一个空数组用来存放size
                var size = [];
                for (var i = min; i <= max; i++) {
                    size.push(+i);
                }
                // console.log(size);
                data.size = size;
                // 将商品详情渲染到页面上去
                var productHtml = template('productdetailTemp', data);
                $('#main').append(productHtml);

                // 初始化数字输入框
                mui('.mui-numbox').numbox()
                //高亮当前点击的尺码
                $('.btn-size').on('click', function () {
                    $('.btn-size').removeClass('active');
                    $(this).addClass('active');
                })

                // 初始化区域滚动
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                    indicators: false, //是否显示滚动条
                });

                // 点击加入购物车 需要判读是否是否登录
                $('.btn-car').on('click', function () {

                    $.ajax({
                        url: '/user/queryUserMessage',
                        success: function (data) {
                            if (data.error == 400) {
                                // 如果没有登录打回登录页面
                                window.location.href = 'login.html';
                            } else {
                                // 如果处于登录状态
                                // 调用 添加到购物车的API
                                var size = $('.btn-size.active').data('size'); //获取尺码
                                var num = mui('.mui-numbox').numbox().getValue(); //获取数量
                                $.ajax({
                                    url: '/cart/addCart',
                                    type: 'post',
                                    data: {
                                        productId: id,
                                        num: num,
                                        size: size
                                    },
                                    success: function (data) {
                                        console.log(data);
                                        // 如果添加到购物车成功
                                        if (data.success) {
                                            // 提示用户是否去购物车
                                            mui.confirm('亲,是否去购物车查看您的宝贝!!!', '温馨提示', ['是', '否'], function (e) {
                                                if (e.index == 0) {
                                                    // 如果点击是 跳转到购物车页面 
                                                    window.location.href='cart.html';
                                                }
                                            })
                                        }
                                    }

                                })

                            }
                        }
                    })
                })


            }
        })
    }
}

/*获取地址栏中传递的参数*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}