import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailExhibitPage } from './detail-exhibit.page';

describe('DetailExhibitPage', () => {
  let component: DetailExhibitPage;
  let fixture: ComponentFixture<DetailExhibitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailExhibitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
