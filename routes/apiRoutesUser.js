var db = require(`../models`);

module.exports = function(app) {

    // User API

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
            email: req.body.email,
            username: req.body.username,
            password: req.user.password
        }).then(function(user) {
            res.json(user);
        });
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