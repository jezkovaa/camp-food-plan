import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DayMenuOverviewComponent } from "../../components/day-menu-overview/day-menu-overview.component";
import { IDayMenu } from 'src/app/planning/data/interfaces/day-menu.interface';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/planning/data/services/planning.service';

@Component({
  selector: 'app-menu-overview',
  templateUrl: './menu-overview.page.html',
  styleUrls: ['./menu-overview.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, DayMenuOverviewComponent]
})
export class MenuOverviewPage implements OnInit {

  dayMenus: IDayMenu[] = [];

  constructor(private route: ActivatedRoute,
    private eventService: EventsService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const eventId = params['eventId'];
      this.eventService.getEventMenu(eventId).subscribe({
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
