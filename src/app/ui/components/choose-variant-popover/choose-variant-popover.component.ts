import { Component, Input, OnInit } from '@angular/core';
import { IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { RecipesService } from 'src/app/data/services/recipes.service';
import { ID } from 'src/app/types';
import { IonText, IonInput, IonToolbar, IonHeader, IonContent, IonItem, IonButton, IonButtons, IonTitle, ModalController } from "@ionic/angular/standalone";
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-choose-variant-popover',
  templateUrl: './choose-variant-popover.component.html',
  styleUrls: ['./choose-variant-popover.component.scss'],
  standalone: true,
  imports: [IonTitle, IonButtons, IonButton, IonContent, IonHeader, IonToolbar,
    IonInput,

    CommonModule,
    TranslateModule,
    FormsModule
  ]
})
export class ChooseVariantPopoverComponent implements OnInit {

  @Input({ required: true }) recipeId: ID = '';
  @Input({ required: true }) selectedIds: ID[] = [];

  selectedItems = [] as Array<{ name: string; portions?: number; }>;

  get allFilledCorrectly(): boolean {
    return this.selectedItems.every(item => item.portions !== undefined && item.portions > 0);
  }

  constructor(private recipesService: RecipesService,
    private modalController: ModalController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.recipesService.getVariants(this.recipeId, this.selectedIds).subscribe({
      next: async (variants) => {
        this.selectedItems = variants.map((variant: IRecipeVariant) => {
          return {
            variantId: variant.id,
            name: variant.name,
            portions: undefined
          };
        });
      },
      error: (err) => {
        console.error('Error fetching variants:', err);
      }
    });

  }

  cancel() {
    this.modalController.dismiss();
  }

  confirm() {

    this.modalController.dismiss(this.selectedItems);
  }

}
