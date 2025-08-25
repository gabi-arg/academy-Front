import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewStudentsService, StudentForm } from '../../../../services/new-students.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../../../../services/popup.service';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent {
  @Input() selectedStudent: StudentForm | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(private studentsService: NewStudentsService, private popupService: PopupService) {}

  onUpdate() {
    this.studentsService.updateStudent(this.selectedStudent!.id, this.selectedStudent!).subscribe({
        next: () => {
          this.popupService.showPopup('Estudiante actualizado correctamente');
          this.close.emit();
        },
        error: (err) => {
          console.error('Error al actualizar estudiante', err);
          this.popupService.showPopup('Ocurrió un error al actualizar el estudiante.');
        }
      });
    }
  }




