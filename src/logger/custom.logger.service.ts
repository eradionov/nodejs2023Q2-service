import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import * as process from 'process';
import * as os from 'os';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';

const configService = new ConfigService();
@Injectable()
export class CustomLoggerService implements LoggerService {
  private logLevel: number;
  private maxSize: number;
  private static LOG_LEVELS = ['error', 'warn', 'log', 'debug'];
  constructor() {
    this.logLevel = configService.get('LEVEL_LOG') || 0;
    this.maxSize = configService.get('LOG_SIZE_KB') || 20;
  }
  log(message: any, ...optionalParams: any[]) {
    this.logError('log', message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logError('error', message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logError('warn', message, optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logError('debug', message, optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logError('verbose', message, optionalParams);
  }

  private logError(level: string, message: any, ...optionalParams: any[]) {
    if (CustomLoggerService.LOG_LEVELS.indexOf(level) > this.logLevel) {
      return;
    }

    const line = `${level}: ${message}; ${optionalParams.join(' ')}` + os.EOL;
    process.stdout.write(line);
    this.logToFile(level, line);
  }

  private logToFile(level: string, line: string) {
    const file = level === 'error' ? 'error.log' : 'operation.log';
    const filePath = path.join('.', 'logs', file);
    const dir = path.dirname(filePath);

    try {
      if (fs.statSync(filePath).size / 1024 > this.maxSize) {
        fs.renameSync(filePath, path.join(dir, `${Date.now()}-${file}`));
      }
    } catch (error) {}

    fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(filePath, line);
  }

  logResponse(code: string, body: object | string | undefined) {
    let response = 'unknown';

    if (typeof body === 'object') {
      response = JSON.stringify(body);
    }

    if (typeof body === 'string') {
      response = body;
    }

    this.log(`Response: Status code ${code}; ${response}`);
  }
}
