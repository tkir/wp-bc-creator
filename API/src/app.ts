import {PdfCreator} from "./pdf-creator";
import {Config} from "./config";
import {DataAccess} from './dataAccess';
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
const config: Config = new Config();

let app = express();
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));

//TODO delete in production
app.get('/', function (req, res) {
    DataAccess.Instance.test((err, result) => res.send(`
    res: ${JSON.stringify(result)};    
    err: ${JSON.stringify(err)}`));

    // res.send('Ok!');
});

let server = app.listen(process.env.PORT || 3000, function () {
    console.log('PDF app listening on port 3000');
});

app.post('/bc-creator/pdf/:hash', (req, res) => {

    config.get('pdf.k', (err, k) => {
        PdfCreator.getPDF(req.body.data, k, (err, buffer) => {
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
    })
});

app.post('/bc-creator/preview/:hash', (req, res) => {
    PdfCreator.getPreview(req.body.data, (err, buffer) => {
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

    DataAccess.Instance.getDesignsExcept(req.body, req.params.hash, (err, desResult) => {
        if (err) err = err.message;
        res.send(`{"err": ${JSON.stringify(err)}, ${desResult}}`);
    });
});

app.post('/bc-creator/designs/', (req, res) => {
    res.send('{"err":"noHashError"}');
});