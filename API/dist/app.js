"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_creator_1 = require("./pdf-creator");
const dataAccess_1 = require("./dataAccess");
const i18n_1 = require("./i18n");
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let config = require('config');
let app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.get('/', function (req, res) {
    dataAccess_1.DataAccess.Instance.test((err, result) => {
        res.send(`
    res: ${JSON.stringify(result)};
    err: ${JSON.stringify(err)}`);
        dataAccess_1.DataAccess.Instance.closeConnection();
    });
});
app.post('/:hash', (req, res) => {
    dataAccess_1.DataAccess.Instance.getPermission(req.params.hash, req.body, (err, result) => {
        res.send(`
    res: ${JSON.stringify(result)};    
    err: ${JSON.stringify(err)}`);
        dataAccess_1.DataAccess.Instance.closeConnection();
    });
});
let server = app.listen(config.get('port'), function () {
    console.log(`PDF app listening on port ${config.get('port')}`);
});
app.post('/bc-creator/pdf/:hash', (req, res) => {
    pdf_creator_1.PdfCreator.getPDF(req.body.data, (err, buffer) => {
        if (err) {
            console.error(err);
            return;
        }
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': buffer.length
        });
        res.end(buffer, 'binary');
        dataAccess_1.DataAccess.Instance.closeConnection();
    });
});
app.post('/bc-creator/preview/:hash', (req, res) => {
    pdf_creator_1.PdfCreator.getPreview(req.body.data, (err, buffer) => {
        if (err) {
            console.error(err);
            return;
        }
        res.writeHead(200, {
            'Content-Type': `image/${config.get('html-pdf.preview.type')}`,
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
        dataAccess_1.DataAccess.Instance.closeConnection();
    });
});
app.get('/bc-creator/language/:ln', (req, res) => {
    i18n_1.getLanguage(req.params.ln, (err, path) => {
        if (err)
            res.send('');
        else
            res.sendFile(path);
    });
});
app.post('/bc-creator/designs/', (req, res) => {
    res.send('{"err":"noHashError"}');
});
//# sourceMappingURL=app.js.map