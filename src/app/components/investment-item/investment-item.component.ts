import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Investment } from '../../services/fund.service';


@Component({
  selector: 'app-investment-item',
  standalone: true,
  imports: [NgClass, DatePipe, CurrencyPipe],
  templateUrl: './investment-item.component.html',
  styleUrl: './investment-item.component.scss'
})
export class InvestmentItemComponent {

  @Input() isRightAligned = true;
  @Input() canShare = true;

  @Input({required: true}) investment!: Investment;

}
