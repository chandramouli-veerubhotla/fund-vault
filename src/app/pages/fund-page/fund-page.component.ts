import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Fund, FundService, Investment } from '../../services/fund.service';
import { Router, RouterLink } from '@angular/router';
import { InvestmentItemComponent } from '../../components/investment-item/investment-item.component';
import { DatePipe, KeyValuePipe } from '@angular/common';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NewInvestmentBsComponent } from '../../components/new-investment-bs/new-investment-bs.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fund-page',
  standalone: true,
  imports: [RouterLink, InvestmentItemComponent, KeyValuePipe, MatBottomSheetModule, FormsModule, DatePipe],
  templateUrl: './fund-page.component.html',
  styleUrl: './fund-page.component.scss'
})
export class FundPageComponent implements AfterViewInit {

  private _fundId!: string

  @Input({required: true}) 
  set fundId(fundId: string) {
    this._fundId = fundId
    this.fetchFund()
    this.fetchInvestments()
  }

  inputAmount!: number
  fund!: Fund | null
  investments!: Map<Date, Array<Investment>>

  @ViewChildren('investmentItem', { read: ElementRef }) investmentItems!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.investmentItems.changes.subscribe(() => {
      this.scrollToLastInvestment();
    });
  }

  scrollToLastInvestment(): void {
    if (this.investmentItems.length > 0) {
      const lastItem = this.investmentItems.last.nativeElement;
      lastItem.scrollIntoView({ behavior: 'smooth' });
    }
  }



  constructor(private service: FundService, private bs: MatBottomSheet, private router: Router) { }

  fetchFund() {
    this.service.getFund(this._fundId).subscribe({
      next: (fund: Fund | null) => {
        if (fund == null) {
          this.router.navigate(['/funds']);
        }
        this.fund = fund
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  fetchInvestments() {
    this.service.listInvestments(this._fundId).subscribe({
      next: (investments: any) => {
        this.investments = investments
        console.log(this.investments)
      }
    })
  }

  newInvestment() {
    this.bs.open(NewInvestmentBsComponent, {data: {fund: this.fund, amount: this.inputAmount}}).afterDismissed().subscribe((result: boolean) => {
      if (result) {
        this.fetchInvestments()
      }
    })
  }

  


}
