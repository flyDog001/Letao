var lt;
$(function () {
    lt = new Letao();
    lt.addSearchHistory();

    // 页面初始化的时候 查看是否有历史记录
    lt.querySearchHistory();

    // 删除历史记录
    lt.removeSearchHistory();

    // 清空所有的历史记录
    lt.clearAll();

    // 监听键盘
    lt.KeyListener()
})

var Letao = function () {};
Letao.prototype = {
    /*增加搜索记录*/
    addSearchHistory: function () {
        var id;
        $('.search-btn').click(function () {
            var obj = {
                id: 1
            }
            // 获取用户输入的值
            var keyWords = $('.searchbar input').val();
            // 如果用户没有输入值 就return
            if (!keyWords) return;

            // 将用户输入的值存在本地

            var history = JSON.parse(localStorage.getItem('searchHistory'));

            //如果存在历史记录
            if (history) {
                // 判断是否重复 如果重复直接return
                for (var i = 0; i < history.length; i++) {
                    if (keyWords == history[i].keyWords) {
                        return;
                    }
                }
                // 改变id的值
                id = history.length + 1;

                obj.id = id;
                obj.keyWords = keyWords;

                history.push(obj); //将搜索的数据存入loclastorage

                history = JSON.stringify(history);
                localStorage.setItem('searchHistory', history);


            } else {

                obj.keyWords = keyWords;
                history = [];
                history.push(obj);

                history = JSON.stringify(history);
                localStorage.setItem('searchHistory', history);
            }
            // 将用户搜索的值渲染到页面上
            lt.querySearchHistory();
        })
    },
    /*删除历史记录*/
    removeSearchHistory: function () {
        // 删除某一条历史记录
        $('.search-history ul').on('click', 'li .del', function () {
            var id = $(this).data('id');
            // console.log(id);
            var history = JSON.parse(localStorage.getItem('searchHistory'));
            // console.log(history);
            for (var i = 0; i < history.length; i++) {

                if (history[i].id == id) {
                    history.splice(i, 1);
                    // console.log(history);
                    history = JSON.stringify(history);
                    localStorage.setItem('searchHistory', history);
                    lt.querySearchHistory();
                    return;
                }
            }
        })
    },
    /*查询历史记录*/
    querySearchHistory: function () {
        // 查询localStorage 是否历史记录
        var history = localStorage.getItem('searchHistory');
        //  如果有历史记录的数据 就渲染到页面上
        if (history) {
            history = JSON.parse(history);
            history.reverse();
            // 使用模板引擎
            var html = template('history', history);
            // console.log(html);
            $('.search-history ul').html(html);
        } else {
            // 如果没有历史记录
            $('.search-history ul').html('');
        }

    },
    /*删除所有记录*/
    clearAll: function () {
        $('.clearAll').click(function () {
            // console.log('....');
            // 清空本地的存储的信息
            localStorage.clear();
            lt.querySearchHistory();

        })

    },

    /*监听键盘*/
    KeyListener: function () {
        $('.searchbar input').on('keydown', function (e) {
            // console.log(e.keyCode);
            // 如果按下回车键 
            if (e.keyCode == 13) {
                // 获取用户输入的值  
                var keyWords = $(this).val();
                // 如果用户输入有值 就发生跳转   
                if (keyWords) {
                    window.location.href = 'product-list.html?key=' + keyWords;
                }
            }

        })
    }
}


