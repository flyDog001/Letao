var lt;
$(function () {

    /*声明一个对象管理所有的方法*/
    lt = new LeTao();
    lt.scroll();
    /*获取左边的分类信息*/ 
    lt.getLeftCategoryData();
    /*获取右边的分类信息*/
    lt.getRightCategoryData(1); 
    
})

var LeTao = function () {};

LeTao.prototype = {

    /*区域滚动初始化*/
    scroll: function () {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        })
    },
    /*获取左边分类信息*/ 
    getLeftCategoryData: function (){
        $.ajax({
            url: '/category/queryTopCategory',
            success: function(backdata){
                // console.log(backdata);
                var html=template('categoryLeftTep',backdata);
                
                $('.cate_slide ul').html(html);
                $('.cate_slide ul li').eq(0).addClass('active');

                $('.cate_slide ul').on('click','li',function(){
                    $('.cate_slide ul li').removeClass('active');
                    $(this).addClass('active');
                    var id=$(this).data('id');
                    lt.getRightCategoryData(id);
                })

            }
        })
    },
    getRightCategoryData: function(id){
        $.ajax({
            url: '/category/querySecondCategory',
            data: {id:id},
            success: function(backdata){
                // console.log(backdata);
                var html=template('categoryRightTep',backdata);
                $('.category-right-data').html(html);
            }
        })
    }
}

