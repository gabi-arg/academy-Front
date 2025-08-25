import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NewStudentsService } from '../../services/new-students.service';
import { PopupService } from '../../services/popup.service';
import { LoadingService } from '../../services/loading.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, CommonModule, MatIconModule, RouterModule

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRegister = false;
  username = '';
  password = '';
  email = '';
  role = '';

  constructor(
    private loadingService: LoadingService,
    private auth: AuthService,
    private router: Router,
    private studentService: NewStudentsService,
    private popupService: PopupService
  ) {}

  toggleForm(event: Event) {
    event.preventDefault();
    this.isRegister = !this.isRegister;
  }
  login() {
    this.loadingService.show();
    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
          this.loadingService.hide();
        if (res.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (res.role === 'Student') {
          this.studentService.checkStudentByEmail(this.email).subscribe({
            next: (studentData) => {
              this.studentService.setCurrentStudent(studentData);
              this.router.navigate(['/student']);
            },
            error: () => {
              this.popupService.showPopup('Hubo un error, intenta nuevamente.');
            }
          });
        } else {
          this.popupService.showPopup('Rol no reconocido.');
        }
      },
      error: () => {
        this.loadingService.hide();
        this.popupService.showPopup('Login inválido');
      }
    });
  }

  register() {
    this.loadingService.show();
    if (!this.role) {
      this.popupService.showPopup('Por favor seleccioná un rol (Admin o Estudiante)');
      return;
    }

    if (this.role === 'Admin') {
      const payload = {
        username: this.username,
        password: this.password,
        email: this.email,
        role: this.role
      };

      this.auth.register(payload).subscribe({
        next: (res) => {
          this.loadingService.hide();
          this.popupService.showPopup('Registro exitoso. Ahora podés iniciar sesión.');
          this.resetForm();
        },
        error: (err) => {
          console.log('🎓 Error en el registro:', err);
          this.popupService.showPopup('Hubo un error, intenta nuevamente.');
        }
      });

    } else {
      this.studentService.checkStudentByEmail(this.email).subscribe({
        next: (student) => {

          const payload = {
            username: this.username,
            password: this.password,
            email: this.email,
            role: this.role
          };

          this.auth.register(payload).subscribe({
            next: (res) => {
              this.popupService.showPopup('Registro exitoso. Ahora podés iniciar sesión.');
              this.resetForm();
            },
            error: (err) => {
              this.popupService.showPopup('Hubo un error, intenta nuevamente.');
            }
          });
        },
        error: (err) => {
          this.loadingService.hide();
          this.popupService.showPopup('No se encuentra registrado como estudiante. Contactá al administrador.');
        }
      });
    }
  }


  resetForm() {
    this.isRegister = false;
    this.username = '';
    this.email = '';
    this.password = '';
    this.role = '';
  }
}
