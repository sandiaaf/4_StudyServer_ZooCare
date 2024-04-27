import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeeperDetailPage } from './keeper-detail.page';

describe('KeeperDetailPage', () => {
  let component: KeeperDetailPage;
  let fixture: ComponentFixture<KeeperDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KeeperDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
