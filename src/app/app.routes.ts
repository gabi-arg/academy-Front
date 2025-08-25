import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MessageComponent } from './components/admin/message/message.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { StudentComponent } from './components/admin/students/student/student.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'message', component: MessageComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'student', component: StudentComponent}
];
