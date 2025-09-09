import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class CommonService {

  assetUrl: string = environment.assetUrl

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }


  getImageFile(url: string) {
    return `${this.assetUrl}/${url}`
  }
  getSlideImageFile(url: string): string {
    return `${this.assetUrl}/${url}`.replace(/\\/g, '/');
  }
  getFile(url: string): SafeResourceUrl {
    const fullUrl = `${this.assetUrl}/${url}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
  }
  getImageService(url: string) {
    return `${this.assetUrl}/${url}`
  }


}
