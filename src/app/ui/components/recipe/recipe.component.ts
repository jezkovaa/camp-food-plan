import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { RestrictionComponent } from "../restriction/restriction.component";
import { IonItem, IonButton, IonIcon } from "@ionic/angular/standalone";
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule, RestrictionComponent, TranslateModule]
})
export class RecipeComponent implements OnInit {

  @Input({ required: true }) recipe!: IRecipe;
  @Input() isEditing = false;
  @Input() isChoosing = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log("isChoosing:", this.isChoosing);
  }

  openRecipe() {
    if (this.isChoosing) {

      this.router.navigate(['./recipe', this.recipe.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['/tabs/recipes', this.recipe.id]);
    }
  }

}
