$(document).ready(function() {
    // Getting references to our form and inputs
    var signUpForm = $("form.register");
    var firstnameInput = $("input#firstname-input");
    var lastnameInput = $("input#lastname-input");
    var emailInput = $("input#email-input");
    var usernameInput = $("input#username-input");
    var passwordInput = $("input#password-input");
  
    // When the signup button is clicked, we validate the fields are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        firstname: firstnameInput.val().trim(),
        lastname: lastnameInput.val().trim(),
        email: emailInput.val().trim(),
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.username || !userData.password) {
        return;
      }
      // If we have an username and password, run the signUpUser function and clear out the fields
      signUpUser(userData.username, userData.password);
      firstnameInput.val("");
      lastnameInput.val("");      
      emailInput.val("");
      usernameInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If succesful, we are redirected to the members/dashboard page
    // Otherwise we log any errors
    function signUpUser(username, password) {
      $.post("/api/registerpage", {
        username: username,
        password: password
      }).then(function(data) {
        console.log("Data is  " , data);
        window.location ='/members';
        // window.location.replace(data);
        // If there's an error, handle it by throwing up a boostrap alert
      }).catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  