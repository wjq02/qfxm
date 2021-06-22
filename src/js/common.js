$(function() {
    //获取cookie 判断是否登录
    var username = getCookie('username')
    if (username) {
        $('.left').html(
            `<li><span style="font-size:12px;color:#ed155b;">欢迎您，${username}</span></li>
        <li> <a href="javascript:;" style="color:#ed155b" class="logout">[ 退出 ]</a> </li>`
        )

        // 退出登录
        $('.logout').click(function() {
            removeCookie('username')
            $('.left').html(
                    ` <li>欢迎来到聚美！</li>
        <li><a href="login.html">请登录</a></li>
        <li><a href="reg.html">快速注册</a></li>`
                )
                // gologin()
        })

    } else {
        layer.msg('请先登录您的账户！', {
            icon: 2,
            time: 2000
        }, function() {
            localStorage.setItem('url', location.herf)
            location.herf = "login.html";
        })
    }
})