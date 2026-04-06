import { EmailService } from '../../../presentation/email/email.servie';
import { LogRepository } from '../../repository/log.repository';
import { LogSeverityLevel, LogEntity } from '../../entities/log.entity';



interface SendLogEmailUseCase {
  execute: (to: string|string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) {
    this.emailService = emailService;
  }

  async execute(to: string|string[]) {
    try {
      const send = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!send) {
        throw new Error('Email not sent');
      }
      const log = new LogEntity({
        level: LogSeverityLevel.Low,
        message: `Log email sent`,
        createdAt: new Date().toISOString(),
        origin: 'send-email-logs.ts',
     });
     await this.logRepository.saveLog(log);
      return true;
    } catch (error) {
     const log = new LogEntity({
        level: LogSeverityLevel.High,
        message: `Log email send error ${error}`,
        createdAt: new Date().toISOString(),
        origin: 'send-email-logs.ts',
     });
     await this.logRepository.saveLog(log);
      return false;
    }
  }
}
