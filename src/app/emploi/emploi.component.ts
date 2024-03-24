import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadService } from '../../Services/file-upload.service';


@Component({
  selector: 'app-emploi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emploi.component.html',
  styleUrl: './emploi.component.css'
})
export class EmploiComponent {

  pdfSrc: string | ArrayBuffer | null | undefined;
  imageSrc: string | ArrayBuffer | null | undefined;

  constructor(private fileUploadService: FileUploadService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const type = file.type;
        if (type.startsWith('image/') || type === 'application/pdf') {
          this.pdfSrc = (type === 'application/pdf') ? e.target?.result : null;
          this.imageSrc = (type.startsWith('image/')) ? e.target?.result : null;
        } else {
          console.error('Unsupported file format. Please select an image or PDF file.');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  uploadFile() {
    if (this.imageSrc) {
      const blob = this.dataURItoBlob(this.imageSrc as string);
      const formData = new FormData();
      formData.append('image', blob, 'image.jpg'); // 'image.jpg' can be any desired filename
      this.fileUploadService.uploadFile(formData).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          alert('success upload')
          // Handle response or any further action after successful upload
        },
        (error) => {
          console.error('Error uploading file:', error);
          alert('error upload')
          // Handle error
        }
      );
    } else {
      console.error('No file selected.');
      alert('no file to upload')
    }
  }

  // Helper function to convert data URL to Blob
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([uint8Array], { type: 'image/jpeg' }); // Change the MIME type accordingly
  }
}
