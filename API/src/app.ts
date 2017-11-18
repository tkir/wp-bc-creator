import {PdfCreator} from "./pdf-creator";
import {DataAccess} from './dataAccess';

let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let config = require('config');

let app = express();
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));


//TODO delete in production
app.get('/', function (req, res) {
    DataAccess.Instance.test((err, result) => {
        res.send(`
    res: ${JSON.stringify(result)};
    err: ${JSON.stringify(err)}`);

        DataAccess.Instance.closeConnection();
    });

    // res.send('Ok!');
});
app.post('/:hash', (req, res) => {
    DataAccess.Instance.getPermission(req.params.hash, req.body, (err, result) => {
        res.send(`
    res: ${JSON.stringify(result)};    
    err: ${JSON.stringify(err)}`);

        DataAccess.Instance.closeConnection();
    })
});


let server = app.listen(config.get('port'), function () {
    console.log(`PDF app listening on port ${config.get('port')}`);
});

app.post('/bc-creator/pdf/:hash', (req, res) => {


    PdfCreator.getPDF(req.body.data, (err, buffer) => {
        if (err) {
            console.error(err);
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': buffer.length
        });
        res.end(buffer, 'binary');

        DataAccess.Instance.closeConnection();
    });
});

app.post('/bc-creator/preview/:hash', (req, res) => {
    PdfCreator.getPreview(req.body.data, (err, buffer) => {
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

    DataAccess.Instance.getDesignsExcept(req.body, req.params.hash, (err, desResult) => {
        if (err) err = err.message;
        res.send(`{"err": ${JSON.stringify(err)}, ${desResult}}`);

        DataAccess.Instance.closeConnection();
    });
});

app.post('/bc-creator/designs/', (req, res) => {
    res.send('{"err":"noHashError"}');
});