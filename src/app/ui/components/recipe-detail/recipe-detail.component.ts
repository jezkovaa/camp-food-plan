import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonSearchbar, IonButton, IonIcon, IonPopover, ModalController, PopoverController, IonSelect, IonSelectOption } from "@ionic/angular/standalone";
import { VariantsListComponent } from '../variants-list/variants-list.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RecipeVariantDetailComponent } from '../recipe-variant-detail/recipe-variant-detail.component';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { Course } from 'src/app/data/enums/courses.enum';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { add, alert, trash } from 'ionicons/icons';
import { VariantService } from 'src/app/data/services/variant.service';
import { CourseListComponent } from '../course-list/course-list.component';
import { AlertService } from '../../services/alert.service';
import { ChooseVariantPopoverComponent } from '../choose-variant-popover/choose-variant-popover.component';
import { IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { BasePlanningService } from 'src/app/data/services/base-planning.service';
import { ID } from 'src/app/types';
import { IDayMeal, IDayMealRecipe, IDayMealRecipeVariant, IDayMenu } from 'src/app/data/interfaces/day-menu.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchbarWithButtonsComponent } from "../searchbar-with-buttons/searchbar-with-buttons.component";
import { IFilterOptions } from 'src/app/data/interfaces/filter-options.interface';
import { SortOption } from 'src/app/data/enums/sort-options.enum';
import { LoadingService } from '../../services/loading.service';

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
    IonSelect,
    IonSelectOption,
    VariantsListComponent,
    RecipeVariantDetailComponent,
    TranslateModule,
    CommonModule,
    CourseListComponent,
    SearchbarWithButtonsComponent
  ]
})
export class RecipeDetailComponent implements OnInit {

  @Input({ required: true }) recipe!: IRecipe;
  @Input() isEditing = false;
  @Input() isChoosing = false;
  @Input() course: Course = Course.BREAKFAST;

  @Input() searchValue = '';
  @Input() filter: IFilterOptions | null = null;
  @Input() sortOption: SortOption = SortOption.NAME_ASC;


  @Input() selectedVariants: IDayMealRecipeVariant[] = [];

  @Output() portionsChanged = new EventEmitter<IDayMeal>();
  @Output() navigateToNewVariantEventNewRecipe = new EventEmitter<IRecipe>();
  @Output() navigateToNewVariantEventExistingRecipe = new EventEmitter<ID | null>();

  @ViewChild('chooseCoursePopover') popover!: IonPopover;
  @ViewChild('addPopover') addPopover!: IonPopover;

  selectedIds: string[] = [];
  selectedItems: Array<{ variantId: ID, name: string; portions: number; }> = [];

  public alertButtons = [
    this.translateService.instant('common.ok'),
    this.translateService.instant('common.cancel')
  ];

  ngOnInit(): void {

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
    private variantService: VariantService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private popoverController: PopoverController,
    private loadingService: LoadingService,
    private router: Router) {

    addIcons({ add, trash, alert });

  }

  getCourseNames(courses: Course[]): string {
    if (courses.length === 0) {
      return this.translateService.instant('courses.no-course');
    }
    return courses.map(course => this.translateService.instant(`courses.${course}`)).join(', ');

  }

  async chooseCourse() {
    try {
      await this.popover.present();
    } catch (error) {
      console.error('Error presenting popover:', error);
    }
  }

  async chooseSelected() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.recipe.id === null) {
      return;
    }

    const modal = await this.popoverController.create({
      component: ChooseVariantPopoverComponent,
      componentProps: {
        recipeId: this.recipe.id,
        selectedIds: this.selectedIds
      },
    });
    await modal.present();

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


  async handleAddVariant(event: MouseEvent) {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.recipe && !this.recipe.id) {
      this.navigateToNewVariantEventNewRecipe.emit(this.recipe);
    }
    else {
      this.addPopover.event = event;
      await this.addPopover.present();
    }
  }

  async addVariant() {
    //todo
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.recipe.id === null) {
      this.navigateToNewVariantEventNewRecipe.emit(this.recipe);
    } else {
      this.navigateToNewVariantEventExistingRecipe.emit();
    }
  }

  addFromExistingVariant(event: any) {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    const variant = event.detail.value;
    if (variant === null) {
      //should not happen
      this.addPopover.dismiss().then(() => {
        this.navigateToNewVariantEventExistingRecipe.emit();
      });
    } else {
      this.addPopover.dismiss().then(() => {
        this.navigateToNewVariantEventExistingRecipe.emit(variant.id);
      });
    }

  }


  selectedCountChanged(selectedIds: string[]) {

    this.selectedIds = selectedIds;
  }

  async deleteSelected() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();

    const alert = await this.alertService.presentConfirm(
      this.translateService.instant('recipe-detail.delete-variants'),
      this.translateService.instant('recipe-detail.delete-variants-message'),
      async () => {
        const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
        buttonElement.blur();
        if (this.recipe.id) {
          const loading = await this.loadingService.showLoading();
          await loading.present();
          this.variantService.deleteSelected(this.recipe.id, this.selectedIds).subscribe({
            next: (variants: IRecipeVariant[]) => {
              this.selectedIds = [];
              this.recipe.variants = variants;
              loading.dismiss();
            },
            error: (err: any) => {
              console.error(err);
              loading.dismiss();
            }
          }
          );
        }
      });
    await alert.present();
  }

  selectedCoursesChange(courses: Course[]) {
    this.recipe.courses = courses;
    this.popover.dismiss();
  }

  searchValueChanged(searchValue: string) {
    this.searchValue = searchValue;
  }

  filterChanged(filter: IFilterOptions) {
    this.filter = filter;
  }

  sortOptionChanged(sortOption: SortOption) {
    this.sortOption = sortOption;
  }

  openVariant(variantId: ID) {
    this.router.navigate(['/tabs/recipes', this.recipe.id, 'variants', variantId]);
  }

};
