$(function() {

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
            gologin()
        })
    }

    gologin();
    // 放大镜
    enlarge();
    // tab
    var t = new Tab('tab');
    t.init();
    // 获取商品id
    var reg = /id=(\d+)/;
    var arr = reg.exec(location.search)
        // 获取不到id
    if (!arr) {
        layer.msg('非法访问！', {
            icon: 2,
            time: 1500
        }, function() {
            location.href = "list.html";
        })
    }
    // console.log(arr);
    var id = arr[1];
    // 发送ajax请求当前这个商品的详情
    $.get('php/details.php', { id }, res => {
        // console.log(res);
        var { meta: { status, msg }, data } = res;
        if (status === 1) {
            $('.goodsname').text(data.name)
            $('.goodsprice').text(data.price)
            $('.description').text(data.description)
            $('[name="introduce"]').html(data.introduce)
                // 将图片放入到小框中
            var imgs = data.manyImg.split('==========');
            var str = ''
            for (var i = 0; i < imgs.length; i++) {
                if (i === 0) {
                    str += `
                <img class="active" src="${imgs[i]}>`
                } else {
                    str += `
                <img src="${imgs[i]}">`
                }
                $('.small').html(str);
                // 放大镜
                enlarge();
                // 加入购物车
                addcart(username, id);
            }
        }

    }, 'json')
})

// 加入购物车
function addcart(username, id) {
    $('.two').click(function() {
        // console.log(username);

        // 判断是否登录
        if (!username) {
            localStorage.setItem('url', location.href);
            // 需要跳转到登录页
            location.href = "login.html";
        }
        //已经登录
        // 使用本地存储来做       实际项目中购物车数据在数据库
        // 判断本地存储中是否有数据
        var data = localStorage.getItem('data')
            // console.log(data);
        if (!data) {
            var arr = [];
        } else {
            var arr = JSON.parse(data)
        }
        // 判断本地存储是否存在当前商品
        // find方法---找数组中满足条件的第一个元素--返回这个数组
        // console.log(obj);
        var findResult = arr.find(item => item.goodsid == id && item.username == username)
        if (!findResult) {
            var obj = {
                username,
                goodsid: id,
                number: 1,
            }
            arr.push(obj);
        } else {
            // 有数据
            findResult.number++
        }

        localStorage.setItem('data', JSON.stringify(arr));
    })
}


// 登录跳回前一页面
function gologin() {
    $('.left li:first').click(function() {
        // 点击登录
        // 跳转之前先设置一个本地存储将当前url存起来
        localStorage.setItem('url', location.href)
            // 需要跳转到登录页
        location.href = "login.html";
    })
}

// 放大镜效果
function enlarge() {
    $('.small img').click(function() {
        $(this).addClass('active').siblings().removeClass('active')
        $('.middle>img').attr('src', $(this).attr("src"))
        $('.big>img').attr('src', $(this).attr("src"))
    })
    $('.middle').hover(function() {
        // 让遮罩和大盒子显示
        $('.mask').css('display', 'block')
        $('.big').css('display', 'block')

        $(this).mousemove(function(e) {
            var x = e.pageX;
            var y = e.pageY;

            // console.log(Math.ceil(parseFloat($('.middle').css('border-width'))));

            var left = x - $('.mask').width() / 2
            var top = y - $('.mask').height() / 2

            if (left <= $('.middle').offset().left + Math.ceil(parseFloat($('.middle').css('border-width')))) {
                left = $('.middle').offset().left + Math.ceil(parseFloat($('.middle').css('border-width')))
            }

            if (top <= $('.middle').offset().top + Math.ceil(parseFloat($('.middle').css('border-width')))) {
                top = $('.middle').offset().top + Math.ceil(parseFloat($('.middle').css('border-width')))
            }

            if (left >= $('.middle').offset().left + $('.middle').width() - $('.mask').width() + Math.ceil(parseFloat($('.middle').css('border-width')))) {
                left = $('.middle').offset().left + $('.middle').width() - $('.mask').width() + Math.ceil(parseFloat($('.middle').css('border-width')))
            }

            if (top >= $('.middle').offset().top + $('.middle').height() - $('.mask').height() + Math.ceil(parseFloat($('.middle').css('border-width')))) {
                top = $('.middle').offset().top + $('.middle').height() - $('.mask').height() + Math.ceil(parseFloat($('.middle').css('border-width')))
            }
            $('.mask').offset({ left, top })

            // 遮罩移动过的距离 / 中盒子的宽高 = 大图移动的距离 / 大图的大小
            var bigLeft = $('.mask').position().left / $('.middle').width() * $('.big>img').width()
            var bigTop = $('.mask').position().top / $('.middle').height() * $('.big>img').height()
                // console.log(bigLeft,bigTop);
            $('.big>img').css({
                left: -bigLeft + "px",
                top: -bigTop + "px"
            })
        })
    }, function() {
        $('.mask').css('display', 'none')
        $('.big').css('display', 'none')
    })
}