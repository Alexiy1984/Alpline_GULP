const { src, dest, watch, parallel, series } = require("gulp");

const sass = require('gulp-sass');
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const eslint = require("gulp-eslint");
const mocha = require("gulp-mocha");
const sync = require("browser-sync").create();


function generateCSS(cb) {
    src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('public/stylesheets'))
        .pipe(sync.stream());
    cb();
}

function generateHTML(cb) {
    src("./views/index.ejs")
        .pipe(ejs({ data: {
          title: "Some cool title",
          text: "Some text",
          heroCards: [
            {
              imgUrl: 'images/card_hero_1.jpg',
              author: 'Jane Cooper',  
              date: '3 Aug 20',
              title: 'You Don’t Need a Compass to Tell You Where You Are', 
              text: 'Peter yanked the curtain back, eager to see the dawn. Grace pulled the covers over her head.',
              categories: ['Fiction', 'Relationships', 'Hiking'],
              ttr: 7,
              views: '12,851'
            },
          ],
          smallCards: [
            {
              imgUrl: 'images/small_image_1.jpg',
              author: 'Theresa Webb',  
              date: '3 Aug 20',
              title: 'The three tenets of radical self-love', 
              text: 'The three tenets of radical self-love',
              categories: ['Book', 'Story'],
              ttr: 8,
              views: '12,851'
            },
            {
              imgUrl: 'images/small_image_2.jpg',
              author: 'Devon Lane',  
              date: '3 Aug 20',
              title: 'Imperfection is Perfect', 
              text: 'Imperfections are what make the world beautiful',
              categories: ['Technology'],
              ttr: 9,
              views: '12,851'
            },
            {
              imgUrl: 'images/small_image_3.jpg',
              author: 'Kathryn Murphy',  
              date: '3 Aug 20',
              title: 'China Ends Animal-Testing But It Won’t Help Cruelty-Free Brands', 
              text: 'I thought I was comfortable in assuming a role, but now I want something different.',
              categories: ['Food'],
              ttr: 11,
              views: '12,851'
            },
            {
              imgUrl: 'images/small_image_3.jpg',
              author: 'Jane Cooper',  
              date: '3 Aug 20',
              title: 'You Don’t Need a Compass to Tell You Where You Are', 
              text: 'Peter yanked the curtain back, eager to see the dawn. Grace pulled the covers over her head.',
              categories: ['Fiction', 'Relationships', 'Hiking'],
              ttr: 7,
              views: '12,851'
            },
            {
              imgUrl: 'images/small_image_3.jpg',
              author: 'Jane Cooper',  
              date: '3 Aug 20',
              title: 'You Don’t Need a Compass to Tell You Where You Are', 
              text: 'Peter yanked the curtain back, eager to see the dawn. Grace pulled the covers over her head.',
              categories: ['Fiction', 'Relationships', 'Hiking'],
              ttr: 7,
              views: '12,851'
            },
            {
              imgUrl: 'images/small_image_3.jpg',
              author: 'Jane Cooper',  
              date: '3 Aug 20',
              title: 'You Don’t Need a Compass to Tell You Where You Are', 
              text: 'Peter yanked the curtain back, eager to see the dawn. Grace pulled the covers over her head.',
              categories: ['Fiction', 'Relationships', 'Hiking'],
              ttr: 7,
              views: '12,851'
            },
            {
              imgUrl: 'images/small_image_3.jpg',
              author: 'Jane Cooper',  
              date: '3 Aug 20',
              title: 'You Don’t Need a Compass to Tell You Where You Are', 
              text: 'Peter yanked the curtain back, eager to see the dawn. Grace pulled the covers over her head.',
              categories: ['Fiction', 'Relationships', 'Hiking'],
              ttr: 7,
              views: '12,851'
            },
          ]
        }}))
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(dest("public"));
    cb();
}

function runLinter(cb) {
    return src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format()) 
        .pipe(eslint.failAfterError())
        .on('end', function() {
            cb();
        });
}

function runTests(cb) {
    return src(['**/*.test.js'])
        .pipe(mocha())
        .on('error', function() {
            cb(new Error('Test failed'));
        })
        .on('end', function() {
            cb();
        });
}

function watchFiles(cb) {
    watch('views/**.ejs', generateHTML);
    watch('sass/**.scss', generateCSS);
    watch([ '**/*.js', '!node_modules/**'], parallel(runLinter, runTests));
}

function browserSync(cb) {
    sync.init({
        server: {
            baseDir: "./public"
        }
    });

    watch('gulpfile.js', generateHTML);
    watch('views/**.ejs', generateHTML);
    watch('views/partials/**.ejs', generateHTML);
    watch('sass/**.scss', generateCSS);
    watch("./public/**.html").on('change', sync.reload);
}


exports.css = generateCSS;
exports.html = generateHTML;
exports.lint = runLinter;
exports.test = runTests;
exports.watch = watchFiles;
exports.sync = browserSync;

exports.default = series(runLinter,parallel(generateCSS,generateHTML),runTests);
