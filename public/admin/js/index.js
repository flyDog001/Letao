var lt;
$(function () {
    lt = new Letao();
    lt.queryUser();
    lt.updateUser();
})

var Letao = function () {};

var page = 1;
var pageSize = 6;

Letao.prototype = {
    // query-user
    queryUser: function () {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (data) {
                // console.log(data);
                var html = template('userTemp', data);
                $('#container .table>tbody').html(html);
            }
        })
    },

    // 更改用户的状态
    updateUser: function () {
        // 给所有的按钮绑定点击事件
        $('#container .table>tbody').on('click', 'input[type=button]', function () {
            // 取出当前用户的id
            var id = $(this).data('id');
            var isDelete = $(this).data('isdelete');
            // console.log(id, isDelete);
            if (isDelete) {
                $.ajax({
                    url: '/user/updateUser',
                    type: 'post',
                    data: {
                        id: id,
                        isDelete: 0
                    },
                    success: function (data) {
                        // console.log(data);
                        // 更改状态完后,重新渲染页面
                        lt.queryUser();
                    }
                })
            } else {
                $.ajax({
                    url: '/user/updateUser',
                    type: 'post',
                    data: {
                        id: id,
                        isDelete: 1
                    },
                    success: function (data) {
                        // console.log(data);
                        // 更改状态完后,重新渲染页面
                        lt.queryUser();
                    }
                })
            }

        })
    }

}