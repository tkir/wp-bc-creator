let mysql = require('mysql');

export class DataAccess {
    private static instance: DataAccess;

    public static get Instance() {
        if (!DataAccess.instance) {
            DataAccess.instance = new DataAccess();
        }
        return DataAccess.instance;
    }

    private connection: any;

    constructor() {
        this.connection = mysql.createConnection({
            host: 'sql11.freemysqlhosting.net',
            user: 'sql11194181',
            password: 'b4gMLBa8uZ',
            database: 'sql11194181'
        });
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
        FROM Designs WHERE isActive = 1 AND permission <= ${permission}`, (err, rows, fields) => {
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

    //TODO проверитть этот метод
    public getDesignsForDelete(designs: { Slug: string, Version: number }[], permission, cb) {
        this.connection.query(`
        SELECT 
            Version,
            Slug,
            isActive,
            Permission
        FROM Designs`, (err, rows, fields) => {
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

    public getPermission(hash: string, site: string, cb) {
        hash = hash.replace(/[^a-zA-Z0-9]/, '');
        if (hash.length !== 32) {
            cb(new Error('hash error'));
            return;
        }
        this.connection.query(`SELECT permission FROM Customers WHERE hash = '${hash}' AND site = '${site}'`, (err, rows, fields) => {
            if (err) {
                cb(err, null);
                return;
            }

            if (rows.length) cb(null, rows[0].permission);
            else cb(new Error('no update'), null);
        });
    }
}