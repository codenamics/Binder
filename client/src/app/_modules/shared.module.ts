import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MatTabsModule } from '@angular/material/tabs';
import { FileUploadModule } from 'ng2-file-upload';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { TimeagoModule } from 'ngx-timeago';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    TimeagoModule.forRoot(),
    NgxGalleryModule,
    MatTabsModule,
    MatPaginatorModule,
    FileUploadModule,
    MatProgressBarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTableModule
  ],
  exports: [
    TimeagoModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ToastrModule,
    MatMenuModule,
    NgxGalleryModule,
    MatTabsModule,
    FileUploadModule,
    MatProgressBarModule,
    MatTableModule
  ],
})
export class SharedModule {}
