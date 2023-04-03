import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryComponent } from './laundry.component';

describe('LaundryComponent', () => {
  let component: LaundryComponent;
  let fixture: ComponentFixture<LaundryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaundryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
