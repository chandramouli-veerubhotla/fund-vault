import { A } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { first, from, last, map, Observable, of, switchMap, tap } from 'rxjs';
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

  constructor(private db: NgxIndexedDBService) {
   }

  private sortAndGroupInvestments(investments: Investment[]): { [key: string]: Investment[] } {
    // Sort investments by date in descending order
    investments.sort((a, b) => (a.date?.getTime() ?? 0) - (b.date?.getTime() ?? 0));
  
    // Group investments by full date (YYYY-MM-DD)
    const groupedInvestments: { [key: string]: Investment[] } = investments.reduce((acc, investment) => {
      const date = investment.date ? new Date(investment.date) : new Date();
      const fullDate = `${date.getDate().toString().padStart(2, '0')}-${date.toLocaleString('default', { month: 'long' })}-${date.getFullYear()}`; // Format as "dd-MonthName-yyyy"
      if (!acc[fullDate]) {
        acc[fullDate] = [];
      }
      acc[fullDate].push(investment);
      return acc;
    }, {} as { [key: string]: Investment[] });
  
    return groupedInvestments;
  }
  

  listFunds(): Observable<Fund[]> { 
    return this.db.getAll('funds');
  }

  listInvestments(fundId: string) {
    return this.db.getAllByIndex<Investment>('investments', 'fundId', IDBKeyRange.only(fundId)) .pipe(
      map(investments => this.sortAndGroupInvestments(investments))
    )
  }

  getFund(id: string): Observable<Fund | null> {
    return this.db.getByKey<Fund | null>('funds', id);
  }

  getInvestment(investmentId: string): Observable<Investment | null> {
    return this.db.getByKey<Investment | null>('investments', investmentId);
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
    fund.lastUpdated = new Date();
    fund.latestMessage = 'Fund created';
    return this.db.add('funds', fund);
  }

  saveInvestment(investment: Investment) {
    investment.id = uuidv4();
    return this.getFund(investment.fundId).pipe(
      switchMap(fund => {
        if (!fund) {
          throw new Error('Fund does not exist');
        }
        return this.db.add<Investment>('investments', investment).pipe(
          switchMap(() => {
            let updateMessage = `Rs. ${investment.amount}/-`
            if (investment.isCredit) {
              updateMessage += ' credited successfully!';
            } else {
              updateMessage += ' debited successfully!';
            }
            return this.updateFund(fund, updateMessage);
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

}
