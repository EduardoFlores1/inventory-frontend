import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    constructor(private categoryService: CategoryService, public dialog: MatDialog,
        private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.getCategories();
    }

    displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
    dataSource = new MatTableDataSource<CategoryElement>();

    getCategories(): void {
        this.categoryService.getCategories().subscribe((data: any) => {
            this.processCategoriesResponse(data);
            console.log('Respuesta Categories: ', data);
        }), (error: any) => {
            console.log('Error: ', error);
        };
    }

    processCategoriesResponse(resp: any): void {
        const dataCategory: CategoryElement[] = [];

        if (resp.metadata[0].code == '00') {
            let listCategory = resp.categoryResponse.category;
            listCategory.forEach((element: CategoryElement) => {
                dataCategory.push(element);
            });

            this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
        }
    }

    openCategoryDialog(): void {
        const dialogRef = this.dialog.open(NewCategoryComponent, {
            width: '450px'
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            if(result == 1) {
                this.openSnackBar('Categoría Agregada', 'Exitosa');
                this.getCategories();
            }else if(result == 2) {
                this.openSnackBar('Error al intentar guardar Categoría', 'Error');
            }
        });
    }

    edit(id: number, name: string, description: string): void {
        const dialogRef = this.dialog.open(NewCategoryComponent, {
            width: '450px',
            data: {id: id, name: name, description: description}
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            if(result == 1) {
                this.openSnackBar('Categoría Actualizada', 'Exitosa');
                this.getCategories();
            }else if(result == 2) {
                this.openSnackBar('Error al intentar actualizar Categoría', 'Error');
            }
        });
    }

    delete(id: any): void {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: '450px',
            data: {id: id}
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            if(result == 1) {
                this.openSnackBar('Categoría Eliminada', 'Exitosa');
                this.getCategories();
            }else if(result == 2) {
                this.openSnackBar('Error al intentar eliminar Categoría', 'Error');
            }
        });
    }

    openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
        return this.snackBar.open(message, action, {
            duration: 2000
        });
    }

}

export interface CategoryElement {
    id: number,
    name: string;
    description: string;
}
