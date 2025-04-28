import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { StatusBar } from '@capacitor/status-bar';
import { PushNotifications } from '@capacitor/push-notifications';
import { Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(public translateService: TranslateService) {
    this.translateService.setDefaultLang('cs');
    this.translateService.use('cs');

    if ((window as any).Capacitor && (window as any).Capacitor.isNativePlatform()) {
      StatusBar.setOverlaysWebView({ overlay: false });
      StatusBar.setBackgroundColor({ color: '#ffffff' });
      this.requestNotificationPermission();
      this.requestFileNotificationPermission();
    }
  }

  async requestNotificationPermission() {
    const permission = await PushNotifications.requestPermissions();
    if (permission.receive === 'granted') {
      console.log('Oznámení povolena!');
    } else {
      console.log('Oznámení zamítnuta.');
    }
  }

  async requestFileNotificationPermission() {
    const permission = await Filesystem.requestPermissions();
    if (permission.publicStorage === 'granted') {
      console.log('Přístup k souborům povolen!');
    } else {
      console.log('Přístup k souborům zamítnut.');
    }

  }




}
