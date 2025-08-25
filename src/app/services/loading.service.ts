import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  private timeoutId: any;
  loading$ = this._loading.asObservable();


  show() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this._loading.next(true);
  }

  hide() {
    this.timeoutId = setTimeout(() => {
      this._loading.next(false);
      this.timeoutId = null;
    }, 100);
  }
}
