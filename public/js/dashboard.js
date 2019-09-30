$(function() {

    $(document).ready(function() {

        var id = $(`#welcome-text`).data(`id`);


        // Populate competitor info
        $.ajax(`/api/users`, {
            type: `GET`
        }).then((data) => {

            data.forEach(user => {
                if (user.id!==id) {

                    var userInfo = `<li id="user-li-${user.id}" data-user=${user.id}>${user.username}</li>`;
                    $(`#competitors`).append(userInfo);

                    $.ajax(`/api/activities/${user.id}`, {
                        type: `GET`
                    }).then((data) => {

                        if (data.length > 0) {
    
                            var type = {
    
                                userId: data[0].UserId,
                                Steps: 0,
                                Hours: 0,
                                Miles: 0,
                                Yards: 0
    
                            };
    
                            data.forEach((activity) => {
                                type[activity.type] += activity.units;
                            });
    
                            var userUnits = `
                            <ul>
                                <li>Steps: ${type.Steps}</li>
                                <li>hours: ${type.Hours}</li>
                                <li>miles: ${type.Miles}</li>
                                <li>yards: ${type.Yards}</li>
                            </ul>
                            `;

                            $(`#user-li-${type.userId}`).append(userUnits);

                        }

                    });

                }
            });

        });


        // Get my activities
        $.ajax(`/api/activities/${id}`, {
            type: `GET`
        }).then((data) => {

            data.forEach(activity => {

                var editActivity = `<a href="/editActivity/${activity.id}">Edit</a>`;
                var deleteActivity = `<a class="delete-activity" data-id="${activity.id}" href="">Delete</a>`;
                var activity = 
                `<li data-activity=${activity.id}>
                    ${activity.title} 
                    <ul>
                        <li>
                            ${activity.type}: ${activity.units}
                        </li>
                    </ui>
                    ${editActivity} | ${deleteActivity}
                </li>`;
                $(`#my-activities`).append(activity);

            });

        });

    });


    // Create new activity
    $(`#create-form`).on(`submit`, function(event) {

        event.preventDefault();

        var userId = $(`#welcome-text`).data(`id`);

        var newActivity = {

            title: $(`#new-activity-title`).val().trim(),
            type: $(`#new-avtivity-type`).val(),
            units: $(`#new-activity-amount`).val().trim(),
            UserId: userId

        }

        $.ajax(`/api/activities`, {
            type: `POST`,
            data: newActivity
        }).then(() => {
            location.reload();
        });

    });


    // Delete activity
    $(`.delete-activity`).on(`click`, function(event) {

        event.preventDefault();

        var activityId = $(this).data(`id`);

        $.ajax(`/api/activities/${activityId}`, {
            type: `DELETE`
        }).then(() => {
            location.reload();
        });

    });


});