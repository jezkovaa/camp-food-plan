import { Component, Input, OnInit } from '@angular/core';
import { RecipeVariantComponent } from '../../recipe-variant-components/recipe-variant/recipe-variant.component';
import { IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";
import { VariantsListComponent } from '../../recipe-variant-components/variants-list/variants-list.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RecipeVariantDetailComponent } from '../../recipe-variant-components/recipe-variant-detail/recipe-variant-detail.component';
import { Recipe } from 'src/app/recipes/data/interfaces/recipe.interface';
import { Course } from 'src/app/recipes/data/enums/courses.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    VariantsListComponent,
    RecipeVariantDetailComponent,
    TranslateModule,
    CommonModule]
})
export class RecipeDetailComponent {

  @Input({ required: true }) recipe!: Recipe;

  constructor(private translate: TranslateService) { }

  getCourseNames(courses: Course[]): string {
    if (courses === undefined) {
      return '';
    }
    return courses.map(course => this.translate.instant(`COURSES.${course}`)).join(', ');

  }

}
