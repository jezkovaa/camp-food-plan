import { Component, OnInit } from '@angular/core';
import { IonHeader, IonSearchbar, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonBackButton } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { RecipesService } from 'src/app/data/services/recipes.service';
import { RecipesListComponent } from '../../components/recipes-list/recipes-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: 'recipes.page.html',
  styleUrls: ['recipes.page.scss'],
  imports: [IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonSearchbar,
    IonBackButton,
    TranslateModule,
    CommonModule,
    RecipesListComponent],
  standalone: true
})
export class RecipesPage implements OnInit {

  recipes: IRecipe[] = [];


  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ add });
  }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipesService.getRecipes().subscribe((recipes: IRecipe[]) => {
      this.recipes = recipes;
    });
  }

  createRecipe() {
    this.router.navigate(['tabs', 'recipes', 'new']);
  }
}
