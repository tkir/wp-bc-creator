"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_creator_1 = require("./pdf-creator");
const config_1 = require("./config");
const dataAccess_1 = require("./dataAccess");
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
const config = new config_1.Config();
let app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.get('/', function (req, res) {
    res.send('Ok!');
});
let server = app.listen(process.env.PORT || 3000, function () {
    console.log('PDF app listening on port 3000');
});
app.post('/bc-creator/pdf/:hash', (req, res) => {
    config.get('pdf.k', (err, k) => {
        pdf_creator_1.PdfCreator.getPDF(req.body.data, k, (err, buffer) => {
            if (err) {
                console.error(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Length': buffer.length
            });
            res.end(buffer, 'binary');
        });
    });
});
app.post('/bc-creator/preview/:hash', (req, res) => {
    pdf_creator_1.PdfCreator.getPreview(req.body.data, (err, buffer) => {
        if (err) {
            console.error(err);
            return;
        }
        res.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Content-Length': buffer.length
        });
        res.end(buffer, 'binary');
    });
});
app.post('/bc-creator/designs/:hash', (req, res) => {
    dataAccess_1.DataAccess.Instance.getDesignsExcept(req.body, req.params.hash, (err, desResult) => {
        if (err)
            err = err.message;
        res.send(`{"err": ${JSON.stringify(err)}, ${desResult}}`);
    });
});
app.post('/bc-creator/designs/', (req, res) => {
    res.send('{"err":"noHashError"}');
});
//# sourceMappingURL=app.js.map