const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'roka'
});

connection.connect((err) => {
    if (err) throw err; //lanza una excepcion si hay error
    console.log('Conectado a la data de ROKA');
});

module.exports = connection;