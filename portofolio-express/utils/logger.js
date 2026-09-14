/**
 * ============================================================================
 * UTILITÁRIO DE LOGGING SEGURO (WINSTON-STYLE LIGHTWEIGHT)
 * ============================================================================
 * Responsável por registrar eventos do sistema no console ou arquivo,
 * garantindo a restrição absoluta de log de dados sensíveis (senhas, tokens, etc).
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// Garante a existência da pasta de logs caso seja necessário persistência
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    try {
        fs.mkdirSync(logsDir, { recursive: true });
    } catch (err) {
        // Ignora erro de diretório se houver restrição de escrita em ambiente serverless
    }
}

class Logger {
    constructor() {
        this.isProduction = process.env.NODE_ENV === 'production';
    }

    /**
     * Sanitiza dados sensíveis para evitar vazamento em logs
     */
    _sanitize(data) {
        if (!data) return data;
        if (typeof data === 'object') {
            const clone = JSON.parse(JSON.stringify(data));
            const sensitiveKeys = ['password', 'token', 'secret', 'authorization', 'cookie', 'creditCard'];
            
            const sanitizeRecursive = (obj) => {
                for (let key in obj) {
                    if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk.toLowerCase()))) {
                        obj[key] = '[REDACTED]';
                    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                        sanitizeRecursive(obj[key]);
                    }
                }
            };
            sanitizeRecursive(clone);
            return clone;
        }
        return data;
    }

    info(message, meta = {}) {
        const timestamp = new Date().toISOString();
        const safeMeta = this._sanitize(meta);
        const logEntry = `[INFO] [${timestamp}] ${message} ${Object.keys(meta).length ? JSON.stringify(safeMeta) : ''}`;
        
        console.log(logEntry);
        this._writeToFile('combined.log', logEntry);
    }

    warn(message, meta = {}) {
        const timestamp = new Date().toISOString();
        const safeMeta = this._sanitize(meta);
        const logEntry = `[WARN] [${timestamp}] ${message} ${Object.keys(meta).length ? JSON.stringify(safeMeta) : ''}`;
        
        console.warn(logEntry);
        this._writeToFile('combined.log', logEntry);
        this._writeToFile('warn.log', logEntry);
    }

    error(message, error = {}) {
        const timestamp = new Date().toISOString();
        const errorDetails = {
            message: error.message || error,
            stack: this.isProduction ? '[STACK_HIDDEN_IN_PRODUCTION]' : (error.stack || '')
        };
        const safeError = this._sanitize(errorDetails);
        const logEntry = `[ERROR] [${timestamp}] ${message} | Details: ${JSON.stringify(safeError)}`;
        
        console.error(logEntry);
        this._writeToFile('combined.log', logEntry);
        this._writeToFile('error.log', logEntry);
    }

    _writeToFile(filename, logEntry) {
        if (this.isProduction) {
            try {
                fs.appendFileSync(path.join(logsDir, filename), logEntry + '\n');
            } catch (err) {
                // Silencia falha de escrita em disco estrito
            }
        }
    }
}

module.exports = new Logger();