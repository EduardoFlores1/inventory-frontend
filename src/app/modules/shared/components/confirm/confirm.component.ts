import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

    constructor(private dialogRef: MatDialogRef<ConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private categoryService: CategoryService) { }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close(3);
    }

    delete(): void {
        if (this.data != null) {
            this.categoryService.deleteCategory(this.data.id).subscribe({
                next: (data: any) => {
                    this.dialogRef.close(1);
                },
                error: (error: any) => {
                    this.dialogRef.close(2);
                }
            });
        } else {
            this.dialogRef.close(2);
        }
    }

}
