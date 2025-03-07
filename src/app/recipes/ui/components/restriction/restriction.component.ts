import { Component, Input, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { leaf } from 'ionicons/icons';
import { FoodRestriction } from 'src/app/recipes/data/enums/food-restriction.enum';
import { IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restriction',
  templateUrl: './restriction.component.html',
  styleUrls: ['./restriction.component.scss'],
  imports: [IonIcon, CommonModule]
})
export class RestrictionComponent implements OnInit {


  @Input() inputRestrictions: FoodRestriction[] = [];

  restrictions = FoodRestriction;

  constructor() {

    addIcons({ leaf });
  }

  ngOnInit() { }

}
