import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/check-service';

export class Server {
  constructor() {}
  static start() {
    console.log('Server is running');

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://www.google.com';
        new CheckService(
          () => {
            console.log(`Check ${url} service is running`);
          },
          (error) => {
            console.log(error);
          },
        ).execute(url);
        //new CheckService().execute('http://localhost:3000');
      }
    );

  }
}