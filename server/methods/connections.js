Meteor.methods({
  updateState: function(groupId, state) {
    if (this.userId && groupId) {
      var newState = {};
      if (App.isVisitor(this.userId)) {
        newState.isVisitor = true;
      } else {
        newState.isVisitor = false;
      }
      newState.updated = (new Date()).getTime();
      newState._id = this.userId;
      if (state) {
        newState = _.extend(newState, state);
      }
      if (Groups.findOne({'connections._id': this.userId})) {
        return Groups.update(
          {'_id': groupId, 'connections._id': this.userId},
          {$set: {'connections.$': newState}}
        );
      } else if (Groups.findOne({'queue._id': this.userId})) {
        return Groups.update(
          {'_id': groupId, 'queue._id': this.userId},
          {$set: {'queue.$': newState}}
        );
      } else {
        Meteor.call('joinGroup', groupId, newState);
      }
    }
  },
  keepAlive: function() {
    if (this.userId) {
      if (Groups.findOne({'connections._id': this.userId})) {
        return Groups.update(
          {'connections._id': this.userId},  
          {$set: {'connections.$.updated': (new Date()).getTime()}}
        );
      } else if (Groups.findOne({'queue._id': this.userId})) {
        return Groups.update(
          {'queue._id': this.userId},  
          {$set: {'queue.$.updated': (new Date()).getTime()}}
        );
      } else {
        return null;
      }
    }
  },
  setTyping: function(groupId, message, toName, toId) {
    if (groupId && this.userId) {
      if (!toName) toName = '';
      if (!toId) tiId = '';
      var displayName = Meteor.users.findOne({'_id': this.userId}).profile.displayName;
      return Previews.upsert(
        {'_id': this.userId}, 
        {$set: {'group': groupId, 'body': message, 'to': toName, 'toId': toId, 'displayName': displayName}});
    }
  }
});

