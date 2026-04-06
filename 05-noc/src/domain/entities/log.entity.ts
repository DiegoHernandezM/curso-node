
export enum LogSeverityLevel {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt: string;
    origin: string;
}

export class LogEntity {
    public level:LogSeverityLevel;
    public message:string;
    public createdAt:Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const {level, message, createdAt, origin} = options;
        this.level = level;
        this.message = message;
        this.createdAt = new Date(createdAt);
        this.origin = origin;
    }

    static fromJson(json: string): LogEntity {
        const  {level, message, createdAt, origin} = JSON.parse(json) as LogEntityOptions;
        const log = new LogEntity({
            level: level,
            message: message,
            createdAt: createdAt,
            origin: 'log.entity.ts',
        });
        return log;
    }
}