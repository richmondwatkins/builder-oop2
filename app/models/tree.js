'use strict';

var trees = global.nss.db.collection('trees');
var Mongo = require('mongodb');
var _ = require('lodash');

class Tree{
  constructor(userId){
    this.userId = userId;
    this.height = 0;
    this.isHealthy = true;
    this.isChopped = false;
  }

  save(fn){
    trees.save(this, ()=>fn());
  }

  grow(){
    var max = this.isAdult && this.isGrowable ? this.height * 0.10 : 2;
    console.log(max);
    this.height += _.random(0, max, true);
    var min = this.isAdult ? 200 - ((this.height/12)*0.10) : 200;
    min = min < 10 ? 10 : min;
    console.log(min);
    var rnd = _.random(0, min, true);
    this.isHealthy = rnd > 1;
  }


  //   if(this.isAdult){
  //   var max = (this.height * 0.1) *1;
  //   this.height += _.random(0,max,true); //true allows you to use floating points (ex: 2.3, 6.1, etc.)
  //   console.log(max);
  //   var min = 200-(this.height / 12) * 0.1;
  //   if(min < 10){
  //     min = 10;
  //   }
  //   this.isHealthy = _.random(0, min) !== 2;
  //   console.log(min);
  // }
  //   else{this.height += _.random(0,2,true);
  //   this.isHealthy = _.random(0, 200) !== 71;
  // }
  //
  // }

  chop(user){
    user.wood += this.height / 2;
    this.height = 0;
    this.isHealthy = false;
    this.isChopped = true;
  }

  get isAdult(){ //get makes it a veritual property
    return this.height >= 48; //functions that start with "is" should typically be a boolean and return true or false
  }

  get isChoppable(){
    return this.isAdult && this.isHealthy && !this.isBeanStalk;
  }

  get isBeanStalk(){
    return (this.height / 12) > 10000;
  }

  get isGrowable(){
    return this.isHealthy && !this.isBeanStalk;
  }

  get classes(){
    var classes = [];

    if(this.height === 0){
      classes.push('seed');
    }else if(this.height < 12){
      classes.push('sapling');
    }else if(!this.isAdult){
      classes.push('treenager');
    }else {
      classes.push('adult');
    }

    if(!this.isHealthy){
      classes.push('dead');
    }else{
      classes.push('alive');
    }

    if(this.isChopped){
      classes.push('stump');
    }

    if(this.isBeanStalk){
      classes.push('beanstalk');
    }

    return classes.join(' ');
  }

  static findByTreeId(treeId, fn){
    treeId = Mongo.ObjectID(treeId);
    trees.findOne({_id:treeId}, (e, tree)=>{
      tree = _.create(Tree.prototype, tree);
      fn(tree);
    });
  }

  static findAllByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    trees.find({userId:userId}).toArray((e,objs)=>{
      var forest = objs.map(o=>_.create(Tree.prototype, o));
      fn(forest);
    });
  }

  static plant(userId, fn){
    userId = Mongo.ObjectID(userId);
    var tree = new Tree(userId);
    trees.save(tree, ()=>fn(tree));
  }
}

module.exports = Tree;
