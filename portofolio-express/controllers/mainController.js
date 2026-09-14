/**
 * ============================================================================
 * CONTROLADOR PRINCIPAL DE RENDERIZAÇÃO DE PÁGINAS (MVC)
 * ============================================================================
 * Gerencia a entrega das views EJS para cada rota do portfólio e projetos,
 * preservando integralmente o conteúdo original e metadados.
 * ============================================================================
 */

const logger = require('../utils/logger');

class MainController {
    /**
     * Renderiza a Página Inicial (Home)
     */
    getHome(req, res, next) {
        try {
            res.render('pages/home', {
                title: 'Joker UI UX — Portfólio Profissional',
                activePage: 'home',
                metaDescription: 'Portfólio oficial de Augusto Neves — Designer UX/UI e Desenvolvedor Full Stack especializado em experiências digitais de alta performance.'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Renderiza a Página de Projetos e Ecossistema
     */
    getProjects(req, res, next) {
        try {
            res.render('pages/projects', {
                title: 'Joker UI UX — Projetos & Ecossistema',
                activePage: 'projects',
                metaDescription: 'Conheça o ecossistema de aplicações, ferramentas e trabalhos desenvolvidos por Augusto Neves.'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Renderiza a Página de Contactos
     */
    getContacts(req, res, next) {
        try {
            res.render('pages/contacts', {
                title: 'Augusto Neves — Contactos',
                activePage: 'contacts',
                metaDescription: 'Entre em contacto com Augusto Neves para o desenvolvimento de soluções digitais e design de elite.'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Renderiza o Projeto Ao Travel
     */
    getAoTravel(req, res, next) {
        try {
            res.render('pages/aotravel', {
                title: 'AOTRAVEL — O Futuro da Mobilidade Urbana',
                activePage: 'aotravel',
                metaDescription: 'AOTRAVEL — mobilidade urbana inteligente em Angola. Carros, motos e encomendas num único aplicativo.'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Renderiza o Projeto RentFlow
     */
    getRentFlow(req, res, next) {
        try {
            res.render('pages/rentflow', {
                title: 'RentFlow — Aluguer de Carros Premium',
                activePage: 'rentflow',
                metaDescription: 'Plataforma premium de aluguer de veículos de luxo e desportivos. Simples, rápido e seguro.'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Renderiza o Projeto VlogStudents
     */
    getVlogStudents(req, res, next) {
        try {
            res.render('pages/vlogstudentes', {
                title: 'VlogStudents — A rede social dos estudantes',
                activePage: 'vlogstudents',
                metaDescription: 'VlogStudents — uma rede social moderna para estudantes partilharem vlogs, momentos, ideias, áudio e comunidade.'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Renderiza o Projeto Stand Filllo
     */
    getStand(req, res, next) {
        try {
            res.render('pages/stand', {
                title: 'Filllo — Aluguel de Carros dos Sonhos',
                activePage: 'stand',
                metaDescription: 'Sistema de stand de automóveis para aluguer, compra e prestação de serviços prestado por rent a car.'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Renderiza o Projeto Joker Studio
     */
    getStudio(req, res, next) {
        try {
            res.render('pages/studio', {
                title: 'Studio — Management Dashboard',
                activePage: 'studio',
                metaDescription: 'Interface premium de gestão, analytics, CRM, projetos, marketing e automação.'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Renderiza o Projeto Branding / Social Media Print
     */
    getBranding(req, res, next) {
        try {
            res.render('pages/branding', {
                title: 'Joker UI/UX — Social Media Print',
                activePage: 'branding',
                metaDescription: 'Joker UI/UX — Design gráfico, identidade visual e experiências digitais.'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MainController();