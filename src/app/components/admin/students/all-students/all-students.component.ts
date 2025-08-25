import { Component, OnInit } from '@angular/core';
import { NewStudentsService, StudentForm } from '../../../../services/new-students.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-students',
  standalone: true,
  imports: [CommonModule, MatIcon, EditStudentComponent, FormsModule],
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.css'
})
export class AllStudentsComponent implements OnInit {
  students: StudentForm[] = [];
  showEditModal = false;
  selectedStudent: StudentForm | null = null;
  constructor(private newStudentsService: NewStudentsService) { }

  private studentAddedSubscription!: Subscription;
  ngOnInit() {
    this.loadStudents();
    this.studentAddedSubscription = this.newStudentsService.studentAdded$.subscribe(() => {
      this.loadStudents();
    });
  }
  ngOnDestroy() {
    if (this.studentAddedSubscription) {
      this.studentAddedSubscription.unsubscribe();
    }
  }
  onEdit(student: StudentForm) {
    this.selectedStudent = { ...student };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedStudent = null;
    this.loadStudents();
  }

  loadStudents() {
    this.newStudentsService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => {
        console.error('Error al obtener estudiantes', err);
      }
    });
  }
  onDelete(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      this.newStudentsService.deleteMessage(id).subscribe({
        next: () => {
          this.students = this.students.filter(student => student.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar estudiante', err);
        }
      });
    }
  }
  onUpdate() {
    if (this.selectedStudent) {
      this.newStudentsService.updateStudent(this.selectedStudent.id, this.selectedStudent).subscribe({
        next: () => {
          this.loadStudents();
          this.selectedStudent = null;
        },
        error: (err) => {
          console.error('Error al actualizar estudiante', err);
        }
      });
    }
  }

}
