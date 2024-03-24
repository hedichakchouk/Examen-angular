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
  private jsonUrl = 'http://localhost:3000/api/students';

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

  getGenderCounts(): Observable<{ maleCount: number, femaleCount: number }> {
    return this.http.get<{ maleCount: number, femaleCount: number }>('http://localhost:3000/api/gender');
  }

  editStudent(matricule: string, studentData: Student): Observable<any> {
    // Update the student in the local array
    const index = this.students.findIndex(student => student.matricule === matricule);
    if (index !== -1) {
      this.students[index] = {...this.students[index], ...studentData};
    }

    // Make a PUT request to the backend to update the student data
    return this.http.put(`${this.jsonUrl}/${matricule}`, studentData).pipe(
      map(() => {
         return { success: true };
      }),
      catchError(error => {
        // Handle or propagate errors
        console.error('Edit student error:', error);
        return of({ success: false, error });
      })
    );
  }

  getStudentByMatricule(matricule: string): Observable<any> {
    return this.http.get<Student>(`${this.jsonUrl}/${matricule}`).pipe(
      catchError(error => {
        console.error('Get student by matricule error:', error);
        return of(null); // or handle it more appropriately
      })
    );
  }





}
