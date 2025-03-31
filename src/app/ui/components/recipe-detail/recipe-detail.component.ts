import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonSearchbar, IonButton, IonIcon, IonPopover, ModalController, IonAlert } from "@ionic/angular/standalone";
import { VariantsListComponent } from '../variants-list/variants-list.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RecipeVariantDetailComponent } from '../recipe-variant-detail/recipe-variant-detail.component';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { Course } from 'src/app/data/enums/courses.enum';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { add, trash } from 'ionicons/icons';
import { RecipesService } from 'src/app/data/services/recipes.service';
import { CourseListComponent } from '../course-list/course-list.component';
import { AlertService } from '../../services/alert.service';
import { ChooseVariantPopoverComponent } from '../choose-variant-popover/choose-variant-popover.component';
import { IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { PlanningService } from 'src/app/data/services/planning.service';
import { ID } from 'src/app/types';
import { IDayMeal, IDayMealRecipe, IDayMealRecipeVariant, IDayMenu } from 'src/app/data/interfaces/day-menu.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  standalone: true,
  imports: [
    IonPopover,
    IonIcon,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonSearchbar,

    VariantsListComponent,
    RecipeVariantDetailComponent,

    TranslateModule,
    CommonModule,
    CourseListComponent]
})
export class RecipeDetailComponent implements OnInit {

  @Input({ required: true }) recipe!: IRecipe;
  @Input() isEditing = false;
  @Input() isChoosing = false;
  @Input() course: Course = Course.BREAKFAST;


  @Output() portionsChanged = new EventEmitter<IDayMeal>();

  @ViewChild(IonPopover) popover!: IonPopover;

  selectedIds: string[] = [];
  selectedItems: Array<{ variantId: ID, name: string; portions: number; }> = [];

  public alertButtons = ['OK', 'Cancel'];

  ngOnInit(): void {
    console.log(this.course);
  }

  get selectedCount(): number {
    return this.selectedIds.length;
  }

  get getSelectedCourses(): Course[] {
    return this.recipe.courses;
  }

  get variantsListToBeDisplayed(): boolean {
    return this.recipe !== null &&
      (this.recipe.variants.length > 1 || ((this.isEditing || this.isChoosing) && this.recipe.variants.length > 0));
  }

  constructor(private translateService: TranslateService,
    private recipesService: RecipesService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private modalController: ModalController) {

    addIcons({ add, trash });

  }

  getCourseNames(courses: Course[]): string {
    if (courses === undefined) {
      return '';
    }
    return courses.map(course => this.translateService.instant(`courses.${course}`)).join(', ');

  }

  chooseCourse() {
    this.popover.present();
  }

  async chooseSelected() {
    if (this.recipe.id === null) {
      return;
    }

    const modal = await this.modalController.create({
      component: ChooseVariantPopoverComponent,
      componentProps: {
        recipeId: this.recipe.id,
        selectedIds: this.selectedIds
      },
    });
    modal.present();

    modal.onDidDismiss().then((eventDetail) => {
      const result: IDayMealRecipeVariant[] | undefined = eventDetail.data;
      if (result && this.recipe.id) {
        const resultRecipe: IDayMealRecipe[] = [{
          recipeId: this.recipe.id,
          variants: result
        }];
        this.portionsChanged.emit({
          course: this.course,
          chosenRecipes: resultRecipe
        });
      }
    });
  }


  addVariant() {
    //todo
  }


  selectedCountChanged(selectedIds: string[]) {

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

};
