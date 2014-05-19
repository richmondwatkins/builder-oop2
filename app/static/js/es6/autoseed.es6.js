/* global ajax */


(function(){
  'use strict';




init();

  function init(){
    $('#autoseed').click(seed);
  }

  var isOn = false;
  var timer;


  function seed(){
    isOn = !isOn; //use the not ! so that it can toggle on and off
    $('#autoseed').toggleClass('on');

    if(isOn) {

      start();

    }else{
      clearInterval(timer);
      // $('#slider').empty();

    }
  }

  function start(){
    clearInterval(timer); //always a good idea to clear interval before starting to prevent multpile timers from running at same time
    timer = setInterval(plant, 1000);
  }




  function plant(){
    var userId = $('#user').attr('data-id');
    ajax('/trees/plant', 'post', {userId:userId}, h=>{
      var show = $('.alive');
      if(show.length <= 49){
      console.log(show);
      $('#forest').append(h);
    }
      else{
        isOn = false;

      }
    });
  }

})();
