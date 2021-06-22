/**
 * 设置cookie的函数
 * @param {String} key 键
 * @param {String} value 值
 * @param {Number} seconds 秒数
 * @param {String} path 路径
 */
function setCookie(key,value,seconds,path='/'){
    var date = new Date()
    date.setTime(date.getTime() - 8*3600*1000 + seconds*1000)
    document.cookie = `${key}=${value};expires=${date};path=${path}`;
}
/**
 * 获取cookie的函数
 * @param {String} key 键
 * return 返回目标值 - String
 */
function getCookie(key){
    var arr = document.cookie.split('; ')
    var length = arr.length;
    for(var i=0;i<length;i++){
        var brr = arr[i].split('=')
        if(brr[0] === key) return brr[1]
    }
}
/**
 * 删除cookie的函数
 * @param {String} key 键
 * @param {String} path 路径
 */
function removeCookie(key,path="/"){ // 删除的cookie的路径一定要和设置的路径保持一致
    setCookie(key,null,-1,path)
}
