import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonList, IonItem, IonCheckbox, IonLabel, IonButton, IonButtons } from "@ionic/angular/standalone";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Course } from 'src/app/recipes/data/enums/courses.enum';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  standalone: true,
  imports: [
    IonList,
    IonItem,
    IonCheckbox,
    IonLabel,
    IonButton,

    CommonModule,
    TranslateModule
  ]
})
export class CourseListComponent implements OnInit {


  @Input() selectedCourses: Course[] = [];
  @Output() selectedCoursesChange: EventEmitter<Course[]> = new EventEmitter<Course[]>();


  courses = Object.values(Course);



  constructor(private translateService: TranslateService) { }

  ngOnInit() { }

  courseName(course: Course): string {
    return this.translateService.instant(`courses.${course}`);
  }

  courseValue(course: Course): boolean {
    return this.selectedCourses.includes(course);
  }

  applyCourses() {
    this.selectedCoursesChange.emit(this.selectedCourses);
  }

  checkboxClick(e: any, course: Course) {
    this.selectedCourses = e.detail.checked ? [...this.selectedCourses, course] : this.selectedCourses.filter(c => c !== course);
  }

}
