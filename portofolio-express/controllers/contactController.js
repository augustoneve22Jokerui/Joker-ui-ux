/**
 * ============================================================================
 * CONTROLADOR DE CONTACTO E PROCESSAMENTO DE FORMULÁRIOS
 * ============================================================================
 * Valida, sanitiza e processa os dados submetidos pelo formulário de contacto
 * no servidor, protegendo contra abusos e ataques de injeção.
 * ============================================================================
 */

const validator = require('validator');
const mailService = require('../services/mailService');
const logger = require('../utils/logger');

class ContactController {
    /**
     * Processa a submissão do formulário de contacto
     */
    async submitContact(req, res, next) {
        try {
            const { firstName, lastName, email, phone, message, address, honeypot } = req.body;

            // Proteção Honeypot contra bots automatizados
            if (honeypot) {
                logger.warn('[ContactController] Detetado envio de bot via honeypot', { ip: req.ip });
                // Retorna sucesso simulado para enganar o bot sem processar
                if (req.xhr || req.headers.accept?.includes('json')) {
                    return res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });
                }
                return res.redirect('/contactos?success=true');
            }

            // Sanitização e Validação server-side
            const cleanFirstName = validator.escape(validator.trim(firstName || ''));
            const cleanLastName = validator.escape(validator.trim(lastName || ''));
            const cleanEmail = validator.normalizeEmail(validator.trim(email || '')) || '';
            const cleanPhone = validator.escape(validator.trim(phone || ''));
            const cleanAddress = validator.escape(validator.trim(address || ''));
            const cleanMessage = validator.escape(validator.trim(message || ''));

            // Validações obrigatórias
            if (!cleanFirstName || !cleanEmail || !cleanMessage) {
                if (req.xhr || req.headers.accept?.includes('json')) {
                    return res.status(400).json({ error: true, message: 'Por favor, preencha todos os campos obrigatórios.' });
                }
                return res.status(400).render('pages/contacts', {
                    title: 'Augusto Neves — Contactos',
                    activePage: 'contacts',
                    error: 'Por favor, preencha todos os campos obrigatórios (Nome, E-mail e Mensagem).'
                });
            }

            if (!validator.isEmail(cleanEmail)) {
                if (req.xhr || req.headers.accept?.includes('json')) {
                    return res.status(400).json({ error: true, message: 'O endereço de e-mail fornecido não é válido.' });
                }
                return res.status(400).render('pages/contacts', {
                    title: 'Augusto Neves — Contactos',
                    activePage: 'contacts',
                    error: 'O endereço de e-mail fornecido não é válido.'
                });
            }

            // Executa o envio através do serviço de correio
            await mailService.sendContactEmail({
                firstName: cleanFirstName,
                lastName: cleanLastName,
                email: cleanEmail,
                phone: cleanPhone,
                address: cleanAddress,
                message: cleanMessage
            });

            logger.info(`[ContactController] Mensagem processada com sucesso de ${cleanEmail}`);

            if (req.xhr || req.headers.accept?.includes('json')) {
                return res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso! Entraremos em breve.' });
            }

            return res.render('pages/contacts', {
                title: 'Augusto Neves — Contactos',
                activePage: 'contacts',
                success: 'Mensagem enviada com sucesso! Entraremos em contacto brevemente.'
            });

        } catch (error) {
            logger.error('[ContactController] Erro no processamento do contacto', error);
            if (req.xhr || req.headers.accept?.includes('json')) {
                return res.status(500).json({ error: true, message: 'Erro interno ao processar a mensagem. Tente novamente.' });
            }
            return res.status(500).render('pages/contacts', {
                title: 'Augusto Neves — Contactos',
                activePage: 'contacts',
                error: 'Erro interno ao processar a mensagem. Tente novamente mais tarde.'
            });
        }
    }
}

module.exports = new ContactController();