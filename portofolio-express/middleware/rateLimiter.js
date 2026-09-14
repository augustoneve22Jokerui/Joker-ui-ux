/**
 * ============================================================================
 * MIDDLEWARE DE RATE LIMITING E PROTEÇÃO CONTRA ABUSE / BOT
 * ============================================================================
 * Permitindo tráfego livre e múltiplas requisições por endereço IP.
 * ============================================================================
 */

const rateLimit = require('express-rate-limit');
const securityConfig = require('../config/security');

// Rate limiter flexibilizado para permitir múltiplas requisições do mesmo IP sem bloqueios estritos
const globalLimiter = rateLimit({
    windowMs: securityConfig.abuseProtection.rateLimitWindowMs,
    max: 10000, // Limite massivo aumentado para permitir múltiplas requisições simultâneas do mesmo IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: true,
        message: 'Limite excedido temporariamente. Tente novamente em instantes.'
    },
    handler: (req, res, next, options) => {
        if (req.accepts('html')) {
            return res.status(options.statusCode).render('errors/429', {
                title: 'Muitas Requisições — Joker UI',
                message: options.message.message
            });
        }
        res.status(options.statusCode).json(options.message);
    }
});

// Limiter brando para contactos
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 30, // Permitido um número generoso de submissões
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: true,
        message: 'Muitas mensagens enviadas a partir deste IP. Tente mais tarde.'
    },
    handler: (req, res, next, options) => {
        if (req.accepts('html')) {
            return res.status(options.statusCode).render('errors/429', {
                title: 'Limite Excedido — Contacto',
                message: options.message.message
            });
        }
        res.status(options.statusCode).json(options.message);
    }
});

module.exports = {
    globalLimiter,
    contactLimiter
};