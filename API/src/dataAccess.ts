let mysql = require('mysql');

export class DataAccess {
    private static instance: DataAccess;

    public static get Instance() {
        if (!DataAccess.instance) {
            DataAccess.instance = new DataAccess();
        }
        return DataAccess.instance;
    }

    private connection: any = null;

    constructor() {
        this.connect();
    }

    private connect() {
        // this.connection = mysql.createConnection({
        //     host: 'localhost',
        //     user: 'root',
        //     password: '',
        //     database: 'bc-creator-api'
        // });

        // this.connection = mysql.createConnection({
        //     host: '35.190.211.221',
        //     user: 'api',
        //     password: 'rpVw2sd1',
        //     database: 'bc-creator-api'
        // });

        this.connection = mysql.createConnection({
            host: 'us-cdbr-iron-east-05.cleardb.net',
            user: 'b32264b621f27a',
            password: 'c9572ebc',
            database: 'heroku_89def5178434b57'
        });
    }

    public closeConnection() {
        if (this.connection) {
            this.connection.destroy();
            this.connection = null;
        }
    }

    public getDesignsExcept(body: { url: string, designs: { Slug: string, Version: number }[] }, hash: string, cb) {

        this.getPermission(hash, body.url, (err, permission) => {

            if (err) {
                cb(err, null);
                return;
            }

            this.connection.query(`
        SELECT 
            Name,
            Version,
            Slug,
            Description,
            UserId,
            FieldsData,
            DesignData,
            Preview,
            Create_Date,
            isActive,
            Preview_Order
        FROM designs2 WHERE isActive = 1 AND permission <= ${permission}`, (err, rows, fields) => {
                if (err) {
                    cb(err, null);
                    return;
                }

                let newDesigns = rows.filter(
                    r => !body.designs.some(
                        d => d.Slug == r.Slug && d.Version == r.Version)
                );

                this.getDesignsForDelete(body.designs, permission, (err, res) => {
                    if (err) {
                        cb(err, null);
                        return;
                    }

                    cb(null, `"designs":${JSON.stringify(newDesigns)}, "deleteDesigns":${JSON.stringify(res)}`);
                });
            });
        });

    }

    //TODO проверить этот метод
    public getDesignsForDelete(designs: { Slug: string, Version: number }[], permission, cb) {
        if(!this.connection)this.connect();

        this.connection.query(`
        SELECT 
            Version,
            Slug,
            isActive,
            Permission
        FROM designs2`, (err, rows, fields) => {
            if (err) {
                cb(err, null);
                return;
            }

            cb(null, rows.filter(
                r => designs.some(
                    d => d.Slug == r.Slug && (d.Version != r.Version || permission < r.Permission || r.isActive == false)))
                .map(r => r.Slug));
        });
    }

    public getPermission(hash: string, site: string, cb) {console.log(hash + '; '+ JSON.stringify(site));
        if(!this.connection)this.connect();

        hash = hash.replace(/[^a-zA-Z0-9]/, '');
        if (hash.length !== 32) {
            cb(new Error('hash error'));
            return;
        }
        this.connection.query(`SELECT permission FROM customers WHERE hash = '${hash}' AND site = '${site}'`, (err, rows, fields) => {
            if (err) {
                cb(err, null);
                return;
            }

            if (rows.length) cb(null, rows[0].permission);
            else cb(new Error('no update'), null);
        });
    }

    public test(cb) {
        if(!this.connection)this.connect();

        this.connection.query(`
SELECT * FROM designs2
        `, (err, rows, fields) => {
            if (err) {
                cb(err, null);
                return;
            }

            if (rows.length) cb(null, rows[0]);
            else cb(new Error('no update'), null);
        });
    }

}