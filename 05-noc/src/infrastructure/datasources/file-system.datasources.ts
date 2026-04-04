import fs from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasoruce';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';



export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles() {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(filePath => {
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '');
            }
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logJson = JSON.stringify(newLog);
        fs.appendFileSync(this.allLogsPath, `${logJson}\n`);
        if(newLog.level === LogSeverityLevel.Low) return
        if (newLog.level === LogSeverityLevel.Medium) {
            fs.appendFileSync(this.mediumLogsPath, `${logJson}\n`);
        } else if (newLog.level === LogSeverityLevel.High) {
            fs.appendFileSync(this.highLogsPath, `${logJson}\n`);
        }
        throw new Error('Not implemented.');

    }

    private getLogsFromFilePath(filePath: string): LogEntity[] {
        const logs = fs.readFileSync(filePath, 'utf-8').split('\n');
        return logs.map(log => LogEntity.fromJson(log));
    }



    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch(severityLevel) {
            case LogSeverityLevel.Low:
                return this.getLogsFromFilePath(this.allLogsPath);
            case LogSeverityLevel.Medium:
                return this.getLogsFromFilePath(this.mediumLogsPath);
            case LogSeverityLevel.High:
                return this.getLogsFromFilePath(this.highLogsPath);
            default:
                throw new Error('Not implemented.');
        }
    }
}
