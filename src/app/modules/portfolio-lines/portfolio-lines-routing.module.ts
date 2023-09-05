import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PortfolioLinesComponent} from './portfolio-lines.component';

const routes: Routes = [
  {path: '', component: PortfolioLinesComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioLinesRoutingModule {
}
