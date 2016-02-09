Meteor.publish('allPosts', function() {
  return Posts.find({ online:1 });
});
Meteor.publish('post', function(slug) {
  return Posts.find({ slug: slug, online:1 });
});
Meteor.publish('allPostsAdmin', function() {
  return Posts.find();
});
Meteor.publish('editPost', function(_id) {
  if (this.userId) {
    return Posts.find({ _id: _id });
  } else {
    return [];
  }
});