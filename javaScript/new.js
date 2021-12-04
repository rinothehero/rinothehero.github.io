$('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    var target = $($(this).attr("href"));

    if (target.length) {
        $("html, body").animate({ scrollTop: target.offset().top }, 400, "easeInOutQuad");
    }
});