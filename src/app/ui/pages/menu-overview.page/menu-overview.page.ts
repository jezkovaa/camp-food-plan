import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { DayMenuOverviewComponent } from "../../components/day-menu-overview/day-menu-overview.component";
import { IDayMenu } from 'src/app/data/interfaces/day-menu.interface';
import { ActivatedRoute } from '@angular/router';
import { PlanningService } from 'src/app/data/services/planning.service';
import { TranslateModule } from '@ngx-translate/core';
import { ID } from 'src/app/types';
import { IPlannedEvent } from 'src/app/data/interfaces/planned-event.interface';
import { isBefore, isSameDay } from 'date-fns';

@Component({
  selector: 'app-menu-overview',
  templateUrl: './menu-overview.page.html',
  styleUrls: ['./menu-overview.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons,
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

  event: IPlannedEvent | null = null;
  dates: Date[] = [];

  constructor(private route: ActivatedRoute,
    private planningService: PlanningService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      let eventId = params['eventId'];
      if (eventId === null) {
        return;
      }
      this.planningService.getEvent(eventId).subscribe({
        next: (event: IPlannedEvent) => {
          this.event = event;
          if (event.dateFrom && event.dateTo) {
            this.dates = this.datesInRange(event.dateFrom, event.dateTo);
          }
        },
        error: (error: any) => {
          console.error(error);
        }
      });

    });
  }

  datesInRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    const currentDate = new Date(startDate);

    while (isBefore(currentDate, endDate) || isSameDay(currentDate, endDate)) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  getMenuForDate(date: Date): IDayMenu | null {
    if (this.event?.menu) {
      const menu = this.event.menu.find((menu: IDayMenu) => {
        if (menu.date) {
          const menuDate = new Date(menu.date);
          return isSameDay(menuDate, date);
        }
        return null;
      });
      return menu || null;
    }
    return null;
  }
}
