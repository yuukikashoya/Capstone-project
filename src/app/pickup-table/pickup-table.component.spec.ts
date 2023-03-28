import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupTableComponent } from './pickup-table.component';

describe('PickupTableComponent', () => {
  let component: PickupTableComponent;
  let fixture: ComponentFixture<PickupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
