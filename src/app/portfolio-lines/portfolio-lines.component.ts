import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from '../api.service';
import {Portfolio} from '../models/models';

@Component({
  selector: 'app-portfolio-lines',
  templateUrl: './portfolio-lines.component.html',
  styleUrls: ['./portfolio-lines.component.css']
})
export class PortfolioLinesComponent {

  portfolio$: Observable<Portfolio> | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.portfolio$ = this.apiService.getPortfolio(params['id']);
    });
  }

}
