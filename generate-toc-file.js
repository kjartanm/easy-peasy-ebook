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
`;
}

const createChapter = (chapter, chapterIdx) => {
    return `
    <li>
        <a href="${slugify(bookData.title.toLowerCase())}.xhtml#chapter-${chapterIdx + 1}">${chapter.title}</a>
    </li>
    `;
}

const targetPath = path.join(outDirPath, 'nav.xhtml');
const content = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
    ${createMetadata(bookData)}
</head>
<body>
<nav epub:type="toc">
<h1>Innhold</h1>
<ol>
    <li>
        <a href="cover.xhtml">Omslag</a>
    </li>
    ${bookData.chapter.reduce((acc,chapter, idx)=> acc + createChapter(chapter, idx), ``)}
</ol>
</nav>
</body>
</html>`;
fs.writeFile(targetPath, content, 'utf-8', (err, data) => console.log(err ? err : "success: " + targetPath));
