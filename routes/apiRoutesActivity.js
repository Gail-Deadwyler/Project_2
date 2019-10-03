var db = require(`../models`);
var sequelize = require(`sequelize`);

module.exports = function (app) {

    // Activity API

    app.get(`/api/activities/:userId?`, function (req, res) {

        if (!req.params.userId) {

            db.Activity.findAll({}).then(function (activities) {
                res.json(activities);
            });

        } else {

            db.Activity.findAll({
                where: {
                    UserId: req.params.userId
                }
            }).then(function (activities) {
                res.json(activities);
            });

        }

    });


    app.get(`/api/activities/sum/:activityType`, function (req, res) {

        db.Activity.findAll(
            {
                attributes: [`UserId`, [sequelize.fn(`sum`, sequelize.col(`units`)), `sumUnits`], `User.username`],
                include: [{
                    model: db.User
                }],
                group: `UserId`,
                where: {
                    type: req.params.activityType
                }
            }).then(function (sum) {
                res.json(sum)
            });

    });


    app.post(`/api/activities`, function (req, res) {

        db.Activity.create({
            title: req.body.title,
            type: req.body.type,
            units: req.body.units,
            UserId: req.body.UserId
        }).then(function (activity) {
            res.json(activity);
        });

    });


    app.put(`/api/activities/:id`, function (req, res) {
        db.Activity.update({
            title: req.body.title,
            type: req.body.type,
            units: req.body.units
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (activity) {
            res.json(activity);
        })
    });


    app.delete(`/api/activities/:id`, function (req, res) {
        db.Activity.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (activity) {
            res.json(activity);
        });
    });


}