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
// uglify = require('gulp-uglify'),
uglify = require('gulp-uglify-es').default;
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
  title: 'Single Post',
  text: 'Some text',
  user: [
    {
      img: 'images/users/Leslie_Alexander.jpg',
      firstname: 'Leslie',
      surname: 'Alexander',
      email: 'lesliealexandro@gmail.com',
      followers: '1K',
    },
    {
      img: 'images/users/Jane_Cooper.jpg',
      firstname: 'Jane',
      surname: 'Cooper',
      email: 'janecooper@gmail.com',
      followers: '2.9K',
    },
    {
      img: 'images/users/Ralph_Edwards.jpg',
      firstname: 'Ralph',
      surname: 'Edwards',
      email: 'ralphedwards@gmail.com',
      followers: '492',
    },
    {
      img: 'images/users/Tyler_Black.jpg',
      firstname: 'Tyler',
      surname: 'Black',
      email: 'tylerblack@gmail.com',
      followers: '211',
    },
    {
      img: 'images/users/Courtney_Henry.jpg',
      firstname: 'Courtney',
      surname: 'Henry',
      email: 'courtneyhenry@gmail.com',
      followers: '1.2K',
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
      views: '12,851',
      link: '/post.html',
      authorLink: '/author.html',
    },
  ],
  smallCards: [
    {
      imgUrl: 'images/cards/small_image_1.jpg',
      author: 'Theresa Webb',  
      date: '3 Aug 20',
      title: 'Making Peace With Your Body Is a Mighty Act of Revolution', 
      text: 'The three tenets of radical self-love',
      categories: ['Book', 'Promo'],
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
      date: '7 Jun 20',
      title: '7 Hip-Hop Fashion Brands That Make Us Most Nostalgic, Ranked', 
      text: 'It’s a ’90s streetwear time capsule — back when sizing started at XXXL Tall',
      categories: ['Food', 'Health'],
      ttr: 8,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/card_medium_3.jpg',
      author: 'Michael Thompson',  
      date: '12 May 20',
      title: '11 Things Socially Aware People Don’t Say', 
      text: 'What we choose not to say is just as important as what we decide to say',
      categories: ['Life', 'Relationships'],
      ttr: 5,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/card_medium_4.jpg',
      author: 'Michael Thompson',  
      date: '2 Apr 20',
      title: 'Making Peace With Your Body Is a Mighty Act of Revolution', 
      text: 'What we choose not to say is just as important as what we decide to saysay',
      categories: ['Life', 'Promo'],
      ttr: 5,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/card_medium_5.jpg',
      author: 'Annette Black',  
      date: '7 Jul 20',
      title: 'How Marketing Made ‘Oil-Free’ A Thing', 
      text: 'Experts say “oil-free” skincare is scam that benefits beauty brands more than it benefits your skin.',
      categories: ['Art', 'Design'],
      ttr: 12,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/card_medium_6.jpg',
      author: 'Michael Thompson',  
      date: '3 Sep 20',
      title: '11 Things Socially Aware People Don’t Say', 
      text: 'What we choose not to say is just as important as what we decide to say',
      categories: ['Life', 'Relationships'],
      ttr: 5,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/card_medium_7.jpg',
      author: 'Dianne Russell',  
      date: '22 Aug 20',
      title: '7 Hip-Hop Fashion Brands That Make Us Most Nostalgic, Ranked', 
      text: 'It’s a ’90s streetwear time capsule — back when sizing started at XXXL Tall',
      categories: ['Food', 'Health'],
      ttr: 8,
      views: '12,851'
    },
    {
      imgUrl: 'images/cards/card_medium_8.jpg',
      author: 'Michael Thompson',  
      date: '3 Aug 20',
      title: 'China Ends Animal-Testing But It Won’t Help Cruelty-Free Brands', 
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
      categories: ['Life', 'Promo'],
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

function generateIndexCSS(cb) {
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
          './sass/subscribe_block.scss',
          './sass/avatar.scss',
          './sass/breadcrumbs.scss',
          './sass/comments.scss',
          './sass/buttons.scss',
          './sass/tags.scss',
          './sass/author_block.scss',
          './sass/author_heading.scss',
        ])
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(prefixerOptions))
        .pipe(concat('index.css'))
        // .pipe(uglifycss().on('error', console.error))
        .pipe(dest('public/stylesheets'))
        .pipe(sync.stream());
    cb();
}

function generatePagesCSS(cb) {
  src([ 
        './sass/terms-and-conditions-page.scss',
        './sass/single-post.scss',
        './sass/featured-page.scss',
        './sass/search-results-and-author-page.scss',
        './sass/category-page.scss',
        './sass/page404.scss',
        './sass/main-page.scss',
      ])
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer(prefixerOptions))
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


