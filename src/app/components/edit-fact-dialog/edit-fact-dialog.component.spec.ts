import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFactDialogComponent } from './edit-fact-dialog.component';

describe('EditFactDialogComponent', () => {
  let component: EditFactDialogComponent;
  let fixture: ComponentFixture<EditFactDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFactDialogComponent]
    });
    fixture = TestBed.createComponent(EditFactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
