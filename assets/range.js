$(function(){
    $('input[type="range"]').each(eachInputRangeAction)
})

$('input[type="range"]').on('input', eachInputRangeAction)

/**
 * detect which kind of browser use.
 * more http://stackoverflow.com/questions/2400935/browser-detection-in-javascript
 * MSIE 8 MSIE 9 MSIE 10 IE 11
 * Chrome 41 Chrome 42 (using 42 Beta) Chrome 43 (using 43 Dev)
 * Firefox 35 Firefox 37 (using 37 Beta) Firefox 3 (usng 3.6)
 * Safari 8 Safari 6 (using 6.1) Safari 8 (using iPhone 6)
 * Chrome 4 (Samsung S5 native browser)
 * Opera 27
 */
navigator.browserInfo= (function(){
    var ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return { 'browser': M[0], 'version': M[1] };
    //return M.join(' ');
})();



function eachInputRangeAction() {
    var percent = Math.ceil(((this.value - this.min) / (this.max - this.min)) * 100);

    $(this).parent().find('.detail').html(this.value + '%')

    if (percent == 100) {
        if ('Firefox' == navigator.browserInfo.browser) {
            $(this).css('background', '-moz-linear-gradient(left, #65999c 100%, red ' + percent + '%, #ddd ' + percent + '%)');
        } else {
            $(this).css('background', '-webkit-linear-gradient(left, #65999c 100%, red ' + percent + '%, #ddd ' + percent + '%)');
        }
    } else {
        if ('Firefox' == navigator.browserInfo.browser) {
            $(this).css('background', '-moz-linear-gradient(left, #65999c 0%, red ' + percent + '%, #ddd ' + percent + '%)');
        } else {
            $(this).css('background', '-webkit-linear-gradient(left, #65999c 0%, red ' + percent + '%, #ddd ' + percent + '%)');
        }
    }
}
