import { Component } from '@angular/core';
import {MatRippleModule} from '@angular/material/core';

@Component({
  selector: 'app-fund-item',
  standalone: true,
  imports: [MatRippleModule],
  templateUrl: './fund-item.component.html',
  styleUrl: './fund-item.component.scss'
})
export class FundItemComponent {

}
