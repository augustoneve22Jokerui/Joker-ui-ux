/**
 * ============================================================================
 * SERVIDOR PRINCIPAL NODE.JS + EXPRESS (PRODUCTION READY)
 * ============================================================================
 * Arquitetura Modular Sênior para o Portfólio de Augusto Neves (Joker UI/UX).
 * Inicializa middlewares de segurança, rotas, motores de template EJS e gestão de erros.
 * ============================================================================
 */

const express = require('express');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

// Importação de Middlewares e Configurações
const securityConfig = require('./config/security');
const securityHeaders = require('./middleware/securityHeaders');
const { globalLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const indexRoutes = require('./routes/indexRoutes');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Motor de Views (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares Essenciais de Segurança e Parsing
app.use(helmet(securityConfig.helmetOptions));
app.use(securityHeaders);
app.use(globalLimiter);

app.use(express.json({ limit: securityConfig.abuseProtection.maxPayloadSize }));
app.use(express.urlencoded({ extended: true, limit: securityConfig.abuseProtection.maxPayloadSize }));

// Configuração de Conteúdo Estático Público com cache adequado
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
    etag: true
}));

// ============================================================================
// ROTAS DE PÁGINAS LEGAIS (Acordo, Privacidade e Cookies)
// ============================================================================

app.get('/acordo', (req, res) => {
    res.render('acordo', { 
        title: 'Acordo de Utilizador - Joker UI' 
    });
});

app.get('/politic', (req, res) => {
    res.render('politic', { 
        title: 'Política de Privacidade - Joker UI' 
    });
});

app.get('/cookies', (req, res) => {
    res.render('cookies', { 
        title: 'Política de Cookies - Joker UI' 
    });
});

// ============================================================================
// ROTAS DE TESTE PARA HOMOLOGAÇÃO VISUAL DOS ERROS (404, 429, 500)
// ============================================================================

// 1. Testar visualmente a página de Erro 404
app.get('/test-404', (req, res) => {
    res.status(404).render('404', { 
        title: 'Página Não Encontrada - Joker UI', 
        path: req.originalUrl 
    });
});

// 2. Testar visualmente a página de Erro 429 (Rate Limit)
app.get('/test-429', (req, res) => {
    res.status(429).render('429', { 
        title: 'Muitas Requisições - Joker UI', 
        message: 'Você atingiu o limite máximo de requisições permitidas por minuto no ecossistema.' 
    });
});

// 3. Testar visualmente a página de Erro 500 (Internal Server Error)
app.get('/test-500', (req, res) => {
    const mockError = new Error('Falha simulada propositalmente para auditoria de interface e stack trace.');
    res.status(500).render('500', { 
        title: 'Erro Interno do Servidor - Joker UI', 
        message: 'Ocorreu um erro catastrófico simulado ao processar os componentes da aplicação.',
        error: mockError 
    });
});

// ============================================================================
// MONTAGEM DAS ROTAS DA APLICAÇÃO
// ============================================================================
app.use('/', indexRoutes);

// Tratamento para Rotas Não Encontradas (404 real)
app.use((req, res, next) => {
    const error = new Error(`Rota não encontrada: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

// Middleware Global de Tratamento de Erros
app.use(errorHandler);

// Inicialização do Servidor HTTP
app.listen(PORT, () => {
    logger.info(`[Server] Joker UI Portfolio a executar com sucesso na porta ${PORT} [Ambiente: ${process.env.NODE_ENV || 'development'}]`);
    console.log(`\n🚀 Servidor ativo e pronto!`);
    console.log(`   - Páginas Legais: /acordo, /politic, /cookies`);
    console.log(`   - Testes de Erro: /test-404 | /test-429 | /test-500\n`);
});

module.exports = app;