var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var app        = express();

app.use(cookieParser());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));
app.use(function(req, res){
	res.sendFile(path.join(__dirname, '../public'));
});

app.get('/download', function(req, res) {
	var filename = req.query.filename;

	var file = __dirname + '/../public/downloads/hello.docx';

	var referer = req.header('Referer');

	if (referer) {
		res.cookie('Referer', referer, { maxAge: 900000, httpOnly: false });
	}

	res.setHeader('Content-type', 'text/html');
	res.download(file, filename + '.docx');

});

app.listen(3030, function() {
	console.log('Server start http://localhost:3030');
});
