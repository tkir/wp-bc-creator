const fs = require('fs'),
  path = require('path'),
  dir = "../creator";

const names = [
  {oldName: RegExp(/^main\.[a-f0-9]{20}\.js/, 'g'), newName: "main.js"},
  {oldName: RegExp(/^polyfills\.[a-f0-9]{20}\.js/, 'g'), newName: "polyfills.js"},
  {oldName: RegExp(/^runtime\.[a-f0-9]{20}\.js/, 'g'), newName: "runtime.js"},
  {oldName: RegExp(/^es2015-polyfills\.[a-f0-9]{20}\.js/, 'g'), newName: "es2015-polyfills.js"},
  {oldName: RegExp(/^styles\.[a-f0-9]{20}\.css/, 'g'), newName: "styles.css"}
];

let files = fs.readdirSync(dir);
fs.unlinkSync(path.join(dir, '3rdpartylicenses.txt'));
fs.unlinkSync(path.join(dir, 'favicon.ico'));
fs.unlinkSync(path.join(dir, 'index.html'));

names.forEach(name => {
    let fileName = files.find(file => file.match(name.oldName));
    if (fileName) {
      let oldPath = path.join(dir, fileName);
      let newPath = path.join(dir, fileName.replace(name.oldName, name.newName));
      fs.renameSync(oldPath, newPath);
    }
  }
);
