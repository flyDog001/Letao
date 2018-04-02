var lt;
$(function () {
    lt = new Letao();
    lt.queryCate(obj);
    lt.addCate();
    lt.pageNationDate();
})

var Letao = function () {};
var obj = {
    page: 1
};
var maxPage; // 最大的页数
Letao.prototype = {
    //query 分类
    queryCate: function (options) {
        // options.page = options.page || 1;
        options.pageSize = options.pageSize || 5;
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: options,
            success: function (data) {
                // console.log(data);
                data.rows = data.rows.reverse();
                var html = template('cateTemp', data);
                $('#container .table tbody').html(html);

                // 计算最多可以分成
                maxPage = Math.ceil(data.total / options.pageSize);
                var pageArr = [];

                for (var i = 1; i <= maxPage; i++) {
                    pageArr.push(i);
                }
                // 
                data.pageArr = pageArr;
                var pageHtml = template('pageTemp', data);
                $('.pagination').html(pageHtml);
            }
        })
    },
    //add 分类
    addCate: function () {
        $('.btn-addcate').on('click', function () {
            // 点击是判断 如果输入框中的内容
            if ($('.add-cate').val() == '') return;
            $.ajax({
                url: '/category/addTopCategory',
                type: 'post',
                data: {
                    categoryName: $('.add-cate').val()
                },
                success: function (data) {
                    console.log(data);
                    lt.queryCate();
                }
            })
        })
    },
    //给每一页添加点击事件
    pageNationDate: function () {
        var page = obj.page;
        // 给每一个添加点击事件
        $('.pagination').on('click', '.page a', function (e) {
            e.preventDefault();
            page = $(this).data('page');
            // console.log(page);
            var obj = {};
            obj.page = page;
            lt.queryCate(obj);
        })
        // 给下一页添加点击事件
        $('.pagination').on('click', '.next', function (e) {
            e.preventDefault();

            // 判断如果到达最后一页再点击跳到第一页
            page++;
            page = page > maxPage ? 1 : page;
            obj.page = page;
            lt.queryCate(obj);
        })

        // 给上一页添加点击事件
        $('.pagination').on('click', '.prev', function (e) {
            e.preventDefault();
            // 判断如果到达最后一页再点击跳到第一页
            page--;
            page = page <= 0 ? maxPage : page;
            obj.page = page;
            lt.queryCate(obj);
        })
    }

}