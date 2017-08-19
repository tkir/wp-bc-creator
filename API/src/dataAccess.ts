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
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'bc-creator-api'
        });
    }

    public getDesignsExcept(designs: { Slug: string, Version: number }[], cb) {

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
            if (err) cb(err, null);

            cb(null, rows.filter(
                r => !designs.some(
                    d => d.Slug == r.Slug && d.Version == r.Version)
            ));
        });
    }
}