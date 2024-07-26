import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FundService } from '../../services/fund.service';
import { catchError, debounceTime, distinctUntilChanged, first, map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-new-fund-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatFormField, MatInputModule, NavbarComponent],
  templateUrl: './new-fund-page.component.html',
  styleUrl: './new-fund-page.component.scss'
})
export class NewFundPageComponent {

  form: FormGroup = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)], [this.uniqueTitleValidatorFn()]),
    description: new FormControl<string|null>(null),
    defaultAnnualInterestRate: new FormControl<number>(0, [Validators.required, Validators.min(0), Validators.max(100)]),
  })

  uniqueTitleValidatorFn() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        debounceTime(300),
        switchMap((title: string) => this.service.checkFundTitleExists(title)),
        map((unique: boolean) => (!unique ? null : {uniqueTitleValidation: true})),
        catchError(() => of({uniqueTitleValidation: true})),
        first()
      )
    }
  } 

  get titleControl() {
    return this.form.get('title');
  }

  constructor(private service: FundService, private router: Router) { }

  createFund() {
    if (this.form.valid) {
      this.service.saveFund(this.form.value).subscribe({
        next: (resp: any) => {
        alert('Fund saved!');
      },
      error: (err: any) => {  
        console.log(err)
        alert('Failed to save fund');
      },
      complete: () => {
        this.form.reset();
        this.router.navigate(['/funds']);
      }
    });
    }
  }


}
