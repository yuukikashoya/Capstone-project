import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSalesComponent } from './manage-sales.component';

describe('ManageSalesComponent', () => {
  let component: ManageSalesComponent;
  let fixture: ComponentFixture<ManageSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
