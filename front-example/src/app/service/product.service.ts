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
    constructor(private http: HttpClient) { }

    async method_get(url: string) {
        return await new Promise<any>((resolve, reject) => {
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
    async method_delete(url: string) {

        return await new Promise<any>((resolve, reject) => {
            this.http
                .delete(`${this.url_root}/product${url}`)
                .pipe(catchError((error) => of(error)))
                .subscribe((res) => {
                    if (res instanceof HttpErrorResponse)
                        reject({ error: res.error, status: res.status });
                    else resolve(res);
                });
        });
    }

    async method_post(url: string, data: any = {}) {

        return await new Promise<any>((resolve, reject) => {
            this.http
                .post(`${this.url_root}/product${url}`, data)
                .pipe(catchError((error) => of(error)))
                .subscribe((res) => {
                    if (res instanceof HttpErrorResponse)
                        reject({ error: res.error, status: res.status });
                    else resolve(res);
                });
        });
    }
}
