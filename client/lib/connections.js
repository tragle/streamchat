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
    Meteor.call('updateState', state.currentGroup, state);
  }
});

Deps.autorun(function() {
  var typingMessage = Session.get('typingMessage');
  Meteor.call(
    'setTyping', 
    Session.get('currentGroup'), 
    Session.get('typingMessage'), 
    Session.get('chatFocusName'),
    Session.get('sendTo')
  );
});

Deps.autorun(function() {
  if (!Meteor.user()) {
    for (var key in Session.keys) {
      Session.set(key, '');
    }
  }
});

 Meteor.setInterval(function() {
  if (Meteor.user() && Session.get('currentGroup')) {
    Meteor.call('keepAlive', function(error, success) {
      if (!success && App.isVisitor(Meteor.userId())) {
        Meteor.logout();
      }
    });
  }
}, 1000);


