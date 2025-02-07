import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, Observable, throwError } from "rxjs";
import { Product } from "../models/product";
import { catchError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProductService{
    private apiURL = 'http://locahost:8080/products';

    private httpOptions = {
        headers : {
            'Content-Type': 'application/json'
        }
    };

    constructor(private http: HttpClient){ }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiURL).pipe(
            catchError(this.handlerError));
    }

    createProduct(name: string, price: number): Observable<any> {
        const product = { name, price };
        return this.http.post<any>(this.apiURL, product, this.httpOptions);
    }

    deleteProduct(product_id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiURL}/${product_id}`);
    }
    private handlerError (error: HttpErrorResponse){
        return throwError(() => error);
    }
}