import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FundService } from '../../services/fund.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { catchError, debounceTime, first, map, Observable, of, switchMap } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-new-fund-bs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-fund-bs.component.html',
  styleUrl: './new-fund-bs.component.scss'
})
export class NewFundBsComponent {

  form: FormGroup = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)], [this.uniqueTitleValidatorFn()]),
    description: new FormControl<string|null>(null),
    defaultAnnualInterestRate: new FormControl<number|null>(null, [Validators.min(0), Validators.max(100)]),
  })

  uniqueTitleValidatorFn() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        debounceTime(300),
        switchMap((title: string) => this.service.checkFundTitleExists(title)),
        map((unique: boolean) => (!unique ? null : {uniqueTitleValidation: true})),
        catchError(() => of({uniqueTitleValidation: true})),
        first()
      )
    }
  } 

  get titleControl() {
    return this.form.get('title');
  }

  constructor(
    private service: FundService,
    private notifier: NotificationService,
    private ref: MatBottomSheetRef<NewFundBsComponent>) { }

  close(value: boolean) {
    this.ref.dismiss(value)
  }

  newFund() {
    if (this.form.valid) {
      // Ensure defualt annual interest rate exists
      if (this.form.controls['defaultAnnualInterestRate'].value == null) {
        this.form.controls['defaultAnnualInterestRate'].setValue(0)
      }

      this.service.saveFund(this.form.value).subscribe({
        next: (resp: any) => {
          this.notifier.success(`${this.form.controls['title'].value} Created successfully!`, 'New Fund');
          return this.close(true);
        },
        error: (err: any) => {
          this.notifier.error(`${this.form.controls['title'].value} failed to create`, 'New Fund');
        }
      })
    }
  }

}
