Template.post_new.onRendered(function(){

    $.validator.addMethod("slugifyRegex", function(value, element) {
        return this.optional(element) || /^[a-z0-9\-]+$/g.test(value);
    });

    $('#new-post').validate({
        rules: {
            name: {
                required: true,
                minlength: 6
            },
            slug: {
                slugifyRegex: true,
                minlength: 2
            },
            createdAt: {
                required: true
            }
        },
        messages: {
            name: {
                required: "You must enter a title."
            },
            createdAt: {
                required: "A date is required"
            },
            slug: {
                slugifyRegex: "Slug must contain only letters, numbers, or dashes."
            }
        }
    });
});

//LOGIN
Template.login.onRendered(function(){

    $('#login').validate({
        rules: {
            username: {
                required: true
            },

            password: {
                required: true
            }
        },
        messages: {
            username: {
                required: "An username is required."
            },
            password: {
                required: "A password is required"
            }
        }
    });
});

//REGISTER
Template.register.onRendered(function(){

    $('#register').validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true,
                minlength : 5
            },
            password_confirm: {
                minlength : 5,
                required: true,
                equalTo: "#password"
            }
        },
        messages: {
            username: {
                required: "An username is required."
            },
            password: {
                required: "A password is required"
            },
            password_confirm: {
                required: "A password is required"
            }
        }
    });
});
