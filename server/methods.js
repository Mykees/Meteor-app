function slugify(text){
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')
    ;// Trim - from end of text
}

Meteor.methods({

    newPost: function(post){
        if(post.slug === ""){
            post.slug = slugify(post.name);
        }else{
            post.slug = slugify(post.slug);// Trim - from end of text
        }
        if(post.online){
            post.online = 1;
        }else{
            post.online = 0;
        }

        var postExist = Posts.findOne({ $or:[{slug: post.slug},{name: post.name}] });

        if(!postExist){
            var newPost = Posts.insert({name:post.name,slug:post.slug,content:post.content,online: post.online, createdAt: post.date});

            return newPost;
        }else{
            if(postExist.name == post.name){
                throw new Meteor.Error( 500, 'This title exist',"title");
            }else{
                throw new Meteor.Error( 500, 'This slug exist',"slug");
            }
        }
    },

    editPost: function(id, post){
        if(post.online){
            post.online = 1;
        }else{
            post.online = 0;
        }

        return Posts.update({_id:id},{$set:{name:post.name,slug:post.slug,content:post.content,online: post.online, createdAt: post.date}});
    },

    deletePost: function(post){
        return Posts.remove({_id:post._id});
    }

});