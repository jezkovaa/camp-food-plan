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
import { IFilter } from 'src/app/data/interfaces/filter.interface';
import { SortOption } from 'src/app/data/enums/sort-options.enum';
import { SearchbarWithButtonsComponent } from '../../components/searchbar-with-buttons/searchbar-with-buttons.component';
import { IFilterOptions } from 'src/app/data/interfaces/filter-options.interface';

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


    CommonModule,
    FormsModule,
    TranslateModule,

    RecipesListComponent,
    SearchbarWithButtonsComponent]
})
export class ChooseRecipePage implements OnInit {

  eventId: ID | null = null;
  dayMenuId: ID | null = null;
  course: Course | null = null;

  recipes: Recipe[] = [];

  searchValue = '';
  filter: IFilterOptions | null = null;
  sortOption = SortOption.NAME_ASC;


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
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.router.navigate(['tabs', 'recipes', 'new']);
  }

  sortOptionChanged(option: SortOption) {
    this.sortOption = option;
  }

  searchValueChanged(value: string) {
    this.searchValue = value;
  }

  filterChanged(filter: IFilterOptions) {
    this.filter = filter;
  }


  private loadRecipes() {
    this.recipesService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

}
