import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAlertComponent } from './pop-up-alert.component';

describe('PopUpAlertComponent', () => {
  let component: PopUpAlertComponent;
  let fixture: ComponentFixture<PopUpAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
