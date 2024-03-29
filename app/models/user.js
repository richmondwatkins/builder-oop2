'use strict';

var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');

class User{
  constructor(username){
    this.username = username;
    this.wood = 0;
    this.cash = 0;
    this.items = [];
  }

  save(fn){
    users.save(this, ()=>fn());
  }

  purchase(item){
    if(item.cost <= this.cash){
      this.cash -= item.cost;
      this.items.push(item);
    }
  }

  sellWood(amount){
    amount = amount * 1;
    if(amount <= this.wood){
      this.wood -= amount;
      this.cash += amount / 5;
    }
  }

    static findItems(user){
    user = this.items;
  }

  get isAutoGrowAvailable(){
    var isPresent = _(this.items).any(i=>i.type === 'autogrow');
    return (this.cash >= 50000) && (!isPresent);
  }

  get isAutoSeedAvailable(){
    var isPresent = _(this.items).any(i=>i.type === 'autoseed');
    return (this.cash >= 75000) && (!isPresent);
  }

  get isAutoRootAvailable(){
    var isPresent = _(this.items).any(i=>i.type === 'autoroot');
    return (this.cash >= 75000) && (!isPresent);
  }
  // get isAutoSeedAvailable(){
  //   var isPresent = _(this.items).any(i=>i.type === 'autogrow');
  //   return (this.cash >= 50000) && (!isPresent);
  // }

  static findByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (e, user)=>{
      user = _.create(User.prototype, user);
      fn(user);
    });
  }

  static login(username, fn){
    username = username.trim().toLowerCase();
    users.findOne({username:username}, (e, user)=>{
      if(user){
        user = _.create(User.prototype, user);
        fn(user);
      }else{
        user = new User(username);
        users.save(user, ()=>fn(user));
      }
    });
  }
}

module.exports = User;
