import { createReducer, on } from '@ngrx/store';

import * as AppState from '../../state/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';

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
    on(ProductActions.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        };
    }),
    on(ProductActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        };
    }),
    on(ProductActions.initCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        };
    }),
    on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        };
    }),
    on(ProductActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        };
    }),
    on(ProductActions.createProductSuccess, (state, action): ProductState => {
        // Creates a new array (immutable)
        // and either copies existing item or replaces with updated item if id matches
        const updatedProducts = state.products.map(item => item);
        updatedProducts.push(action.product);

        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: ''
        };
    }),
    on(ProductActions.createProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProductActions.updateProductSuccess, (state, action): ProductState => {
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
    on(ProductActions.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    })
);
