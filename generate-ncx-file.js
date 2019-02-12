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
    <head>
        <meta name="dtb:uid" content="${bookData.bookId}" />
    </head>
    <docTitle>
        <text>${bookData.title}</text>
    </docTitle>
`;
}

const createChapter = (chapter, chapterIdx) => {
    return `
    <navPoint id="navPoint-${chapterIdx + 1}">
      <navLabel>
        <text>${chapter.title}t</text>
      </navLabel>
      <content src="${slugify(bookData.title.toLowerCase())}.xhtml#chapter-${chapterIdx + 1}" />
    </navPoint>
`;
}

const targetPath = path.join(outDirPath, 'nav.ncx');
const content = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  ${createMetadata(bookData)}
  <navMap>
  ${bookData.chapter.reduce((acc,chapter, idx)=> acc + createChapter(chapter, idx), ``)}
  </navMap>
</ncx>`;
fs.writeFile(targetPath, content, 'utf-8', (err, data) => console.log(err ? err : "success: " + targetPath));
