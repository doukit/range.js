/*$(function(){
    $('input[type="range"]').each(eachInputRangeAction)
})*/

//$('input[type="range"]').on('input', eachInputRangeAction)

$ = jQuery;

var config = {};

var BrowserKit = (function(){
    var defaultOptions = {
        style : 'default',    // style 'default', 'basic'
        color : 'red'          // '#65999c'
    }

    var BrowserKit = {};
    BrowserKit.config = function(options) {
        if (options == undefined || options == null) {
            config = defaultOptions;
        } else {
            config = options;
        }
    }

    /**
     * http://stackoverflow.com/questions/2400935/browser-detection-in-javascript
     * @type {{browser, version}}
     */
    BrowserKit.browserInfo =  (function(){
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

    BrowserKit.isSupported = function() {
        return $.inArray(BrowserKit.browserInfo.browser, ['Chrome', 'Firefox', 'Safari', 'Opera']) >= 0;
    }

    BrowserKit.eachInputRangeAction = function() {
        var percent = Math.ceil(((this.value - this.min) / (this.max - this.min)) * 100);

        $(this).parent().find('.detail').html(this.value + '%')

        // gradient depend on different browser.
        var gradient = 'Firefox' == BrowserKit.browserInfo.browser ? '-moz-linear-gradient' : '-webkit-linear-gradient';
        /**
         *  background color for webkit Kernel
         *  $(this).css('background', '-webkit-linear-gradient(left, #65999c 0%, red ' + percent + '%, #ddd ' + percent + '%)');
         */

        console.log('config.color=' + config.color + ' config.style=' + config.style);
        if (percent == 100) {
            if (config.style == 'basic') {
                $(this).css('background', gradient + '(left, '+ config.color +' 100%, ' + config.color +' ' + percent + '%, ' + config.color + ' ' + percent + '%)');
            } else {
                $(this).css('background', gradient + '(left, #65999c 100%, red ' + percent + '%, #ddd ' + percent + '%)');
            }
        } else {
            if (config.style == 'basic') {
                $(this).css('background', gradient + '(left, ' + config.color + ' 0%, '+ config.color +' ' + percent + '%, #ddd ' + percent + '%)');
            } else {
                $(this).css('background', gradient + '(left, #65999c 0%, '+ config.color +' ' + percent + '%, #ddd ' + percent + '%)');
            }
        }
    }

    return BrowserKit;
})()

$.fn.extend({
    range: function(options) {
        console.log('options:' + JSON.stringify(options));

        if (!BrowserKit.isSupported()) {
            return;
        }

        BrowserKit.config(options);

        this.each(BrowserKit.eachInputRangeAction);

        this.on('input', BrowserKit.eachInputRangeAction);
    }
});