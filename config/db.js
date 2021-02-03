const mysql = require("mysql");

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "userjs",
        });
        this.connection.connect((err) => {
            if (err) {
                console.log(err);
                console.log("Something went wrong");
            } else {
                console.log("Database connected");
            }
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

module.exports = new Database();
