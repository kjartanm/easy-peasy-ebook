const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

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
    <style>
        body {
            background-color: #FFFFFF;
            margin-bottom: 0px;
            margin-left: 0px;
            margin-right: 0px;
            margin-top: 0px;
            text-align: center;
        }
      
        img {
            max-height: 100%;
            max-width: 100%;
        }    
    </style>
`;
}

const targetPath = path.join(outDirPath, "OEBPS", 'cover.xhtml');
const content = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    ${createMetadata(bookData)}
</head>
<body>
    <img src="${bookData.cover.replace('https://kjartanm.github.io/easy-peasy-ebook/', '')}" alt="Cover Image" />
</body>
</html>`;
fs.writeFile(targetPath, content, 'utf-8', (err, data) => console.log(err ? err : "success: " + targetPath));


