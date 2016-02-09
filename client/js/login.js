Template.login.events({

    "submit #login": function(event){
        event.preventDefault();

        var username = $('#username');
        var passwd = $("#password");

        Meteor.loginWithPassword(username.val(), passwd.val(), function(err){
            if(err){
                console.log(err);
            }else{
                Router.go('/admin');
            }
        });

        return false;
    }
});