/* global ajax, audioBeanStalk */
(function(){
  'use strict';


  init();

  function init(){
    $('#autogrow').click(grow);
  }

  var isOn = false;
  var timer;

  function grow(){
    isOn = !isOn; //use the not ! so that it can toggle on and off
    $('#autogrow').toggleClass('on');

    if(isOn) {
      start();
    }else{
      clearInterval(timer);
    }
  }

  function start(){
    clearInterval(timer); //always a good idea to clear interval before starting to prevent multpile timers from running at same time
    timer = setInterval(growing, 1000);
  }


  function growing() {
    $('.alive:not(.beanstalk)').map((i,d)=>$(d).attr('data-id')).each((i,v)=>{


      var tree = $(`.tree[data-id=${v}]`);

     ajax(`/trees/${v}/grow`, 'put', null, h=>{
        tree.replaceWith(h);
        if($(h).hasClass('beanstalk')){
          audioBeanStalk.play();
        }
      });


    });

  }

})();
