import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonTitle, IonButton, IonIcon, IonList, IonItem, IonCheckbox, IonLabel, PopoverController } from "@ionic/angular/standalone";
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
  @Input() foreverFilter: Course[] = [];
  @Input() isRecipesPage = true;


  @Output() filterChanged = new EventEmitter<IFilterOptions>();

  selectedCourses: Set<Course> = new Set<Course>();
  selectedRestrictions: Set<FoodRestriction> = new Set<FoodRestriction>();

  courses = Object.values(Course);

  constructor(private translateService: TranslateService,
    private popoverController: PopoverController
  ) {
  }

  ngOnInit() {
    if (this.filter) {
      this.selectedCourses = this.filter.courses;
      this.selectedRestrictions = this.filter.restrictions;
    }
  }


  selectedRestrictionsChanged(e: any) {
    if (e.checked) {
      this.selectedRestrictions.add(e.restriction);
    } else {
      this.selectedRestrictions.delete(e.restriction);
    }
  }

  applyFilter() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.filter = {
      courses: this.selectedCourses,
      restrictions: this.selectedRestrictions
    };
    // this.filterChanged.emit(this.filter);
    this.popoverController.dismiss(this.filter);
  }

  courseValue(course: Course): boolean {
    return this.selectedCourses.has(course);
  }


  checkboxClick(e: any, course: Course) {
    this.selectedCourses = e.detail.checked ? new Set([...this.selectedCourses, course]) : new Set(Array.from(this.selectedCourses).filter(c => c !== course));
  }

  isForeverFilter(filter: Course): boolean {
    return this.foreverFilter.includes(filter);
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