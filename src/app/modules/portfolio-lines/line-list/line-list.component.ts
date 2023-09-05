import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Coin, Portfolio, PortfolioLine} from '../../../models/models';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() portfolio: Portfolio | null = null;

  protected readonly Number = Number;
  protected readonly String = String;

  portfolioLines$: Observable<PortfolioLine[]> | undefined;
  currenciesValues$: { [key: string]: Observable<{ EUR: number }> } = {};
  coins$: Observable<Coin[]> | undefined;
  editing = false;
  lineForm: FormGroup;
  lineEditForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.lineForm = this.fb.group({
      id: [''],
      coinId: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.lineEditForm = this.fb.group({
      id: ['', Validators.required],
      coinId: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.coins$ = this.apiService.getCurrencies();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['portfolio']?.currentValue) {
      this.portfolioLines$ = this.apiService.getPortfolioLines(Number(this.portfolio?.id));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  editLine(line: PortfolioLine) {
    this.editing = true;
    this.lineEditForm.patchValue({
      id: line.id,
      portfolioId: line.portfolioId,
      coinId: line.coinId,
      amount: line.amount
    });
  }

  cancelEditLine(): void {
    this.editing = false;
  }

  deleteLine(id: number): void {
    this.subscriptions.push(
      this.apiService.deletePortfolioLine(Number(id)).subscribe(() => {
        this.portfolioLines$ = this.apiService.getPortfolioLines(Number(this.portfolio?.id));
      })
    );
  }

  createLine(): void {
    if (this.lineForm.valid) {
      this.subscriptions.push(
        this.apiService.createPortfolioLine(
          Number(this.portfolio?.id),
          {
            coinId: Number(this.lineForm.value.coinId),
            amount: Number(this.lineForm.value.amount)
          } as PortfolioLine
        ).subscribe(() => {
          this.portfolioLines$ = this.apiService.getPortfolioLines(Number(this.portfolio?.id));
          this.lineForm.reset();
          this.lineForm.controls['coinId'].setValue('');
        })
      );
    }
  }

  updateLine(): void {
    if (this.lineEditForm.valid) {
      this.subscriptions.push(
        this.apiService.updatePortfolioLine(
          Number(this.portfolio?.id),
          {
            id: Number(this.lineEditForm.value.id),
            coinId: Number(this.lineEditForm.value.coinId),
            amount: Number(this.lineEditForm.value.amount)
          } as PortfolioLine
        ).subscribe(() => {
          this.portfolioLines$ = this.apiService.getPortfolioLines(Number(this.portfolio?.id));
          this.editing = false;
        })
      );
    }
  }

  getEurValueByAcronym(acronym: string): Observable<{ EUR: number }> {
    if (!this.currenciesValues$[acronym]) {
      this.currenciesValues$[acronym] = this.apiService.getEurValueByAcronym(acronym);
    }
    return this.currenciesValues$[acronym];
  }
}
