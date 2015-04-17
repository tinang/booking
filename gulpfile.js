"use strict";

/* global console, require, __dirname */

var path                = require("path");
var gulp                = require("gulp");
var browserSync         = require("browser-sync");
var jshint              = require("gulp-jshint");
var modRewrite          = require("connect-modrewrite");
var webpack             = require("gulp-webpack");
var gIf                 = require("gulp-if");
var templateCache       = require("gulp-angular-templatecache");
var autoprefixer        = require("gulp-autoprefixer");
var sass                = require("gulp-ruby-sass");
var combineMediaQueries = require("gulp-combine-media-queries");
var cssimport           = require("gulp-cssimport");
var csso                = require("gulp-csso");

var webpackConfig = {
  context: path.join(__dirname, "dist"),
  cache:   true,
  bail:    true,
  devtool: "source-map",
  output:  {
    path:                          path.join(__dirname, "src"),
    filename:                      "app.js",
    chunkFilename:                 "[chunkhash].js",
    devtoolModuleFilenameTemplate: "[resource-path]?[hash]"
  },
  resolve: {
    root: "src",
    alias: {
      "angular":           "bower_components/angular/angular.js",
      "angular-sanitize":  "bower_components/angular-sanitize/angular-sanitize.js",
      "ui-router":         "bower_components/ui-router/release/angular-ui-router.js",
      "angular-bootstrap": "bower_components/angular-bootstrap/ui-bootstrap-tpls.js", 
    }
  },
  plugins: [
    new webpack.webpack.optimize.DedupePlugin()
  ]
};

gulp.task("jshint", function () {
  return gulp.src(["src/**/*.js"])
    .pipe(jshint())
    .pipe(gIf(!browserSync.active, jshint.reporter("fail")));
});

gulp.task("copy", function() {
  return gulp.src(["src/index.html"]).pipe(gulp.dest("dist"));
});

gulp.task("dummy", function() {
  return gulp.src(["dummy/**"]).pipe(gulp.dest("dist/dummy"));
});

var watching = false;
gulp.task('webpack', function() {
  if( ! watching) {
    /* UglifyJSPlugin is expensive, only run when we do not watch */
    webpackConfig.plugins.push(new webpack.webpack.optimize.UglifyJsPlugin());
  }

  var pack = gulp.src("src/app.js")
    .pipe(webpack(webpackConfig));

  if(watching) {
    /* Do not crash gulp when watching */
    pack.on("error", function(err) {
      console.error(err.message);

      /* Keeps the pipe alive, despite the error, allowing webpack to
         resume packing upon new modified files */
      this.emit('end');
    });
  }

  return pack.pipe(gulp.dest("dist/"));
});

gulp.task("fonts", function () {
  gulp.src(["src/bower_components/bootstrap-sass-official/assets/fonts/bootstrap/**"]).pipe(gulp.dest("dist/fonts/bootstrap"));
  return gulp.src(["src/fonts/**"]).pipe(gulp.dest("dist/fonts"));
});

gulp.task("templates", function() {
  return gulp.src(["src/**/*.html", "!src/bower_components/**/*"])
    .pipe(templateCache({
      module: "bookingApp",
      base:   path.join(__dirname, "src"),
      templateHeader: "\"use strict\"; angular.module(\"<%= module %>\"<%= standalone %>).run([\"$templateCache\", function($templateCache) {"
    }))
    .pipe(gulp.dest("dist"));
});

gulp.task("styles", function () {
  return sass("src/styles/components.scss", {
      style: "compressed",
      precision: 3,
      loadPath: ["src/styles"]
    })
    .on("error", console.error.bind(console))
    .pipe(autoprefixer({
      browsers: [
        "ie >= 9",
        "ie_mob >= 10",
        "ff >= 30",
        "chrome >= 34",
        "safari >= 7",
        "opera >= 23",
        "ios >= 7",
        "android >= 4.4",
        "bb >= 10"
      ]
    }))
    .pipe(combineMediaQueries())
    .pipe(cssimport())
    .pipe(csso())
    .pipe(gulp.dest("dist"));
});

// Watch Files For Changes & Reload
gulp.task("serve", function () {
  watching = true;

  browserSync({
    notify: false,
    server: {
      baseDir: ["dist"],
      middleware: [
        modRewrite([
          "^[^\\.]*$ /index.html [L]"
        ])
      ]
    }
  });

  gulp.watch(["src/**/*.html"], ["templates"]);
  gulp.watch(["src/index.html"], ["copy"]);
  gulp.watch(["src/app.js"], ["webpack", "jshint"]);
  gulp.watch(["src/**/*.js"], ["webpack", "jshint"]);
  gulp.watch(["src/styles/**/*.scss"], ["styles"], browserSync.reload);
  gulp.watch(["dist/app.js", "dist/templates.js", "dist/index.html"], browserSync.reload);
});

gulp.task("default", ["webpack", "templates", "styles", "fonts", "copy", "dummy"]);
