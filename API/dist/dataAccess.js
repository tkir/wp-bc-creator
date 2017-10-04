"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mysql = require('mysql');
class DataAccess {
    static get Instance() {
        if (!DataAccess.instance) {
            DataAccess.instance = new DataAccess();
        }
        return DataAccess.instance;
    }
    constructor() {
        this.connection = mysql.createConnection({
            host: '35.190.211.221',
            user: 'api',
            password: 'rpVw2sd1',
            database: 'bc-creator-api'
        });
    }
    getDesignsExcept(body, hash, cb) {
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
                let newDesigns = rows.filter(r => !body.designs.some(d => d.Slug == r.Slug && d.Version == r.Version));
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
    getDesignsForDelete(designs, permission, cb) {
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
            cb(null, rows.filter(r => designs.some(d => d.Slug == r.Slug && (d.Version != r.Version || permission < r.Permission || r.isActive == false)))
                .map(r => r.Slug));
        });
    }
    getPermission(hash, site, cb) {
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
            if (rows.length)
                cb(null, rows[0].permission);
            else
                cb(new Error('no update'), null);
        });
    }
    test(cb) {
        this.connection.query(`SELECT * FROM customers`, (err, rows, fields) => {
            if (err) {
                cb(err, null);
                return;
            }
            if (rows.length)
                cb(null, rows[0]);
            else
                cb(new Error('no update'), null);
        });
    }
}
exports.DataAccess = DataAccess;
//# sourceMappingURL=dataAccess.js.map