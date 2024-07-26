import { DBConfig } from 'ngx-indexed-db';
import { v4 as uuidv4 } from 'uuid';

export const dbConfig: DBConfig = {
  name: 'fundVault',
  version: 1,
  objectStoresMeta: [
    {
      store: 'investments',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true, defaultValue: () => uuidv4() } },
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'amount', keypath: 'amount', options: { unique: false } },
        { name: 'date', keypath: 'date', options: { unique: false } },
        { name: 'annualRate', keypath: 'annualRate', options: { unique: false } },
        { name: 'frequency', keypath: 'frequency', options: { unique: false } },
        { name: 'isCredit', keypath: 'isCredit', options: { unique: false } },
      ]
    },
    {
      store: 'funds',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
       // { name: 'id', keypath: 'id', options: { unique: true, defaultValue: () => uuidv4() } },
        { name: 'title', keypath: 'title', options: { unique: true } },
        { name: 'description', keypath: 'description', options: { unique: false } },
        { name: 'defaultAnnualInterestRate', keypath: 'defaultAnnualInterestRate', options: { unique: false } },
        { name: 'dateCreated', keypath: 'dateCreated', options: { unique: false } },
      ]
    }
  ]
};
