import { Component, OnInit } from '@angular/core';
import { FormsService } from '../forms.service';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss'],
  providers: [FormsService]
})
export class ViewDataComponent implements OnInit {
  userData: any[] = [];
  pages = ['Create Form', 'Preview', 'View'];
  currentPage = 'View';
  formName: any = [];
  tableName: string;
  headers: any[];
  isLoading: boolean = false;
  errorMessage: string = 'No Table Data Found';
  currentQRCode: string = ''; // Holds the current QR code data URL

  constructor(private apiService: FormsService, private router: Router) {}

  ngOnInit() {
    this.getId();
  }

  changePage(page: string) {
    this.currentPage = page;
    if (page === 'Preview') {
      this.router.navigate(['/render']);
    }
    if (page === 'Create Form') {
      this.router.navigate(['']);
    }
    if (page === 'View') {
      this.router.navigate(['/data']);
    }
  }

  getData() {
    this.isLoading = true;
    this.apiService.getUserData(this.tableName).subscribe({
      next: (data: any) => {
        this.userData = data;
        this.headers = Object.keys(this.userData[0]);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }

  onSelectChange(event) {
    this.tableName = event;
    this.getData();
  }

  printQRCode(item: any) {
    QRCode.toDataURL(JSON.stringify(item), (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const printContent = `
          <html>
            <head>
              <title>QR Code</title>
            </head>
            <body>
              <img src="${url}" style="max-width: 100%; height: auto;">
              <script>
                window.onload = () => {
                  window.print();
                  window.close();
                };
              </script>
            </body>
          </html>
        `;
        printWindow.document.write(printContent);
        printWindow.document.close();
      } else {
        console.error('Failed to open print window');
      }
    });
  }

  downloadQRCode(item: any) {
    QRCode.toDataURL(JSON.stringify(item), (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      const link = document.createElement('a');
      link.download = `qrcode_${item['id']}.png`; // Assuming 'id' is a unique identifier
      link.href = url;
      link.click();
    });
  }

  openQRModal(item: any) {
    QRCode.toDataURL(JSON.stringify(item), (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      this.currentQRCode = url;
      const modal = document.getElementById('qrModal');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
        modal.setAttribute('aria-modal', 'true');
      }
    });
  }
  
  closeQRModal() {
    const modal = document.getElementById('qrModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-modal', 'false');
    }
  }
  

  getId() {
    this.apiService.getId().subscribe({
      next: (data: any) => {
        this.formName = data.data;
        if (this.formName && this.formName.length > 0) {
          this.tableName = this.formName[0].tableName;
          this.getData();
        }
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }
}
