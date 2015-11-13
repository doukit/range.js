
$('input[type="range"]').on('input', function () {
    var percent = Math.ceil(((this.value - this.min) / (this.max - this.min)) * 100);

    $(this).parent().find('.detail').html(this.value + '%')

    if (percent == 100) {
        $(this).css('background', '-webkit-linear-gradient(left, #65999c 100%, red ' + percent + '%, #ddd ' + percent + '%)');
    } else {
        $(this).css('background', '-webkit-linear-gradient(left, #65999c 0%, red ' + percent + '%, #ddd ' + percent + '%)');
    }
})