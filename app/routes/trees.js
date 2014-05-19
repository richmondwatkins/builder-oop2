
'use strict';

var traceur = require('traceur');
var Tree = traceur.require(__dirname + '/../models/tree.js');
var User = traceur.require(__dirname + '/../models/user.js');
  // var trees = global.nss.db.collection('trees');

exports.plant = (req, res)=>{
  Tree.plant(req.body.userId, tree=>res.render('trees/tree', {tree:tree}));
};

exports.forest = (req, res)=>{
  Tree.findAllByUserId(req.query.userId, trees=>res.render('trees/forest', {trees:trees}));
};

exports.grow = (req, res)=>{
  Tree.findByTreeId(req.params.treeId, tree=>{
    tree.grow();
    tree.save(()=>res.render('trees/tree', {tree:tree}));
  });
};

exports.destroy = (req, res)=>{
    var trees = global.nss.db.collection('trees');
  Tree.findByTreeId(req.params.treeId, tree=>{
  // User.findByUserId(req.params.userId, user=>{
  // tree.removeTree(user);

  trees.remove({_id: tree._id}, (err, record)=>{
      res.render('trees/tree', {tree:trees});
  });
    // console.log(tree._id);
    // });
  });
};

// exports.destroy = (req, res)=>{
//   var pets = global.nss.db.collection('pets');
//   var _id = Mongo.ObjectID(req.params.id);
//
//   pets.findAndRemove({_id:_id}, (err, record)=>{
//     console.log(record);
//     res.redirect('/pets');
//   });
// };
//

exports.chop = (req, res)=>{
  Tree.findByTreeId(req.params.treeId, tree=>{
    User.findByUserId(req.params.userId, user=>{
    console.log(tree.height);
    // console.log(chopValue);
      tree.chop(user);
      tree.save(()=>{
        user.save(()=>{
          tree.save(()=>res.render('trees/tree', {tree:tree}));
        });
      });
    });
  });
};
