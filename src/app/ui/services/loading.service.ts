import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingElement: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController, private translateService: TranslateService) { }

  async showLoading(): Promise<HTMLIonLoadingElement> {
    let message = "";
    message += 'showLoading';
    const loadingElement = await this.loadingController.create({
      message: this.translateService.instant('loading'),
      spinner: 'crescent',
    });
    message += 'await loading';
    return loadingElement;
  }

  async hideLoading(): Promise<void> {
    if (this.loadingElement) {
      await this.loadingElement.dismiss();
      this.loadingElement = null;
    }
  }
}