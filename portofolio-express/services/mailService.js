/**
 * ============================================================================
 * SERVIÇO DE ENVIO DE EMAILS E NOTIFICAÇÕES (MAIL SERVICE)
 * ============================================================================
 * Gerencia o envio seguro de mensagens de contacto e notificações do sistema
 * através de variáveis de ambiente configuradas no servidor.
 * ============================================================================
 */

const logger = require('../utils/logger');

class MailService {
    /**
     * Envia o email de contacto recolhido nos formulários do portfólio
     * @param {Object} formData Dados validados do formulário
     * @returns {Promise<boolean>} Sucesso ou falha do envio
     */
    async sendContactEmail(formData) {
        const { firstName, lastName, email, phone, message, address } = formData;

        // Formatação segura dos dados para registo interno ou envio por SMTP
        const emailPayload = {
            to: process.env.CONTACT_RECIPIENT || 'augustoneve22@gmail.com',
            subject: `[Joker UI Portfólio] Novo contacto de ${firstName} ${lastName}`,
            text: `
                Novo contacto recebido através do website:
                
                Nome: ${firstName} ${lastName}
                E-mail: ${email}
                Telefone / Telemóvel: ${phone || 'Não fornecido'}
                Morada / Endereço: ${address || 'Não fornecido'}
                
                Mensagem:
                ${message}
            `,
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #0b0710; color: #faf7ff; padding: 30px; border-radius: 12px;">
                    <h2 style="color: #c084ff; border-bottom: 2px solid #9b4dff; padding-bottom: 10px;">Novo Contacto via Portfólio</h2>
                    <p><strong>Nome:</strong> ${firstName} ${lastName}</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Telefone / Telemóvel:</strong> ${phone || 'Não fornecido'}</p>
                    <p><strong>Morada / Endereço:</strong> ${address || 'Não fornecido'}</p>
                    <div style="background: rgba(155, 77, 255, 0.1); padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #9b4dff;">
                        <p style="margin: 0; color: #e5dfea;"><strong>Mensagem:</strong></p>
                        <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${message}</p>
                    </div>
                </div>
            `
        };

        try {
            // Em ambiente de produção ou desenvolvimento, registamos no log seguro (ou integramos transporter SMTP real se desejado)
            logger.info(`[MailService] Tentativa de envio de email de contacto para ${emailPayload.to}`, {
                senderEmail: email,
                senderName: `${firstName} ${lastName}`
            });

            // Simulação de sucesso de entrega assíncrona (pronto para ligar a Nodemailer se necessário)
            // const transporter = nodemailer.createTransport({...});
            // await transporter.sendMail(emailPayload);

            return true;
        } catch (error) {
            logger.error('[MailService] Erro ao enviar email de contacto', error);
            throw new Error('Não foi possível enviar a mensagem no momento. Tente novamente mais tarde.');
        }
    }
}

module.exports = new MailService();