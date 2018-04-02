var lt;
$(function () {
    lt = new Letao();

    lt.clickRegister();
    lt.getVcode();
})

var Letao = function () {};

Letao.prototype = {
    /*点击注册实现注册功能*/
    clickRegister: function () {
        $('.register').on('click', function () {

            var username = $('.username').val();
            var password1 = $('.password1').val();
            var password2 = $('.password2').val();
            var mobile = $('.mobile').val();
            var vCode = $('.vcode').val();
            console.log(vCode);
            /*判断两次代码输入是否相同*/
            if (password1 != password2) {
                console.log('...');
                mui.toast('密码错误', {
                    duration: 'short',
                    type: 'div'
                });
                return;
            }

            var register = {
                username: username,
                password: password1,
                mobile: mobile,
                vCode: vCode
            }

            // 发送ajax请求
            $.ajax({
                url: '/user/register',
                type: 'post',
                data: register,
                success: function (data) {
                    console.log(data);
                    if (data.error == 401) {
                        mui.toast(data.message, {
                            duration: 'short',
                            type: 'div'
                        });
                        return;
                    }else if(data.error==403){
                        mui.toast(data.message, {
                            duration: 'short',
                            type: 'div'
                        });
                        return;
                    }else if(data.success){
                        // 注册成功 调到登录页面
                        window.location.href='login.html';
                    }
                }
            })




        })
    },
    /*获取验证码*/ 
    getVcode: function () {
        /*点击获取验证码*/
        $('.btn-vcode').on('click', function () {
            $.ajax({
                url: '/user/vCode',
                success: function (data) {
                    console.log(data);
                }
            })
        })
    }
}