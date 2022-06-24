import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import * as ProductActions from './product.actions';


@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
                private productService: ProductService) {
    }

    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductActions.loadProductsSuccess({products})),
                catchError(error =>
                    // This basically dispatches a loadProductsFailure action
                   of(ProductActions.loadProductsFailure( { error })))
            ))
        );
    });

    createProduct$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(ProductActions.createProduct),
            // productService.updateProduct() returns an observable.
            // we don't want nested observables so we use concatMap to merge and flatten the two observables.
            concatMap(action => this.productService.createProduct(action.product).pipe(
                map(product => ProductActions.createProductSuccess({ product })),
                catchError(error =>
                    of(ProductActions.createProductFailure( { error })))
            ))
        );
    });

    updateProduct$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            // productService.updateProduct() returns an observable.
            // we don't want nested observables so we use concatMap to merge and flatten the two observables.
            concatMap(action => this.productService.updateProduct(action.product).pipe(
                map(product => ProductActions.updateProductSuccess({ product })),
                catchError(error =>
                   of(ProductActions.updateProductFailure( { error })))
            ))
        );
    });

    deleteProduct$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(ProductActions.deleteProduct),
            // productService.updateProduct() returns an observable.
            // we don't want nested observables so we use concatMap to merge and flatten the two observables.
            concatMap(action => this.productService.deleteProduct(action.productId).pipe(
                map(() => ProductActions.deleteProductSuccess({ productId: action.productId })),
                catchError(error =>
                    of(ProductActions.deleteProductFailure( { error })))
            ))
        );
    });

}
