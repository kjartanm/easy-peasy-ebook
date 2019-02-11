const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const convertHTMLToPDF = require("pdf-puppeteer");
const md = require('markdown-it')({
    html: true,
    linkify: true,
    breaks: true,
    typographer: true
});

const outDirPath = process.argv.pop();
const bookFilePath = process.argv.pop();

const bookData = JSON.parse(fs.readFileSync(bookFilePath, { encoding: 'utf8' }));

const createMetadata = (bookData) => {
    return `
    <title>${bookData.title}</title>
    <link rel="schema.DC" href="http://purl.org/dc/elements/1.1/" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="DC.title" content="${bookData.title}" />
    <meta name="DC.creator" content="${bookData.author}" />
    <meta name="DC.publisher" content="${bookData.publisher}" />
    <meta name="DC.identifier" content="${bookData.bookId}" />
    <meta name="DC.date" content="${bookData.year}" />
`;
}

const createChapter = (chapter, chapterIdx) => {
    return `
<section id="chapter-${chapterIdx + 1}">
${md.render(chapter.content)}
</section>
`;
}

const targetPath = path.join(outDirPath, slugify(bookData.title.toLowerCase()) + '.pdf');
const content = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    ${createMetadata(bookData)}
</head>
<body>
    ${bookData.chapter.reduce((acc,chapter, idx)=> acc + createChapter(chapter, idx), ``)}
</body>
</html>`;

convertHTMLToPDF(content, pdf=>{
    fs.writeFile(targetPath, pdf, 'binary', (err, data) => console.log(err ? err : "success: " + targetPath));
})
