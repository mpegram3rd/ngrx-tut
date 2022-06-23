import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction(
    '[Product] Toggle Product Code'
);

export const setCurrentProduct = createAction(
    '[Product] Set Current Product',
    props<{ currentProductId: number }>()
);

export const clearCurrentProduct = createAction(
    '[Product] Clear Current Product'
);

export const initCurrentProduct = createAction(
    '[Product] Init Current Product'
);

export const loadProducts = createAction(
    '[Product] Load'
);

export const loadProductsSuccess = createAction(
    '[Product] Load Success',
    props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
    '[Product] Load Fail',
    props<{ error: string }>()
);

export const createProduct = createAction(
    '[Product] Create',
    props<{ product: Product }>()
);

export const createProductSuccess = createAction(
    '[Product] Create Success',
    props<{ product: Product }>()
);

export const createProductFailure = createAction(
    '[Product] Create Fail',
    props<{ error: string }>()
);

export const updateProduct = createAction(
    '[Product] Update',
    props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
    '[Product] Update Success',
    props<{ product: Product }>()
);

export const updateProductFailure = createAction(
    '[Product] Update Fail',
    props<{ error: string }>()
);
