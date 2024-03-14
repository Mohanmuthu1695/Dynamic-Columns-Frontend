import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService } from './forms.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pages = ['Form Builder', 'Form Renderer'];
  currentPage = 'Form Builder';
  form: Object;
  submission: Object;
  initialForm: Object;
  currentSubmission = {};
  formName:any=[]
  selectedFormName:number=0;
constructor(private router: Router,private apiService:FormsService) {

}
changePage(page: string) {
  this.currentPage = page;
  if (page === 'Form Renderer') {
    // this.router.navigate(['/renderer'], { state: { form: this.form, submission: this.submission } });
    this.router.navigate(['/render']);
    
  }
  if (page === 'Form Builder') {
    
    this.router.navigate(['']);

  }
}

  ngOnInit(): void {
    let jsonForm = localStorage.getItem('jsonForm');
    let submissionStr = localStorage.getItem('jsonFormSubmission');
    if (jsonForm) {
      this.form = JSON.parse(jsonForm);
    }
    if (submissionStr) {
      this.submission = JSON.parse(submissionStr);
    }
    // this.initialForm = JSON.parse(JSON.stringify(this.form));
    this.getID()
  }

  onFormSave(event) {
    this.form = event;
    localStorage.setItem('jsonForm', JSON.stringify(event));
    console.log('jsonForm', JSON.stringify(event))
  }

  onSubmission(event) {
    this.submission = event;
    this.currentSubmission = event;
    localStorage.setItem('jsonFormSubmission', JSON.stringify(event));
    console.log('jsonFormSubmission', JSON.stringify(event))
  }
  getID(){
    this.apiService.getId().subscribe(
      (data: any) => {
        this.formName=data.data
               console.log('Success:', data);
             
             },
    )
  }
  onFormNameChange(event){
    this.selectedFormName=event;
  }
}
