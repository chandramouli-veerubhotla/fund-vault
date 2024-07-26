import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { first, last, map, Observable, of, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export interface Fund {
  id?: string;
  title: string;
  description: string;
  defaultAnnualInterestRate: number;
  dateCreated?: Date;
  lastUpdated?: Date;
  latestMessage?: string
}

@Injectable({
  providedIn: 'root'
})
export class FundService {

  constructor(private db: NgxIndexedDBService) { }

  listFunds(): Observable<Fund[]> { 
    return this.db.getAll('funds');
  }

  getFund(id: string): Observable<Fund | null> {
    return this.db.getByKey<Fund | null>('funds', id);
  }

  checkFundTitleExists(title: string) {
    return this.db.getByIndex<Fund>('funds', 'title', title).pipe(
     map((fund: Fund | null) => {
      console.log(fund);
      return fund != null;
     })
    );
  }

  saveFund(fund: Fund): Observable<Fund> {
    fund.id = uuidv4();
    fund.dateCreated = new Date();
    fund.lastUpdated = new Date();
    fund.latestMessage = 'Fund created';
    return this.db.add('funds', fund);
  }

  updateFund(fund: Fund, updateMessage?: string): Observable<Fund | null> {
    if (fund.id == null) {
      return new Observable((observer) => {
        observer.error('Cannot update fund without an id');
      });
    }

    return this.getFund(fund.id).pipe(
      first(),
      map((existingFund: Fund | null) => {
        if (existingFund) {
          existingFund.title = fund.title;
          existingFund.description = fund.description;
          existingFund.defaultAnnualInterestRate = fund.defaultAnnualInterestRate;
          existingFund.lastUpdated = new Date();

          if (updateMessage) {
            existingFund.latestMessage = updateMessage;
          }
          return existingFund;
        }
        return null;
      },
      switchMap((updatedFund: Fund | null) => {
        if (updatedFund) {
          return this.db.update('funds', updatedFund);
        }
        return of(null)
      })
    ))
  }

  deleteFund(id: string): Observable<(Fund | null)[]> {
    return this.db.delete<(Fund | null)>('funds', id);
  }

}
