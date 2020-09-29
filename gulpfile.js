const { src, dest, watch, parallel, series } = require('gulp');

const sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
ejs = require('gulp-ejs'),
rename = require('gulp-rename'),
eslint = require('gulp-eslint'),
mocha = require('gulp-mocha'),
sync = require('browser-sync').create(),
htmlmin = require('gulp-htmlmin'),
babel = require("gulp-babel"),
uglify = require('gulp-uglify'),
uglifycss = require('gulp-uglifycss'),
concat = require('gulp-concat'),
del = require('del'),
removeEmptyLines = require('gulp-remove-empty-lines'),
formatHtml = require('gulp-format-html');

var prefixerOptions = {
  browserlist: ['last 3 versions']
};

var sassOptions = {
  outputStyle: 'expanded'
  // outputStyle: 'compressed'
};

var pages_data = {
  title: 'Some cool title',
  text: 'Some text',
  user: [
    {
      img: 'images/users/user_1.jpg',
      firstname: 'Leslie',
      surname: 'Alexander',
      email: 'lesliealexandro@gmail.com',
    },
  ], 
  heroCards: [
    {
      imgUrl: 'images/cards/card_hero_1.jpg',
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
      imgUrl: 'images/cards/small_image_1.jpg',
      author: 'Theresa Webb',  
      date: '3 Aug 20',
      title: 'Making Peace With Your Body Is a Mighty Act of Revolution', 
      text: 'The three tenets of radical self-love',
      categories: ['Book', 'Story'],
      ttr: 8,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/small_image_2.jpg',
      author: 'Devon Lane',  
      date: '3 Aug 20',
      title: 'Imperfection is Perfect', 
      text: 'Imperfections are what make the world beautiful',
      categories: ['Technology'],
      ttr: 9,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/small_image_3.jpg',
      author: 'Kathryn Murphy',  
      date: '3 Aug 20',
      title: 'China Ends Animal-Testing But It Won’t Help Cruelty-Free Brands', 
      text: 'I thought I was comfortable in assuming a role, but now I want something different.',
      categories: ['Food'],
      ttr: 11,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/small_image_4.jpg',
      author: 'Theresa Webb',  
      date: '3 Aug 20',
      title: 'Making Peace With Your Body Is a Mighty Act of Revolution', 
      text: 'The three tenets of radical self-love',
      categories: ['Book', 'Story'],
      ttr: 8,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/small_image_5.jpg',
      author: 'Devon Lane',  
      date: '3 Aug 20',
      title: 'Imperfection is Perfect', 
      text: 'Imperfections are what make the world beautiful',
      categories: ['Technology'],
      ttr: 9,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/small_image_6.jpg',
      author: 'Kathryn Murphy',  
      date: '3 Aug 20',
      title: 'China Ends Animal-Testing But It Won’t Help Cruelty-Free Brands', 
      text: 'I thought I was comfortable in assuming a role, but now I want something different.',
      categories: ['Food'],
      ttr: 11,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/small_image_7.jpg',
      author: 'Theresa Webb',  
      date: '3 Aug 20',
      title: 'Making Peace With Your Body Is a Mighty Act of Revolution', 
      text: 'The three tenets of radical self-love',
      categories: ['Book', 'Story'],
      ttr: 8,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/small_image_8.jpg',
      author: 'Devon Lane',  
      date: '3 Aug 20',
      title: 'Imperfection is Perfect', 
      text: 'Imperfections are what make the world beautiful',
      categories: ['Technology'],
      ttr: 9,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/small_image_9.jpg',
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
      imgUrl: 'images/cards/card_medium_1.jpg',
      author: 'Annette Black',  
      date: '3 Aug 20',
      title: 'How Marketing Made ‘Oil-Free’ A Thing', 
      text: 'Experts say “oil-free” skincare is scam that benefits beauty brands more than it benefits your skin.',
      categories: ['Art', 'Design'],
      ttr: 12,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/card_medium_2.jpg',
      author: 'Dianne Russell',  
      date: '3 Aug 20',
      title: '7 Hip-Hop Fashion Brands That Make Us Most Nostalgic, Ranked', 
      text: 'It’s a ’90s streetwear time capsule — back when sizing started at XXXL Tall',
      categories: ['Food', 'Health'],
      ttr: 8,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/card_medium_3.jpg',
      author: 'Michael Thompson',  
      date: '3 Aug 20',
      title: '11 Things Socially Aware People Don’t Say', 
      text: 'What we choose not to say is just as important as what we decide to say',
      categories: ['Life', 'Relationships'],
      ttr: 5,
      views: '12,851'
    },
  ],
  bigCards : [
    {
      imgUrl: 'images/cards/card_big_1.jpg',
      author: 'Annette Black',  
      date: '3 Aug 20',
      title: 'How Marketing Made ‘Oil-Free’ A Thing', 
      text: 'Experts say “oil-free” skincare is scam that benefits beauty brands more than it benefits your skin.',
      categories: ['Art', 'Design'],
      ttr: 12,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/card_big_2.jpg',
      author: 'Dianne Russell',  
      date: '3 Aug 20',
      title: '7 Hip-Hop Fashion Brands That Make Us Most Nostalgic, Ranked', 
      text: 'It’s a ’90s streetwear time capsule — back when sizing started at XXXL Tall',
      categories: ['Food', 'Health'],
      ttr: 8,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/card_big_3.jpg',
      author: 'Michael Thompson',  
      date: '3 Aug 20',
      title: '11 Things Socially Aware People Don’t Say', 
      text: 'What we choose not to say is just as important as what we decide to say',
      categories: ['Life', 'Relationships'],
      ttr: 5,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/card_big_4.jpg',
      author: 'Michael Thompson',  
      date: '3 Aug 20',
      title: '11 Things Socially Aware People Don’t Say', 
      text: 'What we choose not to say is just as important as what we decide to say',
      categories: ['Life', 'Relationships'],
      ttr: 5,
      views: '12,851'
    },
  ],
  menuCol1: [ 
    {
      title: 'Entertainment',
      items: ['Music', 'Nonfiction', 'Photography', 'Sports', 'Style', 'Gaming', 'Humor']
    },
    {
      title: 'Society',
      items: ['Cities', 'Education', 'Environment', 'Future', 'History', 'Language', 'Media']
    },
  ],
  menuCol2: [ 
    {
      title: 'Industry',
      items: ['Business','Design','Economy','Freelancing','Leadership','Marketing','Productivity']
    },
    {
      title: 'Life',
      items: ['Astrology','Creativity','Family','Fitness','Health','Lifestyle','Mindfulness']
    },
  ],    
  menuCol3: [ 
    {
      title: 'Tech',
      items: ['Cryptocurrency', 'Cybersecurity', 'Data Science', 'Digital Life', 'Gadgets', 'Machine Learning', 'Math']
    },
    {
      title: 'Top authors',
      items: ['Jacob Jones', 'Eleanor Pena', 'Robert Fox', 'Jane Cooper', 'Bessie Cooper', 'Guy Hawkins']
    },
  ],     
};

