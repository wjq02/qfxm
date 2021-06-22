$(function() {

    var str = `在您注册成为聚美用户的过程中，您需要完成我们的注册流程并通过点击同意的形式签署《聚美优品用户协议》、《聚美隐私权政策》★审慎阅读
    您在申请用户注册流程中点击同意并接受协议之前，应当认真阅读《聚美优品用户协议》和《聚美隐私权政策》（“协议”）。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款，并确定了解我们对您个人信息的处理规则。您有权选择同意或者不同意协议。如您对协议有任何疑问，可向聚美客服咨询。
    ★签约动作
    当您按照注册页面提示填写信息、点击“同意协议并注册”且完成全部注册程序后，即表示您已充分阅读、理解并接受协议的全部内容，您同意聚美可以依据隐私政策内容来处理您的个人信息，同时也表明您与聚美达成一致，成为聚美“用户”。
    阅读协议过程中，如您不同意相关协议或其中任何条款约定，应立即停止注册程序或停止使用聚美平台服务。`;
    $('.viewProtocol').click(function() {
        var confirmIndex = layer.confirm(str, {
            btn: ['我同意', '我拒绝'] //按钮
        }, function() {
            $('[name="agree"]').prop('checked', true)
            layer.close(confirmIndex)
        }, function() {
            $('[name="agree"]').prop('checked', false)
        });
    })


    $('button[type="button"]').click(function() {
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
        }
        // 密码
        if ($('[name="password"]').val() === '') {
            layer.msg('请输入密码，建议使用字母加数字或符号组合', {
                icon: 2,
                time: 2000
            })
            return false;
        }
        var passwordReg = /^.{6,12}$/;
        if (!passwordReg.test($('[name="password"]').val())) {
            layer.msg('为了您的账号安全，密码长度只能在 6-16 个字符之间', {
                icon: 2,
                time: 2000
            })
            return false;
        }
        // 重复密码
        if ($('[name="repass"]').val() === '') {
            layer.msg('请再次输入密码', {
                icon: 2,
                time: 2000
            })
            return false;
        }
        if ($('[name="password"]').val() !== $('[name="repass"]').val()) {
            layer.msg('两次密码输入不一致，请重新输入', {
                icon: 2,
                time: 2000
            })
            return false;
        }

        // 同意协议

        if (!$('[name="agree"]').prop('checked')) {
            layer.msg('请同意协议', {
                icon: 2,
                time: 2000
            })
            return false;
        }
        // console.log(111);
        // 按钮禁用
        $(this).prop('disabled', true)
            // 遮罩层
        var loadindex = layer.load(1, {
                shade: [0.6, "#000"]
            })
            // 发送ajax
        $.ajax({
            url: './php/reg.php',
            method: "post",
            data: $('form').serialize(),
            dataType: "json",
            success: res => {
                // console.log(res);
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
})