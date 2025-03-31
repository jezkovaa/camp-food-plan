import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningPage } from './planning.page';

describe('Tab2Page', () => {
  let component: PlanningPage;
  let fixture: ComponentFixture<PlanningPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(PlanningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
