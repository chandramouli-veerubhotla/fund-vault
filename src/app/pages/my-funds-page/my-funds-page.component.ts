import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';

import { FundItemComponent } from '../../components/fund-item/fund-item.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Fund, FundService } from '../../services/fund.service';
import { NewFundBsComponent } from '../../components/new-fund-bs/new-fund-bs.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-funds-page',
  standalone: true,
  imports: [FormsModule, MatBottomSheetModule, MatSidenavModule, RouterLink, NavbarComponent, FundItemComponent],
  templateUrl: './my-funds-page.component.html',
  styleUrl: './my-funds-page.component.scss'
})
export class MyFundsPageComponent implements OnInit {

  fundSelectable: boolean = false
  funds!: Array<Fund>
  constructor(private service: FundService, private bs: MatBottomSheet) { }

  ngOnInit(): void {
    this.fetchFunds()
  }

  toggleSelectable() {
    this.fundSelectable = !this.fundSelectable
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

  newFundBS() {
    this.bs.open(NewFundBsComponent).afterDismissed().subscribe((result: boolean) => {
      if (result) {
        this.fetchFunds()
      }
    })
  }


}
