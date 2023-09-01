import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ApiService} from '../../api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Portfolio, PortfolioLine} from '../../models/models';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnChanges {

  @Input() portfolio: Portfolio | null = null;

  portfolioLines$: Observable<PortfolioLine[]> | undefined;
  editing = false;
  lineForm: FormGroup | undefined;
  lineEditForm: FormGroup | undefined;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.lineForm = this.fb.group({
      id: [''],
      portfolioId: ['', Validators.required],
      coinId: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.lineEditForm = this.fb.group({
      id: ['', Validators.required],
      portfolioId: ['', Validators.required],
      coinId: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['portfolio']?.currentValue) {
      this.portfolioLines$ = this.apiService.getPortfolioLines(this.portfolio?.id as number);
    }
  }

  editLine(id: number) {
    this.editing = true;
  }

  cancelEditLine() {
    this.editing = false;
  }

  deleteLine(id: number) {
    this.apiService.deletePortfolioLine(this.portfolio?.id as number, id).subscribe(() => {
      this.portfolioLines$ = this.apiService.getPortfolioLines(this.portfolio?.id as number);
    });
  }

}
