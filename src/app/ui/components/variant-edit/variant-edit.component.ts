import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IIngredient, IProceeding, IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { IonSelectOption, IonTextarea, IonSelect, IonLabel, IonButton, IonIcon, IonInput, IonReorderGroup, IonList, IonItem, IonReorder, IonButtons, IonPopover } from "@ionic/angular/standalone";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeCircle, pencil, save, trash } from 'ionicons/icons';
import { add } from 'ionicons/icons';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Units } from 'src/app/data/enums/units.enum';
import { AlertService } from '../../services/alert.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesFilterComponent } from '../recipes-filter/recipes-filter.component';
import { RestrictionHelpComponent } from '../restriction-help/restriction-help.component';
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { RestrictionComponent } from "../restriction/restriction.component";
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-variant-edit',
  templateUrl: './variant-edit.component.html',
  styleUrls: ['./variant-edit.component.scss'],
  standalone: true,
  imports: [IonPopover, IonButtons, IonReorder, IonItem, IonList, IonReorderGroup,
    IonInput,
    IonIcon,
    IonButton,
    IonLabel,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RestrictionHelpComponent, RestrictionComponent],
})
export class VariantEditComponent implements OnInit {

  @Input() variant: IRecipeVariant | null = null;
  // @Output() ingredientsChangedEvent = new EventEmitter<IIngredient[]>();

  @ViewChild('chooseVariantPopover') chooseVariantPopover!: IonPopover;

  units = Object.values(Units).filter((value) => value !== Units.NONE);

  formArray: FormArray = this.fb.array([]);
  proceedingFormArray: FormArray = this.fb.array([]);

  foodRestrictions: Set<FoodRestriction> = new Set<FoodRestriction>();

  constructor(private translateService: TranslateService,
    private alertService: AlertService,
    private fb: FormBuilder) {
    addIcons({ add, trash, pencil });
  }

  ngOnInit() {
    this.foodRestrictions = cloneDeep(this.variant?.restrictions || new Set<FoodRestriction>());
    this.initForm();
  }



  private initForm() {
    this.variant?.ingredients.forEach((ingredient) => {
      this.formArray.push(this.fb.group({
        name: [ingredient.name, Validators.required],
        quantity: [ingredient.quantity, Validators.required],
        unit: [ingredient.unit, Validators.required]
      }) as FormGroup);
    });
    if (this.variant?.ingredients.length === 0) {
      this.formArray.push(this.fb.group({
        name: ['', Validators.required],
        quantity: [null, Validators.required],
        unit: [Units.NONE, Validators.required]
      }) as FormGroup);
    }

    this.variant?.proceeding.forEach((step) => {
      this.proceedingFormArray.push(this.fb.group({
        description: [step.description, Validators.required],
        order: [step.order, Validators.required]
      }) as FormGroup);
    });
  }

  getFormGroup(index: number): FormGroup {
    return this.formArray.at(index) as FormGroup;
  }

  getProceedingFormGroup(index: number): FormGroup {
    return this.proceedingFormArray.at(index) as FormGroup;
  }

  addIngredient() {
    this.formArray.push(this.fb.group({
      name: ['', Validators.required],
      quantity: [null, Validators.required],
      unit: [Units.NONE, Validators.required]
    }) as FormGroup);

  }

  removeIngredient(index: number) {
    this.formArray.removeAt(index);
    // this.ingredientsChangedEvent.emit(this.ingredients);
  }

  ingredientsChanged() {
    //this.ingredientsChangedEvent.emit(this.ingredients);
  }

  handleReorder(event: any) {
    const formGroupToMove = this.formArray.at(event.detail.from);
    this.formArray.removeAt(event.detail.from);
    this.formArray.insert(event.detail.to, formGroupToMove);

    event.detail.complete();
  }

  addStep() {
    const last = this.proceedingFormArray.controls.at(this.proceedingFormArray.length - 1);
    const maxOrder = last ? last.get('order')?.value : 0;

    this.proceedingFormArray.push(this.fb.group({
      order: [maxOrder + 1, Validators.required],
      description: ['', Validators.required]
    }) as FormGroup);

  }

  selectUnit(index: number, event: any) {
    const control = this.formArray.at(index) as FormGroup;
    control.get('unit')?.setValue(event.detail.value);
    this.ingredientsChanged();
  }


