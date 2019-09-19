import mysql = require('mysql');

export default class MySQL
{
  private static _instance: MySQL;

  con: mysql.Connection;
  conectado: boolean = false;

  constructor() {
    this.con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'testdb'
    });
    this.conectarDB();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public static ejecutarQuery(query: string, callback: any) {
    this._instance.con.query(query, (error: any, results: Object[], fields: any) => {
      if (error) {
        console.log(error);
        return callback(error);
      }
      if (results.length === 0) {
        callback('El registro solicitado no existe');
      }
      callback(null, results);
    }); 
  }

  private conectarDB() {
    this.con.connect((err: mysql.MysqlError) => {
      if (err) {
        console.log(err.message);
        return;
      }
      this.conectado = true;
    });
  }
}
