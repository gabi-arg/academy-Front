import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewStudentsComponent } from './form-new-students.component';

describe('FormNewStudentsComponent', () => {
  let component: FormNewStudentsComponent;
  let fixture: ComponentFixture<FormNewStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewStudentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormNewStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
