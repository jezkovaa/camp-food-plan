import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonTitle, IonButton, IonIcon, IonList, IonItem, IonCheckbox, IonLabel, IonButtons } from "@ionic/angular/standalone";
import { Course } from 'src/app/data/enums/courses.enum';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RestrictionHelpComponent } from "../restriction-help/restriction-help.component";
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { IFilterOptions } from 'src/app/data/interfaces/filter-options.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes-filter',
  templateUrl: './recipes-filter.component.html',
  styleUrls: ['./recipes-filter.component.scss'],
  standalone: true,
  imports: [IonLabel, IonCheckbox, IonItem, IonList, IonButton,

    TranslateModule,
    RestrictionHelpComponent,
    CommonModule
  ],
})
export class RecipesFilterComponent implements OnInit {

  @Input() filter: IFilterOptions | null = null;


  @Output() filterChanged = new EventEmitter<IFilterOptions>();

  selectedCourses: Course[] = [];
  selectedRestrictions: FoodRestriction[] = [];

  courses = Object.values(Course);

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    if (this.filter) {
      this.selectedCourses = this.filter.courses;
      this.selectedRestrictions = this.filter.restrictions;
    }
  }


  selectedRestrictionsChanged(e: any) {
    if (e.checked) {
      this.selectedRestrictions = [...this.selectedRestrictions, e.restriction];
    } else {
      this.selectedRestrictions = this.selectedRestrictions.filter((r: FoodRestriction) => r !== e.restriction);
    }
  }




  applyFilter() {
    this.filter = {
      courses: this.selectedCourses,
      restrictions: this.selectedRestrictions
    };
    this.filterChanged.emit(this.filter);
  }

  courseValue(course: Course): boolean {
    return this.selectedCourses.includes(course);
  }


  checkboxClick(e: any, course: Course) {
    this.selectedCourses = e.detail.checked ? [...this.selectedCourses, course] : this.selectedCourses.filter(c => c !== course);
  }

  getCourseName(course: Course): string {
    switch (course) {
      case Course.BREAKFAST:
        return this.translateService.instant('courses.BREAKFAST');
      case Course.LUNCH:
        return this.translateService.instant('courses.LUNCH');
      case Course.DINNER:
        return this.translateService.instant('courses.DINNER');
      case Course.SNACK:
        return this.translateService.instant('courses.SNACK');
      case Course.MORNING_SNACK:
        return this.translateService.instant('courses.MORNING_SNACK');
      default:
        return '';

    }

  }
}