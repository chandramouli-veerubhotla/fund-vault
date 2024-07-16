import { DBConfig } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
    name: 'fundVault',
    version: 1,
    objectStoresMeta: [
      {
        store: 'investments',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'title', keypath: 'title', options: { unique: false } },
          { name: 'amount', keypath: 'amount', options: { unique: false } },
          { name: 'date', keypath: 'date', options: { unique: false } },
          { name: 'annualRate', keypath: 'annualRate', options: { unique: false } },
          { name: 'frequency', keypath: 'frequency', options: { unique: false } },
          { name: 'isCredit', keypath: 'isCredit', options: { unique: false } },
        ]
      }
    ]
  };
