import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { addIcons } from 'ionicons';
import { leaf } from 'ionicons/icons';
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { IonIcon, IonButton, IonPopover } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RestrictionHelpComponent } from "../restriction-help/restriction-help.component";

@Component({
  selector: 'app-restriction',
  templateUrl: './restriction.component.html',
  styleUrls: ['./restriction.component.scss'],
  imports: [IonIcon, CommonModule]
})
export class RestrictionComponent {

  @Input({ required: true }) restriction: FoodRestriction = FoodRestriction.NONE;

  noRestriction = FoodRestriction.NONE;

  restrictions = FoodRestriction;

  constructor() {
    addIcons({ leaf });
  }


}
