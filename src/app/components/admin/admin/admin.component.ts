import { Component, ViewChild } from '@angular/core';
import { FormNewStudentsComponent } from '../students/form-new-students/form-new-students.component';
import { FormsModule } from '@angular/forms';
import { AllStudentsComponent } from '../students/all-students/all-students.component';
import { AuthService } from '../../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ FormNewStudentsComponent, AllStudentsComponent, FormsModule, MatIconModule, RouterModule, CommonModule ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  @ViewChild('allStudents') allStudents!: AllStudentsComponent;

constructor(private authService: AuthService) {}
logout() {
  this.authService.logout();
}
loadStudents() {
  this.allStudents.loadStudents();
}
}
