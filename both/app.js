/*****************************************************************************/
/* App: The Global Application Namespace */
/*****************************************************************************/
App = {};

App.isAdmin = function(id) {
  return Roles.userIsInRole(id, ['admin'], 'permissions');
};

App.isAgent = function(id) {
  return Roles.userIsInRole(id, ['agent'], 'permissions');
};

App.isVisitor = function(id) {
  return Roles.userIsInRole(id, ['visitor'], 'permissions');
};

App.checkIsAdmin = function(id) {
  if (!App.isAdmin(id)) {
    throw new Meteor.Error(403, 'Insufficient permissions.');
  }
};

App.checkIsAgent = function(id) {
  if (!App.isAgent(id)) {
    throw new Meteor.Error(403, 'Insufficient permissions.');
  }
};


App.flashResult = function(error, id) {
  if (id) {
    var element = '#' + id;
    $(element).addClass('bg-success');
    Meteor.setTimeout(function() {$(element).removeClass('bg-success');}, 6000);
  } else {
    alert(error);
  }
};

App.scrollToBottom = function(element) {
  setTimeout(function() {
    if ($(element)) {
      $(element).scrollTop($(element)[0].scrollHeight);
    }
  },
  50);
};

