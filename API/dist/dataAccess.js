"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mysql = require('mysql');
let config = require('config');
class DataAccess {
    constructor() {
        this.connection = null;
        this.connect();
    }
    static get Instance() {
        if (!DataAccess.instance) {
            DataAccess.instance = new DataAccess();
        }
        return DataAccess.instance;
    }
    connect() {
        this.connection = mysql.createConnection({
            host: config.get('db.connection.host'),
            user: config.get('db.connection.user'),
            password: config.get('db.connection.password'),
            database: config.get('db.connection.database')
        });
    }
    closeConnection() {
        if (this.connection) {
            this.connection.destroy();
            this.connection = null;
        }
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
        FROM ${config.get('db.tables.tableDesigns')} WHERE isActive = 1 AND permission <= ${permission}`, (err, rows, fields) => {
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
        if (!this.connection)
            this.connect();
        this.connection.query(`
        SELECT 
            Version,
            Slug,
            isActive,
            Permission
        FROM ${config.get('db.tables.tableDesigns')}`, (err, rows, fields) => {
            if (err) {
                cb(err, null);
                return;
            }
            cb(null, rows.filter(r => designs.some(d => d.Slug == r.Slug && (d.Version != r.Version || permission < r.Permission || r.isActive == false)))
                .map(r => r.Slug));
        });
    }
    getPermission(hash, site, cb) {
        if (!this.connection)
            this.connect();
        hash = hash.replace(/[^a-zA-Z0-9]/, '');
        if (hash.length !== 32) {
            cb(new Error('hash error'));
            return;
        }
        this.connection.query(`SELECT permission FROM ${config.get('db.tables.tableCustomers')} WHERE hash = '${hash}' AND site = '${site}'`, (err, rows, fields) => {
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
        if (!this.connection)
            this.connect();
        this.connection.query(`
SELECT * FROM ${config.get('db.tables.tableDesigns')}
        `, (err, rows, fields) => {
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