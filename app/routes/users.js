'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Item = traceur.require(__dirname + '/../models/item.js');
// var items = global.nss.db.collection('items');

exports.login = (req, res)=>{
  User.login(req.body.username, user=>{
    var item = user.items;
    var img = item.image;
    console.log(item);
    console.log(img);
    res.render('users/dashboard', {user:user, item:item});
  });
};

exports.dashboard = (req, res)=>{
  User.findByUserId(req.params.userId, user=>res.render('users/dashboard', {user:user}));
};

exports.sellWood = (req, res)=>{
  User.findByUserId(req.params.userId, user=>{
    user.sellWood(req.body.amount);
    user.save(()=>res.render('users/dashboard', {user:user}));
  });
};

exports.autogrow = (req, res)=>{
  User.findByUserId(req.params.userId, user=>{
    var autogrow = new Item('autogrow');
    autogrow.save(()=>{
      user.purchase(autogrow);
      user.save(()=>{
        res.render('users/dashboard', {user:user, item:autogrow});
      });
    });
  });
};
