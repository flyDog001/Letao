var lt;
var newURL;
$(function () {
    lt = new Letao();
    lt.querySecondCategory();
    lt.queryCate();
    lt.getImgUrl();
    lt.addBrandCate();
})

var Letao = function () {};
Letao.prototype = {
    //query-secondCategory
    querySecondCategory: function () {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 20
            },
            success: function (data) {
                data.rows = data.rows.reverse();
                // console.log(data);
                var html = template('brandTemp', data);
                $('.table tbody').html(html);
            }
        })
    },
    //query-cate
    queryCate: function () {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 20
            },
            success: function (data) {
                // console.log(data);
                var html = template('cateTemp', data);
                $('.dropdown #brand-cate').html(html);
            }

        })
    },
    //添加品牌分类
    addBrandCate: function () {
        $('.btn-addcate').on('click', function () {
            // 获取品牌所属分类的id
            var categoryId = $('#brand-cate option:selected').val();
            // 获取图片的路径
            var newURL = $('.update-file input[type=file]').val();
            // console.log(newURL);
            var res = newURL.split('\\');
            newURL = '/mobile/images/' + res[length - 1];
            $.ajax({
                url: '/category/addSecondCategory',
                type: 'post',
                data: {
                    brandName: $('.btn-addbrand').val(),
                    categoryId: categoryId,
                    brandLogo: newURL,
                    hot: 1
                },
                success: function (data) {
                    // console.log(data);
                    // 重新渲染页面
                    lt.querySecondCategory();
                }
            })
        })
    },
    //获取图片路径
    getImgUrl: function () {
        $('.update-file input[type=file]').on('change', function () {
            // 实现本地预览 方法一:
            // newURL = URL.createObjectURL(this.files[0]);
            // console.log(newURL);
            // if (newURL) {
            //     $(".img >img").attr("src", newURL); //将图片路径存入src中，显示出图片
            // }
            // 获取file对象
            var file = this.files[0];
            // 创建文件读取对象
            var reader = new FileReader()
            // 开始读取file
            reader.readAsDataURL(file);
            // 读取成功 的回调函数
            reader.onload = function () {
                var result = reader.result; //文件读取的结果
                console.log(result);
                $('.img>img').attr('src', result); //将这个结果赋值给img标签的src属性
            }
            // $.ajax({
            //     url: '/category/addSecondCategoryPic',
            //     type: 'post',
            //     success: function (data) {
            //         console.log(data);
            //     }
            // })

        })
    }
}