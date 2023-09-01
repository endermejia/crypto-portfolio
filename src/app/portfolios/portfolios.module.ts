import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PortfoliosRoutingModule} from './portfolios-routing.module';
import {PortfoliosComponent} from './portfolios.component';
import {PortfolioListComponent} from './portfolio-list/portfolio-list.component';


@NgModule({
  declarations: [
    PortfoliosComponent,
    PortfolioListComponent
  ],
  imports: [
    CommonModule,
    PortfoliosRoutingModule
  ]
})
export class PortfoliosModule {
}
