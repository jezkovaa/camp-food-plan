import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { IDayMeal } from 'src/app/data/interfaces/day-menu.interface';
import { PlanningService } from 'src/app/data/services/planning.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.page.html',
  styleUrls: ['./meal-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MealDetailPage implements OnInit {

  meal: IDayMeal | null = null;

  constructor(private route: ActivatedRoute,
    private planningService: PlanningService,
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const eventId = params['eventId'];
      const dayMenuId = params['dayMenuId'];
      const mealId = params['mealId'];
      // Fetch meal details using mealId

      this.planningService.getMeal(eventId, dayMenuId, mealId).subscribe({
        next: (meal: IDayMeal) => {
          this.meal = meal;
        },
        error: (err: any) => {
          console.error('Error fetching meal details:', err);
        }
      });

    });
  }

}
