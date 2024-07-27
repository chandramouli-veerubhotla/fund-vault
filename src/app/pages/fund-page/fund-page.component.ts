import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Fund, FundService, Investment } from '../../services/fund.service';
import { Router, RouterLink } from '@angular/router';
import { InvestmentItemComponent } from '../../components/investment-item/investment-item.component';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-fund-page',
  standalone: true,
  imports: [RouterLink, InvestmentItemComponent, KeyValuePipe],
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

  fund!: Fund | null
  investments!: { [key: string]: Array<Investment> }

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



  constructor(private service: FundService, private router: Router) { }

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
      }
    })
  }

  newInvestment() {
    alert(new Date())
    this.service.saveInvestment({
      fundId: this._fundId,
      title: 'New investment',
      amount: 1000,
      date: new Date(),
      isCredit: false,
      annualInterestRate: this.fund?.defaultAnnualInterestRate
    }).subscribe({
      next: (investment: any) => {
       this.fetchInvestments()
      },
      error: (err: any) => {
        console.log(err);
        alert(err.message)
      }
    })
  }

  


}
