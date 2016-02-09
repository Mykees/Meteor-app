Meteor.subscribe('allPosts');
Template.post_list.helpers({
    posts: function(){
        return Posts.find({online: 1}, {$orderby: { createdAt : 1 }});
    }
});