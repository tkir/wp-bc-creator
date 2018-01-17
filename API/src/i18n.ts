const fs = require('fs');
const path = require('path');

export function getLanguage(ln: string, cb: (err: any, path: string | null) => void) {
    fs.access(`../languages/${ln}.json`,(err)=>{
        if (err && err.code === 'ENOENT') {
            cb(err, null);
        }
        else cb(null, path.join(__dirname, `../languages/${ln}.json`));
    });
}

