var gulp = require("gulp");
var browserify = require("browserify");
//var d3 = require("d3");
var transform = require("vinyl-transform");
var exec = require("child_process").exec;

/*
 Following the example at:
 https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
 This version removes the need for plugins to run gulp tasks, instead
 using vinyl-transform to handle conversions between streams and buffers.
*/
gulp.task("browserify", function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
	b.exclude("d3");
    return b.bundle();
  });

  //replace below path with page-specific paths
  return gulp.src(["./src/js/main.js"]) 
    .pipe(browserified)
    .pipe(gulp.dest("dist/js"));
});

gulp.task("vendorify", function() {
	var cmd = "browserify -r d3 > dist/d3.js";
	console.log("calling: " + cmd);
	exec(cmd, execCallback);
});

gulp.task('copy', function() {
	gulp.src('src/**/index.html')
	 .pipe(gulp.dest('dist'));
	gulp.src('src/assets/**/*.*')
	 .pipe(gulp.dest('dist/assets'));
});

gulp.task('build', ['browserify','copy'], function() {
	console.log("Build done.");
});

gulp.task('default', ['browserify','copy'], function() {
	console.log("Build done. Watching... Ctrl+C to exit.");
	gulp.watch("src/**/*.*", ['browserify', 'copy']);
});

gulp.task("test", function() {
	//assumes that jasmine is installed globally
	var cmd = "jasmine";
	console.log("calling: " + cmd);
	exec(cmd, execCallback);
});

function execCallback(error, stdout, stderr) {
	console.log(stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
	  console.log('exec error: ' + error);
	}
}

gulp.task("trial", function() {
	console.log(process.env);
});
