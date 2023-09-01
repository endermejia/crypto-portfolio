import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortfolioLinesRoutingModule} from './portfolio-lines-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

import {PortfolioLinesComponent} from './portfolio-lines.component';
import {LineListComponent} from './line-list/line-list.component';

import {FindCoinByIdPipe} from '../pipes/find-coin-by-id.pipe';

@NgModule({
  declarations: [
    PortfolioLinesComponent,
    LineListComponent,
    FindCoinByIdPipe
  ],
  imports: [
    CommonModule,
    PortfolioLinesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PortfolioLinesModule {
}
