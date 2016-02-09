Router.route('/',{
    data: function(){
        document.title = "Blog";
        this.render('post_list');
    }
},{
    name: "home"
});

Router.route('/blog/:slug',{
  template: "post_show",

  subscriptions: function(){
    return Meteor.subscribe('post',this.params.slug);
  },
  data: function() {
    var slug = this.params.slug;
    var post = Posts.findOne({slug:slug, online:1});
    return post;
  },

  onAfterAction: function(){
    if (this.ready()) {
        var postFound = this.data();
        if (!postFound || postFound === undefined) {
          this.render('post_error');
        }
    }
  }

},{
    name: "show"
});


//ADMIN ROUTES
Router.route('/admin',{
    onBeforeAction: function () {
      if ( !Meteor.userId() ) {
        return Router.go('/');
      } else {
        this.render();
      }
    },
    waitOn: function(){
      return Meteor.subscribe('allPostsAdmin');
    },
    data: function(){
        document.title = "Admin";
        this.render('admin');
    }
},{
    name:"admin"
},{
    name: "post_admin"
});

Router.route('/admin/new_post',{
    onBeforeAction: function () {
      if ( !Meteor.userId() ) {
        Router.go('/');
      } else {
        this.next();
      }
    },
    action: function(){
      document.title = "Admin | Create new post";
      this.render('post_new');
    }
},{
    name: "post_admin.add"
});

Router.route('/admin/:_id/edit',{
    template: 'post_edit',

    onBeforeAction: function () {
      if ( !Meteor.userId() ) {
        Router.go('/');
      } else {
        this.next();
      }
    },

    subscriptions: function(){
      return Meteor.subscribe('editPost',this.params._id);
    },

    data: function() {
        var post = Posts.findOne(this.params._id);
        if(post){
            document.title = "Admin | "+post.name;
            if(post.online){
                post.online = true;
            }else{
                post.online = false;
            }
            return post;
        }else{
            console.log('prout!');
        }
    }

},{
    name: "post_admin.edit"
});

Router.route('/admin/:_id/delete',{

    onBeforeAction: function () {
      if ( !Meteor.userId() ) {
        Router.go('/');
      } else {
        this.next();
      }
    },
    action:function(){
      var params = this.params;
      Meteor.call('deletePost',{_id: params._id},function(error, result){});

      return Router.go('admin');
    }
},{
    name: "post_admin.delete"
});


Router.route('/login', function(){
  this.render('login');
},{
    name:"login"
});

Router.route('/register', function(){
  this.render('register');
},{
    name:"register"
});