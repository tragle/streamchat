Meteor.Presence.state = function() {
  return {
    online: true,
    displayName: Meteor.user() ? Meteor.user().profile.displayName : null,
    skills: Meteor.user() ? Meteor.user().roles.skills: null,
    currentStream: Session.get('currentStream'),
    typingMessage: Session.get('typingMessage'),
    chatFocus: Session.get('chatFocus')
  };
};

Deps.autorun(function() {
  var user = Meteor.user();
  if (user) {
    if (user.profile) {
      Session.set('displayName', user.profile.displayName);
    }
    if (user.roles) {
      Session.set('skills', user.roles.skills);
    }
  }
});

