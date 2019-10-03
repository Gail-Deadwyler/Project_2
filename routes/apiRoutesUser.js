var db = require(`../models`);
var passport = require("../config/passport");

module.exports = function(app) {

    // User API

    app.post(`/api/loginpage`, passport.authenticate(`local`), function(req, res) {
        res.json(`dashboard`);
    });

    app.get(`/api/users/`, function(req, res) {
        db.User.findAll({}).then(function(users) {
            res.json(users);
        });
    });

    app.get(`/api/users/:id`, function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(user) {
            res.json(user);
        });
    });

    app.post(`/api/users/`, function(req, res) {
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }).then(function(user) {
            res.json(user);
        });
    });

    // Route for logging user out - works
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

    app.delete(`/api/users/:id`, function(req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(user) {
            res.json(user);
        });
    });

    app.put('/api/burgers/', function(req, res) {
        db.User.update({
            email: req.body.email,
            username: req.body.username,
            password: req.user.password
        }, {
            where: {
                id: req.body.id
            }
        }).then(function(user) {
            res.json(user);
        });
    });



}