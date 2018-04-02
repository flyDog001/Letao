
var lt,key;
$(function () {
    lt = new Letao();
    /*下拉刷新初始化*/
    lt.pullRefresh();

    //获取商品信息
    key= getQueryString('key');

    // 页面初始化  
    lt.getProductData({
        proName: key
    },function(data){
        setTimeout(function () {
            var html=template('product',data);
            $('#main >.mui-row').html(html);  
        },1000)  
    });

    /*点击购买跳转到详情页面*/ 
    $('#main .mui-row').on('tap','#btnbuy',function(){
        // 获取商品对应的id
        var id=$(this).data('id');
        
        // console.log(id);
        window.location.href="product-detail.html?id="+id;
    })


    lt.sort();
})

var page=1;
var Letao = function () {};

Letao.prototype = {
    /*下拉刷新初始化*/
    pullRefresh: function () {
        mui.init({
            pullRefresh: {
                container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    height: 50, //可选,默认50.触发下拉刷新拖动距离,
                    auto: false, //可选,默认false.首次加载自动下拉刷新一次
                    contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function () {
                        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                        setTimeout(function () {
                            lt.getProductData({
                                proName: key
                            },function(data){
                                // 处理下拉刷新业务
                                var html=template('product',data);
                                $('#main >.mui-row').html(html);
                                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                                // 重置上拉加载
                                mui('#refreshContainer').pullRefresh().refresh(true);
                                page=1;
                            });
                        }, 1000)
                    }
                },
                up: {
                    height: 50, //可选.默认50.触发上拉加载拖动距离
                    auto: false, //可选,默认false.自动上拉加载一次
                    contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '我是有底线的', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: function () {
                        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                        setTimeout(function () {
                            page++;
                            lt.getProductData({
                                proName: key,
                                page: page
                            },function(data){
                                
                                // console.log(data);
                                var html=template('product',data);
                                if(html){
                                    $('#main >.mui-row').append(html);
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
                                }else{
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
                                }
                            })

                           
                        }, 1000)
                    }
                }
            }
        });
    },

    /*获取商品信息*/
    getProductData: function (options, callback) {
         // 默认如果不传入页码数 为1
         options.page = options.page || 1;
         // 默认不传入每页大小 为2
         options.pageSize = options.pageSize || 2;
         options.price= options.price ||1;
         options.num= options.num ||1;
        $.ajax({
            url: '/product/queryProduct',
            data: options,
            success: function (data) {
                // console.log(data);
                callback(data);
            }
        })
    },

    /*排序*/
    sort : function(){
         $('.productlist-title ul li').on('tap',function(){
            
            var type=$(this).find('a span').data('sorttype');
            // console.log(type);

            if(type=='price'){
                var price=$(this).find('a span').data('price');
                if(price==1){
                    price=2;
                    $(this).find('a span').attr('data-price',2);
                }else{
                    price=1;
                    $(this).find('a span').attr('data-price',1);
                }
                lt.getProductData({
                    proName: key,
                    price: price
                },function(data){
                    var html=template('product',data);
                    $('#main >.mui-row').html(html); 
                })
            }else if(type=='num'){
                var num=$(this).find('a span').data('num');
                // console.log(num);
                if(num==1){
                    num=2;
                    $(this).find('a span').attr('data-num',2);
                }else{
                    num=1;
                    $(this).find('a span').attr('data-num',1);
                }
                lt.getProductData({
                    pageSize: 6,
                    proName: key,
                    num: num
                },function(data){
                    var html=template('product',data);
                    $('#main >.mui-row').html(html); 
                })
            }


         })
    }



}

// 获取url 中传递的数据
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}