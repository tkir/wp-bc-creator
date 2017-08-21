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
            host: 'localhost',
            user: 'root',
            password: '',
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
                cb(null, rows.filter(r => !body.designs.some(d => d.Slug == r.Slug && d.Version == r.Version)));
            });
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
}
exports.DataAccess = DataAccess;
//# sourceMappingURL=dataAccess.js.map