function generateUiHTML(cb) {
  src('./views/ui.ejs')
      .pipe(ejs({ data: pages_data }))
      .pipe(rename(function (path) {
          path.basename = 'ui';
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

function generateTermsHTML(cb) {
  src('./views/terms-and-conditions.ejs')
      .pipe(ejs({ data: pages_data}))
      .pipe(rename(function (path) {
        path.basename = 'terms-and-conditions';
        path.extname = '.html';
      }))
      .pipe(removeEmptyLines())
      .pipe(formatHtml())
      .pipe(dest('public'));
  cb();
}

function generate404HTML(cb) {
  src('./views/404.ejs')
      .pipe(ejs({ data: pages_data}))
      .pipe(rename(function (path) {
        path.basename = '404';
        path.extname = '.html';
      }))
      .pipe(removeEmptyLines())
      .pipe(formatHtml())
      .pipe(dest('public'));
  cb();
}

function generateFeaturedHTML(cb) {
  src('./views/featured.ejs')
      .pipe(ejs({ data: pages_data}))
      .pipe(rename(function (path) {
        path.basename = 'featured';
        path.extname = '.html';
      }))
      .pipe(removeEmptyLines())
      .pipe(formatHtml())
      .pipe(dest('public'));
  cb();
}

function generateSearchResultsHTML(cb) {
  src('./views/search_results.ejs')
      .pipe(ejs({ data: pages_data}))
      .pipe(rename(function (path) {
        path.basename = 'search-results';
        path.extname = '.html';
      }))
      .pipe(removeEmptyLines())
      .pipe(formatHtml())
      .pipe(dest('public'));
  cb();
}

function generateAuthorHTML(cb) {
  src('./views/author.ejs')
      .pipe(ejs({ data: pages_data}))
      .pipe(rename(function (path) {
        path.basename = 'author';
        path.extname = '.html';
      }))
      .pipe(removeEmptyLines())
      .pipe(formatHtml())
      .pipe(dest('public'));
  cb();
}

function generateCategoryHTML(cb) {
  src('./views/category.ejs')
      .pipe(ejs({ data: pages_data}))
      .pipe(rename(function (path) {
        path.basename = 'category';
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
    // .pipe(dest('public/javascripts'))
    // .pipe(uglify())
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
    watch('sass/**.scss', generateIndexCSS);
    watch([ '**/*.js', '!node_modules/**'], parallel(runLinter, runTests));
}

function browserSync(cb) {
    sync.init({
        server: {
            baseDir: './public'
        }
    });

    watch('gulpfile.js', series(generateIndexHTML,  generateUiHTML,  generatePostHTML, generateTermsHTML, generate404HTML, generateFeaturedHTML, generateSearchResultsHTML, generateAuthorHTML, generateCategoryHTML));
    watch('views/**.ejs', series(generateIndexHTML,  generateUiHTML,  generatePostHTML, generateTermsHTML, generate404HTML, generateFeaturedHTML, generateSearchResultsHTML, generateAuthorHTML, generateCategoryHTML));
    watch('views/partials/**.ejs', series(generateIndexHTML,  generateUiHTML,  generatePostHTML, generateTermsHTML, generate404HTML, generateFeaturedHTML, generateSearchResultsHTML, generateAuthorHTML, generateCategoryHTML));
    // watch('gulpfile.js', generateIndexHTML);
    // watch('views/**.ejs', generateIndexHTML);
    // watch('views/partials/**.ejs', generateIndexHTML);
    watch('sass/**.scss', series(generateIndexCSS, generatePagesCSS));
    watch('scripts/*.js', uglifyJS);
    watch('./public/**.html').on('change', sync.reload);
}

exports.css = series(cleanCSS, generateIndexCSS, generatePagesCSS);
exports.multhtml = series(generateIndexHTML,  generateUiHTML,  generatePostHTML, generateTermsHTML, generate404HTML, generateFeaturedHTML, generateSearchResultsHTML, generateAuthorHTML, generateCategoryHTML);
exports.js = uglifyJS;
exports.htmlMin = minifyHTML;
exports.lint = runLinter;
exports.test = runTests;
exports.watch = watchFiles;
exports.sync = browserSync;
exports.clean = cleanCSS;

exports.default = series(runLinter,parallel(generateIndexCSS, generatePagesCSS, generateIndexHTML,  generateUiHTML,  generatePostHTML, generateTermsHTML, generate404HTML, generateFeaturedHTML, generateSearchResultsHTML, generateAuthorHTML, generateCategoryHTML, uglifyJS));
// exports.default = series(runLinter,parallel(generateCSS, generateIndexHTML, uglifyJS));
