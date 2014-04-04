Presence.state = function() {
  return {
    online: true,
    displayName: Session.get('displayName'),
    currentStream: Session.get('currentStream'),
    skills: Session.get('skills'),
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

