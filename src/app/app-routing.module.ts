import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'currencies',
    loadChildren: () => import('./currencies/currencies.module').then(m => m.CurrenciesModule)
  },
  {
    path: 'portfolios',
    loadChildren: () => import('./portfolios/portfolios.module').then(m => m.PortfoliosModule)
  },
  {
    path: 'portfolios/:id',
    loadChildren: () => import('./portfolio-lines/portfolio-lines.module').then(m => m.PortfolioLinesModule)
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
