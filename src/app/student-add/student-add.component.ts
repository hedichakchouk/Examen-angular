import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentService} from "../../Services/student.service";
import {FormBuilder, FormGroup, FormsModule, NgForm, Validators} from "@angular/forms";
import {Student} from "../../models/student";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelect, MatOption],
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent {
  mode: 'add' | 'edit' = 'add'; // Default to 'add' mode

  student: Student = {
    matricule:'',
    nom:'',
    prenom:'',
    dateInscription:'',
    gender:'',
    dateOfBirth: undefined   // Type assertion

  };
  currentDate = new Date();
  studentForm: FormGroup;


  constructor(private fb: FormBuilder,private studentService: StudentService,private dialogRef: MatDialogRef<StudentAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any // Inject dialog data
  ) {
    // Initialize the form with controls and validators
    this.studentForm = this.fb.group({
      matricule: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateOfBirth: [''],
      gender: ['', Validators.required]

    });
    if (this.data && this.data.student) {
      this.mode = 'edit';
      this.student = { ...this.data.student };
      if (typeof this.student.dateOfBirth === 'string') {
        this.student.dateOfBirth = new Date(this.student.dateOfBirth);
      }
      this.initForm();

    }



  }

  initForm(): void {
    this.studentForm = this.fb.group({
      matricule: [this.student.matricule, Validators.required],
      nom: [this.student.nom, Validators.required],
      prenom: [this.student.prenom, Validators.required],
      dateOfBirth: [this.student.dateOfBirth], // Already a Date object now, if was a string.
      gender: [this.student.gender, Validators.required]
    });
  }

  // Function to check if the form is valid
  isFormValid(form: NgForm): boolean {
    return form.valid!;
  }

  addStudent(form: NgForm) {
    // Mark all controls as touched
    Object.keys(form.controls).forEach((controlName) => {
      form.controls[controlName].markAsTouched();
    });

    if (this.isFormValid(form)) {
      this.student.dateInscription = this.currentDate.toISOString();
      this.studentService.addStudent(this.student).subscribe(() => {
        console.log(`${this.student.nom} added successfully.`);
        this.closeDialog(true); // Indicate success and close the dialog
      }, error => {
        console.error("Operation failed:", error);
        // Optionally, handle the failure case here, such as not closing the dialog to allow corrections
      });
    } else {
      console.error("Form is not valid.");
      // Handle invalid form case, perhaps by showing an error message
    }
  }

  submitStudent(form: NgForm) {
    if (!form.valid) {
      console.error("Form is not valid.");
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field]; // Directly access the control
        control.markAsTouched();
      });
      return;
    }

    if (this.mode === 'add') {
      this.student.dateInscription = new Date().toISOString();
      this.studentService.addStudent(this.student).subscribe(success => {
        console.log("Student added successfully");
        this.dialogRef.close(true);
      }, error => {
        console.error("Failed to add the student", error);
      });
    } else if (this.mode === 'edit') {
      this.studentService.editStudent(this.student.matricule.toString(), this.student).subscribe(success => {
        console.log("Student updated successfully");
        window.location.reload();
        this.dialogRef.close(true);
      }, error => {
        console.error("Failed to update the student", error);
         this.dialogRef.close(false);
      });
    }
  }

  closeDialog(success?: boolean){
    this.dialogRef.close(success);
  }

  dateSelected(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.student.dateOfBirth = event.value;
    }
  }
}
