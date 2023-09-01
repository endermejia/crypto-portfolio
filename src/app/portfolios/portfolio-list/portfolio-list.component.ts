import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Portfolio} from '../../models/models';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent  implements OnInit {
  portfolios$: Observable<Portfolio[]> | undefined;

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.portfolios$ = this.apiService.getPortfolios();
  }

  viewPortfolio(id: number) {
    console.log(`view portfolio ${id}`);
    // routerLink="/portfolios/{{portfolio.id}}"

  }

  editPortfolio(id: number) {
    console.log(`edit portfolio ${id}`);
  }

  deletePortfolio(id: number) {
    this.apiService.deletePortfolio(id).subscribe(() => {
      this.portfolios$ = this.apiService.getPortfolios();
    });
  }

}
