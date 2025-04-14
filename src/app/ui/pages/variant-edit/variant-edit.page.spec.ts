import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VariantEditPage } from './variant-edit.page';

describe('VariantEditPage', () => {
  let component: VariantEditPage;
  let fixture: ComponentFixture<VariantEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
