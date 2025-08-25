import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';


export interface StudentForm {
  id: number;
  name: string;
  email: string;
  phone: string;
  level:string;
  grades: number;
}


@Injectable({
  providedIn: 'root'
})
export class NewStudentsService {
  private currentStudent: StudentForm | null = null;
  private apiUrl = 'http://localhost:5231/api/student';
  private studentAddedSource = new Subject<void>();
  studentAdded$ = this.studentAddedSource.asObservable();
  constructor(private http: HttpClient) {

  }
  sendStudentForm(data: StudentForm): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllStudents(): Observable<StudentForm[]> {
  return this.http.get<StudentForm[]>(this.apiUrl);
  }
  deleteMessage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateStudent(id: number, data: StudentForm): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  notifyStudentAdded() {
    this.studentAddedSource.next();
  }
  checkStudentByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/check?email=${email}`);
  }
  setCurrentStudent(student: StudentForm) {
    this.currentStudent = student;
  }

  getCurrentStudent(): StudentForm | null {
    return this.currentStudent;
  }

}
