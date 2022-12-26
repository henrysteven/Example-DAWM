import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('example1') example1!: HTMLElement;
  @ViewChild('example2') example2!: ElementRef;
  cargar: boolean = false;
  constructor(private elementRef : ElementRef, private renderer: Renderer2) { }
  color1 : boolean = true;
  color2 : boolean = true;
  color3 : boolean = true;
  ngOnInit(): void {
    setInterval(() => { 
        this.cargar= !this.cargar;
    }, 2000);
  }


  first_case(){
    this.color1 = !this.color1;
  }
  second_case(){
    this.renderer.setStyle(this.example2.nativeElement, 'backgroundColor', this.color2 ? 'pink' : 'green');
    this.color2 = !this.color2;
  }
  third_case(){
    var element_3 = <HTMLElement> document.getElementById('example3');
    element_3.style.backgroundColor = this.color3 ? 'indigo' : 'blue';
    this.color3 = !this.color3;
  }

}
