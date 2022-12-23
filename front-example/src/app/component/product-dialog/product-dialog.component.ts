import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    Validators,
    FormArray,
    FormControl,
    FormGroup,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductSchema } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/service/product.service';

@Component({
    selector: 'app-product-dialog',
    templateUrl: './product-dialog.component.html',
    styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
    productsGroup: FormGroup;
    productRemove : any = [];
    constructor(
        @Inject(MAT_DIALOG_DATA) public products: ProductSchema[],
        public dialogRef: MatDialogRef<ProductDialogComponent>,
        private fb: FormBuilder,
        private product_service : ProductService) {
        this.productsGroup = this.fb.group({
            productsArray: new FormArray([])
        });
        this.products.forEach((element: ProductSchema) => {
            this.add_product_formGroup(element, null);
        });
    }

    ngOnInit(): void {
    }

    add_product_formGroup(product_element: ProductSchema, disabled: boolean | null) {
        var productArrayForm = this.productsGroup.get('productsArray') as FormArray;
        if (disabled == null) disabled = true;
        productArrayForm.push(
            this.fb.group({
                name: new FormControl(product_element.name ? product_element.name : ''),
                id: new FormControl({ value: product_element.id ? product_element.id : 0, disabled: disabled }),
                user_id: new FormControl(product_element.user_id ? product_element.user_id : 0),
                description: new FormControl(product_element.description ? product_element.description : ''),
                value: new FormControl(product_element.value ? product_element.value : 0),
            })
        );
    }

    add_new_formGroup() {
        const product: ProductSchema = {
            id: 0,
            name: '',
            description: '',
            value: 0,
            user_id: 0
        };
        this.add_product_formGroup(product, false);
    }
    remove(index: number) {
        var productsArray = this.productsGroup.controls[
            'productsArray'
        ] as FormArray;
        var id = productsArray.getRawValue()[index].id;
        console.log(id)
        this.productRemove.push(id);
        productsArray.removeAt(index);
    }

    async save() {
        this.productRemove.forEach((product: any)=>{
            this.product_service.method_delete(`/${product}`).then((data)=>{
                console.log(data)
            })
        });
        var data = (this.productsGroup.get('productsArray') as FormArray).getRawValue();
        console.log(data);
        await this.product_service.method_post('/create_all',data).then((data)=>{
            console.log(data)
        }).catch((e)=>{
            console.log(e)
        })
        this.dialogRef.close();
    }
    get get_productsArray() {
        var productsArray = this.productsGroup.get('productsArray') as FormArray

        return productsArray;
    }

}
