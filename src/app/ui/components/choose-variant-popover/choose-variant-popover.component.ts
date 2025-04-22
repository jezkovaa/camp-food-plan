import { Component, Input, OnInit } from '@angular/core';
import { IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { VariantService } from 'src/app/data/services/variant.service';
import { ID } from 'src/app/types';
import { IonText, IonInput, IonToolbar, IonHeader, IonContent, IonItem, IonButton, IonButtons, IonTitle, PopoverController } from "@ionic/angular/standalone";
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

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

  constructor(private variantService: VariantService,
    private popoverController: PopoverController,
    private loadingService: LoadingService,
  ) { }

  async ngOnInit() {
    const loading = await this.loadingService.showLoading();
    await loading.present();
    this.variantService.getVariants(this.recipeId, this.selectedIds).subscribe({
      next: async (variants: IRecipeVariant[]) => {
        this.selectedItems = variants.map((variant: IRecipeVariant) => {
          return {
            variantId: variant.id,
            name: variant.name,
            portions: undefined
          };
        });
        loading.dismiss();
      },
      error: (err) => {
        console.error('Error fetching variants:', err);
        loading.dismiss();
      }
    });

  }

  cancel() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.popoverController.dismiss();
  }

  confirm() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.popoverController.dismiss(this.selectedItems);
  }

}
