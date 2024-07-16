import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

export interface Investment {
  id?: number;
  type: string;
  title: string;
  amount: number;
  date: Date;
  annualRate: number;
  frequency?: number;
  isCredit?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private db: NgxIndexedDBService) { }

  getAllInvestments(): Observable<Investment[]> {
    return this.db.getAll('investments');
  }

  getInvestment(id: number): Observable<Investment | null> {
    return this.db.getByKey('investments', id);
  }

  saveInvestment(investment: Investment): Observable<Investment> {
    return this.db.add('investments', investment);
  }

  updateInvestment(investment: Investment): Observable<Investment> {
    return this.db.update('investments', investment);
  }

  deleteInvestments(ids: Array<number>): Observable<number[]> {
    return this.db.bulkDelete('investments', ids);
  }

  cleanInvestments() {
    return this.db.clear('investments');
  }




  



  



}
