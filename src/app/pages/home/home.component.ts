import { Component } from '@angular/core';
import { CoursesComponent } from '../../components/courses/courses.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { ContactComponent } from '../../components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ NavbarComponent, CoursesComponent, TestimonialsComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
