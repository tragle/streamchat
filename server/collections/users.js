/*
 * Add query methods like this:
 *  Users.findPublic = function () {
 *    return Users.find({is_public: true});
 *  }
 */

Meteor.users.allow({
  insert: function (userId, doc) {
    if (App.isAdmin(userId)) {
      return true;
    }
    return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    if (App.isAdmin(userId)) {
      return true;
    }
    if (userId == this.userId) {
      return true;
    }
    return false;
  },

  remove: function (userId, doc) {
    if (App.isAdmin(userId)) {
      return true;
    }
    return false;
  }
});

Meteor.users.deny({
  insert: function (userId, doc) {
    return true;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },

  remove: function (userId, doc) {
    return true;
  }
});
