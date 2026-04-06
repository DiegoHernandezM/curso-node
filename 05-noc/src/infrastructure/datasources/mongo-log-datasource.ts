import { LogDatasource } from '../../domain/datasources/log.datasoruce';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogModel } from '../../data/mongo/models/log.model';



export class MongoLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log('Mongo Log created', newLog.id);
  }
  async getLogs(level: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level });
    return logs.map((log) => LogEntity.fromObject(log));
   }
}