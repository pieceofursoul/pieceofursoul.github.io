$(function() {

    var header = $("#header"),
        introH = $("#intro").innerHeight(),
        scrollOffset = $(window).scrollTop();


   /*Fixed Header*/
    checkScroll(scrollOffset);

    $(window).on("scroll", function() {
    scrollOffset = $(this).scrollTop();

    checkScroll(scrollOffset);

    });

    function checkScroll(scrollOffset) {
      if( scrollOffset >= introH ) {
        header.addClass("fixed");
      } else {
        header.removeClass("fixed");
      }
    }

     /*Smooth scroll*/
    $("[data-scroll]").on("click", function(event) {
       event.preventDefault();

       var $this = $(this),
           blockId = $this.data('scroll');
           blockOffset = $(blockId).offset().top;

      $("#nav a").removeClass("active");
      $this.addClass("active");

      $("html, body").animate({
            scrollTop: blockOffset
      }, 500);
    });

    /* Menu nav toggle*/
    $("#nav_toggle").on("click", function(event) {
       event.preventDefault();

       $(this).toggleClass("active");
       $("#nav").toggleClass("active");

    });

    /* Collapse откр/закр*/
    $("[data-collapse]").on("click", function(event){
        event.preventDefault();

        var $this = $(this),
            blockId = $this.data('collapse');
        $(blockId).slideToggle();
    });

    /* Collapse откр закр*/
});

// Проверяем поля на наличие в них данных.
function validateFormField(id) {
    let value = $("#" + id).val();
    if (!value) {
        let title = $("label[for='" + id + "']").text();
        alert('Введите, пожалуйста, ' + title);
        return false;
    }
    return true;
}







