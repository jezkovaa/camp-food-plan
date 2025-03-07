import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-planning',
  templateUrl: 'planning.page.html',
  styleUrls: ['planning.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, TranslateModule]
})
export class PlanningPage {

  constructor() { }

}
