import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonPopover, IonButton, IonIcon } from "@ionic/angular/standalone";
import { RestrictionHelpComponent } from '../restriction-help/restriction-help.component';
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { CommonModule } from '@angular/common';
import { add } from 'lodash';
import { addIcons } from 'ionicons';
import { help } from 'ionicons/icons';

@Component({
  selector: 'app-multiple-restrictions',
  templateUrl: './multiple-restrictions.component.html',
  styleUrls: ['./multiple-restrictions.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonPopover, RestrictionHelpComponent, CommonModule],
})
export class MultipleRestrictionsComponent implements OnInit {

  @ViewChild("restrictionHelpPopover") restrictionHelpPopover!: IonPopover;

  @Input({ required: true }) inputRestrictions: Set<FoodRestriction> = new Set<FoodRestriction>();
  @Input() disabled = false;

  restrictions = FoodRestriction;

  constructor() {

    addIcons({ help });
  }

  ngOnInit() { }


  showRestrictionHelp(e: any) {
    this.restrictionHelpPopover.event = e;
    this.restrictionHelpPopover.present();
  }
}
