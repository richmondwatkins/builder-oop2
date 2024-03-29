(function() {
  'use strict';
  init();
  function init() {
    $('#autogrow').click(grow);
    slider();
  }
  var isOn = false;
  var timer;
  var chopValue;
  function grow() {
    chopValue = $('#slider').val();
    console.log(chopValue);
    isOn = !isOn;
    $('#autogrow').toggleClass('on');
    if (isOn) {
      start();
    } else {
      clearInterval(timer);
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(growing, 1000);
  }
  function slider() {
    $('#slider').noUiSlider({
      start: 50,
      range: {
        'min': 0,
        'max': 10000
      },
      serialization: {
        lower: [$.Link({target: $('#field')})],
        format: {thousand: ','}
      }
    });
  }
  function growing() {
    $('.alive:not(.beanstalk)').map((function(i, d) {
      return $(d).attr('data-id');
    })).each((function(i, v) {
      var tree = $((".tree[data-id=" + v + "]"));
      ajax(("/trees/" + v + "/grow"), 'put', null, (function(h) {
        tree.replaceWith(h);
        if ($(h).hasClass('beanstalk')) {
          audioBeanStalk.play();
        }
      }));
    }));
  }
})();

//# sourceMappingURL=destroy.map
