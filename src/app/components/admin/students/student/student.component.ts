import { Component, OnInit } from '@angular/core';
import { NewStudentsService, StudentForm } from '../../../../services/new-students.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-student',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
  student: StudentForm | null = null;
  firstLetter: string = '';
  constructor(private studentService: NewStudentsService) {}

  ngOnInit() {
    this.student = this.studentService.getCurrentStudent();
    if (this.student) {
      this.firstLetter = this.student.name.charAt(0).toUpperCase();
    }
}
}
