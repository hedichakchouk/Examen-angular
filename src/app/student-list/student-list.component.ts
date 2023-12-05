import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentService} from "../student.service";
import {StudentAddComponent} from "../student-add/student-add.component";
import {MatDialog} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  students: any[]=[];

  constructor(private studentService: StudentService,private dialog: MatDialog,private datePipe: DatePipe) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }
  formatDate(date: string): string {
    let formattedDate = new Date(date);
    return this.datePipe.transform(formattedDate, 'MMMM dd, yyyy')!;
  }
  openAddStudentDialog(): void {
    const dialogRef = this.dialog.open(StudentAddComponent, {
      width: '400px', // Adjust the width as needed
      panelClass: 'custom-dialog-container', // Add this line

    });

    // Subscribe to the afterClosed event to handle the result when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      // Handle the result if needed
      this.students.splice(0);
      this.studentService.getStudents().subscribe(data => {
        this.students = data;
      });
      console.log('The dialog was closed', result);
    });
  }
  deleteStudent(student: any): void {
    // Implement the logic to delete the student from the list
    const index = this.students.indexOf(student);
    if (index !== -1) {
      this.students.splice(index, 1);
    }
  }
}
