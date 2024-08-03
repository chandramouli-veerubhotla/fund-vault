import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Fund, FundService } from '../../services/fund.service';
import { MatNativeDateModule } from '@angular/material/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-new-investment-bs',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInputModule, MatNativeDateModule, MatDatepickerModule],
  templateUrl: './new-investment-bs.component.html',
  styleUrl: './new-investment-bs.component.scss'
})
export class NewInvestmentBsComponent implements OnInit {

  form: FormGroup = new FormGroup({
    fundId: new FormControl<string>('', [Validators.required]),
    title: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    amount: new FormControl<number|null>(null, [Validators.required, Validators.min(1)]),
    date: new FormControl<Date>(new Date(), [Validators.required]),
    annualInterestRate: new FormControl<number|null>(null, [Validators.min(0), Validators.max(100)]),
    isCredit: new FormControl<boolean>(false)
  })

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {fund: Fund, amount: number | null}, 
    private ref: MatBottomSheetRef<NewInvestmentBsComponent>,
    private service: FundService,
    private notifier: NotificationService) {
    
  }

  ngOnInit(): void {
    this.form.patchValue({
      amount: this.data.amount,
      fundId: this.data.fund.id,
      date: new Date(),
      annualInterestRate: this.data.fund.defaultAnnualInterestRate
    })
  }

  close(value: boolean) {
    this.ref.dismiss(value)
  }

  saveInvestment() {
    if (this.form.valid) {
      this.service.saveInvestment(this.form.value).subscribe({
        next: (resp: any) => {
          this.notifier.success(`${this.form.controls['title'].value} saved successfully!`, 'New Investment');
          return this.close(true);
        },
        error: (err: any) => {
          this.notifier.error(`${this.form.controls['title'].value} failed to save`, 'New Investment');
          console.log(err);
        }
      })
    }
  }

}
