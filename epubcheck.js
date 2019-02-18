const epubchecker = require('epubchecker');
const path = require('path');
const epubPath = process.argv.pop();

epubchecker(path.join(epubPath, 'ebook.epub'), {
    includeWarnings: true,
    // do not check CSS and font files
    exclude: /\.(css|ttf|opf|woff|woff2)$/,
    output: "./reports/epubcheck.json"
}).then(value=>{
    console.log(value);
});
