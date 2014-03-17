var User = require("./models/user.js");

module.exports = function(app) {
	app.route('/api/users')
		.get(function(req, res) {
			User.find(function(err, users) {
				if(err) res.send(err);
				res.json(users);
			});
		})
		.post(function(req, res) {
			new User({
				username: req.body.username,
				name: {
					first: req.body.firstName,
					last: req.body.lastName
				}
			}).save(function(err) {
				if(err) res.send(err);
				User.find(function(err, users) {
					if(err) res.send(err);
					res.json(users);	
				});
			});
		})
		.put(function(req, res) {
			User.findById(req.body._id, function(err, user) {
				user.username = req.body.username;
				user.name.first = req.body.firstName;
				user.name.last = req.body.lastName;
				user.save(function(err) {
					if(err) res.send(err);
					User.find(function(err, users) {
						if(err) res.send(err);
						res.json(users);	
					});
				});
		});
	});

	app.route('/api/users/:id')
		.get(function(req, res) {
			User.findById(req.params.id, function(err, user) {
				if(err) res.send(err);
				res.json(user);
			});
		})
		.delete(function(req, res) {
			User.findById(req.params.id, function(err, user) {
				user.remove(function(err) {
					if(err) res.send(err);
					User.find(function(err, users) {
						if(err) res.send(err);
						res.json(users);	
					});
				});
			});
	});

	app.route('*').get(function(req, res) {
		res.sendfile('./public/index.html');
	});
};