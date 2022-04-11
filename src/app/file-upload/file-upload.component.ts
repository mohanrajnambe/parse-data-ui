import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  fileToUpload!: File;
  schema : string = '';
  table : string = '';
  fileName = '';
  responseMessage = ''
  constructor(private http: HttpClient) { }


  ngOnInit(): void {
  }
  changeSchema(value: any) {
    console.log(value);
    this.responseMessage = ''
    this.schema = value
  }
  changeTable(value: any) {
    console.log(value);
    this.responseMessage = ''
    this.table = value
  }

  handleFileInput(event: any) {
    this.responseMessage = ''
    const files = event.target.files
    this.fileToUpload = files.item(0);
    const fileList = event.target.files
    if(fileList != undefined && fileList.length > 0){
      let file: File = fileList[0];
      this.fileToUpload = fileList[0];
      this.fileName = file.name;
      console.log(this.fileToUpload)
    }
  }

  uploadFile() {
    let formData:FormData = new FormData();
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
      formData.append('schema', this.schema)
      formData.append('table', this.table)
      let headers = new HttpHeaders();
      /** In Angular 5, including the header Content-Type can invalidate your request */
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = { headers: headers };
      this.http.post("http://127.0.0.1:5000/upload", formData, options).subscribe((res: any) => {
        console.log(res);
         this.responseMessage=res.body.message;
        })
  }

}
