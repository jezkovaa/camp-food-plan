import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DayMenuOverviewComponent } from "../../components/day-menu-overview/day-menu-overview.component";
import { IDayMenu } from 'src/app/data/interfaces/day-menu.interface';
import { ActivatedRoute } from '@angular/router';
import { PlanningService } from 'src/app/data/services/planning.service';
import { TranslateModule } from '@ngx-translate/core';
import { ID } from 'src/app/types';

@Component({
  selector: 'app-menu-overview',
  templateUrl: './menu-overview.page.html',
  styleUrls: ['./menu-overview.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,

    CommonModule,
    FormsModule,
    TranslateModule,
    DayMenuOverviewComponent]
})
export class MenuOverviewPage implements OnInit {

  dayMenus: IDayMenu[] = [];
  eventId: ID | null = null;

  constructor(private route: ActivatedRoute,
    private planningService: PlanningService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
      if (this.eventId === null) {
        return;
      }
      this.planningService.getEventMenu(this.eventId).subscribe({
        next: (dayMenus: IDayMenu[]) => {
          this.dayMenus = dayMenus;
        },
        error: (error: any) => {
          console.error(error);
        }
      });

    });
  }
}