  async getVariant(): Promise<IRecipeVariant | null> {
    if (this.variant === null) {
      //should not happen
      console.error('Variant is null, cannot get variant data.');
      return null;
    }

    let errorMessage = '';

    if (this.variant.name === '') {
      errorMessage += this.translateService.instant('recipes.variant.name-error') + '\n';
    }
    if (this.formArray.length === 0) {
      errorMessage += this.translateService.instant('recipes.variant.invalid-ingredients') + '\n';
    }
    if (!this.validateIngredients()) {
      errorMessage += this.translateService.instant('recipes.variant.ingredients-error') + '\n';
    }
    if (!this.validateProceeding()) {
      errorMessage += this.translateService.instant('recipes.variant.proceeding-error') + '\n';
    }

    if (errorMessage !== '') {
      const alert = await this.alertService.presentAlert(
        this.translateService.instant('recipes.variant.invalid-data'),
        errorMessage,
      );
      await alert.present();
      return null;
    }

    this.variant.ingredients = this.ingredients;
    this.variant.proceeding = this.proceeding;
    this.variant.restrictions = this.foodRestrictions;
    return this.variant;
  }

  /*getVariantWithoutControl() {
    if (this.variant === null) {
      //should not happen 
      console.error('Variant is null, cannot get variant data.');
      return null;
    }
    const ingredientsFiltered = this.ingredients.filter(ingredient => ingredient.name !== '' && ingredient.quantity !== null && ingredient.unit !== null);
    const proceedingFiltered = this.proceeding.filter(step => step.description !== '');
    return { ingredients: ingredientsFiltered, proceeding: proceedingFiltered };
  }*/

  removeStep(index: number) {
    this.proceedingFormArray.removeAt(index);
  }

  private validateIngredients(): boolean {
    for (const ingredient of this.ingredients) {
      if (!ingredient.name || ingredient.quantity === null || ingredient.unit === null) {
        return false; // Invalid ingredient
      }
    }
    return true; // All ingredients are valid
  }

  private validateProceeding(): boolean {
    for (const step of this.proceeding) {
      if (!step.description) {
        return false; // Invalid step
      }
    }
    return true; // All steps are valid
  }

  private get ingredients(): IIngredient[] {
    return this.formArray.controls.map(control => ({
      name: control.get('name')?.value,
      quantity: control.get('quantity')?.value,
      unit: control.get('unit')?.value,
      durability: null
    }));
  }

  private get proceeding(): IProceeding[] {
    return this.proceedingFormArray.controls.map(control => ({
      order: control.get('order')?.value,
      description: control.get('description')?.value
    }));
  }

  get isValid(): boolean {
    return this.formArray.valid && this.proceedingFormArray.valid;
  }

  isIngredientsValidAndChanged() {
    const ingredients = this.ingredients;
    const initialIngredients = this.variant?.ingredients || [];

    if (ingredients.length === 0) {
      return false; //no ingredients is not valid
    }

    const returnValue = ingredients.every((ingredient) => {
      return ingredient.name !== '' && ingredient.quantity !== null && ingredient.unit !== Units.NONE;
    });

    if (!returnValue) {
      return false; // Invalid ingredient
    }

    if (ingredients.length > initialIngredients.length) {
      return true; // New ingredients added
    }

    return ingredients.length > 0 && ingredients.some((ingredient, index) => {
      const initialIngredient = initialIngredients[index];
      return ingredient.name !== initialIngredient.name ||
        ingredient.quantity !== initialIngredient.quantity ||
        ingredient.unit !== initialIngredient.unit;
    });
  }

  isProceedingValidAndChanged() {
    const proceeding = this.proceeding;
    const initialProceeding = this.variant?.proceeding || [];

    const returnValue = proceeding.every((step) => {
      return step.description !== '';
    });

    if (!returnValue) {
      return false; // Invalid step
    }

    if (proceeding.length > initialProceeding.length) {
      return true; // New steps added
    }

    return proceeding.length > 0 && proceeding.some((step, index) => {
      const initialStep = initialProceeding[index];
      return step.description !== initialStep.description ||
        step.order !== initialStep.order;
    });
  }

  async chooseVariant(event: Event) {
    this.chooseVariantPopover.event = event;
    await this.chooseVariantPopover.present();
  }

  selectionChanged(e: {
    restriction: FoodRestriction,
    checked: boolean;
  }) {

    if (e.checked) {
      this.foodRestrictions.add(e.restriction);
    } else {
      this.foodRestrictions.delete(e.restriction);
    }
  }

}
