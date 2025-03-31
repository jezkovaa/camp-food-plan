import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonBackButton, IonSearchbar } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { RecipesListComponent } from 'src/app/ui/components/recipes-list/recipes-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ID } from 'src/app/types';
import { Course } from 'src/app/data/enums/courses.enum';
import { RecipesService } from 'src/app/data/services/recipes.service';
import { Recipe } from 'src/app/data/models/recipe';

@Component({
  selector: 'app-choose-recipe',
  templateUrl: './choose-recipe.page.html',
  styleUrls: ['./choose-recipe.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonBackButton,
    IonSearchbar,

    CommonModule,
    FormsModule,
    TranslateModule,

    RecipesListComponent]
})
export class ChooseRecipePage implements OnInit {

  eventId: ID | null = null;
  dayMenuId: ID | null = null;
  course: Course | null = null;

  recipes: Recipe[] = [];



  constructor(private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
      this.dayMenuId = params['dayMenuId'];
      this.course = params['course'];
    });

    this.loadRecipes();

  }

  createRecipe() {
    this.router.navigate(['tabs', 'recipes', 'new']);
  }


  private loadRecipes() {
    this.recipesService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

}
