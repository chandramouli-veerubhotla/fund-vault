import { Component } from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fund-item',
  standalone: true,
  imports: [RouterLink, MatRippleModule],
  templateUrl: './fund-item.component.html',
  styleUrl: './fund-item.component.scss'
})
export class FundItemComponent {

}
