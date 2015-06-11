/*var users = {
    admin: {
        id: 1,
        username: 'admin',
        password: '1234'
    },
    pepe: {
        id: 2,
        username: 'pepe',
        password: '1234'
    }
};



exports.autenticar = function (login, password,user, callback) {
    console.log('loginUser: '+login);
    console.log('passwordUser'+password);
    console.log('userUser'+user);
    console.log('callback'+callback);
    if (user[login]) {
        if (password === users[login].password) {
            callback(null, users[login]);
        } else {
            callback(new Error('Password erróneo.'));
        }

    } else {
        callback(new Error('No existe el usuario.'));
    }
};
*/



var users = {admin: {id:1, username:"admin", password:"1234"},
             pepe:  {id:2, username:"pepe",  password:"5678"}
};

exports.autenticar = function(login, password, callback){
  if (users[login]){
      console.log("login");
    if(password === users[login].password){
      callback(null, users[login]);
    }
    else {callback (new Error('Password Erroneo'));}
  }else {callback (new Error ('No existe el usuario'));}
};


