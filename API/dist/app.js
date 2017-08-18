"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_creator_1 = require("./pdf-creator");
const config_1 = require("./config");
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
const config = new config_1.Config();
let app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
let server = app.listen(process.env.PORT || 3000, function () {
    console.log('PDF app listening on port 3000');
});
app.post('/pdf/:hash', (req, res) => {
    config.get('pdf.k', (err, k) => {
        pdf_creator_1.PdfCreator.getPDF(req.body.data, k, (err, buffer) => {
            if (err) {
                console.error(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=test.pdf',
                'Content-Length': buffer.length
            });
            res.end(buffer, 'binary');
        });
    });
});
app.post('/preview/:hash', (req, res) => {
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
    console.log(req.body);
});
app.post('/bc-creator/designs/', (req, res) => {
    res.send('{"string":"noHashError"}');
});
//# sourceMappingURL=app.js.map