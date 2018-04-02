var lt;
$(function () {
    lt = new Letao();

    lt.btnClick();
})

var Letao = function () {};

Letao.prototype = {

    /*登录功能*/
    login: function (options, backdata) {
        $.ajax({
            url: '/user/login',
            data: options,
            type: 'post',
            success: function (data) {
                // console.log(data);
                backdata(data);
            }
        })
    },
    /*点击登录按实现login功能*/
    btnClick: function () {
        $('.btn-login').click(function () {
            var userName = $('.username').val();
            var passWord = $('.password').val();
            if(!userName) {
                mui.toast('用户名不能为空',{ duration:'short', type:'div' });
                return; 
            }
            if (!passWord) {
                mui.toast('密码不能为空',{ duration:'short', type:'div' });
                return; 
            }
            var login = {
                username: userName,
                password: passWord
            }
            // 调用登入接口
            lt.login(login,function(data){
                // console.log(data);
                if(data.error==403){
                    mui.toast(data.message,{ duration:'short', type:'div' });
                    return; 
                }else {
                    // 登录成功 跳转到个人中心页面
                    window.location.href='user.html';
                }
            })
        })
    }
}