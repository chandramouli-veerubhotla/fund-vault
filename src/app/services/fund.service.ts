import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export interface Fund {
  id?: string;
  title: string;
  description: string;
  defaultAnnualInterestRate: number;
  dateCreated?: Date;
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
      return fund != null;
     })
    );
  }

  saveFund(fund: Fund): Observable<Fund> {
    fund.id = uuidv4();
    fund.dateCreated = new Date();
    return this.db.add('funds', fund);
  }

  updateFund(fund: Fund): Observable<Fund> {
    return this.db.update('funds', fund);
  }

  deleteFund(id: string): Observable<(Fund | null)[]> {
    return this.db.delete<(Fund | null)>('funds', id);
  }

}
