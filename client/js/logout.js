Template.header_admin.events({
  "click #logout": function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  },
});