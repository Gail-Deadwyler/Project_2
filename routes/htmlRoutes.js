var db = require(`../models`);
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.get(`/`, function(req, res) {

        if (req.user) {
            res.redirect(`dashboard`);
        }

        res.render(`loginpage`);

    });

    app.get(`/register`, function(req, res) {

        res.render(`registerpage`);

    })

    app.get(`/dashboard`, isAuthenticated, function(req, res) {

        if (req.user) {

            db.User.findOne({
                where: {
                    id: req.user.id
                }
            }).then(function(user) {
                res.render(`dashboard`, {
                    user: user
                });
            });

        }

        res.render(`loginpage`);

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