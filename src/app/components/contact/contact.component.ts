import { Component } from '@angular/core';
import { ContactForm, ContactService } from '../../services/contact.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PopupService } from '../../services/popup.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ FormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactForm: ContactForm = {
    id:0,
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(private contactService: ContactService,private popupService: PopupService) {}
onSubmit(form: NgForm) {
    this.contactService.sendContactForm(this.contactForm).subscribe({
      next: (res) => {
       this.popupService.showPopup('¡Mensaje enviado con éxito!');

        this.contactForm = {
          id: 0,
          name: '',
          email: '',
          phone: '',
          message: ''
        };
        form.resetForm();
      },
      error: (err) => {
        this.popupService.showPopup('Hubo un error, intenta nuevamente.');
      }
    });
  }
}
