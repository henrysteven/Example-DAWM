import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProductSchema } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from 'src/app/component/product-dialog/product-dialog.component';
import { take } from 'rxjs';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    products: ProductSchema[] = [];
    productsGroup: FormGroup;

    constructor(private product_service: ProductService, private fb: FormBuilder, public dialog: MatDialog) {
        this.productsGroup = this.fb.group({
            productsArray: new FormArray([])
        });
    }

    async ngOnInit() {
        await this.get_all();
    }


    openDialog() {
        const dialog = this.dialog.open(ProductDialogComponent, {
            width: '80%',
            height: '95%',
            data: this.products,
        });

        dialog
            .afterClosed()
            .pipe(take(1))
            .subscribe((value) => {
                this.get_all();
            });
    }

    async get_all() {
        this.products = await this.product_service.method_get('/all');
    }

}
