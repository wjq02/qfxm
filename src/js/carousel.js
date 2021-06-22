class Carousel {
    constructor(classname) {
        this.container = document.querySelector('.' + classname)
        this.leftBtn = this.container.querySelector('.leftBtn')
        this.rightBtn = this.container.querySelector('.rightBtn')
        this.ulis = this.container.querySelectorAll('ul li')
        this.olis = this.container.querySelectorAll('ol li')
        this.index = 0
        this.timer = null;
    }
    init() {
        this.rightBtn.onclick = () => {
            this.index++;
            this.move()
        }

        this.leftBtn.onclick = () => {
            this.index--;
            this.move()
        }

        for (let i = 0; i < this.olis.length; i++) {
            this.olis[i].onclick = () => {
                this.index = i
                this.move()
            }
        }

        this.auto()

        this.container.onmouseover = () => {
            clearInterval(this.timer)
        }
        this.container.onmouseout = () => {
            this.auto()
        }
    }
    auto() {
        this.timer = setInterval(() => {
            this.index++;
            this.move()
        }, 2000)
    }
    move() {
        if (this.index === this.ulis.length) {
            this.index = 0
        }
        if (this.index < 0) {
            this.index = this.ulis.length - 1
        }
        for (let j = 0; j < this.ulis.length; j++) {
            this.ulis[j].className = '';
            this.olis[j].className = '';
        }
        this.ulis[this.index].className = 'active';
        this.olis[this.index].className = 'active';
    }
}