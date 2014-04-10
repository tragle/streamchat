Meteor.setInterval(function() {
  if (Meteor.user()) {
    Meteor.call('keepalive');
  }
}, 1000);

Deps.autorun(function() {
  var state = {};
  if (Meteor.user()) {
    state.chatFocusName = Session.get('chatFocusName');
    state.sendTo = Session.get('sendTo');
    state.issue = Session.get('issue');
    state.currentGroup = Session.get('currentGroup');
    state.waitingSince = Session.get('waitingSince');
    state.lastResponseFrom = Session.get('lastResponseFrom');
    state.skills = Meteor.user().roles.skills ? Meteor.user().roles.skills : [];
    state.displayName = Meteor.user().profile.displayName;
    state.updated = (new Date()).getTime() 
    Meteor.call('updateState', state);
  }
});

Deps.autorun(function() {
  var typingMessage = Session.get('typingMessage');
  Meteor.call('setTyping', typingMessage);
});

Deps.autorun(function() {
  if (!Meteor.user()) {
    for (var p in Session) {
      Session.set(p, null);
    }
  }
});
