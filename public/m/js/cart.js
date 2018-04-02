var lt;
$(function () {
    lt = new Letao();
    // 查询购物车
    lt.queryCart();
    // 编辑商品
    lt.editProduct();
    // 删除商品
    lt.deleteProduct();
})

var Letao = function () {};
Letao.prototype = {
    // 查询购物车
    queryCart: function () {
        $.ajax({
            url: '/cart/queryCart',
            success: function (data) {

                data = {
                    rows: data
                }
                // console.log(data);
                var html = template('productTemp', data);
                $('.product-detail >ul').html(html);
                // 生成对应的总金额

                $('.btn-buy').change(function () {
                    var sum = 0;
                    // 每次change的时候 获取选中的CheckBox
                    $('.btn-buy:checked').forEach(function (e) {

                        sum += $(e).data('price') * $(e).data('num');

                    })
                    // console.log(parseInt(sum*10)/10);
                    sum = parseInt(sum * 10) / 10;
                    // 将sum赋值给
                    $('.money-sum .sum i').html(sum);
                })
            }
        })
    },

    // 编辑商品
    editProduct: function () {
        $('.mui-table-view').on('click','.btn-edit', function () {
            var id = $(this).data('id');
            $.ajax({
                url: '/product/queryProductDetail',
                data: {
                    id: id
                },
                success: function (data) {
                    // console.log(data);
                    var min = data.size.split('-')[0];
                    var max = data.size.split('-')[1];
                    var sizeArr = [];
                    for (var i = min; i <= max; i++) {
                        sizeArr.push(i);
                    }
                    data.size = sizeArr;
                    // 去掉HTML中的回车标签
                    var html = template('editTemp', data).replace(/(\r)?\n/g, "");
                    mui.confirm(html, '编辑商品', ['确定','取消'], function (e) {
                        // console.log(e);
                        if(e.index==1){
                            return;
                        }else {
                            // 如果点击确定 更新该商品的信息
                            var size=$('.btn-size.active').data('size');
                            var num=mui('.mui-numbox').numbox().getValue();
                            $.ajax({
                                url: '/cart/updateCart',
                                type: 'post',
                                data: {
                                    id: id,
                                    size: size,
                                    num: num
                                },
                                success: function(data){
                                    // 如果修改成功 重新查询购物车
                                    if(data.success){
                                        lt.queryCart();
                                    }
                                }
                            })
                        }
                    })
                    
                    mui('.mui-numbox').numbox(); //初始化

                    //高亮当前点击的尺码
                    $('.btn-size').on('click', function () {
                        $('.btn-size').removeClass('active');
                        $(this).addClass('active');
                    })

                }
            })
        })

    },

    // 删除商品
    deleteProduct: function(){
        // 给删除按钮添加点击事件
        $('.mui-table-view').on('click','.btn-del', function () {
            var id = $(this).data('id');
            // 调用删除接口
            $.ajax({
                url: '/cart/deleteCart',
                data: {id:id},
                success: function(data){
                    // console.log(data);
                    if(data.success){
                        // 如果删除成功 重新渲染 页面
                        lt.queryCart();
                    }
                }
            })

        })
    }


}