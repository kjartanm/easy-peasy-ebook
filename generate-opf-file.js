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
    <dc:identifier id="pub-id">${bookData.bookId}</dc:identifier>
    <dc:title>${bookData.title}</dc:title>
    <dc:creator id="creator">${bookData.author}</dc:creator>
    <dc:publisher>${bookData.publisher}</dc:publisher>
    <dc:date>${bookData.year}</dc:date>
    <dc:language>no</dc:language>
`;
}

const createChapter = (chapter, chapterIdx) => {
    return `
<section>
${md.render(chapter.content)}
</section>
`;
}

const targetPath = path.join(outDirPath, 'OEBPS/package.opf');
const content = `<?xml version="1.0" encoding="UTF-8"?>
<package version="3.0" unique-identifier="${bookData.bookId}" xmlns="http://www.idpf.org/2007/opf">
    <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    ${createMetadata(bookData)}
    </metadata>
    <manifest>
        <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav" />
        <item id="ncx" href="nav.ncx" media-type="application/x-dtbncx+xml" />
        <item id="${slugify(bookData.title.toLowerCase())}" href="${slugify(bookData.title.toLowerCase())}.xhtml" media-type="application/xhtml+xml" />
    </manifest>
    <spine toc="ncx">
        <itemref idref="${slugify(bookData.title.toLowerCase())}" />
    </spine>
</package>`;
fs.writeFile(targetPath, content, 'utf-8', (err, data) => console.log(err ? err : "success: " + targetPath));

