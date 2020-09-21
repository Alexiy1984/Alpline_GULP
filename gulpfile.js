const { src, dest, watch, parallel, series } = require("gulp");

const sass = require('gulp-sass');
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const eslint = require("gulp-eslint");
const mocha = require("gulp-mocha");
const sync = require("browser-sync").create();
const htmlmin = require('gulp-htmlmin');

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
              title: 'Making Peace With Your Body Is a Mighty Act of Revolution', 
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
              imgUrl: 'images/small_image_4.jpg',
              author: 'Theresa Webb',  
              date: '3 Aug 20',
              title: 'Making Peace With Your Body Is a Mighty Act of Revolution', 
              text: 'The three tenets of radical self-love',
              categories: ['Book', 'Story'],
              ttr: 8,
              views: '12,851'
            },
            {
              imgUrl: 'images/small_image_5.jpg',
              author: 'Devon Lane',  
              date: '3 Aug 20',
              title: 'Imperfection is Perfect', 
              text: 'Imperfections are what make the world beautiful',
              categories: ['Technology'],
              ttr: 9,
              views: '12,851'
            },
            {
              imgUrl: 'images/small_image_6.jpg',
              author: 'Kathryn Murphy',  
              date: '3 Aug 20',
              title: 'China Ends Animal-Testing But It Won’t Help Cruelty-Free Brands', 
              text: 'I thought I was comfortable in assuming a role, but now I want something different.',
              categories: ['Food'],
              ttr: 11,
              views: '12,851'
            },
            {
              imgUrl: 'images/small_image_7.jpg',
              author: 'Theresa Webb',  
              date: '3 Aug 20',
              title: 'Making Peace With Your Body Is a Mighty Act of Revolution', 
              text: 'The three tenets of radical self-love',
              categories: ['Book', 'Story'],
              ttr: 8,
              views: '12,851'
            },
            {
              imgUrl: 'images/small_image_8.jpg',
              author: 'Devon Lane',  
              date: '3 Aug 20',
              title: 'Imperfection is Perfect', 
              text: 'Imperfections are what make the world beautiful',
              categories: ['Technology'],
              ttr: 9,
              views: '12,851'
            },
            {
              imgUrl: 'images/small_image_9.jpg',
              author: 'Kathryn Murphy',  
              date: '3 Aug 20',
              title: 'China Ends Animal-Testing But It Won’t Help Cruelty-Free Brands', 
              text: 'I thought I was comfortable in assuming a role, but now I want something different.',
              categories: ['Food'],
              ttr: 11,
              views: '12,851'
            },
          ],
          mediumCards: [
            {
              imgUrl: 'images/card_medium_1.jpg',
              author: 'Annette Black',  
              date: '3 Aug 20',
              title: 'How Marketing Made ‘Oil-Free’ A Thing', 
              text: 'Experts say “oil-free” skincare is scam that benefits beauty brands more than it benefits your skin.',
              categories: ['Art', 'Design'],
              ttr: 12,
              views: '12,851'
            },
            {
              imgUrl: 'images/card_medium_2.jpg',
              author: 'Dianne Russell',  
              date: '3 Aug 20',
              title: '7 Hip-Hop Fashion Brands That Make Us Most Nostalgic, Ranked', 
              text: 'It’s a ’90s streetwear time capsule — back when sizing started at XXXL Tall',
              categories: ['Food', 'Health'],
              ttr: 8,
              views: '12,851'
            },
            {
              imgUrl: 'images/card_medium_3.jpg',
              author: 'Michael Thompson',  
              date: '3 Aug 20',
              title: '11 Things Socially Aware People Don’t Say', 
              text: 'What we choose not to say is just as important as what we decide to say',
              categories: ['Life', 'Relationships'],
              ttr: 5,
              views: '12,851'
            },
          ],
        }}))
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(dest("public"));
    cb();
}

function minifyHTML(cb) {
  src('public/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(dest('public'));
  cb();
};

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
exports.htmlMin = minifyHTML;
exports.lint = runLinter;
exports.test = runTests;
exports.watch = watchFiles;
exports.sync = browserSync;

exports.default = series(runLinter,parallel(generateCSS,generateHTML),runTests);
