import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData) {
    return this.http.post<any>('http://192.168.1.15:3000/api/upload', formData);
  }
}
