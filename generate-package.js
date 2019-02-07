const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const inputDir = process.argv.pop();
/*
zip({
    cwd: inputDir,
    source: "*",
    destination: '../docs/ebook.epub'
  }).then(function() {
    console.log('all done!');
  }).catch(function(err) {
    console.error(err.stack);
    process.exit(1);
  });*/

const output = fs.createWriteStream("./docs/ebook.epub");
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function() {
  console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
    console.log("Warning", err)
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);

archive.directory(path.join(inputDir, 'META-INF'), 'META-INF');
archive.directory(path.join(inputDir, 'OEBPS'), 'OEBPS');
archive.append('application/epub+zip', { name: 'mimetype', store: true });
archive.finalize();