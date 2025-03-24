import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuOverviewPage } from './menu-overview.page';

describe('MenuOverviewPage', () => {
  let component: MenuOverviewPage;
  let fixture: ComponentFixture<MenuOverviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
