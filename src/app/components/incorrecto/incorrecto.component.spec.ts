import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorrectoComponent } from './incorrecto.component';

describe('IncorrectoComponent', () => {
  let component: IncorrectoComponent;
  let fixture: ComponentFixture<IncorrectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncorrectoComponent]
    });
    fixture = TestBed.createComponent(IncorrectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
