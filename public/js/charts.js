$(function () {

    $(document).ready(function () {

        var id = $(`#welcome-text`).data(`id`);

        // Get personal data in charts
        $.ajax(`/api/activities/${id}`, {
            type: `GET`
        }).then((activities) => {
            var data = parseLineData(activities);
            Object.keys(data).forEach((activityType => {
                makeLineChart(data[activityType], activityType);
                initiateBarChart(activityType)
            }))
        });

    });


    function initiateBarChart(activityType) {

        // Get competition data in charts
        $.ajax(`/api/activities/sum/${activityType}`, {
            type: `GET`
        }).then((sum) => {
            makeBarChart(sum, activityType);
        });

    }


    function parseBarData(dataObject) {

        var parsedObject = {
            users: [],
            units: []
        };
        
        var len = dataObject.length > 2 ? 3 : 2;
        
        for (var i=0; i < len; i ++) {
            parsedObject.users.push(dataObject[i].User.username);
            parsedObject.units.push(parseInt(dataObject[i].sumUnits));
        }

        console.log(parsedObject);

        for (var i=1; i < parsedObject.units.length; i ++) {
            if (parsedObject.units[i] > parsedObject.units[i-1]) {
                // swap units
                var tempUnits = parsedObject.units[i];
                parsedObject.units[i] = parsedObject.units[i-1];
                parsedObject.units[i-1] = tempUnits; 
                // swap users
                var tempUser = parsedObject.users[i];
                parsedObject.users[i] = parsedObject.users[i-1];
                parsedObject.users[i-1] = tempUser;
            }
        }

        console.log(parsedObject);

        return parsedObject
        
    }


    function makeBarChart(dataObject, activityType) {
        var data = parseBarData(dataObject);
        var ctx = document.getElementById(`competitorChart-${activityType}`).getContext('2d');
        var myBarChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: data.users,
                datasets: [{
                    data: data.units
                }]
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: activityType,
                    position: `bottom`
                }
            }
        });
    }


    function makeLineChart(dataObject, activityType) {

        var ctx = document.getElementById(`myChart-${activityType}`).getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: dataObject.labels,
                datasets: [
                    {
                        data: dataObject.data
                    }
                ]
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false
                }
            }
        });

    }


    function parseLineData(jsonData) {

        var data = {
            Steps: {
                labels: [],
                data: []
            },
            Hours: {
                labels: [],
                data: []
            },
            Miles: {
                labels: [],
                data: []
            },
            Yards: {
                labels: [],
                data: []
            }
        };

        jsonData.forEach(activity => {

            data[activity.type].labels.push(formatShortDate(activity.createdAt));
            data[activity.type].data.push(activity.units);

        });

        return data

    }


    function formatShortDate(dateString) {

        var date = new Date(dateString);

        var shortDate = `${date.getMonth() + 1}/${date.getDate()}`

        return shortDate

    }


});