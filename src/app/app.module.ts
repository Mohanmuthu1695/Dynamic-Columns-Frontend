import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { FormioModule } from '@formio/angular';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { ViewDataComponent } from './view-data/view-data.component';
import { LoadingComponent } from './loading/loading.component'; 



@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    FormRendererComponent,
    DialogComponent,
    ViewDataComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormioModule,
    HttpClientModule,
    FormsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
