import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  requestCount = 0;

  constructor(private spinnerService: NgxUiLoaderService) {}
  loading() {
    this.requestCount++;
    this.spinnerService.start();
  }
  idle() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.spinnerService.stop();
    }
  }
}
