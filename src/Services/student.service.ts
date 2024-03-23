// src/app/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Student } from "../models/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];
  private jsonUrl = 'http://192.168.1.15:3000/api/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    if (this.students.length > 0) {
      return of(this.students);
    } else {
      return this.http.get<Student[]>(this.jsonUrl)
        .pipe(
          catchError(() => of([])),
          map(data => {
            this.students = data;
            return data;
          })
        );
    }
  }

  addStudent(student: Student): Observable<any> {
    this.students.splice(0)
    this.students.push(student);
    return this.saveStudents();
  }

  deleteStudent(matricule: string): Observable<any> {
    // Remove the student from the local array by matricule
    this.students = this.students.filter(student => student.matricule !== matricule);

    // Make a DELETE request to the backend to remove the student by matricule
    return this.http.delete(`${this.jsonUrl}/${matricule}`).pipe(
      map(() => {
        // Optionally, handle any additional logic after successful deletion
        return { success: true };
      }),
      catchError(error => {
        // Handle or propagate errors
        console.error('Delete student error:', error);
        return of({ success: false, error });
      })
    );
  }
  saveStudents(): Observable<any> {
    // Make the PUT request to update the entire array
    return this.http.put(this.jsonUrl, this.students);
  }
}
