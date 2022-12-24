import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/service/home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    loginGroup: FormGroup;
    token: string = '';
    constructor(private fb: FormBuilder, private home_service: HomeService) {
        this.loginGroup = this.fb.group({
            user: new FormControl('', Validators.required),
            pass: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void {
    }
    login() {
        if (this.loginGroup.valid) {
            this.home_service.method_post('', this.loginGroup.getRawValue()).then((token_response) => {
                this.token = token_response.token;
                setInterval(() => {
                    this.token = '';
                }, 10000); 
            });
        }
    }

}
