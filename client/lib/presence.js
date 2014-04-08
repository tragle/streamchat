Meteor.Presence.state = function() {
  return {
    online: true,
    displayName: Session.get('displayName'),
    skills: Meteor.user() ? Meteor.user().roles.skills: null,
    currentGroup: Session.get('currentGroup'),
    typingMessage: Session.get('typingMessage'),
    chatFocus: Session.get('chatFocus'),
    chatFocusName: Session.get('chatFocusName'),
    waitingSince: Session.get('waitingSince'),
    isVisitor: Session.get('isVisitor'),
    responder: Session.get('lastResponseFrom')
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

