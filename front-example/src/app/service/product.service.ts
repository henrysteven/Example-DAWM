import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url_root: string = environment.url;
  constructor(private http: HttpClient) {}

  method_get(url: string) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.url_root}/product${url}`)
        .pipe(catchError((error) => of(error)))
        .subscribe((res) => {
          if (res instanceof HttpErrorResponse)
            reject({ error: res.error, status: res.status });
          else resolve(res);
        });
    });
  }
}
