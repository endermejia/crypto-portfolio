import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ApiService} from '../../../services/api.service';
import {Coin, CryptoCompareData} from '../../../models/models';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit, OnDestroy {

  currencies$: Observable<Coin[]> | undefined;
  currenciesValues$: { [key: string]: Observable<{ EUR: number }> } = {};
  cryptoCompareData: CryptoCompareData | undefined;
  editing = false;
  currencyForm: FormGroup;
  currencyEditForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.currencyForm = this.fb.group({
      id: [''],
      acronym: ['', [Validators.required, this.acronymValidator.bind(this)]],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.currencyEditForm = this.fb.group({
      id: ['', Validators.required],
      acronym: ['', [Validators.required, this.acronymValidator.bind(this)]],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.currencies$ = this.apiService.getCurrencies();
    this.subscriptions.push(
      this.apiService.getCryptoCompareData().subscribe((data) => {
        this.cryptoCompareData = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  acronymValidator(control: AbstractControl): { [key: string]: unknown } | null {
    if (this.cryptoCompareData?.Data[control.value]) {
      return null;
    }
    return {acronym: {value: control.value}};
  }

  editCurrency(currency: Coin): void {
    this.editing = true;
    this.currencyEditForm.patchValue({
      id: currency.id,
      acronym: currency.acronym,
      name: currency.name
    });
  }

  cancelEditCurrency(): void {
    this.editing = false;
  }

  deleteCurrency(id: number): void {
    this.subscriptions.push(
      this.apiService.deleteCurrency(id).subscribe(() => {
        this.currencies$ = this.apiService.getCurrencies();
      })
    );
  }

  createCurrency(): void {
    if (this.currencyForm.valid && this.cryptoCompareData?.Data[this.currencyForm.value.acronym]) {
      this.subscriptions.push(
        this.apiService.createCurrency(this.currencyForm.value).subscribe(() => {
          this.currencies$ = this.apiService.getCurrencies();
          this.currencyForm.reset();
        })
      );
    }
  }

  updateCurrency(): void {
    if (this.currencyEditForm.valid && this.cryptoCompareData?.Data[this.currencyEditForm.value.acronym]) {
      this.subscriptions.push(
        this.apiService.updateCurrency(this.currencyEditForm.value).subscribe(() => {
          this.currencies$ = this.apiService.getCurrencies();
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
