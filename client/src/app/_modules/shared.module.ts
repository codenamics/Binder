import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import {MatTabsModule} from '@angular/material/tabs';
import { FileUploadModule } from 'ng2-file-upload';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgxGalleryModule,
    MatTabsModule,
    FileUploadModule,
    MatProgressBarModule,
    MatMenuModule
    
  ],
  exports: [ToastrModule,MatMenuModule,NgxGalleryModule,MatTabsModule, FileUploadModule,MatProgressBarModule],
})
export class SharedModule {}
