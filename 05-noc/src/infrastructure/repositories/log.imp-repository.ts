import { LogDatasource } from '../../domain/datasources/log.datasoruce';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';



export class LogImpRepository implements LogRepository {
  constructor(private readonly logDatasource: LogDatasource) {}
  
  async saveLog(log: LogEntity): Promise<void> {
    await this.logDatasource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}