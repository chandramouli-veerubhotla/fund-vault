import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import { Router, RouterLink } from '@angular/router';
import { Fund } from '../../services/fund.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fund-item',
  standalone: true,
  imports: [RouterLink, MatRippleModule, DatePipe, FormsModule],
  templateUrl: './fund-item.component.html',
  styleUrl: './fund-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundItemComponent {

  @Input({required: true}) fund!: Fund
  @Input() selectable: boolean = false

  selected: boolean = false

  constructor(private router: Router) { }

  isToday(date: Date | undefined): boolean {
    if (date == null) {
      return false;
    }

    const today = new Date();
    const dateToCompare = new Date(date);
    
    return today.toDateString() === dateToCompare.toDateString();
  }

  toggleSelected() {
    this.selected = !this.selected
  }

  onClick() {
    if (!this.selectable) {
      return this.router.navigate(['/fund', this.fund.id])
    }
    this.toggleSelected()
    return null
  }
}
