import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IIngredient, IProceeding, IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { IonSelectOption, IonTextarea, IonSelect, IonLabel, IonButton, IonIcon, IonInput, IonReorderGroup, IonList, IonItem, IonReorder, IonButtons } from "@ionic/angular/standalone";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeCircle, save, trash } from 'ionicons/icons';
import { add } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { Units } from 'src/app/data/enums/units.enum';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-variant-edit',
  templateUrl: './variant-edit.component.html',
  styleUrls: ['./variant-edit.component.scss'],
  standalone: true,
  imports: [IonButtons, IonReorder, IonItem, IonList, IonReorderGroup,
    IonInput,
    IonIcon,
    IonButton,
    IonLabel,
    IonTextarea,
    IonSelect,
    IonSelectOption,

    TranslateModule,
    CommonModule,
    FormsModule
  ],
})
export class VariantEditComponent implements OnInit {

  @Input() variant: IRecipeVariant | null = null;
  @Output() ingredientsChangedEvent = new EventEmitter<IIngredient[]>();

  ingredients: IIngredient[] = [];
  proceeding: IProceeding[] = [];

  units = Object.values(Units);

  constructor(private translateService: TranslateService,
    private alertService: AlertService) {
    addIcons({ add, trash });
  }

  ngOnInit() {
    this.ingredients = this.variant?.ingredients || [];
    if (this.ingredients.length === 0) {
      this.ingredients.push({ name: '', unit: null, quantity: null, durability: null });
    }

    this.proceeding = this.variant?.proceeding || [];
    if (this.proceeding.length === 0) {
      this.proceeding.push({ order: 1, description: '' });
    }
  }

  addIngredient() {
    this.ingredients.push({ name: '', unit: null, quantity: null, durability: null });
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChangedEvent.emit(this.ingredients);
  }

  ingredientsChanged() {
    this.ingredientsChangedEvent.emit(this.ingredients);
  }

  handleReorder(event: any) {
    //todo
    console.log(event);
    const itemToMove = this.ingredients[event.detail.from];
    this.ingredients.splice(event.detail.from, 1);
    this.ingredients.splice(event.detail.to, 0, itemToMove);
    event.detail.complete();
  }

  addStep() {
    this.proceeding.push({ order: 0, description: '' });
  }

  selectUnit(index: number, event: any) {
    this.ingredients[index].unit = event.detail.value;
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
    if (this.ingredients.length === 0) {
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
    return this.variant;
  }

  getVariantWithoutControl() {
    if (this.variant === null) {
      //should not happen 
      console.error('Variant is null, cannot get variant data.');
      return null;
    }
    this.ingredients = this.ingredients.filter(ingredient => ingredient.name !== '' && ingredient.quantity !== null && ingredient.unit !== null);
    this.variant.ingredients = this.ingredients;
    this.proceeding = this.proceeding.filter(step => step.description !== '');
    this.variant.proceeding = this.proceeding;
    return this.variant;
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


}
