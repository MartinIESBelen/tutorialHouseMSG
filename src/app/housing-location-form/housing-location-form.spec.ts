import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingLocationForm } from './housing-location-form';

describe('HousingLocationForm', () => {
  let component: HousingLocationForm;
  let fixture: ComponentFixture<HousingLocationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousingLocationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingLocationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