function cleanCSS() {
  return del(['public/stylesheets/**', '!public/stylesheets']);
}

function generateCSS(cb) {
    src([ 
          './sass/styles-reset.scss',
          './sass/style.scss',
          './sass/card_small.scss', 
          './sass/card_medium.scss',
          './sass/card_big.scss',
          './sass/card_hero.scss',
          './sass/footer.scss',
          './sass/menu_main.scss',
          './sass/user_window.scss',
          './sass/slick.scss',
          './sass/card_slide.scss', 
        ])
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(prefixerOptions))
        .pipe(concat('index.css'))
        // .pipe(uglifycss().on('error', console.error))
        .pipe(dest('public/stylesheets'))
        .pipe(sync.stream());
    cb();
}

function generateIndexHTML(cb) {
    src('./views/index.ejs')
        .pipe(ejs({ data: pages_data }))
        .pipe(rename(function (path) {
            path.basename = 'index';
            path.extname = '.html';
        }))
        .pipe(removeEmptyLines())
        .pipe(formatHtml())
        .pipe(dest('public'));
    cb();
}

function generatePostHTML(cb) {
  src('./views/post.ejs')
      .pipe(ejs({ data: pages_data}))
      .pipe(rename(function (path) {
        path.basename = 'post';
        path.extname = '.html';
      }))
      .pipe(removeEmptyLines())
      .pipe(formatHtml())
      .pipe(dest('public'));
  cb();
}

function minifyHTML(cb) {
  src('public/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(dest('public'));
  cb();
};

function uglifyJS(cb) {
  src([
      'node_modules/jquery/dist/jquery.js',
      './scripts/*.js'
    ])
    .pipe(babel()) 
    .pipe(dest('public/javascripts'))
    .pipe(uglify())
    .pipe(concat('index.js'))
    .pipe(dest('public/javascripts'))
    .pipe(sync.stream());
  cb();
};

function runLinter(cb) {
    return src(['**/*.js', '!node_modules/**', '!public/**'])
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
            baseDir: './public'
        }
    });

    // watch('gulpfile.js', series(generateIndexHTML, generatePostHTML));
    // watch('views/**.ejs', series(generateIndexHTML, generatePostHTML));
    // watch('views/partials/**.ejs', series(generateIndexHTML, generatePostHTML));
    watch('gulpfile.js', generateIndexHTML);
    watch('views/**.ejs', generateIndexHTML);
    watch('views/partials/**.ejs', generateIndexHTML);
    watch('sass/**.scss', generateCSS);
    watch('scripts/*.js', uglifyJS);
    watch('./public/**.html').on('change', sync.reload);
}


exports.css = series(cleanCSS,generateCSS);
exports.multhtml = series(generateIndexHTML, generatePostHTML);
exports.js = uglifyJS;
exports.htmlMin = minifyHTML;
exports.lint = runLinter;
exports.test = runTests;
exports.watch = watchFiles;
exports.sync = browserSync;
exports.clean = cleanCSS;

// exports.default = series(runLinter,parallel(generateCSS, generateIndexHTML, generatePostHTML, uglifyJS),runTests);
exports.default = series(runLinter,parallel(generateCSS, generateIndexHTML, uglifyJS));
