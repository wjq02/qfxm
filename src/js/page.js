// 使用面向对象
function Page(classname,options){
    this.options = options
    this.show = options.show || function(){}
    // 调用的时候传入了options就使用options中的值
    // 如果调用的时候没有传入options，就使用自己定义好的默认的值
    this.default = {
        language:{
            first:"首页",
            prev:"上一页",
            list:'',
            next:"下一页",
            last:"尾页"
        },
        pageData:{
            total:1000,
            pageSize:10
        }
    }
    // 调用设置默认参数的方法
    this.setDefault()
    // 计算总页数
    this.totalPage = Math.ceil(this.default.pageData.total/this.default.pageData.pageSize)
    // 定义当前页
    this.currentPage = 1
    // 定义放页码的盒子
    this.list = null
    // 获取最大的节点
    this.container = document.querySelector('.'+classname)
    // 创建里面自己的盒子
    this.box = document.createElement('div')
    // 设置事件
    // this.box.onmouseover = function(){
    //     this.style.cursor = 'pointer';
    // }
    this.box.onselectstart = function(){
        return false;
    }
    // 定义样式
    this.setStyle(this.box,{
        width:"800px",
        height:'50px',
        // border:"1px solid #000",
        margin:"auto",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    })
    this.container.appendChild(this.box)
    // 调用创建div的方法
    this.createDiv()
    // 调用创建页码的方法
    this.createPage()
    // 点击动起来
    this.click()
    // 设置禁用项
    this.setDisabled()
    // 添加文本框和按钮进行搜索
    this.search()
    // 调用show
    this.show(this.currentPage)
}
// 添加文本框和按钮
Page.prototype.search = function(){
    // 创建文本框和按钮添加到box中
    var input = document.createElement('input')
    input.setAttribute('type','number')
    input.onkeydown = e=>{
        var e = e || window.event;
        var keycode = e.keyCode || e.which;
        if(keycode === 13 && this.currentPage!=input.value-0){
            if(input.value<=1){
                input.value = 1
            }
            if(input.value>=this.totalPage){
                input.value = this.totalPage
            }
            this.currentPage = input.value-0;
            this.createPage()
            this.setDisabled()
            this.show(this.currentPage)
        }
    }
    this.box.appendChild(input)
    this.setStyle(input,{
        width: '50px',
        height: '29px',
        border: '1px solid #ccc',
        margin: '5px',
        outline: 'none',
        'padding-left': '6px',
    })
    var btn = document.createElement('button')
    btn.innerText = 'GO';
    this.box.appendChild(btn)
    this.setStyle(btn,{
        height: '32px',
        border: '1px solid #ccc',
        margin: '5px',
        outline: 'none',
        backgroundColor: '#0f0',
    })
}
// 设置禁用项的方法
Page.prototype.setDisabled = function(){
    // 判断当前页是否是第一页
    if(this.currentPage === 1){
        // 给首页和上一页做标记 - 添加属性
        this.box.children[0].setAttribute('disabled',true)
        this.box.children[1].setAttribute('disabled',true)
        this.box.children[0].style.backgroundColor = this.box.children[1].style.backgroundColor = '#eee';
    }else{
        this.box.children[0].setAttribute('disabled',false)
        this.box.children[1].setAttribute('disabled',false)
        this.box.children[0].style.backgroundColor = this.box.children[1].style.backgroundColor = 'transparent';
    }

    if(this.currentPage === this.totalPage){
        // 给首页和上一页做标记 - 添加属性
        this.box.children[3].setAttribute('disabled',true)
        this.box.children[4].setAttribute('disabled',true)
        this.box.children[3].style.backgroundColor = this.box.children[4].style.backgroundColor = '#eee';
    }else{
        this.box.children[3].removeAttribute('disabled',true)
        this.box.children[4].removeAttribute('disabled',true)
        this.box.children[3].style.backgroundColor = this.box.children[4].style.backgroundColor = 'transparent';
    }
}
// 点击动起来
Page.prototype.click = function(){
    // 利用事件委托给所有元素绑定事件
    var _this = this;
    this.box.onclick = function(e){
        var e = e || window.event;
        // 获取精准的事件源
        var target = e.target || e.srcElement;
        if(target.className === 'first' && target.getAttribute('disabled')!=='true'){
            _this.currentPage = 1
            console.log(_this);
            _this.createPage()
            _this.setDisabled()
            _this.box.lastElementChild.previousElementSibling.value = _this.currentPage
            _this.show(_this.currentPage)
        }else if(target.className === 'prev' && target.getAttribute('disabled')!=='true'){
            _this.currentPage--;
            _this.createPage()
            _this.setDisabled()
            _this.box.lastElementChild.previousElementSibling.value = _this.currentPage
            _this.show(_this.currentPage)
        }else if(target.className === 'next' && target.getAttribute('disabled')!=='true'){
            _this.currentPage++;
            _this.createPage()
            _this.setDisabled()
            _this.box.lastElementChild.previousElementSibling.value = _this.currentPage
            _this.show(_this.currentPage)
        }else if(target.className === 'last' && target.getAttribute('disabled')!=='true'){
            _this.currentPage = _this.totalPage
            _this.createPage()
            _this.setDisabled()
            _this.box.lastElementChild.previousElementSibling.value = _this.currentPage
            _this.show(_this.currentPage)
        }else if(target.nodeName === "P" && _this.currentPage!==target.innerText-0){
            _this.currentPage = target.innerText-0
            _this.createPage()
            _this.setDisabled()
            _this.box.lastElementChild.previousElementSibling.value = _this.currentPage
            _this.show(_this.currentPage)
        }else if(target.tagName === 'BUTTON' && _this.currentPage!==target.previousElementSibling.value-0){
            if(target.previousElementSibling.value-0>=_this.totalPage){
                target.previousElementSibling.value=_this.totalPage
            }
            if(target.previousElementSibling.value-0<=1){
                target.previousElementSibling.value=1
            }
            _this.currentPage = target.previousElementSibling.value-0;
            _this.createPage()
            _this.setDisabled()
            _this.box.lastElementChild.previousElementSibling.value = _this.currentPage
            _this.show(_this.currentPage)
        }
    }
}
// 创建页码的方法
Page.prototype.createPage = function(){
    this.list.innerHTML = '';
    // 当前页<=3 - 1~5
    if(this.currentPage<=3){
        // 创建5个p标签，放上数字，将p标签放到页码盒子里面
        for(var i=1;i<=5;i++){
            var p = document.createElement('p')
            p.innerText = i;
            this.list.appendChild(p)
            this.setStyle(p,{
                padding:"5px",
                margin:"5px",
                border:"1px solid"
            })
            if(i === this.currentPage){
                p.style.backgroundColor = 'orange';
            }
        }
    }
    // 当前页>=总页数-2 - 总页数-4~总页数
    else if(this.currentPage>=this.totalPage-2){
        for(var i=this.totalPage-4;i<=this.totalPage;i++){
            var p = document.createElement('p')
            p.innerText = i;
            this.list.appendChild(p)
            this.setStyle(p,{
                padding:"5px",
                margin:"5px",
                border:"1px solid"
            })
            if(i === this.currentPage){
                p.style.backgroundColor = 'orange';
            }
        }
    }
    // 其他情况 - 当前页-2~当前页+2
    else{
        for(var i=this.currentPage-2;i<=this.currentPage+2;i++){
            var p = document.createElement('p')
            p.innerText = i;
            this.list.appendChild(p)
            this.setStyle(p,{
                padding:"5px",
                margin:"5px",
                border:"1px solid"
            })
            if(i === this.currentPage){
                p.style.backgroundColor = 'orange';
            }
        }
    }
}
// 创建几个小盒子的方法
Page.prototype.createDiv = function(){
    // 创建几个小盒子 - 首页/上一页/页码盒子/下一页/尾页
    // 遍历options中的language创建盒子
    for(var attr in this.default.language){
        var div = document.createElement('div')
        div.innerText = this.default.language[attr];
        div.className = attr
        this.box.appendChild(div)
        if(attr !== 'list'){
            this.setStyle(div,{
                margin:"5px",
                border:"1px solid #ccc",
                padding:"5px"
            })
        }else{
            this.list = div
            this.setStyle(this.list,{
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            })
        }
        div.onmouseover = function(){
            this.style.cursor = 'pointer';
        }
    }
}
// 设置默认参数
Page.prototype.setDefault = function(){
    // 希望传入的options覆盖掉default
    for(var attr in this.options.language){
        this.default.language[attr] = this.options.language[attr]
    }
    for(var attr in this.options.pageData){
        this.default.pageData[attr] = this.options.pageData[attr]
    }
}
// 封装设置样式的方法
Page.prototype.setStyle = function(ele,styleObj){
    for(var attr in styleObj){
        ele.style[attr] = styleObj[attr]
    }
}
// 使用如下：
/*
var p = new Page('pagination',{
    language:{
        first:"|<<",
        prev:"<<",
        next:">>",
        last:">>|"
    },
    pageData:{
        total:arr.length,
        pageSize
    },
    show:function(currentPage){
       var brr = arr.slice((currentPage-1)*pageSize,currentPage*pageSize)
       var str = '';
       brr.forEach(v=>{
           str += `
            <tr>
                <td>${v.name}</td>    
                <td>${v.sex}</td>    
                <td>${v.age}</td>    
                <td>删除</td>    
            </tr>
           `
       })
       document.querySelector('tbody').innerHTML = str
    }
})
*/