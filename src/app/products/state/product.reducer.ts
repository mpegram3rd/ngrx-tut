import { createReducer, on } from '@ngrx/store';

import * as AppState from '../../state/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';

export interface State extends AppState.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number;
    products: Product[];
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: []
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
            currentProductId: action.product.id
        };
    })
);
