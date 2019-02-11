const epubchecker = require('epubchecker');
 
epubchecker('./docs/ebook.epub', {
    includeWarnings: true,
    // do not check CSS and font files
    exclude: /\.(css|ttf|opf|woff|woff2)$/,
    output: "./reports/epubcheck.json"
}).then(value=>{
    console.log(value);
});
