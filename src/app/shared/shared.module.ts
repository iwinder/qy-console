import { NgZorroAntdModule, NZ_I18N, zh_CN  } from 'ng-zorro-antd';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {  CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,


  ],
  declarations: [

  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {}
