$(function() {

        // Create new user
        $(`#create-form`).on(`submit`, function(event) {

            event.preventDefault();
    
            var newUser = {
    
                firstName: $(`#new-user-firstName`).val().trim(),
                lastName: $(`#new-user-lastName`).val().trim(),
                email: $(`#new-user-email`).val().trim(),
                username: $(`#new-user-username`).val().trim(),
                password: $(`#new-user-password`).val().trim()
    
            }

            console.log(newUser);
    
            $.ajax(`/api/users`, {
                type: `POST`,
                data: newUser
            }).then((user) => {
                location.replace(`./dashboard/`);
            });
    
        });

});