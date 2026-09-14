/**
 * ============================================================================
 * CONFIGURAÇÃO DE SEGURANÇA E POLÍTICAS WEB (CSP, HELMET, HEADERS)
 * ============================================================================
 * Centraliza as regras de proteção contra XSS, Clickjacking, MIME-sniffing,
 * e políticas de conteúdo estrito.
 * ============================================================================
 */

module.exports = {
    helmetOptions: {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    "'unsafe-eval'",
                    "https://cdn.jsdelivr.net",
                    "https://cdnjs.cloudflare.com"
                ],
                styleSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    "https://fonts.googleapis.com",
                    "https://cdn.jsdelivr.net",
                    "https://cdnjs.cloudflare.com"
                ],
                fontSrc: [
                    "'self'",
                    "https://fonts.gstatic.com",
                    "https://cdn.jsdelivr.net",
                    "https://cdnjs.cloudflare.com",
                    "data:"
                ],
                imgSrc: [
                    "'self'",
                    "data:",
                    "blob:",
                    "https://images.unsplash.com"
                ],
                mediaSrc: ["'self'"],
                connectSrc: ["'self'"],
                objectSrc: ["'none'"],
                frameAncestors: ["'none'"]
            }
        },
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin" }
    },
    
    // Configurações de dissuasão e limites contra abuso
    abuseProtection: {
        maxPayloadSize: '10kb',
        allowedMethods: ['GET', 'POST', 'OPTIONS'],
        rateLimitWindowMs: 15 * 60 * 1000, // 15 minutos
        rateLimitMaxRequests: 150
    }
};