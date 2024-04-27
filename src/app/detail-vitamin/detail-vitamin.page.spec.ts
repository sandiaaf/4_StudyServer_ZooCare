import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailVitaminPage } from './detail-vitamin.page';

describe('DetailVitaminPage', () => {
  let component: DetailVitaminPage;
  let fixture: ComponentFixture<DetailVitaminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailVitaminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
