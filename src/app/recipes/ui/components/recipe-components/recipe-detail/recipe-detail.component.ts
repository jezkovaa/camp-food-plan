import { Component, Input, ViewChild } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonSearchbar, IonButton, IonIcon, IonAlert, IonPopover } from "@ionic/angular/standalone";
import { VariantsListComponent } from '../../recipe-variant-components/variants-list/variants-list.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RecipeVariantDetailComponent } from '../../recipe-variant-components/recipe-variant-detail/recipe-variant-detail.component';
import { IRecipe } from 'src/app/recipes/data/interfaces/recipe.interface';
import { Course } from 'src/app/recipes/data/enums/courses.enum';
import { CommonModule } from '@angular/common';
import { TranslateStore } from "@ngx-translate/core";
import { addIcons } from 'ionicons';
import { add, trash } from 'ionicons/icons';
import { RecipesService } from 'src/app/recipes/data/services/recipes.service';
import { CourseListComponent } from '../course-list/course-list.component';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  standalone: true,
  imports: [IonPopover, IonIcon, IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonSearchbar,
    VariantsListComponent,
    RecipeVariantDetailComponent,
    TranslateModule,
    CommonModule,
    CourseListComponent],
  providers: [TranslateService, TranslateStore]
})
export class RecipeDetailComponent {

  @Input({ required: true }) recipe!: IRecipe;
  @Input() isEditing = false;


  @ViewChild(IonPopover) popover!: IonPopover;

  selectedIds: number[] = [];

  get selectedCount(): number {
    return this.selectedIds.length;
  }

  get getSelectedCourses(): Course[] {
    return this.recipe.courses;
  }

  constructor(private translateService: TranslateService,
    private recipesService: RecipesService,
    private alertService: AlertService) {

    addIcons({ add, trash });

  }

  getCourseNames(courses: Course[]): string {
    if (courses === undefined) {
      return '';
    }
    return courses.map(course => this.translateService.instant(`COURSES.${course}`)).join(', ');

  }

  chooseCourse() {
    this.popover.present();
  }

  addVariant() {
    //todo
  }


  selectedCountChanged(selectedIds: number[]) {

    this.selectedIds = selectedIds;
  }

  deleteSelected() {

    this.alertService.presentConfirm(
      this.translateService.instant('recipe-detail.delete-variants'),
      this.translateService.instant('recipe-detail.delete-variants-message'),
      () => {
        if (this.recipe.id) {
          this.recipesService.deleteVariants(this.recipe.id, this.selectedIds).subscribe({
            next: (variants) => {
              this.selectedIds = [];
              this.recipe.variants = variants;
            },
            error: (err: any) => {
              console.error(err);
            }
          }
          );
        }
      });
  }

  selectedCoursesChange(courses: Course[]) {
    this.recipe.courses = courses;
    this.popover.dismiss();
  }

}
