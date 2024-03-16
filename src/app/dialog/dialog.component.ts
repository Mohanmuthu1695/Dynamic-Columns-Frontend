import { Component, Inject } from '@angular/core';
import { FormsService } from '../forms.service';


@Component({
  selector: 'app-dialog',
  template: `
  `,
  styles: ['']
})
export class DialogComponent {
  formName: string;
  generatedForm: any;
  constructor(private apiService:FormsService){
     
  }
  // onSaveClick(): void {
   
  //   this.dialogRef.close({ formName: this.formName, generatedForm: this.generatedForm });
  
  // const data={
  //   formName: this.formName, generatedForm: this.generatedForm 
  // }
  //   this.apiService.postJsonSchema(data).subscribe({
  //     next: (data: any) => {
  //       console.log('Success:', data);
  //      this.dialogRef.close()
  //     },
  //     error: (error: any) => {
  //       console.error('Error:', error);
  //       // Handle error if needed
  //     }
  //   });
  // }
  
  // onCancelClick(): void {
  //   this.dialogRef.close();
  // }
}
