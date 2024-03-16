import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { options } from './options';
import { FormsService } from '../forms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dynamic-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  @Input() initialForm: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() formGenerated: EventEmitter<any> = new EventEmitter(); // New output event
  options: any;
  renderedPage: boolean = false
  form: Object = { components: [] };
  pages = ['Create Form', 'Preview', 'View'];
  currentPage = 'Create Form';
  generatedForm: Object;
  Selectedform: boolean = false
  constructor(private apiService: FormsService, private router: Router) {
    this.options = options;
  }
  changePage(page: string) {
    this.currentPage = page;
    if (page === 'Preview') {
      // this.router.navigate(['/renderer'], { state: { form: this.form, submission: this.submission } });
      this.router.navigate(['/render']);
      this.renderedPage = true;
    }
    if (page === 'Create Form') {

      this.router.navigate(['']);

    }
    if (page === 'View') {
      this.router.navigate(['/data'])
    }
  }

  ngOnInit(): void {
    if (this.initialForm?.components?.length) {
      this.form = this.initialForm;
    }
    this.generatedForm = this.initialForm;
  }

  onChange(event) {
    this.generatedForm = event.form;
    this.formGenerated.emit(this.generatedForm); // Emit the generatedForm
  }

  saveForm() {
    this.save.emit(this.generatedForm);

    const formName = window.prompt("Enter Form Name");

    if (formName) {
      const data = { formName, generatedForm: this.generatedForm };


      this.apiService.postJsonSchema(data).subscribe({
        next: (response: any) => {
          console.log('Success:', response);

          // Handle success if needed
        },
        error: (error: any) => {
          console.error('Error:', error);
          // Handle error if needed
        }
      });
    }

    console.log('jsonForm', JSON.stringify(this.generatedForm))
  }

}
