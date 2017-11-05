/* This file contains the whole configuration for this express APP */
var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mysql = require('mysql'),
    connection = require('express-myconnection');

var app = express();
var students = require('./routes/student.route');
var path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.json());
/* Set the views default folder and the views engine */
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(connection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'qwertyuiop)(*&^%$#@!',
    database: 'nodebase'
}, 'request'));

/* Create the routes for the APP */
app.get('/', students.lists);
app.get('/students', students.lists);
app.get('/students/add', students.add);
app.get('/students/delete/:id', students.delete_customer);
app.get('/students/edit/:id', students.edit)

app.post('/students/save_edit/:id', students.save_edit);
app.post('/students/save', students.save)
app.listen(process.env.PORT || 3000);
console.log('listening on http://127.0.0.1:3000');