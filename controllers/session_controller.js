exports.new = function (req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};
    res.render('sessions/new', { errors: errors});
};

/*
exports.create = function (req, res) {
    var login = req.body.login;
    var password = req.body.password;

    console.log('login: '+login);
    console.log('pass: '+password);
    var userController = require('./user_controller');

    console.log(userController);
    console.log(userController.autenticar);
    userController.autenticar(login, password, function (error, user) {
        if (error) {
            req.session.errors = [{"message": 'Se ha producido un error:' + error}];
            res.redirect('/login');
            return;
        }

        req.session.user = { id: user.id,  username: user.username };

        res.redirect(req.session.redir.toString());

    });
};*/


exports.create = function(req, res) {

    var login     = req.body.login;
    var password  = req.body.password;

    var userController = require('./user_controller');
    userController.autenticar(login, password, function(error, user) {

        if (error) {  // si hay error retornamos mensajes de error de sesión
            req.session.errors = [{"message": 'Se ha producido un error: '+error}];
            res.redirect("/login");
            return;
        }

        // Crear req.session.user y guardar campos   id  y  username
        // La sesión se define por la existencia de:    req.session.user
        req.session.user = {id:user.id, username:user.username};

        res.redirect(req.session.redir.toString());// redirección a path anterior a login
    });
};


exports.destroy =function(req, res){
    delete req.session.user;
    res.redirect(req.session.redir.toString());
};



