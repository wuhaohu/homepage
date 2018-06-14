$(function () {
    AOS.init(); 
    var mySwiper = new Swiper('.swiper-container',{
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        });
        
    progressBar($('.progress-bar'));
    
    $('#dots-menu a').click(function () { 
        var $target = $('#'+$(this).attr('anchor-href'));
        var offset = $target.offset();
        var top = offset.top - 50;
        console.log(top,$('#section-goal').offset().top);
        if($(this).attr('anchor-href') == 'section-top'){
            top = 0;
        }
        $('html,body').animate({
            scrollTop: top,
        },200);
     })
});

function progressBar(el) {
    var $progressBar = el;
    if ($progressBar.length > 0) {
        $progressBar.each(function (i, elem) {
            var $elem = $(this),
                percent = $elem.attr('data-percent') || "100",
                delay = $elem.attr('data-delay') || "60",
                type = $elem.attr('data-type') || "%";
            if (!$elem.hasClass('progress-animated')) {
                $elem.css({
                    'width': '0%'
                });
            }
            var progressBarRun = function () {
                $elem.animate({
                    'width': percent + '%'
                }, 'easeInOutCirc',function(){
                    $elem.find('.progress-percent').fadeIn(delay, function () {
                        
                    });
                }).addClass('progress-animated');
                $elem.delay(delay).append('<div class="progress-percent"><span class="progress-number animated fadeIn">' + percent + '</span><span class="progress-type">' + type + '</span></div>');
            };
            // if ($body.hasClass('device-lg') || $body.hasClass('device-md')) {
                $(elem).appear(function () {
                    setTimeout(function () {
                        progressBarRun();
                    }, delay);
                });
            // } else {
            //     progressBarRun();
            // }
        });
    }
}
