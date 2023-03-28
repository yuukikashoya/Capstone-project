import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUpComponent } from './about-up.component';

describe('AboutUpComponent', () => {
  let component: AboutUpComponent;
  let fixture: ComponentFixture<AboutUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
