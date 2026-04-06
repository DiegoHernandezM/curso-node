import { LogDatasource } from '../../domain/datasources/log.datasoruce';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { PrismaClient, SeverityLevel } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.POSTGRES_URL!,
});

const prisma = new PrismaClient({ adapter });

const logLevelMap: Record<LogSeverityLevel, SeverityLevel> = {
  LOW: SeverityLevel.LOW,
  MEDIUM: SeverityLevel.MEDIUM,
  HIGH: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = logLevelMap[log.level];

    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level,
      },
    });

    console.log('Log saved Postgres');
  }

  async getLogs(level: LogSeverityLevel): Promise<LogEntity[]> {
    const dbLogs = await prisma.logModel.findMany({
      where: {
        level: logLevelMap[level],
      },
    });

    return dbLogs.map(LogEntity.fromObject);
  }
}