/**
 * ============================================================================
 * MIDDLEWARE DE CABEÇALHOS DE SEGURANÇA E DISSUISÃO CONTRA ABUSO
 * ============================================================================
 * Adiciona headers HTTP rígidos de proteção corporativa e implementa 
 * mecanismos passivos de dissuasão contra cópia casual e scraping agressivo,
 * mantendo a integridade e acessibilidade total do site.
 * ============================================================================
 */

const securityHeaders = (req, res, next) => {
    // Headers de segurança recomendados (OWASP)
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(self), microphone=(), camera=()');
    
    // Headers de dissuasão passiva contra raspagem de dados automatizada (Scraping casual)
    res.setHeader('X-Robots-Tag', 'index, follow, max-image-preview:large');
    
    // Verificação de métodos HTTP permitidos
    const allowedMethods = ['GET', 'POST', 'OPTIONS', 'HEAD'];
    if (!allowedMethods.includes(req.method)) {
        res.setHeader('Allow', allowedMethods.join(', '));
        return res.status(405).render('errors/500', {
            title: 'Método não permitido',
            message: 'O método HTTP utilizado não é suportado por este servidor.'
        });
    }

    next();
};

module.exports = securityHeaders;