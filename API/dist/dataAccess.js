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
    getDesignsExcept(designs, cb) {
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
            _Order
        FROM Designs`, function (err, rows, fields) {
            if (err)
                cb(err, null);
            cb(null, rows.filter(r => !designs.some(d => d.Slug == r.Slug && d.Version == r.Version)));
        });
    }
}
exports.DataAccess = DataAccess;
//# sourceMappingURL=dataAccess.js.map