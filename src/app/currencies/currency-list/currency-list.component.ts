import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../api.service';
import {Coin} from '../../models/models';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {
  currencies$: Observable<Coin[]> | undefined;
  editing = false;
  currencyForm: FormGroup | undefined;
  currencyEditForm: FormGroup | undefined;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.currencyForm = this.fb.group({
      id: [''],
      acronym: ['', Validators.required],
      name: ['', Validators.required]
    });
    this.currencyEditForm = this.fb.group({
      id: ['', Validators.required],
      acronym: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.currencies$ = this.apiService.getCurrencies();
  }

  editCurrency(id: number) {
    this.editing = true;
  }

  cancelEditCurrency() {
    this.editing = false;
  }

  deleteCurrency(id: number) {
    this.apiService.deleteCurrency(id).subscribe(() => {
      this.currencies$ = this.apiService.getCurrencies();
    });
  }

  createCurrency() {
  }

  updateCurrency() {
  }

}
