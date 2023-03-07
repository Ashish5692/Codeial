// function that send the data to controller function

{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        //whenever this form is submitted i did not want it to submit naturally so we will do prevent default
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),  //this converts the form data into json like content will be key and value will be value filled in the form
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost)

                },error: function(error){
                    console.log(error.responseText);
                }
            })

        });
    }
    
    //method to create a post in DOM-- we need a function that would help in converting this html text(copied) into jQuery object
    let newPostDom = function(post){
        return $(`<li id="post-${ post._id}"> 
            <p>
                    <small>
                            <a class="delete-post-button" href="/posts/destroy/${ post.id }>">X</a>
                    </small>
                    ${post.content }
                    <br>
                    <small>
                    ${ post.user.name }      
                    </small>
            </p> 
            <div class ="post-comments">
                  
                    <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Type Here to add comment..." required>
                            
                            <!--  we need to send the post id at which i need to add comment to.. -->
                            <input type="hidden" name="post" value="${post._id }">
                            <input type="submit" value="Add Comment">
                    </form>
        
                    <div class="post-comments-list">
                            <ul id="post-comments-${post._id }">  
                                    
                            </ul>
                    </div>
            </div>     
        </li>`)
    }

    createPost();
}