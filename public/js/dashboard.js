$(function () {

    $(document).ready(function () {

        var id = $(`#welcome-text`).data(`id`);


        // Get my activities
        $.ajax(`/api/activities/${id}`, {
            type: `GET`
        }).then((data) => {

            data.forEach(activity => {



                var editActivity = `<a href="/editActivity/${activity.id}">Edit</a>`;
                var deleteActivity = `<a class="delete-activity" data-id="${activity.id}" href="">Delete</a>`;
                var activity =
                    `                
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row no-gutters">
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${activity.title}</h5>
                                <p>${activity.type}: ${activity.units}</p>
                                ${editActivity} | ${deleteActivity}     
                            </div>
                        </div>
                    </div>
                </div>
                `;

                $(`#my-activities`).prepend(activity);

                // Delete activity
                $(`.delete-activity`).on(`click`, function (event) {

                    event.preventDefault();

                    var activityId = $(this).data(`id`);

                    $.ajax(`/api/activities/${activityId}`, {
                        type: `DELETE`
                    }).then(() => {
                        location.reload();
                    });

                });

            });

        });

    });


    // Create new activity
    $(`#create-form`).on(`submit`, function (event) {

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





});