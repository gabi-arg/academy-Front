import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../services/popup.service';
@Component({
  selector: 'app-pop-up-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up-alert.component.html',
  styleUrl: './pop-up-alert.component.css'
})
export class PopUpAlertComponent {
  show = false;
  message = '';
  type: 'success' | 'error' | 'info' = 'info';
  constructor(private popupService: PopupService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.popupService.popupState$.subscribe(state => {
      this.message = state.message;
      this.type = state.type || 'info';
      this.show = !!state.message;
      this.cdr.detectChanges();
    });
  }

  closePopup() {
    this.popupService.hidePopup();
    this.show = false;
    this.cdr.detectChanges();
  }
}
