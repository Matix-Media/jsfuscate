export type LogLevel = { level: number; method: (message?: any, ...optionalParams: any[]) => void; name: string };
export const LogLevel = {
    DEBUG: { level: 0, method: console.debug, name: "DEBUG" } as LogLevel,
    INFO: { level: 1, method: console.info, name: "INFO" } as LogLevel,
    WARN: { level: 2, method: console.warn, name: "WARN" } as LogLevel,
    ERROR: { level: 3, method: console.error, name: "ERROR" } as LogLevel,
};

const cache = { currentLogLevel: LogLevel.INFO, asJson: false };

export const debug = (message: string, jsonVersion: any = {}) => log(LogLevel.DEBUG, message, jsonVersion);
export const info = (message: string, jsonVersion: any = {}) => log(LogLevel.INFO, message, jsonVersion);
export const warn = (message: string, jsonVersion: any = {}) => log(LogLevel.WARN, message, jsonVersion);
export const error = (message: string, jsonVersion: any = {}) => log(LogLevel.ERROR, message, jsonVersion);

export function getLogLevel() {
    return cache.currentLogLevel;
}

export function getIsAsJson() {
    return cache.asJson;
}

export function setLogLevel(level: LogLevel) {
    cache.currentLogLevel = level;
}

export function setIsAsJson(asJson: boolean) {
    cache.asJson = asJson;
}

export function log(level: LogLevel, message: string, jsonVersion: any = {}) {
    if (level.level < getLogLevel().level) return;
    if (getIsAsJson()) {
        console.log({ level: { level: level.level, name: level.name }, message: message, ...jsonVersion });
    } else {
        const date = new Date();
        level.method(
            `${date.toLocaleDateString()} ${date.toLocaleTimeString()}:${date.getMilliseconds().toString().padStart(4, "0")} ${level.name.padEnd(
                4,
            )} - ${message}`,
        );
    }
}
