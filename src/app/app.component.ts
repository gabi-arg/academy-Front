import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopUpAlertComponent } from './components/pop-up-alert/pop-up-alert.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopUpAlertComponent, CommonModule, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Academy';
}
