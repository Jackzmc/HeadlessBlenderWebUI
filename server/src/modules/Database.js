const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt')

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.createTable()
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS user (
                username text PRIMARY KEY,
                email text UNIQUE,
                password text,
                permissions integer)`
        const response = this.db.run(sql)
        bcrypt.hash('admin', (err, hash) => {
            const user = {
                username: 'admim',
                email: 'admin@localhost',
                password: hash,
                permissions: 2
            }
            this.insertAdmin(user);
        })
        
        return response;
    }

    selectUser(query, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE email = ? OR username = ?`,
            [query, query],function(err,row){
                callback(err,row)
            })
    }

    insertAdmin(user, callback) {
        return this.db.run(
            'INSERT INTO user (username,email,password,permissions) VALUES (?,?,?,?)',
            user, (err) => {
                if(callback) callback(err)
            })
    }

    selectAll(callback) {
        return this.db.all(`SELECT * FROM user`, function(err,rows) {
            callback(err,rows)
        })
    }

    insert(user, callback) {
        return this.db.run(
            'INSERT INTO user (username,email,password) VALUES (?,?,?)',
            user, (err) => {
                callback(err)
            })
    }
}

module.exports = Db