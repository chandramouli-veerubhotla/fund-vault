import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { first, from, map, Observable, of, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export interface Fund {
  id?: string;
  title: string;
  description: string;
  defaultAnnualInterestRate: number;
  dateCreated?: Date;
  lastUpdated?: Date;
  latestMessage?: string;
}

export interface Investment {
  id?: string;
  fundId: string;  
  title: string;
  amount: number;
  date?: Date;
  annualInterestRate?: number;
  isCredit?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FundService {

  constructor(private db: NgxIndexedDBService) { }

  private sortAndGroupInvestments(investments: Investment[]): Map<string, Investment[]> {
    // Parse dates and sort investments by date in ascending order (latest investments last)
    investments.sort((a, b) => {
      const dateA = new Date(a.date ?? 0).getTime();
      const dateB = new Date(b.date ?? 0).getTime();
      return dateA - dateB;
    });
  
    // Group investments by normalized date (ISO string as key)
    const groupedInvestments: Map<string, Investment[]> = investments.reduce((acc, investment) => {
      const date = investment.date ? new Date(investment.date) : new Date();
      // Normalize date to remove time part and use ISO string
      const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
      if (!acc.has(normalizedDate)) {
        acc.set(normalizedDate, []);
      }
      acc.get(normalizedDate)!.push(investment);
      return acc;
    }, new Map<string, Investment[]>());
  
    return groupedInvestments;
  }

  listFunds(): Observable<Fund[]> { 
    return this.db.getAll('funds');
  }

  listInvestments(fundId: string): Observable<Map<string, Investment[]>> {
    return this.db.getAllByIndex<Investment>('investments', 'fundId', IDBKeyRange.only(fundId)).pipe(
      map(investments => this.sortAndGroupInvestments(investments))
    );
  }

  getFund(id: string): Observable<Fund | null> {
    return this.db.getByKey<Fund | null>('funds', id);
  }

  getInvestment(investmentId: string): Observable<Investment | null> {
    return this.db.getByKey<Investment | null>('investments', investmentId);
  }

  checkFundTitleExists(title: string): Observable<boolean> {
    return this.db.getByIndex<Fund>('funds', 'title', title).pipe(
     map((fund: Fund | null) => {
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

  saveInvestment(investment: Investment): Observable<Investment> {
    investment.id = uuidv4();
    return this.getFund(investment.fundId).pipe(
      switchMap(fund => {
        if (!fund) {
          throw new Error('Fund does not exist');
        }
        return this.db.add<Investment>('investments', investment).pipe(
          switchMap(() => {
            let updateMessage = `Rs. ${investment.amount}/-`;
            if (investment.isCredit) {
              updateMessage += ' credited successfully!';
            } else {
              updateMessage += ' debited successfully!';
            }
            return this.updateFund(fund, updateMessage).pipe(
              map(() => investment)
            );
          })
        );
      })
    );
  }

  updateFund(fund: Fund, updateMessage?: string): Observable<Fund | null> {
    if (fund.id == null) {
      return new Observable((observer) => {
        observer.error('Cannot update fund without an id');
      });
    }

    return this.getFund(fund.id).pipe(
      first(),
      switchMap((existingFund: Fund | null) => {
        if (existingFund) {
          existingFund.title = fund.title;
          existingFund.description = fund.description;
          existingFund.defaultAnnualInterestRate = fund.defaultAnnualInterestRate;
          existingFund.lastUpdated = new Date();

          if (updateMessage) {
            existingFund.latestMessage = updateMessage;
          }

          return from(this.db.update('funds', existingFund)).pipe(
            map(() => existingFund)
          );
        } else {
          return of(null);
        }
      })
    );
  }

  deleteFund(id: string): Observable<(Fund | null)[]> {
    return this.db.delete<(Fund | null)>('funds', id);
  }

  getInvestmentHistory(): Observable<Investment[]> {
    return this.db.getAll<Investment>('investments').pipe(
      map(investments => investments.sort((a, b) => {
        const dateA = new Date(a.date ?? 0).getTime();
        const dateB = new Date(b.date ?? 0).getTime();
        return dateA - dateB; // Sort by date in ascending order
      }))
    );
  }
}
