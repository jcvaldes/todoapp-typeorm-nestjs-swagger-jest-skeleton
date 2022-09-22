import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mariadb',
        host: 'localhost',
        port: 3306,
        username: 'todoapp_user',
        password: 'secreto',
        database: 'todoapp_dev',
        entities: [],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
