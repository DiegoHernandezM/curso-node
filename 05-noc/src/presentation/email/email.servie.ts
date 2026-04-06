
import nodemailer from 'nodemailer';
import {envs} from '../../config/plugins/envs.plugin';
import {LogRepository} from '../../domain/repository/log.repository';
import { LogSeverityLevel, LogEntity } from '../../domain/entities/log.entity';



interface SendEmailOptions {
  to: string|string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  path: string;
  filename: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });
  
  constructor(
  ) {}

  async sendEmail(options: SendEmailOptions):Promise<boolean> {
    const {to, subject, htmlBody, attachments = []} = options;
    try {
      const sendInformation = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
        attachments: attachments,
      });
      console.log(sendInformation);
      return true;
    }
    catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs( to: string|string[],  ) {
    const subject = 'Logs de servidor';
    const htmlBody = `
    <h1>Logs de servidor</h1>
    <p>Se esta muriendo el sistema papu :'v </p>
    <p>revisate los logs</p>
    `;
    const attachments:Attachment[] = [
      {
        path: './logs/logs-low.log',
        filename: 'logs-low.log',
      },
      {
        path: './logs/logs-high.log',
        filename: 'logs-high.log',
      },
    ];

    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    });
  }


}