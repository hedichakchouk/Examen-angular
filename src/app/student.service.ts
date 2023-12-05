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

  saveStudents(): Observable<any> {
    // Make the PUT request to update the entire array
    return this.http.put(this.jsonUrl, this.students);
  }
}
