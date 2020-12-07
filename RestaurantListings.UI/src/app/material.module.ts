import { NgModule } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: []
})
export class AppMaterialModules { }
