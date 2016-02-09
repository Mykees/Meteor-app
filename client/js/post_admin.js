//POST LIST
Template.admin.helpers({
    posts: function(){
        return Posts.find({});
    }
});

// NEW POST
Template.post_new.events({

    "submit #new-post": function(event){
        event.preventDefault();
        var post = {
            name: $('#name').val(),
            slug: $('#slug').val(),
            content: $('#content').val(),
            online: $('#online').is(':checked'),
            date: $('#date').val()
        };

        Meteor.call('newPost', post, function(error,result){
            if(!error){
                Router.go('/admin');
            }else{
                var validator = $( "#new-post" ).validate();

                if(error.details == "title"){
                    validator.showErrors({
                      "name": "Title must be unique."
                    });
                }else{
                    validator.showErrors({
                      "slug": "Slug must be unique."
                    });
                }
            }
        });
    }

});

//EDIT POST
Template.post_edit.events({

    "submit #new-post": function(event, template){
        event.preventDefault();
        var id = template.data._id;
        var post = {
            name: $('#name').val(),
            slug: $('#slug').val(),
            content: $('#content').val(),
            online: $('#online').is(':checked'),
            date: $('#date').val()
        };

        Meteor.call('editPost', id, post, function(error,result){
            if(!error){
                Router.go('/admin');
            }
        });

    }

});