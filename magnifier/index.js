(function () {
    let $mangifier = $('.magnifier'),
        $abbre = $mangifier.find('.abbre'),
        $mark = $abbre.find('.mark'),
        $detail = $mangifier.find('.detail'),
        $detailImg = $detail.find('img')
    // 初始化大小
    let abbreW = $abbre.width(),
        abbreH = $abbre.height(),
        abbreOffset = $abbre.offset(),
        markW = $mark.width(),
        markH = $mark.height(),
        detailW = $detail.width(),
        detailH = $detail.height(),
        detailImgW = 0,
        detailImgH = 0
    detailImgW = detailW / (markW / abbreW)
    detailImgH = detailH / (markH / abbreH)
    $detailImg.css({
        width: detailImgW,
        height: detailImgH
    })
    // 计算遮罩和大图的位置
    const computed = function computed(ev) {
        // mark边界到abbre边界的距离
        let curL = ev.pageX - abbreOffset.left - markW / 2
        let curT = ev.pageY - abbreOffset.top - markH / 2
        // 边界处理
        let minL = 0,
            minT = 0,
            maxL = abbreW - markW,
            maxT = abbreH - markH
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL)
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT)

        $mark.css({
            left: curL,
            top: curT
        })
        $detailImg.css({
            left: -curL / abbreW * detailImgW,
            top: -curT / abbreH * detailImgH
        })
    }
    $abbre.mouseenter(function (ev) {
        let initMarkLeft, initMarkTop
        $mark.css('display', 'block')
        $detail.css('display', 'block')
        computed(ev)
    }).mousemove(function(ev){
        computed(ev)
    }).mouseleave(function(ev){
        $mark.css('display', 'none')
        $detail.css('display', 'none')
    })
})()