import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }

    /**
     * 
     * @returns get all categories
     */
    getCategories() {
        const endpoint = `${base_url}/categories`;
        return this.http.get(endpoint);
    }

    /**
     * save the categories
     * @param body recibe la categoria a guardar(name y description)
     */
    saveCategory(body: any) {
        const endpoint = `${base_url}/categories`;
        return this.http.post(endpoint, body);
    }

    /**
     * update category
     * @param body recibe la categoria a guardar(name y description)
     * @param id recibe al id de la categoria
     */
    updateCategory(body: any, id: any) {
        const endpoint= `${base_url}/categories/${id}`;
        return this.http.put(endpoint, body);
    }

    /**
     * delete category
     * @param id id de la categoria
     * @returns 
     */
    deleteCategory(id: any) {
        const endpoint = `${base_url}/categories/${id}`;
        return this.http.delete(endpoint);
    }

    /**
     * get category by id
     * @param id id de la categoria
     * @returns 
     */
    getCategoryById(id: any) {
        const endpoint = `${base_url}/categories/${id}`;
        return this.http.get(endpoint);
    }

}
