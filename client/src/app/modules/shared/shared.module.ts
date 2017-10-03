import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainNavigatorComponent } from './components/main-navigator/main-navigator.component';
import { CustomMaterialDesignModule } from '../../modules/custom-material-design/custom-material-design.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialDesignModule
  ],
  exports: [ MainNavigatorComponent ],
  declarations: [ MainNavigatorComponent ]
})
export class SharedModule { }
