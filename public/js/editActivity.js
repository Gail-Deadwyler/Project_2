$(function () {

    $(document).ready(function() {

        var userId = $(`#user-text`).data(`id`);

        $.ajax(`/api/users/${userId}`, {
            type: `GET`,
        }).then(function(user) {
            console.log(user.username)
            $(`#user-text`).append(user.username);
        });

    });


    $(`#edit-form`).on(`submit`, function (event) {

        event.preventDefault();

        var userId = $(`#user-text`).data(`id`);

        var activityId = $(`#activity-text`).data(`id`);

        var editActivity = {

            id: activityId,
            title: $(`#new-activity-title`).val().trim(),
            type: $(`#new-avtivity-type`).val(),
            units: $(`#new-activity-amount`).val().trim(),
            UserId: userId

        }

        $.ajax(`/api/activities/${activityId}`, {
            type: `PUT`,
            data: editActivity
        }).then(() => {
            location.reload();
        });

    });


});