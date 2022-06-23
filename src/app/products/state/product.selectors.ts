import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

// Composite selector
export const getCurrentProductId = createSelector(
    getProductFeatureState,
    getCurrentProduct,
    (state, currentProduct) =>
       state.products.find(p => p.id === currentProduct.id)?.id
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);
