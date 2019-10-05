$(function () {

    // Create new user
    $(`#create-form`).on(`submit`, function (event) {

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
            loginUser(newUser.username, newUser.password);
        });

    });


    // loginUser does a post to our "api/login" route and if successful, redirects us the the members/dashboard page
    function loginUser(username, password) {
        $.post("/api/loginpage", {
            username: username,
            password: password
        }).then(function (data) {
            window.location.replace(data);
            // If there's an error, log the error
        }).catch(function (err) {
            console.log(err);
        });
    }

});