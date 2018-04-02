var lt;
$(function(){
    lt= new Letao();
    lt.login();
})

var Letao=function(){};

Letao.prototype={
    // 登录
    login : function(){
        // 给登录按钮绑定点击事件
        $('.btn-login').click(function(){
            // 调用登录API
            $.ajax({
                url: '/employee/employeeLogin',
                type: 'post',
                data: {
                    username: $('.username').val(),
                    password: $('.password').val()
                },
                success: function(data){
                    console.log(data);
                    if(data.success){
                        // 如果登录成功 跳转到首页
                        window.location.href='index.html'; 
                    }else {
                        alert(data.message);
                    }
                }
            })
        })

    }
}