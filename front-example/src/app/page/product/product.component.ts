import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private product_service: ProductService) { }

  ngOnInit(): void {
    this.get_all();
  }

  get_all(){
    var v = this.product_service.method_get('/all');
    console.log(v)

  }

}
