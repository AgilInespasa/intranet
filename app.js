"explicit strict";

var express = require('express'),
		path = require('path');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res, next) {
	res.render('index', {title: 'Index'});
});

app.get('/login', function(req, res, next) {
	res.render('/login', {title: 'Login'});
});

app.get('/produccion', function(req, res, next) {
	res.render('/produccion', {title: 'Busqueda de documentacion'});
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log('Server listening on port 3000');

