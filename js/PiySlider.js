/**
 * Author: Piyush Abbi
 * PiySlider is a simple custom jQuery slider plugin.
 * Two effects: Slide and Fade
 */
(function ($) {
  $.fn.piySlider = function (options) {
    var defaults, options;

    defaults = {
      speed: 2000,
      pause: 1000,
      transition: 'slide'
    };
    options = $.extend( defaults, options );

    this.each(function () {
      var $this = $(this),
          $children = $this.children();
      // Wrap our main element with a class
      $this.wrap('<div class="slider-wrapper" />');

      if ( options.pause <= options.speed ) {
        options.pause = options.speed + 200
      }

      // Style the main element
      $this.css({
        'width': '99999px',
        'position': 'relative',
        'padding': '0px',
        'clear': 'both'
      });

      /**
       * Style the children of the main element
       * According to the transition property
       */
      if ( options.transition === 'slide' ) {

        $children.css({
          'float': 'left'
        });
        $('.slider-wrapper').css({
          'width': $children.width(),
          'overflow': 'hidden'
        });
        slide();

      } else if ( options.transition === 'fade' ) {

        $children.css({
          'position': 'absolute',
          'left': '0'
        });
        // To fix z-index issue due to absolute position
        for( var iterator = $children.length-1, item = 0; iterator >= 0; iterator--, item++ ) {
          $children
            .eq(item)
            .css({
              'zIndex': '1000' + iterator
            });
        }
        fade();
      }

      /**
       * This method is used when the user sets the transition property of
       * the plugin to fade
       * @return boolean [Returns true or false based on the execution]
       */
      function fade() {
        setInterval(function () {
          $this.children(':first').animate({'opacity': '0'}, options.speed, function () {
            $this
              .children(':first')
              .css({
                'opacity': '1',
                'zIndex': $this.children(':last').css('zIndex') - 1
              })
              .appendTo($this)
          })
        }, options.pause);
        return true;
      }

      /**
       * This method is used when the user sets the transition property of
       * the plugin to slide
       * @return boolean [Returns true or false based on the execution]
       */
      function slide() {
        setInterval(function () {
          $this.animate({'left': '-' + $this.parent().width() }, options.speed, function () {
            $this
              .css('left', 0)
              .children(':first')
              .appendTo($this)
          })
        }, options.pause);
        return true;
      }

    });
  }
})(jQuery);
