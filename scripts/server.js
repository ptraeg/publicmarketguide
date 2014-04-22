var express = require( 'express' );
var path = require('path');
var format = require('util').format;

var app = express();

app.configure( function () {
	app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser({
		uploadDir: __dirname + '/tmp'
	}) );//,
	//);
} );

app.get('/files', function(req, res){
	res.send('<form method="post" enctype="multipart/form-data">'
		+ '<p>Title: <input type="text" name="title" /></p>'
		+ '<p>Image: <input type="file" name="attachmentFile" /></p>'
		+ '<p><input type="submit" value="Upload" /></p>'
		+ '</form>');
});

app.post('/files', function(req, res, next){
	// the uploaded file can be found as `req.files.image` and the
	// title field as `req.body.title`
	/*res.send(format('\nuploaded %s (%d Kb) to %s as %s'
		, req.files.image.name
		, req.files.image.size / 1024 | 0
		, req.files.image.path
		, req.body.title));*/

	var filename = req.files.attachmentFile.path;
	if ( filename.trim().length !== 0 ){
		var split = filename.split( "/" );
		if ( split.length > 0 ){
			filename = split[ split.length - 1 ];
		}
	}
	res.send({
		id: Math.random() * 5000,
		url: '/scripts/tmp/' + filename,
		filename: filename
	});
});

app.use(express.static(path.join(__dirname, '../')));

app.listen( 8080 );
console.log( 'Listening on port 8080...' );