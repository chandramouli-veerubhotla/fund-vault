import { Component, Input } from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { Fund } from '../../services/fund.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fund-item',
  standalone: true,
  imports: [RouterLink, MatRippleModule, DatePipe],
  templateUrl: './fund-item.component.html',
  styleUrl: './fund-item.component.scss'
})
export class FundItemComponent {

  @Input({required: true}) fund!: Fund
}
