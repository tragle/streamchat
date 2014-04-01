/*****************************************************************************/
/* App: The Global Application Namespace */
/*****************************************************************************/
App = {};

App.Stream = function() {
    this.name = '';
    this.isFixed = false;
    this.maxPerAgent = 0;
    this.maxQueue = 0;
};

App.Message = function() {
    this.stream = '';
    this.from = '';
    this.to = '';
    this.body = '';
    this.senderName = '';
    this.isVisitor = false;
    this.isDraft = false;
    this.date = new Date;
};

App.User = function() {
    this.username = '';
    this.profile = {
        displayname: '',
        currentStream: '',
        fixedStream: '',
        typing: ''
    };
};

