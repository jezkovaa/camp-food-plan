import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {




  constructor(private alertController: AlertController,
    private translateService: TranslateService
  ) { }

  async presentAlert(header: string, message: string, buttons: string[] = ['OK']): Promise<HTMLIonAlertElement> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: buttons
    });

    return alert;
  }

  async presentAlertWithInputs(header: string, inputs: any,
    confirmHandler = (inputValues: any) => { },
    cancelHandler = () => { }
  ) {
    const alert = await this.alertController.create({
      header: header,
      inputs: inputs,
      buttons: this.okCancelButtons(confirmHandler, cancelHandler)
    });

    await alert.present();
    let result = await alert.onDidDismiss();
  }

  async presentConfirm(header: string, message: string, confirmHandler: () => void, cancelHandler: () => void = () => { }): Promise<HTMLIonAlertElement> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: this.okCancelButtons(confirmHandler, cancelHandler)
    });
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    return alert;
  }

  async deleteSuccess(): Promise<HTMLIonAlertElement> {
    const alert = await this.presentAlert(
      this.translateService.instant('alert.delete-success'),
      this.translateService.instant('alert.delete-success-message')
    );
    return alert;
  };

  async deleteError(err: any): Promise<HTMLIonAlertElement> {
    const alert = await this.presentAlert(
      this.translateService.instant('alert.delete-error'),
      this.translateService.instant('alert.delete-error-message') + err
    );
    return alert;
  }

  private okCancelButtons(confirmHandler: (inputValues: any) => void, cancelHandler: () => void) {
    return [
      {
        text: this.translateService.instant('alert.cancel'),
        role: 'cancel',
        handler: cancelHandler
      },
      {
        text: 'OK',
        handler: confirmHandler
      }
    ];
  }
}