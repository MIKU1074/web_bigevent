//注册账号为a112233 密码123456
$(function () {
    //点击“去注册账号”
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    //从layui中获取from元素
    let form = layui.form
    //从layui中获取layer元素
    let layer=layui.layer
    //通过from.verify()函数自定义校验规则
    form.verify({
        //自定义了一个叫pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        //校验两次密码是否一致
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd != value) return '两次密码不一致！'
            }
        })
    //监听表单的提交事件
    $('#from_reg').on('submit',function(e){
        e.preventDefault()
        let data={username:$('#from_reg [name=username]').val(),password:$('#from_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            if(res.status!=0){
                console.log(res.status);
                return layer.msg(res.message);
                
            }
            layer.msg(res.message);
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#from_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'post',
            data:$(this).serialize(),
            success:function(res){
                console.log(res.status);
                if(res.status!=0) return layer.msg('登录失败！')
                layer.msg('登录成功！')
                //将登录成功得到的token保存到locastorage中
                localStorage.setItem('token',res.token)
                // console.log(res.token);
                location.href='/index.html'
            }
        })
    })
})