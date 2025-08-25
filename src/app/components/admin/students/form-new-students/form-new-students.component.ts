import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NewStudentsService, StudentForm } from '../../../../services/new-students.service';
import { PopupService } from '../../../../services/popup.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-form-new-students',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-new-students.component.html',
  styleUrl: './form-new-students.component.css'
})
export class FormNewStudentsComponent {
  @Output() studentAdded = new EventEmitter<void>();
  studentForm : StudentForm = {
      id:0,
      name: '',
      email: '',
      phone: '',
      level: '',
      grades: 0,
    };

    constructor(private newStudentsService: NewStudentsService,private popupService: PopupService) {}

    onSubmit(form: NgForm) {
      this.newStudentsService.sendStudentForm(this.studentForm).subscribe({
        next: (res) => {
          console.log('Formulario enviado correctamente', res);
          this.popupService.showPopup('¡Estudiante ingresado correctamente!');
           form.resetForm();
           this.studentAdded.emit();
        },
        error: (err) => {
          console.error('Error al enviar formulario', err);
          this.popupService.showPopup('Ocurrió un error al ingresar el estudiante.');
        }
      });
    }
  }

