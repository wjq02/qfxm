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
    } else {
        layer.msg('请先登录！', {
            icon: 2,
            time: 1500
        }, function() {
            localStorage.setItem('url', location.href)
            location.href = "login.html";
        })
    }

    gologin();

    // 拿数据
    var data = localStorage.getItem('data');
    // console.log(data);
    if (!data || data === '[]') {
        // 没有数据
        $('.cartdata').html(`
        <div class="jumbotron">
        <h1>购物车空空如也！！!</h1>
        <p>赶快去挑选商品吧</p>
        <p><a class="btn btn-primary btn-lg" href="list.html" role="button">去列表页</a></p>
        </div>
      `)
    } else {
        // 有数据
        var arr = JSON.parse(data)
            // console.log(arr);
        var ids = arr.map(item => item.goodsid).join(',');
        // console.log(ids);
        $.get('php/cart.php', { ids }, res => {
            // console.log(res)
            var { meta: { status, msg }, data } = res;
            // console.log(data);
            if (status === 1) {
                var str = '';
                data.forEach(item => {
                    var obj = arr.find(v => v.goodsid == item.id)
                        // console.log(obj.number);
                    str += `
                  <tr>
                      <td><input type="checkbox" name="selectOne"></td>
                      <td class="goodsname" width="200">${item.name}</td>
                      <td><img src="${item.img}" width=50 height=50></td>
                      <td>${item.price}</td>
                      <td class="number" data-id="${item.id}">
                      <button class="btn btn-sm reduce">-</button> 
                      <input type="number" name="number" value="${obj.number}">
                      <button class="btn btn-sm add">+</button>
                      </td>
                      <td class="subtotal">${item.price*obj.number}</td>
                      <td><button class="btn btn-danger remove">删除</button></td>
                  </tr>
                `
                })
                $('.cartdata tbody').html(str);
                // 全选功能
                selectAll();
                // 单选功能
                selectOne();
                // 数量加
                Add(arr);
                // 数量减
                Reduce(arr);
                // 小计
                Subtotal();
                // 计算总数量总价格
                Total();
                // 移出购物车
                RemoveCart(arr);

            }
        }, 'json')
    }

})


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

// 全选功能
function selectAll() {
    $('[name="selectAll"]').click(function() {
        $('[name="selectOne"]').prop('checked', $(this).prop('checked'))
        $('[name="selectAll"]').prop('checked', $(this).prop('checked'))
        Total()
    })
}
// 单选功能
function selectOne() {
    $('[name="selectOne"]').click(function() {
        var arr = Array.from($('[name="selectOne"]'));
        var bool = arr.every(item => item.checked);
        $('[name="selectAll"]').prop('checked', bool);
        Total()
    })
}
// 数量加
function Add(arr) {
    $('.add').click(function() {
        // console.log(111);
        var num = $(this).prev().val() - 0 + 1 //-0  字符串转num
        $(this).prev().val(num);
        // 获取当前商品的id
        var goodsid = $(this).parent().attr('data-id')
        var obj = arr.find(item => item.goodsid == goodsid)
        obj.number = num;
        localStorage.setItem('data', JSON.stringify(arr))
        Subtotal()
        Total()
    })
}
// 数量减
function Reduce(arr) {
    $('.reduce').click(function() {
        // console.log(111);
        var num = $(this).next().val() - 0 - 1 //-0  字符串转num
        if (num == 0) {
            $(".reduce").attr("disabled", false);
        } else {
            $(this).next().val(num);
            // 获取当前商品的id
            var goodsid = $(this).parent().attr('data-id')
            var obj = arr.find(item => item.goodsid == goodsid)
            obj.number = num;
            localStorage.setItem('data', JSON.stringify(arr))
            Subtotal()
            Total()
        }

    })
}

// 小计
function Subtotal() {
    $('.number input').each((i, v) => {
        var num = v.value - 0
        var price = $(v).parent().prev().text() - 0
        var sub = num * price;
        $(v).parent().next().text(sub)
    })
}
// 计算总数量总价格
function Total() {
    var num = 0
    var totalPrice = 0
    $('[name="selectOne"]:checked').each((i, v) => {
        num += $(v).parent().siblings('.number').find('input').val() - 0
        totalPrice += $(v).parent().siblings('.subtotal').text() - 0
    })
    $('.totalNum').text(num)
    $('.totalPrice').text(totalPrice)
}
// 移出购物车
function RemoveCart(arr) {
    $('.remove').click(function() {
        var confirmindex = layer.confirm("亲，商品很好，您确定要删除吗？", {
            btn: ['残忍删除', '犹豫一会']
        }, () => {
            var goodsid = $(this).parent().siblings('.number').attr('data-id')
            var index = arr.findIndex(item => item.goodsid == goodsid)
            arr.splice(index, 1)
            localStorage.setItem('data', JSON.stringify(arr))
            $(this).parent().parent().remove()
            Total()
            layer.close(confirmindex)
            if (arr.length === 0) {
                $('.cartdata').html(`
                  <div class="jumbotron">
                  <h1>购物车空空如也!</h1>
                  <p>赶快去列表页挑选商品吧！！！</p>
                  <p><a class="btn btn-primary btn-lg" href="list.html" role="button">去列表页</a></p>
              </div>
              `)
            }
        })
    })
}