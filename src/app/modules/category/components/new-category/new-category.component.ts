import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
    selector: 'app-new-category',
    templateUrl: './new-category.component.html',
    styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

    public categoryForm: FormGroup;
    public estadoForm: string;


    constructor(private fb: FormBuilder, private categoryService: CategoryService,
        private dialogRef: MatDialogRef<NewCategoryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        console.log(data);
        this.estadoForm = 'Agregar';

        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
        });

        if (data != null) {
            this.estadoForm = 'Actualizar';
            this.updateForm(data);
        }

    }

    ngOnInit(): void {
    }

    onSave(): void {
        let data = {
            name: this.categoryForm.get('name')?.value,
            description: this.categoryForm.get('description')?.value
        }

        if(this.data != null) {
            //update category
            this.categoryService.updateCategory(data, this.data.id).subscribe({
                next: (data: any) => {
                    this.dialogRef.close(1);
                },
                error: (error: any) => {
                    this.dialogRef.close(2);
                }
            });
        } else {
            //create category
            this.categoryService.saveCategory(data).subscribe({
                next: (data: any) => {
                    console.log(data);
                    this.dialogRef.close(1);
                },
                error: (error: any) => {
                    this.dialogRef.close(2);
                }
            });
        }

    }

    onCancel(): void {
        this.dialogRef.close(3);
    }

    updateForm(data: any): void {
        this.categoryForm = this.fb.group({
            name: [data.name, Validators.required],
            description: [data.description, Validators.required]
        });
    }

}
