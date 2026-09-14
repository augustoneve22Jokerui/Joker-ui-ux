/**
 * ============================================================================
 * MIDDLEWARE DE TRATAMENTO DE ERROS GLOBAL
 * ============================================================================
 * Trata exceções operacionais e erros de sistema (404, 403, 429, 500)
 * de forma profissional, impedindo vazamento de stack traces e informações internas.
 * ============================================================================
 */

const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const isProduction = process.env.NODE_ENV === 'production';

    // Log detalhado no servidor (seguro, sem expor dados confidenciais)
    logger.error(`[StatusCode: ${statusCode}] ${err.message}`, {
        path: req.originalUrl,
        method: req.method,
        ip: req.ip,
        stack: err.stack
    });

    // Resposta amigável baseada no código de erro
    if (statusCode === 404) {
        return res.status(404).render('errors/404', {
            title: 'Página Não Encontrada — Joker UI',
            path: req.originalUrl
        });
    }

    if (statusCode === 429) {
        return res.status(429).render('errors/429', {
            title: 'Muitas Requisições — Joker UI',
            message: 'Detectamos tráfego excessivo a partir deste IP. Por favor, tente novamente mais tarde.'
        });
    }

    // Erros 500 ou genéricos
    res.status(statusCode).render('errors/500', {
        title: 'Erro Interno do Servidor — Joker UI',
        message: isProduction 
            ? 'Ocorreu um erro inesperado no servidor. A nossa equipa foi notificada.' 
            : err.message,
        error: isProduction ? {} : err
    });
};

module.exports = errorHandler;