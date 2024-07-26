import { Component } from '@angular/core';
import { FundItemComponent } from '../../components/fund-item/fund-item.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-my-funds-page',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FundItemComponent],
  templateUrl: './my-funds-page.component.html',
  styleUrl: './my-funds-page.component.scss'
})
export class MyFundsPageComponent {

}
