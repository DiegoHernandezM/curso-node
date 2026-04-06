import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasources';
import { CronService } from './cron/cron-service';
import { LogImpRepository } from '../infrastructure/repositories/log.imp-repository';
import { EmailService } from './email/email.servie';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';

const logRepository = new LogImpRepository(
  new FileSystemDatasource(),
);
const emailService = new EmailService();
export class Server {
  constructor() {}
  static start() {
    console.log('Server is running');

    new SendEmailLogs(
      emailService,
      logRepository,
    ).execute(['tsu.diego.hdezm@gmail.com']);
    //emailService.sendEmailWithFileSystemLogs(['tsu.diego.hdezm@gmail.com']);
    
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://www.google.com';
        new CheckService(
          logRepository,
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