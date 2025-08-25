import { Component } from '@angular/core';
import { ContactForm, ContactService } from '../../services/contact.service';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ FormsModule],
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
onSubmit() {
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
      },
      error: (err) => {
        this.popupService.showPopup('Hubo un error, intenta nuevamente.');
      }
    });
  }
}
