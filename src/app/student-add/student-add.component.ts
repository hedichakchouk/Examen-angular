import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentService} from "../../Services/student.service";
import {FormBuilder, FormGroup, FormsModule, NgForm, Validators} from "@angular/forms";
import {Student} from "../../models/student";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialog} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent {
  student: Student = {
    matricule:'',
    nom:'',
    prenom:'',
    dateInscription:''
  };
  currentDate = new Date();
  studentForm: FormGroup;

  // ... existing code ...

  constructor(private fb: FormBuilder,private studentService: StudentService,private dialogRef: MatDialog) {
    // Initialize the form with controls and validators
    this.studentForm = this.fb.group({
      matricule: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
    });
  }

  // Function to check if the form is valid
  isFormValid(form: NgForm): boolean {
    return form.valid!;
  }

  addStudent(form: NgForm) {
    Object.keys(form.controls).forEach((controlName) => {
      form.controls[controlName].markAsTouched();
    });

    // Check if the form is valid before proceeding
    if (this.isFormValid(form)) {
      this.closeDialog()
      this.student.dateInscription=this.currentDate.toISOString();
      this.studentService.addStudent(this.student).subscribe(() => {
        console.log(this.student.nom)
      });
    }else {

    }

  }
  closeDialog(){
    this.dialogRef.closeAll();

  }
}
