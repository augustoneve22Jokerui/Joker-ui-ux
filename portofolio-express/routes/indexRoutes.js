/**
 * ============================================================================
 * ROTAS PRINCIPAIS DO PORTFÓLIO E APLICAÇÕES (ROUTES)
 * ============================================================================
 * Mapeia os endpoints web da aplicação, aplicando os middlewares de rate limiting 
 * e segurança específicos onde necessário.
 * ============================================================================
 */

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const contactController = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiter');

// Rotas de Páginas Principais
router.get('/', mainController.getHome);
router.get('/projetos', mainController.getProjects);
router.get('/contactos', mainController.getContacts);

// Rotas de Aplicações / Projetos Específicos
router.get('/aotravel', mainController.getAoTravel);
router.get('/rentflow', mainController.getRentFlow);
router.get('/vlogstudents', mainController.getVlogStudents);
router.get('/stand', mainController.getStand);
router.get('/studio', mainController.getStudio);
router.get('/branding', mainController.getBranding);

// Rotas de Aliases para compatibilidade com links antigos
router.get('/projects.html', (req, res) => res.redirect(301, '/projetos'));
router.get('/contacts.html', (req, res) => res.redirect(301, '/contactos'));
router.get('/aotravel.html', (req, res) => res.redirect(301, '/aotravel'));
router.get('/rentflow.html', (req, res) => res.redirect(301, '/rentflow'));
router.get('/vlogstudentes.html', (req, res) => res.redirect(301, '/vlogstudents'));
router.get('/stand.html', (req, res) => res.redirect(301, '/stand'));
router.get('/studio.html', (req, res) => res.redirect(301, '/studio'));
router.get('/branding.html', (req, res) => res.redirect(301, '/branding'));
router.get('/detalhes.html', (req, res) => res.redirect(301, '/aotravel'));

// Rota POST para processamento seguro do formulário de contacto (com rate limiter anti-spam)
router.post('/api/contact', contactLimiter, contactController.submitContact);
router.post('/contactos', contactLimiter, contactController.submitContact);

module.exports = router;