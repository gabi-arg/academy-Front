import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactForm, ContactService } from '../../../services/contact.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PopupService } from '../../../services/popup.service';
@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: ContactForm[] = [];

  constructor(private contactService: ContactService, private popupService: PopupService) {}

  ngOnInit(): void {
    this.contactService.getAllMessages().subscribe(data => {
      this.messages = data.map(m => ({ ...m, read: false }));
      this.messages = data;
    });
  }
  markAsRead(msg: ContactForm) {
  msg.read = true;
}
deleteMessage(id: number) {
  const originalMessages = [...this.messages];
  this.messages = this.messages.filter(msg => msg.id !== id);

  this.contactService.deleteMessage(id).subscribe({
    error: (err) => {
      console.error('Error al eliminar:', err);
      this.messages = originalMessages;
      this.popupService.showPopup('Error al eliminar el mensaje. Intentalo de nuevo.');
    }
  });
}

}

