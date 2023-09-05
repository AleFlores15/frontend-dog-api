import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogcomponentComponent } from './dogcomponent.component';

describe('DogcomponentComponent', () => {
  let component: DogcomponentComponent;
  let fixture: ComponentFixture<DogcomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DogcomponentComponent]
    });
    fixture = TestBed.createComponent(DogcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
