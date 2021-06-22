$(function() {

    check()

    // 更改用户名
    // console.log($('#settings-submit'));
    $('#settings-submit').click(function() {
        // 校验数据
        // 手机号码
        if ($('[name="username"]').val() === '') {
            layer.msg('请输入11位手机号码', {
                icon: 2,
                time: 2000
            })
            return false;
        }
        var usernameReg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!usernameReg.test($('[name="username"]').val())) {
            layer.msg('您输入的手机号码格式有误，需为 11 位数字格式', {
                icon: 2,
                time: 2000
            })
            return false;
        };
        // 遮罩层
        var loadindex = layer.load(1, {
                shade: [0.6, "#000"]
            })
            // 发送AJAX
        $.ajax({
            url: './php/user.php',
            method: 'get',
            data: $('form').serialize(),
            dataType: 'json',
            success: res => {
                console.log(res);
                var { meta: { status, msg } } = res;
                $(this).prop('disabled', false)
                layer.close(loadindex)
                if (status === 1) {
                    layer.msg(msg, {
                            icon: 1,
                            time: 1500
                        },
                        function() {
                            location.href = "login.html";
                        })
                }
            }
        })

    })




    // 切换
    var t = new Tab('profile');
    t.init();
})


function check() {
    // 判断是否有记住的用户名
    var remusername = getCookie('remusername')
    if (remusername) {
        $('[name="username"]').val(remusername);
        // console.log($('.nickname a'));
        $('.nickname a').text(remusername)
    }
}