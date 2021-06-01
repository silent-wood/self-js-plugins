/**
 * 两个时间
 *  +目标时间：18:00:00
 *  +当前时间
 * 目标时间-当前时间=时间差
 * 问题：需要通过请求获取服务器时间[统一获取响应头中的Date]，客户端时间可以修改
 *       获取服务器时间会存在偏差问题 -> HEAD请求 ajax状态码为2
 */
let countDownModule = (function () {
    let timeBox = document.querySelector('#box .time')
    let serviceTime = 0, targetTime = +new Date('2021/01/13 10:48:00'), timer = null
    // 获取服务器时间
    const queryServiceTime = function queryServiceTime() {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest
            xhr.open('HEAD', '/')
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 2 && (xhr.status >= 200 && xhr.status < 300)) {
                    let time = xhr.getResponseHeader('Date')
                    resolve(+new Date(time))
                }
            }
            xhr.send(null)
        })
    }
    // 补0
    const supplyZone = function supplyZone(val) {
        val = +val
        return val < 10 ? `0${val}` : val
    }
    // 倒计时计算
    const computed = function computed() {
        let diff = targetTime - serviceTime,
            hours,
            min,
            sec
        if (diff <= 0) {
            timeBox.innerHTML = '开始抢购'
            clearInterval(timer)
            return
        }
        hours = Math.floor(diff/(1000*60*60))
        
        diff = diff - hours * 60 *60*1000
        min = Math.floor(diff / (60*1000))
        diff = diff - min * 60 *1000
        sec = Math.floor(diff / 1000)
        timeBox.innerHTML = `${supplyZone(hours)}:${supplyZone(min)}:${supplyZone(sec)}`
    }
    return {
        async init(options) {
            // 初始化以及验证参数
            const { el, target } = options
            timeBox = el && document.querySelector(el)
            targetTime = target && +new Date(target)
            
            serviceTime = await queryServiceTime()
            computed()
            // 设置定时器
            timer = setInterval(() => {
                computed()
                serviceTime += 1000
            }, 1000)
        } 
    }
})()
countDownModule.init({
    target: '2021-06-01 07:55:40',
    el: '#time'
})

