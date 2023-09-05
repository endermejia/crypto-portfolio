import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Portfolio} from '../../../models/models';
import {ApiService} from '../../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit, OnDestroy {

  portfolios$: Observable<Portfolio[]> | undefined;
  editing = false;
  portfolioForm: FormGroup;
  portfolioEditForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.portfolioForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.portfolioEditForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.portfolios$ = this.apiService.getPortfolios();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription): void => {
      subscription.unsubscribe();
    });
  }

  editPortfolio(portfolio: Portfolio): void {
    this.editing = true;
    this.portfolioEditForm.patchValue({
      id: portfolio.id,
      name: portfolio.name
    });
  }

  cancelEditPortfolio(): void {
    this.editing = false;
  }

  deletePortfolio(id: number): void {
    this.subscriptions.push(
      this.apiService.deletePortfolio(id).subscribe(() => {
        this.portfolios$ = this.apiService.getPortfolios();
      })
    );
  }

  createPortfolio(): void {
    if (this.portfolioForm.valid) {
      this.subscriptions.push(
        this.apiService.createPortfolio(this.portfolioForm.value).subscribe(() => {
          this.portfolios$ = this.apiService.getPortfolios();
          this.portfolioForm.reset();
        })
      );
    }
  }

  updatePortfolio(): void {
    if (this.portfolioEditForm.valid) {
      this.subscriptions.push(
        this.apiService.updatePortfolio(this.portfolioEditForm.value).subscribe(() => {
          this.portfolios$ = this.apiService.getPortfolios();
          this.portfolioEditForm.reset();
          this.editing = false;
        })
      );
    }
  }

}
