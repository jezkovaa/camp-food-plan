import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../../data/services/recipes.service';
import { IonTitle, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonBackButton, IonItem, IonLabel, IonListHeader, IonList, IonImg } from '@ionic/angular/standalone';
import { Recipe } from '../../../data/interfaces/recipe.interface';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { pencil, trash } from 'ionicons/icons';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { RecipesPage } from '../recipes.page/recipes.page';
import { RecipeDetailComponent } from '../../components/recipe-components/recipe-detail/recipe-detail.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe.page',
  templateUrl: './recipe-detail.page.component.html',
  styleUrls: ['./recipe-detail.page.component.scss'],
  imports: [
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonContent,
    IonBackButton,
    IonButtons,
    CommonModule, TranslateModule,
    RecipeDetailComponent],
  standalone: true,
  providers: [TranslateService, TranslateStore]
})
export class RecipeDetailPage implements OnInit {

  recipe: Recipe | null = null;
  component = RecipesPage;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private alertController: AlertController,
    private translateService: TranslateService

  ) {

    addIcons({ pencil, trash });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const recipeId = +params['id'];
      this.recipesService.getRecipe(recipeId).subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
    });
  }

  editRecipe() {
    if (this.recipe === null) {
      return;
    }
    this.router.navigate(['/tabs/recipes', this.recipe.id, 'edit']);
  }


  async deleteRecipe() {
    if (this.recipe === null) {
      return;
    }

    let message = this.translateService.instant('alert.delete-confirm-message');
    if (this.recipe.variants.length > 0) {
      message += this.translateService.instant('alert.delete-confirm-message-variants');
    }

    const alert = await this.alertController.create({
      header: this.translateService.instant('alert.delete-confirm'),
      message: message,
      buttons: [
        {
          text: this.translateService.instant('alert.cancel'),
          role: 'cancel',
        },
        {
          text: this.translateService.instant('alert.ok'),
          handler: () => {
            if (this.recipe) {
              this.recipesService.deleteRecipe(this.recipe.id).subscribe({
                next: async () => {
                  this.deleteSuccess();

                },
                error: async (err: any) => {

                  this.deleteError(err);
                }

              });
            }

          }
        }
      ]
    });
    await alert.present();
  }

  private async deleteSuccess() {
    this.router.navigate(['/tabs/recipes']);
    const alert = await this.alertController.create(
      {
        header: this.translateService.instant('alert.delete-success'),
        message: this.translateService.instant('alert.delete-success-message'),
        buttons: [
          {
            text: this.translateService.instant('alert.ok'),
            role: 'ok',
          },
        ]
      });
    await alert.present();
  }

  private async deleteError(err: any) {
    const alert = await this.alertController.create(
      {
        header: this.translateService.instant('alert.delete-error'),
        message: err,
        buttons: [
          {
            text: this.translateService.instant('alert.ok'),
            role: 'ok',
          },
        ]
      });
    await alert.present();
  }

}
