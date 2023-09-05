import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {Portfolio} from '../../models/models';

@Component({
  selector: 'app-portfolio-lines',
  templateUrl: './portfolio-lines.component.html',
  styleUrls: ['./portfolio-lines.component.css']
})
export class PortfolioLinesComponent implements OnDestroy {

  portfolio$: Observable<Portfolio> | undefined;
  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.portfolio$ = this.apiService.getPortfolio(Number(params['id']));
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription): void => {
      subscription.unsubscribe();
    });
  }

}
