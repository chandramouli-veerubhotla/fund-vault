import { Component } from '@angular/core';
import { FundItemComponent } from '../../components/fund-item/fund-item.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NewFundPageComponent } from '../new-fund-page/new-fund-page.component';

@Component({
  selector: 'app-my-funds-page',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FundItemComponent, MatBottomSheetModule],
  templateUrl: './my-funds-page.component.html',
  styleUrl: './my-funds-page.component.scss'
})
export class MyFundsPageComponent {

  constructor(private _bs: MatBottomSheet) { }

  newFundDialog() {
    this._bs.open(NewFundPageComponent)
  }

}
