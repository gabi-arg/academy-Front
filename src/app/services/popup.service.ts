import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface PopupState {
  message: string;
  type: 'success' | 'error' | 'info' | null;
}
@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupState = new BehaviorSubject<PopupState>({ message: '', type: null });
  popupState$ = this.popupState.asObservable();

  showPopup(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.popupState.next({ message, type });
  }

  hidePopup() {
    this.popupState.next({ message: '', type: null });
  }
}
