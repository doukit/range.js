
$ = jQuery;

var RangeStyle = (function(){
    var RangeStyle = {}

    var defaultOptions = {
        style : 'gradient',    // style 'gradient', 'basic'
        color : 'red'          // '#65999c'
    }

    /**
     * 样式的处理
     * @param that
     * @param config
     */
    RangeStyle.eachInputRangeAction = function(that, options) {
        var config;
        if (options == undefined || options == null) {
            config = defaultOptions;
        } else {
            config = options;
        }

        var percent = Math.ceil(((that.value - that.min) / (that.max - that.min)) * 100);

        $(that).parent().find('.detail').html(that.value + '%')

        // gradient depend on different browser.
        var gradient = 'Firefox' == BrowserUtils.browserInfo.browser ? '-moz-linear-gradient' : '-webkit-linear-gradient';
        /**
         *  background color for webkit Kernel
         *  $(that).css('background', '-webkit-linear-gradient(left, #65999c 0%, red ' + percent + '%, #ddd ' + percent + '%)');
         */

        // console.log('config.color=' + config.color + ' config.style=' + config.style);
        if (percent == 100) {
            if (config.style == 'basic') {
                $(that).css('background', gradient + '(left, '+ config.color +' 100%, ' + config.color +' ' + percent + '%, ' + config.color + ' ' + percent + '%)');
            } else {
                $(that).css('background', gradient + '(left, #65999c 100%, red ' + percent + '%, #ddd ' + percent + '%)');
            }
        } else {
            if (config.style == 'basic') {
                $(that).css('background', gradient + '(left, ' + config.color + ' 0%, '+ config.color +' ' + percent + '%, #ddd ' + percent + '%)');
            } else {
                $(that).css('background', gradient + '(left, #65999c 0%, '+ config.color +' ' + percent + '%, #ddd ' + percent + '%)');
            }
        }
    }

    return RangeStyle;
})()

var BrowserUtils = (function(){

    var BrowserUtilsObj = {};

    /**
     * http://stackoverflow.com/questions/2400935/browser-detection-in-javascript
     * @type {{browser, version}}
     */
    BrowserUtilsObj.browserInfo =  (function() {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

        if(/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {'browser' : 'IE', 'version' : (tem[1] || '')}
        }

        if(M[1] === 'Chrome') {
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) {
                var arr = tem.slice(1).join(' ').replace('OPR', 'Opera').split(' ');
                return {'browser': arr[0], 'version': arr[1] }
            }
        }

        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);

        return { 'browser': M[0], 'version': M[1] };
    })();

    BrowserUtilsObj.isSupported = function() {
        console.log('browser:' + JSON.stringify(BrowserUtilsObj.browserInfo));
        return $.inArray(BrowserUtilsObj.browserInfo.browser, ['Chrome', 'Firefox', 'Safari', 'Opera']) >= 0;
    }

    return BrowserUtilsObj;
})()

$.fn.extend({
    range: function(options) {
        //console.log('options:' + JSON.stringify(options));

        if (!BrowserUtils.isSupported()) {
            return;
        }

        this.each(function() {
            var that = this;
            var config = options;
            RangeStyle.eachInputRangeAction(that, config);
        });

        this.on('input', function() {
            var that = this;
            var config = options;
            RangeStyle.eachInputRangeAction(that, config);
        });
    }
});