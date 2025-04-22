import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { StatusBar } from '@capacitor/status-bar';
import { PushNotifications } from '@capacitor/push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(public translateService: TranslateService) {
    this.translateService.setDefaultLang('sk');
    this.translateService.use('sk');

    if ((window as any).Capacitor && (window as any).Capacitor.isNativePlatform()) {
      StatusBar.setOverlaysWebView({ overlay: false });
      StatusBar.setBackgroundColor({ color: '#ffffff' });
      this.requestNotificationPermission();
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


}
