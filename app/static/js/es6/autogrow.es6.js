/* global ajax, audioBeanStalk */


(function(){
  'use strict';




  init();

  function init(){
    $('#autogrow').click(grow);
    slider();
  }

  var isOn = false;
  var timer;

  var chopValue;

  function grow(){
  chopValue = $('#slider').val();
    console.log(chopValue);


    isOn = !isOn; //use the not ! so that it can toggle on and off
    $('#autogrow').toggleClass('on');

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



  function slider(){
 $('#slider').noUiSlider({
	start: 50,
	range: {
		'min': 0,
		'max': 10000
	},

	serialization: {
		lower: [
		// Write the values to
		// an input with id 'field'
		  $.Link({
		      target: $('#field')
			})

		],

		format: {
		// Set formatting
			thousand: ',',
			// prefix: '$'
		}
	}

});

  }

  // exports.chop = (req, res)=>{
  //   Tree.findByTreeId(req.params.treeId, tree=>{
  //     User.findByUserId(req.params.userId, user=>{
  //       tree.chop(user);
  //       tree.save(()=>{
  //         user.save(()=>{
  //           tree.save(()=>res.render('trees/tree', {tree:tree}));
  //         });
  //       });
  //     });
  //   });
  // };




  function growing() {
    $('.alive:not(.beanstalk)').map((i,d)=>$(d).attr('data-id')).each((i,v)=>{

    var tree = $(`.tree[data-id=${v}]`);

     ajax(`/trees/${v}/grow`, 'put', null, h=>{
        // var t = tree.data();
      //  console.log(t);
        tree.replaceWith(h);
        if($(h).hasClass('beanstalk')){
          audioBeanStalk.play();
        }
      });


    });

  }

})();
