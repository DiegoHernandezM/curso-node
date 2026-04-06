import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasources';
import { CronService } from './cron/cron-service';
import { LogImpRepository } from '../infrastructure/repositories/log.imp-repository';
import { EmailService } from './email/email.servie';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log-datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';

const logRepository = new LogImpRepository(
  //new FileSystemDatasource(),
  //new MongoLogDatasource(),
  new PostgresLogDatasource(),
);
const emailService = new EmailService();
export class Server {
  constructor() {}
  static start() {
    console.log('Server is running');

    // Manda correo | Logs de servidor
    //new SendEmailLogs(
      //emailService,
      //logRepository,
    //).execute(['tsu.diego.hdezm@gmail.com']);
   
    
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://www.goodsadsagle.com';
        new CheckService(
          logRepository,
          () => {
            console.log(`Check ${url} service is running`);
          },
          (error) => {
            console.log(error);
          },
        ).execute(url);
      }
    );

  }
}