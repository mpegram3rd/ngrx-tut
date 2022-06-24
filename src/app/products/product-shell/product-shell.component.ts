import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductPageActions } from '../state/actions';
import { State } from '../state/product.reducer';
import { getCurrentProduct, getError, getProducts, getShowProductCode } from '../state/product.selectors';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product.id }));
  }

}
