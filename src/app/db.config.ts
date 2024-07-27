import { DBConfig } from 'ngx-indexed-db';


export const dbConfig: DBConfig = {
  name: 'fundVault',
  version: 2,
  objectStoresMeta: [
    {
      store: 'investments',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'fundId', keypath: 'fundId', options: { unique: false } },
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'amount', keypath: 'amount', options: { unique: false } },
        { name: 'date', keypath: 'date', options: { unique: false } },
        { name: 'annualInterestRate', keypath: 'annualInterestRate', options: { unique: false } },
        { name: 'isCredit', keypath: 'isCredit', options: { unique: false } },
      ]
    },
    {
      store: 'funds',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'title', keypath: 'title', options: { unique: true } },
        { name: 'description', keypath: 'description', options: { unique: false } },
        { name: 'defaultAnnualInterestRate', keypath: 'defaultAnnualInterestRate', options: { unique: false } },
        { name: 'dateCreated', keypath: 'dateCreated', options: { unique: false } },
        { name: 'lastUpdated', keypath: 'lastUpdated', options: { unique: false } },
      ]
    }
  ]
};
