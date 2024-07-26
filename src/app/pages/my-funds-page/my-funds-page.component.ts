import { Component, OnInit } from '@angular/core';
import { FundItemComponent } from '../../components/fund-item/fund-item.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Fund, FundService } from '../../services/fund.service';

@Component({
  selector: 'app-my-funds-page',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FundItemComponent],
  templateUrl: './my-funds-page.component.html',
  styleUrl: './my-funds-page.component.scss'
})
export class MyFundsPageComponent implements OnInit {

  funds!: Array<Fund>
  constructor(private service: FundService) { }

  ngOnInit(): void {
    this.fetchFunds()
  }

  fetchFunds() {
    this.service.listFunds().subscribe({
      next: (funds: Array<Fund>) => {
        this.funds = funds
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


}
