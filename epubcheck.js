const epubchecker = require('epubchecker');
 
epubchecker('./docs/ebook.epub', {
    includeWarnings: true,
    // do not check CSS and font files
    exclude: /\.(css|ttf|opf|woff|woff2)$/,
}).then(value=>{
    console.log(value);
});

//console.log("report", report)
/*
const epubCheck = require('epub-check');

epubCheck('./ebookssss.epub').then(value=>{
    console.log(value);
})
*/