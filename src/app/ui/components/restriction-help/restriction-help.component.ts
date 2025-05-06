import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { RestrictionComponent } from "../restriction/restriction.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { IonLabel, IonCheckbox } from "@ionic/angular/standalone";

@Component({
  selector: 'app-restriction-help',
  templateUrl: './restriction-help.component.html',
  styleUrls: ['./restriction-help.component.scss'],
  standalone: true,
  imports: [IonCheckbox, IonLabel,
    RestrictionComponent,
    CommonModule,
    TranslateModule

  ],
})
export class RestrictionHelpComponent implements OnInit {

  @Input() isSelectable = false;
  @Input() selectedRestrictions: Set<FoodRestriction> = new Set<FoodRestriction>();
  @Output() selectedRestrictionsChanged = new EventEmitter<any>();

  restrictions = Object.values(FoodRestriction).filter(value => value !== FoodRestriction.NONE) as FoodRestriction[];

  constructor(private translateService: TranslateService) { }

  ngOnInit() { }

  getRestrictionText(restriction: FoodRestriction): string {
    return this.translateService.instant(`food-restriction.${restriction}`);
  }

  getValue(restriction: FoodRestriction): boolean {
    return this.selectedRestrictions.has(restriction);
  }

  checkboxClick(restriction: FoodRestriction, event: Event) {
    this.selectedRestrictionsChanged.emit({
      restriction: restriction,
      checked: (event.target as HTMLInputElement).checked
    });
  }
}
