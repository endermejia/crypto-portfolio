import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy {

  title: string | undefined;
  message: string | undefined;
  showCancelButton = false;
  subscriptions: Subscription[] = [];

  constructor(
    private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dialogService.dialogData.subscribe({
        next: (data: { title: string, message: string, showCancelButton: boolean }) => {
          debugger;
          this.title = data.title;
          this.message = data.message;
          this.showCancelButton = data.showCancelButton;
          document.getElementById('buttonDialog')?.click();
        },
        error: (err) => {
          console.error(err);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onConfirm() {
    this.dialogService.close(true);
  }

  onCancel() {
    this.dialogService.close(false);
  }
}
