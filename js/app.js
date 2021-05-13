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

});

/* Collapse откр/закр*/
$("[data-collapse]").on("click", function(event){
   event.preventDefault();

   var $this = $(this),
       blockId = $this.data('collapse');

       $this.toggleClass("active");
       $(blockId).slideToggle();
});


/* Contacts */

$(window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // generate a five digit number for the contact_number variable
        this.contact_number.value = Math.random() * 100000 | 0;
        // these IDs from the previous steps
        emailjs.sendForm('contact_service', 'contact_form', this)
            .then(function() {
                console.log('SUCCESS!');
            }, function(error) {
                console.log('FAILED...', error);
            });
    });
});



