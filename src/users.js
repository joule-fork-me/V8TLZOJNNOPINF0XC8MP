var JouleNodeDatabase = require('joule-node-database')
    , db = new JouleNodeDatabase();


module.exports = function() {
  var usersKey = 'users'
      , users;

  this.getUserStatus = function(number) {
    if(typeof(users[number]) === 'undefined') {
      return -1;
    } else if(typeof(users[number]['name']) === 'undefined') {
      return 0;
    }

    return 1;
  };

  this.getNames = function() {
    var except = arguments[0] || null,
        userString = '';
    for(var number in users) {
      if(number == except) {
        continue;
      }

      userString += users[number]['name'] + ', ';
    }

    if(userString.length > 0) {
      userString = userString.substring(0, userString.length-2);
    }

    return userString;
  };

  this.init = function() {
    return db.get(usersKey);
  };

  this.initUsers = function(u) {
    users = u || {};
  };

  this.join = function(number) {
    if(typeof(users) === 'undefined') {
      return;
    }

    users[number] = {};

    return db.set(usersKey, users);
  };

  this.leave = function(number) {
    delete users[number];
    return db.set(usersKey, users);
  };

  this.reset = function() {
    return db.set(usersKey, {});
  };

  this.setName = function(number, name) {
    if(typeof(users[number]) === 'undefined') {
      return;
    }

    users[number]['name'] = name;
    return db.set(usersKey, users);
  };
};
