import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ViewDataComponent } from './view-data/view-data.component';

const routes: Routes = [
  {
    path:'render',component:FormRendererComponent
  },{
    path:'',component:FormBuilderComponent
  },{
    path:'data',component:ViewDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
