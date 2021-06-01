(function (){
    /** 
     * 解决鼠标移动过快的问题
     *  1、IE和火狐：将容器和window联系起来
     *      + setCapture
     *      + releaseCapture
     *  2、Chrome/IE/Firefox都可以: 将事件绑定给window
    */
    
    let box = document.querySelector('.box'),
        HTML = document.documentElement,
        minL = 0,
        minT = 0,
        maxL = HTML.clientWidth - box.offsetWidth,
        maxT = HTML.clientHeight - box.offsetHeight
    const down = function down (ev) {
        // 记录初始时鼠标开始位置和盒子起始位置:会和其他方法进行共享，通过自定义属性
        let { top, left } = this.getBoundingClientRect()
        // 盒子
        this.startT = top
        this.startL = left
        // 鼠标
        this.startX = ev.clientX
        this.startY = ev.clientY
        // =======IE和火狐========
        // this.setCapture()
        // this.addEventListener('mousemove', move)
        // this.addEventListener('mouseup', up)
        // =========Chrome=============
        this._move = move.bind(this)
        this._up = up.bind(this)
        window.addEventListener('mousemove', this._move)
        window.addEventListener('mouseup', this._up)
    }
    // 拖拽中
    const move = function move(ev) {
        let curL = ev.clientX - this.startX + this.startL,
            curY = ev.clientY - this.startY + this.startT
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL)
        curY = curY < minT ? minT : (curY > maxT ? maxT : curY)
        this.style.left = `${curL}px`
        this.style.top = `${curY}px`
    }
    // 拖拽停止
    const up = function up (ev) {
        // ======= IE和火狐==========
        // this.setCapture()
        // this.removeEventListener('mousemove', move)
        // this.removeEventListener('mouseup', up)
        // =========Chrome===============
        window.removeEventListener('mousemove', this._move)
        window.removeEventListener('mouseup', this._up)
    }
    box.addEventListener('mousedown', down)
})()