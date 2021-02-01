import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import {MatTabsModule} from '@angular/material/tabs';
import { FileUploadModule } from 'ng2-file-upload';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgxGalleryModule,
    MatTabsModule,
    MatPaginatorModule,
    FileUploadModule,
    MatProgressBarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
    
    
  ],
  exports: [MatPaginatorModule,MatFormFieldModule,MatNativeDateModule,MatDatepickerModule,ToastrModule,MatMenuModule,NgxGalleryModule,MatTabsModule, FileUploadModule,MatProgressBarModule],
})
export class SharedModule {}
