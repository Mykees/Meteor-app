Template.register.events({

    "submit #register": function(event){
        event.preventDefault();

        var username = $('#username');
        var passwd = $("#password");

        Accounts.createUser({username: username.val(), password : passwd.val()}, function(err){
          if (!err) {
            Router.go('/');
          }

        });

        return false;
    }
});