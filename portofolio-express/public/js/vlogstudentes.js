/**
 * ============================================================================
 * VLOGSTUDENTS - ENGINE JAVASCRIPT DE INTERATIVIDADE & MODO CLARO/ESCURO
 * ============================================================================
 * Gestão de Tema (Light/Dark Mode com persistência), Likes em tempo real,
 * Comentários dinâmicos, Toasts flutuantes e ações de criadores.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================================
    // 1. SISTEMA DE ALTERNÂNCIA DE TEMA (MODO CLARO / MODO ESCURO)
    // ============================================================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlRoot = document.documentElement;

    // Verificar se o utilizador já tinha uma preferência salva no localStorage
    const savedTheme = localStorage.getItem('vlog_theme') || 'light';
    htmlRoot.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlRoot.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            htmlRoot.setAttribute('data-theme', newTheme);
            localStorage.setItem('vlog_theme', newTheme);

            showToast(newTheme === 'dark' ? 'Modo Escuro ativado 🌙' : 'Modo Claro ativado ☀️');
        });
    }

    // ============================================================================
    // 2. SISTEMA DE NOTIFICAÇÕES TOAST FLUTUANTES
    // ============================================================================
    const toastEl = document.getElementById('toastNotification');
    let toastTimer;

    function showToast(message) {
        if (!toastEl) return;
        toastEl.textContent = message;
        toastEl.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toastEl.classList.remove('show');
        }, 2500);
    }

    // Ativar toasts em qualquer elemento que contenha [data-toast]
    document.querySelectorAll('[data-toast]').forEach(element => {
        element.addEventListener('click', () => {
            const text = element.getAttribute('data-toast');
            if (text) showToast(text);
        });
    });

    // ============================================================================
    // 3. SISTEMA DE LIKES EM TEMPO REAL NOS VLOGS
    // ============================================================================
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('liked');
            const countSpan = btn.querySelector('.count');
            if (!countSpan) return;

            let baseLikes = parseInt(countSpan.textContent.replace(/\D/g, '')) || 0;

            if (btn.classList.contains('liked')) {
                countSpan.textContent = (baseLikes + 1).toLocaleString('pt-AO');
                showToast('Gostaste deste vlog ♥');
            } else {
                countSpan.textContent = Math.max(0, baseLikes - 1).toLocaleString('pt-AO');
            }
        });
    });

    // ============================================================================
    // 4. SISTEMA DE SEGUIR CRIADORES (FOLLOW / FOLLOWING)
    // ============================================================================
    document.querySelectorAll('.btn-follow-mini').forEach(button => {
        button.addEventListener('click', () => {
            const isFollowing = button.textContent.trim() === 'A seguir';

            if (isFollowing) {
                button.textContent = 'Seguir';
                button.style.background = 'var(--bg-surface-secondary)';
                button.style.color = 'var(--text-primary)';
                button.style.borderColor = 'var(--border-color)';
                showToast('Deixaste de seguir este criador.');
            } else {
                button.textContent = 'A seguir';
                button.style.background = 'var(--accent-green)';
                button.style.color = '#ffffff';
                button.style.borderColor = 'var(--accent-green)';
                showToast('Agora estás a seguir este criador! ✦');
            }
        });
    });

    // ============================================================================
    // 5. ENVIO E RENDERIZAÇÃO DINÂMICA DE COMENTÁRIOS
    // ============================================================================
    document.querySelectorAll('.vlog-comments-section').forEach(section => {
        const inputField = section.querySelector('.comment-input-field');
        const sendBtn = section.querySelector('.comment-send-btn');

        if (!inputField || !sendBtn) return;

        const postCommentAction = () => {
            const val = inputField.value.trim();
            if (!val) {
                inputField.focus();
                return;
            }

            const newCommentDiv = document.createElement('div');
            newCommentDiv.className = 'comment-item';
            newCommentDiv.innerHTML = `
                <div class="comment-avatar" style="background: linear-gradient(135deg, #10b981, #059669);">AN</div>
                <div class="comment-bubble">
                    <strong>Tu (Augusto Neves)</strong>
                    <p>${escapeHtml(val)}</p>
                </div>
            `;

            // Inserir antes da caixa de input de comentários
            section.insertBefore(newCommentDiv, section.querySelector('.comment-input-box'));
            inputField.value = '';
            showToast('Comentário publicado com sucesso!');
        };

        sendBtn.addEventListener('click', postCommentAction);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                postCommentAction();
            }
        });
    });

    function escapeHtml(string) {
        return string.replace(/[&<>"']/g, match => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[match]));
    }

});