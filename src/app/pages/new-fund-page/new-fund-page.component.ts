import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-fund-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatFormField, MatInputModule],
  templateUrl: './new-fund-page.component.html',
  styleUrl: './new-fund-page.component.scss'
})
export class NewFundPageComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    description: new FormControl<string|null>(null)
  })

}
