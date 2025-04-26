import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline } from 'ionicons/icons';

@Component({
  selector: '',
  template: ''

})
export class BaseComponent {
  private durationTime = 5000;


  constructor(protected toastController: ToastController,
    protected translateService: TranslateService
  ) {

    addIcons({ checkmarkCircleOutline });
  }

  async presentToast(message: string): Promise<HTMLIonToastElement> {
    const toast = await this.toastController.create({
      message,
      duration: this.durationTime,
      position: 'bottom',

    });

    return toast;
  }


  async presentSuccess(message: string): Promise<HTMLIonToastElement> {
    const toast = await this.toastController.create({
      message,
      duration: this.durationTime,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle-outline',
      swipeGesture: "vertical"

    });

    return toast;
  }

  async presentSuccessWithTakeBack(message: string, takeBackHandler: () => void): Promise<HTMLIonToastElement> {
    const toast = await this.toastController.create({
      message,
      duration: this.durationTime,
      position: 'bottom',
      buttons: [
        {
          text: this.translateService.instant('alert.take-back'),
          role: 'cancel',
          handler: takeBackHandler
        }
      ]
    });
    return toast;
  }

  async presentError(message: string): Promise<HTMLIonToastElement> {
    const toast = await this.toastController.create({
      message,
      duration: this.durationTime,
      position: 'bottom',
      color: 'danger'
    });

    return toast;
  }

  async presentToastCancelAction(message: string, cancelButtonHandler: () => void): Promise<HTMLIonToastElement> {
    const toast = await this.toastController.create({
      message: message,
      duration: this.durationTime,
      buttons: this.cancelButton(cancelButtonHandler)
    });
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    return toast;
  }

  private cancelButton(cancelHandler: () => void) {
    return [
      {
        text: this.translateService.instant('alert.cancel'),
        role: 'cancel',
        handler: cancelHandler
      },
    ];
  }
}
