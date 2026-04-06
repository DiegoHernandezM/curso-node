
export enum LogSeverityLevel {
    Low = 'LOW',
    Medium = 'MEDIUM',
    High = 'HIGH',
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
        json = (json === '') ? '{}' : json;
        const  {level, message, createdAt, origin} = JSON.parse(json) as LogEntityOptions;
        const log = new LogEntity({
            level: level,
            message: message,
            createdAt: createdAt,
            origin: 'log.entity.ts',
        });
        return log;
    }

    static fromObject(object: {[key:string]:any}) :LogEntity {
        const {level, message, createdAt, origin} = object as LogEntityOptions;
        if(!message) throw new Error('Message is required');
        return new LogEntity({
            level: level,
            message: message,
            createdAt: createdAt,
            origin: origin,
        });
    }
}