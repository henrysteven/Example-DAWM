import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class HomeService {
    root_url: string = `${environment.url}/user/login`;
    constructor(private http: HttpClient) { }

    async method_post(url: string, data: any = {}) {

        return await new Promise<any>((resolve, reject) => {
            this.http
                .post(`${this.root_url}`, data)
                .pipe(catchError((error) => of(error)))
                .subscribe((res) => {
                    if (res instanceof HttpErrorResponse)
                        reject({ error: res.error, status: res.status });
                    else resolve(res);
                });
        });
    }
}
