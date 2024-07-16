import { Component } from '@angular/core';
import { FundItemComponent } from '../../components/fund-item/fund-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-funds-page',
  standalone: true,
  imports: [RouterLink, FundItemComponent],
  templateUrl: './my-funds-page.component.html',
  styleUrl: './my-funds-page.component.scss'
})
export class MyFundsPageComponent {

}
