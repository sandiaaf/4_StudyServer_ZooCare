import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeepersPage } from './keepers.page';

describe('KeepersPage', () => {
  let component: KeepersPage;
  let fixture: ComponentFixture<KeepersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
