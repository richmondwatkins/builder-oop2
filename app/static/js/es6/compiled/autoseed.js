(function() {
  'use strict';
  init();
  function init() {
    $('#autoseed').click(seed);
  }
  var isOn = false;
  var timer;
  function seed() {
    isOn = !isOn;
    $('#autoseed').toggleClass('on');
    if (isOn) {
      start();
    } else {
      clearInterval(timer);
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(plant, 1000);
  }
  function plant() {
    var userId = $('#user').attr('data-id');
    ajax('/trees/plant', 'post', {userId: userId}, (function(h) {
      var show = $('.alive');
      if (show.length <= 49) {
        console.log(show);
        $('#forest').append(h);
      } else {
        isOn = false;
      }
    }));
  }
})();

//# sourceMappingURL=autoseed.map
