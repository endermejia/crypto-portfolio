import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CurrenciesRoutingModule} from './currencies-routing.module';
import {CurrenciesComponent} from './currencies.component';
import {CurrencyListComponent} from './currency-list/currency-list.component';
import {ReactiveFormsModule} from "@angular/forms";


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
