import { createReducer, on } from '@ngrx/store';

import * as AppState from '../../state/app.state';
import { Product } from '../product';
import { ProductPageActions, ProductApiActions } from './actions';


export interface State extends AppState.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
};

export const productReducer = createReducer<ProductState> (
    initialState,
    on(ProductPageActions.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        };
    }),
    on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        };
    }),
    on(ProductPageActions.initCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        };
    }),
    on(ProductApiActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        };
    }),
    on(ProductApiActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        };
    }),
    on(ProductApiActions.createProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: [...state.products, action.product],
            currentProductId: action.product.id,
            error: ''
        };
    }),
    on(ProductApiActions.createProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProductApiActions.updateProductSuccess, (state, action): ProductState => {
        // Creates a new array (immutable)
        // and either copies existing item or replaces with updated item if id matches
        const updatedProducts = state.products.map(
            item => action.product.id === item.id ? action.product : item
        );

        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: ''
        };
    }),
    on(ProductApiActions.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProductApiActions.deleteProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: state.products.filter(item => item.id !== action.productId),
            currentProductId: null,
            error: ''
        };
    }),
    on(ProductApiActions.deleteProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    })
);
