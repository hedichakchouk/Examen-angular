import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentService} from "../../Services/student.service";
import {StudentAddComponent} from "../student-add/student-add.component";
import {MatDialog} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import { DatePipe } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Student} from "../../models/student";

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule, MatButtonModule, MatCardModule, MatTooltipModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  students: any[]=[];
  displayedColumns: string[] = ['matricule', 'nom', 'prenom', 'dateinstcription', 'delete'];

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
  deleteStudent(student: Student): void {
    // Assuming 'Student' is your model and it has a 'matricule' property
    if (confirm(`Are you sure you want to delete student ${student.nom}?`)) {
      this.studentService.deleteStudent(student.matricule).subscribe({
        next: (response) => {
          if (response.success) {
            console.log("Student deleted successfully");
            // Optionally refresh the list of students from the server
            // This can be useful if you want to ensure your local list is in sync with the backend
            this.loadStudents();
          } else {
            console.error("Failed to delete the student");
          }
        },
        error: (err) => console.error("Error deleting the student:", err)
      });
    }
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(students => this.students = students);
  }

}
