import { Component } from '@angular/core';
import { FundItemComponent } from '../../components/fund-item/fund-item.component';

@Component({
  selector: 'app-my-funds-page',
  standalone: true,
  imports: [FundItemComponent],
  templateUrl: './my-funds-page.component.html',
  styleUrl: './my-funds-page.component.scss'
})
export class MyFundsPageComponent {

}
