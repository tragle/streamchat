Presence.state = function() {
  return {
    online: true,
    displayName: Session.get('displayName'),
    currentStream: Session.get('currentStream'),
    skills: Session.get('skills'),
    typingMessage: Session.get('typingMessage'),
    sendTo: Session.get('sendTo')
  };
};

Deps.autorun(function() {
  var user = Meteor.user();
  if (user) {
    Session.set('displayName', user.profile.displayName);
    Session.set('skills', user.roles.skills);
  }
});

