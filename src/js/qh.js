class Tab {
    constructor(classname) {
        this.container = document.querySelector('.' + classname)
        this.ulis = this.container.querySelectorAll('.profile .nav ul li')
            // console.log(this.ulis);

        this.olis = this.container.querySelectorAll(' .profile ol li')
            // console.log(this.olis);

    }
    tab(i) {
        for (let j = 0; j < this.ulis.length; j++) {
            this.ulis[j].className = '';
            this.olis[j].className = '';
        }
        this.ulis[i].className = 'active';
        this.olis[i].className = 'active';
    }
    init() {
        // 绑定单击事件
        for (let i = 0; i < this.ulis.length; i++) {
            this.ulis[i].onclick = () => {
                this.tab(i)
            }
        }
    }
}