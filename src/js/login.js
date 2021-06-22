$(function() {
    // 判断是否有记住的用户名
    var remusername = getCookie('remusername')
        // console.log(remusername);

    if (remusername) {
        $('[name="username"]').val(remusername)
    }

    $('button[type="button"]').click(function() {
        // console.log(1111);

        if ($('[name="username"]').val() === '') {
            layer.msg('您输入的手机号码格式有误，需为11位数字格式', {
                icon: 2,
                time: 2000
            })
            return false;
        }
        if ($('[name="password"]').val() === '') {
            layer.msg('密码不能为空', {
                icon: 2,
                time: 2000
            })
            return false;
        }

        $(this).prop('disabled', true)
            // 加载
        var loadindex = layer.load(1, {
            shade: [0.6, "#000"]
        });
        $.ajax({
            url: './php/login.php',
            method: "post",
            dataType: "json",
            data: $('form').serialize(),
            success: res => {
                // console.log(res);
                var { meta: { status, msg } } = res;
                $(this).prop('disabled', false)
                layer.close(loadindex)
                if (status === 1) {
                    // 设置cookie
                    setCookie('username', $('[name="username"]').val(), 7200)
                        // 是否记住
                    if ($('[name="remmeber"]').prop('checked')) {
                        setCookie('remusername', $('[name="username"]').val(), 3600 * 24 * 7)
                    }
                    layer.msg(msg, {
                            icon: 1,
                            time: 1500
                        },
                        function() {
                            // 之前有没有存储过一个url
                            var url = localStorage.getItem('url')
                            if (url) {
                                localStorage.removeItem('url')
                                location.href = url
                            } else location.href = "index.html"
                        })
                } else {
                    layer.msg(msg, {
                        icon: 2,
                        time: 1500
                    })
                }
            }
        })
    })

})