import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ApiService} from '../../api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Coin, Portfolio, PortfolioLine} from '../../models/models';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit, OnChanges {

  @Input() portfolio: Portfolio | null = null;

  portfolioLines$: Observable<PortfolioLine[]> | undefined;
  coins$: Observable<Coin[]> | undefined;
  editing = false;
  lineForm: FormGroup;
  lineEditForm: FormGroup;

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

  ngOnInit() {
    this.coins$ = this.apiService.getCurrencies();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['portfolio']?.currentValue) {
      this.portfolioLines$ = this.apiService.getPortfolioLines(Number(this.portfolio?.id));
    }
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

  cancelEditLine() {
    this.editing = false;
  }

  deleteLine(id: number) {
    this.apiService.deletePortfolioLine(
      Number(id)
    ).subscribe(() => {
      this.portfolioLines$ = this.apiService.getPortfolioLines(Number(this.portfolio?.id));
    });
  }

  createLine() {
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
    });
  }

  updateLine() {
    if (this.lineEditForm.valid) {
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
      });
    }
  }

}
