(function() {
  'use strict';
  init();
  function init() {
    $('#autoroot').click(grow);
  }
  var isOn = false;
  var timer;
  function grow() {
    isOn = !isOn;
    $('#autoroot').toggleClass('on');
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
  function growing() {
    $('.dead.stump').map((function(i, d) {
      return $(d).attr('data-id');
    })).each((function(i, v) {
      var userId = $('#user').attr('data-id');
      ajax(("/trees/" + userId + "/" + v + "/destroy"), 'put', null, (function(h) {
        $('#forest').empty().append(h);
      }));
    }));
  }
})();

//# sourceMappingURL=autoroot.map
