const mongoose = require('mongoose');
const DATABASE_CONNECTION = 'mongodb://mongo/miBBDD';

var Schema = mongoose.Schema({
    name: String
});

Usuario = exports.Usuario = mongoose.model('Usuario', Schema);

exports.initializeMongo = function(){
    mongoose.connect(DATABASE_CONNECTION, {useNewUrlParser: true});

    console.log('Trying to connect to ' + DATABASE_CONNECTION);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error: We might not be as connected as I thought'));
    db.once('open', function(){
        console.log('Estamos conectados a la base de datos!');
        addNewUser();
    });
}

var addNewUser = function(){
    var nuevoUsuario = new Usuario({
        name: 'Egoi' + 1
    });
    nuevoUsuario.save(function (err, fluffy){
        if (err) return console.error(err);
        console.log('There is a new random cat in the neighborhood');
    });
}