import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { HelperService } from './helper.service';
const DB_NAME = 'loancalculator';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  loading: any;
  private sqllite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db !: SQLiteDBConnection;
  constructor(
    private loadingCtrl: LoadingController,
    public helper: HelperService,
  ) {
  }
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: "circles",
      backdropDismiss:true
    });
    this.loading.present();
  }

  async appInitialize() {
    try {
      const connectionPromise: Promise<SQLiteDBConnection> = this.sqllite.createConnection(DB_NAME, false, 'no-encryption', 1, false);
      connectionPromise.then(async (dbConnection: SQLiteDBConnection) => {
        this.db = dbConnection;
        await this.db.open();

        let schema = `CREATE TABLE IF NOT EXISTS historysnew (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            updatedDt DATE DEFAULT NULL,
            createdDt DATE DEFAULT NULL,
            loanType VARCHAR(255)  DEFAULT NULL,
            periodType VARCHAR(255)  DEFAULT NULL,
            amount VARCHAR(255)  DEFAULT NULL,
            period VARCHAR(255)  DEFAULT NULL,
            loan_tenure VARCHAR(255)  DEFAULT NULL,
            rate VARCHAR(255)  DEFAULT NULL
          )`;
        await this.db.execute(schema);
      }).catch((error) => {
        console.error('Error creating SQLite connection:', JSON.stringify(error));
      });
    } catch (error) {
      this.loading.dismiss();
    }


  }



  saveHistory(data: any) {
    return new Promise((resolve, reject) => {
      const insertQuery = `
      INSERT INTO historysnew (
        updatedDt,
        createdDt,
        loanType,
        periodType,
        amount,
        period,
        loan_tenure,
        rate)
      VALUES (
        '${new Date().toISOString()}',
        '${new Date().toISOString()}',
        '${data.loanType}',
        '${data.periodType}',
        '${data.amount}',
        '${data.period}',
        '${data.loan_tenure}',
        '${data.rate}'
        )`;
      this.db.execute(insertQuery).then((resp) => {
        resolve(resp);
      })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getHistory() {
    return new Promise((resolve, reject) => {
      const select = 'SELECT * FROM historysnew ORDER BY createdDt DESC';
      this.db.query(select).then((resp) => {
        resolve(resp);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  delete(id: any) {

    return new Promise((resolve, reject) => {

      if (!id) reject(false)
      let deleteQue = `DELETE FROM historysnew WHERE id = ${id}`;
      // const deleteq = ''
      this.db.execute(deleteQue).then((resp) => {
        resolve(resp);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getSetting() {
    return new Promise((resolve, reject) => {
      const select = 'SELECT * FROM settings';
      this.db.query(select).then((resp) => {
        resolve(resp);
      }).catch((error) => {
        reject(error);
      });
    });
  }



  async updateSetting(data: any) {
    return new Promise(async (resolve, reject) => {
      let setting: any = await this.getSetting();
      if (setting.values.length && setting.values[0].id) {
     

        const updateQuery = `UPDATE settings 
            SET
            max_amount = ${parseInt(data.max_amount)},
            max_period = ${parseInt(data.max_period)},
            max_rate = ${parseInt(data.max_rate)}
            WHERE id = ${setting.values[0].id}
        `;
        this.db.execute(updateQuery).then((resp) => {
          resolve(resp);
        }).catch((error) => {
          reject(error);
        });
      } else {
        reject(false)
      }
    });
  }
}
