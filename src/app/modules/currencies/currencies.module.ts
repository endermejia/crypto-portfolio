import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CurrenciesRoutingModule} from './currencies-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

import {CurrenciesComponent} from './currencies.component';
import {CurrencyListComponent} from './currency-list/currency-list.component';

@NgModule({
  declarations: [
    CurrenciesComponent,
    CurrencyListComponent
  ],
  imports: [
    CommonModule,
    CurrenciesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CurrenciesModule {
}
