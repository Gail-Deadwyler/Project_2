var db = require(`../models`);

module.exports = function(app) {

    app.get(`/`, function(req, res) {

        res.render(`loginpage`);

    });

    app.get(`/register`, function(req, res) {

        res.render(`registerpage`);

    })

    app.get(`/dashboard/:id?`, function(req, res) {

        try {

            if (!req.params.id) throw `No ID passed - redirect to login.`;

            db.User.findOne({
                where: {
                    id: req.params.id
                }
            }).then(function(user) {
                res.render(`dashboard`, {
                    user: user
                });
            });

        } catch (err) {

            console.log(err);

            res.redirect(`/`);

        }

    });


    app.get(`/editActivity/:activityId`, function(req, res) {
        db.Activity.findOne({
            where: {
                id: req.params.activityId
            }
        }).then(function(activity) {
            res.render(`editActivity`, {
                activity: activity
            });
        });
    });

}