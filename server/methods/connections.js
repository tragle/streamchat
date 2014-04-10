Meteor.methods({
  updateState: function(state) {
    if (this.userId) {
      var newState = {};
      if (App.isVisitor(this.userId)) {
        newState.isVisitor = true;
      } else {
        newState.isVisitor = false;
      }
      newState.updated = (new Date()).getTime();
      if (state) {
        newState = _.extend(newState, state);
      }
      return Connections.upsert({'_id': this.userId}, {$set: newState});
    } 
  },
  keepAlive: function() {
    if (this.userId) {
      return Connections.upsert({'_id': this.userId}, {$set: {updated: (new Date()).getTime() }});
    }
  },
  setTyping: function(message) {
    Connections.update({_id: this.userId}, {$set: {typingMessage: message}});
  }
});

