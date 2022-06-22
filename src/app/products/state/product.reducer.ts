import { createAction, createReducer, on } from '@ngrx/store';

import * as AppState from '../../state/app.state';
import { Product } from '../product';

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
    currentProductId: 0,
    products: []
};

export const productReducer = createReducer<ProductState> (
    initialState,
    on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    })
);
