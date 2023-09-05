import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'currencies',
    loadChildren: () => import('./modules/currencies/currencies.module').then(m => m.CurrenciesModule)
  },
  {
    path: 'portfolios',
    loadChildren: () => import('./modules/portfolios/portfolios.module').then(m => m.PortfoliosModule)
  },
  {
    path: 'portfolios/:id',
    loadChildren: () => import('./modules/portfolio-lines/portfolio-lines.module').then(m => m.PortfolioLinesModule)
  },
  {
    path: '**',
    redirectTo: '/currencies',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
