var gulp   = require('gulp'),
	path   = require('path')
;

gulp.task('bundle', function() {
	var filename = path.join(__dirname, './src/client.js');

	gulp.src(filename)
		.pipe(gulp.dest('./public/js/'))
	;
});
gulp.task('default', ['bundle'], function(){
	require('./src/server.js');
});
