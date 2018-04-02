var lt;
$(function(){
    lt = new Letao();
    lt.queryUserMessage();
    lt.logout();
})

var Letao=function(){};

Letao.prototype={
    /*查询个人信息*/
    queryUserMessage: function(){
        $.ajax({
            url:'/user/queryUserMessage',
            success: function(data){
                // console.log(data);
                if(data.error==400){
                    // 如果没有登录 就打回登录界面
                    window.location.href='login.html';

                }else{
                    var html=template('profileTemp',data);
                    $('#main>ul').prepend(html); 
                }
            }
        })
    },
    /*登出*/ 
    logout: function (){
        $('.btn-logout').on('click',function(){
            $.ajax({
                url: '/user/logout',
                success: function(data){
                    console.log(data);
                    if(data.success){
                        //如果logout成功 打回登录界面
                        window.location.href='login.html';
                    }
                }
            })
        })
    }
}
