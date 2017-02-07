jQuery('#sidebar').theiaStickySidebar({
  additionalMarginTop: 80
});


 $(function() {
     'use strict';
      $('#faq_box a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 120
            }, 500);
            return false;
          }
        }
      });
    });