import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  pokemons: any;
  url: string= 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {
    
  }


  async ngOnInit() {
    await this.getData(this.url).then((data)=>{
      this.pokemons = data.results;
    })
    this.pokemons.forEach(async (element : any) => {
      await this.getData(element.url).then((data) => {
        element.image = data.sprites.other.dream_world.front_default;
        console.log(element.image)
      });
    });
  }

  getData(url : string){
    return new Promise<any>((resolve, reject) => {
      this.http.get(url)
      .pipe(catchError((error) => of(error)))
      .subscribe((res) => { 
        if (res instanceof HttpErrorResponse)  
          reject({error: res.error, status: res.status})
        else
          resolve(res);
      });
    });
  }

}
