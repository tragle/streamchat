/*****************************************************************************/
/* App: The Global Application Namespace */
/*****************************************************************************/
App = {};

App.Group = function() {
  this.name = '';
  this.isFixed = false;
  this.maxPerAgent = 0;
  this.maxQueue = 0;
};

App.Message = function() {
  this.group = '';
  this.from = '';
  this.to = '';
  this.body = '';
  this.senderName = '';
  this.isVisitor = false;
  this.isDraft = false;
  this.date = new Date;
  this.expired = null;
};

App.User = function() {
  this.username = '';
  this.profile = {
    displayname: '',
    fixedGroup: '',
  };
};

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

App.flashResult = function(error, id) {
  if (id) {
    var element = '#' + id;
    $(element).addClass('success');
    Meteor.setTimeout(function() {$(element).removeClass('success');}, 6000);
  } else {
    alert(error);
  }
};

App.scrollToBottom = function(element) {
  setTimeout(function() {
    $(element).scrollTop($(element)[0].scrollHeight);},
    50);
};

