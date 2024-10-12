import { Component } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { DatabaseService } from '../services/database.service';
import { AlertController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})

export class HistoryPage {
  historyList: any = [];
  loader: any;
  constructor(
    public helper: HelperService,
    public database: DatabaseService,
    public alert: AlertController,
    private actionCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public router: Router
  ) { }

  ionViewDidEnter() {
    this.getHistory()
  }
  async showLoading() {
    this.loader = await this.loadingCtrl.create({
      message: this.helper.changeLanguageMessage('Loading...'),
      spinner: "bubbles"
      
    });

    this.loader.present();
  }

  getHistory() {
    this.showLoading().then(() => {
      this.database.getHistory().then((resp: any) => {
        this.historyList = resp.values;
        this.loader.dismiss()
      }).catch((error) => {
        this.loader.dismiss()
      });

    })
  }

  async presentActionSheet(item: any) {
    const actionSheet = await this.actionCtrl.create({
      header: this.helper.changeLanguageMessage(item.loanType) + ' | ' + item.amount,
      mode: 'ios',
      buttons: [
        {
          text: this.helper.changeLanguageMessage('View'),
          handler: () => {
            this.view(item);
          },
        },
        {
          text: this.helper.changeLanguageMessage('Delete'),
          role: 'destructive',
          handler: () => {
            this.delete(item)
          },
        },

        {
          text:this.helper.changeLanguageMessage('Cancel'),
          role: 'cancel',
          handler: () => {

          },
        },
      ],
    });

    await actionSheet.present();
  }
  async delete(item: any) {
    let alertL = await this.alert.create({
      header: this.helper.changeLanguageMessage(this.helper.app_name),
      message: this.helper.changeLanguageMessage('Are you sure you want to delete this.'),
      buttons: [
        {
          text:  this.helper.changeLanguageMessage('Cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah: any) => { },
        },
        {
          text: this.helper.changeLanguageMessage('Delete'),
          handler: () => {
            this.database.delete(item.id).then((resp) => {
              this.getHistory();
              this.helper.presentToast('Deleted successfully');
            }).catch((error) => {
              this.helper.presentToast('Something went wrong')
            })
          },
        },
      ],
    });

    alertL.present();
  }

  view(item: any) {


    this.router.navigate(['/calculation'], { queryParams: item });
  }
}
