import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioLinesRoutingModule } from './portfolio-lines-routing.module';
import { PortfolioLinesComponent } from './portfolio-lines.component';
import { LineListComponent } from './line-list/line-list.component';


@NgModule({
  declarations: [
    PortfolioLinesComponent,
    LineListComponent
  ],
  imports: [
    CommonModule,
    PortfolioLinesRoutingModule
  ]
})
export class PortfolioLinesModule { }
