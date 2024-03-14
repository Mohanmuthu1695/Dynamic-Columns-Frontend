import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsService } from '../forms.service';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode'; // Import the QRCode library

@Component({
  selector: 'dynamic-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss'],
  providers: [FormsService]
})
export class FormRendererComponent implements OnInit {
  @Input() submission: any;
  @Input() readOnly: boolean;
  @Output() submit: EventEmitter<any> = new EventEmitter();
  selectedFormName: number;
  form: any;
  formName: any = [];
  pages = ['Create Form', 'Preview', 'View'];
  currentPage = 'Preview';
  renderedPage: boolean = false;
  qrCodeDataUrl: string; // Variable to hold the data URL of the generated QR code
  QrName:number;
  isLoading: boolean = false; 
  constructor(private apiService: FormsService, private router: Router) { }

  ngOnInit(): void {
    this.getID();
  }

  changePage(page: string) {
    this.currentPage = page;
    if (page === 'Preview') {
      this.router.navigate(['/render']);
      this.renderedPage = true;
    }
    if (page === 'Create Form') {
      this.router.navigate(['']);
    }
    if (page === 'View') {
      this.router.navigate(['/data']);
    }
  }

  getID() {
    this.apiService.getId().subscribe({
      next: (data: any) => {
        this.formName = data.data;
        console.log('Success:', data);

        if (this.formName && this.formName.length > 0) {
          this.selectedFormName = this.formName[this.formName.length - 1].id;
          this.getData(this.selectedFormName);
        }
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  getData(id: any) {
    this.isLoading=true;
    this.apiService.getData(id).subscribe({
      next: (data: any) => {
        this.form = data.jsonSchema;
        setTimeout(() => {
          this.isLoading=false;
        },500)
        console.log('Success:', data);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  onSubmit(event: any): void {
    // Emit the submission event
    this.isLoading=true;
    this.submit.emit(event);
  
    // Log the submission data to the API
    this.apiService.postUser({ formData: event.data, selectedFormId: this.selectedFormName }).subscribe({
      next: (response: any) => {
        console.log('Success:', response);
        setTimeout(() => {
          this.isLoading=false;
        },500)
        // Extract data from the response
        const responseData = response.data;
  
        // Convert response data to formatted string
        const formattedData = this.formatResponseData(responseData);
  
        // Prepend the heading "Demo" to the formatted data
        const formattedDataWithHeading = `Demo\n${formattedData}`;
  
        // Generate QR code for the formatted response data
        QRCode.toDataURL(formattedDataWithHeading, (err, url) => {
          if (err) {
            console.error('Error generating QR code:', err);
            return;
          }
          this.QrName=response.data.id
          // Store the data URL of the generated QR code
          this.qrCodeDataUrl = url;
          
        });
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }
  
  // Function to format response data into a string representation with labels
  formatResponseData(data: any): string {
    let formattedString = '';
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formattedString += `${key}: ${data[key]}\n`;
      }
    }
    return formattedString;
  }
  
  

  

  onFormNameChange(event) {
    this.selectedFormName = event;
    this.getData(this.selectedFormName);
  }

  // Function to download the QR code
  downloadQRCode() {
    const link = document.createElement('a');
    link.download = `qrcode${this.QrName}.png`;
    link.href = this.qrCodeDataUrl;
    link.click();
  }
  printQRCode() {
    // Create a new window with the QR code image
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      // Construct HTML content for printing
      const printContent = `
        <html>
          <head>
            <title>QR Code</title>
          </head>
          <body>
            <img src="${this.qrCodeDataUrl}" style="max-width: 100%; height: auto;">
            <script>
              // Wait for the image to load before initiating the print
              window.onload = () => {
                window.print();
                window.close();
              };
            </script>
          </body>
        </html>
      `;
      // Write HTML content to the print window
      printWindow.document.write(printContent);
      printWindow.document.close();
    } else {
      // Handle if the print window fails to open
      console.error('Failed to open print window');
    }
  }
  
}
