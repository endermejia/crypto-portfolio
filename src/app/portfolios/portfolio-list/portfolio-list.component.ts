import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Portfolio} from '../../models/models';
import {ApiService} from '../../api.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent  implements OnInit {
  portfolios$: Observable<Portfolio[]> | undefined;
  editing = false;
  portfolioForm: FormGroup;
  portfolioEditForm: FormGroup;

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

  ngOnInit() {
    this.portfolios$ = this.apiService.getPortfolios();
  }

  editPortfolio(portfolio: Portfolio) {
    this.editing = true;
    this.portfolioEditForm.patchValue({
      id: portfolio.id,
      name: portfolio.name
    });
  }

  cancelEditPortfolio() {
    this.editing = false;
  }

  deletePortfolio(id: number) {
    this.apiService.deletePortfolio(id).subscribe(() => {
      this.portfolios$ = this.apiService.getPortfolios();
    });
  }

  createPortfolio() {
    this.apiService.createPortfolio(this.portfolioForm.value).subscribe(() => {
      this.portfolios$ = this.apiService.getPortfolios();
      this.portfolioForm.reset();
    });
  }

  updatePortfolio() {
    this.apiService.updatePortfolio(this.portfolioEditForm.value).subscribe(() => {
      this.portfolios$ = this.apiService.getPortfolios();
      this.portfolioEditForm.reset();
      this.editing = false;
    });
  }

}
