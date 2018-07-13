// TAB切换
$(".news-tab li").bind('touchstart mousedown', function () {
    var index = $(this).index();
    $('.news-con .news-c').eq(index).show().siblings().hide();
    $(this).addClass('active').siblings().removeClass('active');
    return false;
});
$(".news-tab li").eq(0).addClass('active');
$(".news-con .news-c").eq(0).show();
// 职业
TouchSlide({ slideCell: "#role", titCell: ".hd", mainCell: ".bd", autoPage: true });
/*getOpenInfo('qyjios', '#openinfo');*/