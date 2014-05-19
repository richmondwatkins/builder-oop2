/* global ajax */
/* jshint unused:false */

(function(){
  'use strict';




  init();

  function init(){
    $('#autoroot').click(grow);

  }

  var isOn = false;
  var timer;



  function grow(){


    isOn = !isOn; //use the not ! so that it can toggle on and off
    $('#autoroot').toggleClass('on');

    if(isOn) {

      start();

    }else{
      clearInterval(timer);
      // $('#slider').empty();

    }
  }

  function start(){
    clearInterval(timer); //always a good idea to clear interval before starting to prevent multpile timers from running at same time
    timer = setInterval(growing, 1000);
  }

// exports.destroy = (req, res)=>{
//   var pets = global.nss.db.collection('pets');
//   var _id = Mongo.ObjectID(req.params.id);
//
//   pets.findAndRemove({_id:_id}, (err, record)=>{
//     console.log(record);
//     res.redirect('/pets');
//   });
// };



  function growing() {
    $('.dead.stump').map((i,d)=>$(d).attr('data-id')).each((i,v)=>{
      var userId = $('#user').attr('data-id');
    // var tree = $(`.tree[data-id=${v}]`);
    // var userId = $('#user').attr('data-id');
     ajax(`/trees/${userId}/${v}/destroy`, 'put', null, h=>{
      $('#forest').empty().append(h);
        });

      });
    }
})();
