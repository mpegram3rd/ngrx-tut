import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { ProductPageActions, ProductApiActions } from './actions';


@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
                private productService: ProductService) {
    }

    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.loadProducts),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductApiActions.loadProductsSuccess({products})),
                catchError(error =>
                    // This basically dispatches a loadProductsFailure action
                   of(ProductApiActions.loadProductsFailure( { error })))
            ))
        );
    });

    createProduct$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(ProductPageActions.createProduct),
            // productService.updateProduct() returns an observable.
            // we don't want nested observables so we use concatMap to merge and flatten the two observables.
            concatMap(action => this.productService.createProduct(action.product).pipe(
                map(product => ProductApiActions.createProductSuccess({ product })),
                catchError(error =>
                    of(ProductApiActions.createProductFailure( { error })))
            ))
        );
    });

    updateProduct$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(ProductPageActions.updateProduct),
            // productService.updateProduct() returns an observable.
            // we don't want nested observables so we use concatMap to merge and flatten the two observables.
            concatMap(action => this.productService.updateProduct(action.product).pipe(
                map(product => ProductApiActions.updateProductSuccess({ product })),
                catchError(error =>
                   of(ProductApiActions.updateProductFailure( { error })))
            ))
        );
    });

    deleteProduct$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(ProductPageActions.deleteProduct),
            // productService.updateProduct() returns an observable.
            // we don't want nested observables so we use concatMap to merge and flatten the two observables.
            concatMap(action => this.productService.deleteProduct(action.productId).pipe(
                map(() => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
                catchError(error =>
                    of(ProductApiActions.deleteProductFailure( { error })))
            ))
        );
    });

}
