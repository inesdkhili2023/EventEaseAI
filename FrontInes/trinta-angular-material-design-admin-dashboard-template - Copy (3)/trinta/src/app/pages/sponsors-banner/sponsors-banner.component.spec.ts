import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsBannerComponent } from './sponsors-banner.component';

describe('SponsorsBannerComponent', () => {
  let component: SponsorsBannerComponent;
  let fixture: ComponentFixture<SponsorsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorsBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
