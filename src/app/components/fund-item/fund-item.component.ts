import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { Fund } from '../../services/fund.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fund-item',
  standalone: true,
  imports: [RouterLink, MatRippleModule, DatePipe],
  templateUrl: './fund-item.component.html',
  styleUrl: './fund-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundItemComponent {

  @Input({required: true}) fund!: Fund

  isToday(date: Date | undefined): boolean {
    if (date == null) {
      return false;
    }

    const today = new Date();
    const dateToCompare = new Date(date);
    
    return today.toDateString() === dateToCompare.toDateString();
  }
}
