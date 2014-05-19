'use strict';

// var items = global.nss.db.collection('items');
// var Mongo = require('mongodb');
// var _ = require('lodash');

class Item{
  constructor(type){
    this.type = type;

    switch(type){
    case 'autogrow':
      this.cost = 50000;
      this.image = '/img/growth.gif';
      break;
    case 'autoseed':
      this.cost = 75000;
      this.image = '/img/bg.gif';
      break;
    case 'autoroot':
      this.cost = 85000;
      this.image = '/img/dead.svg';
      break;

    }

  }
}

module.exports = Item;
