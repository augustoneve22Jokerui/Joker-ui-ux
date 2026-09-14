/**
 * ============================================================================
 * JOKER UI — CORE PROTECTION & ANTI-INSPECTION ENGINE
 * ============================================================================
 * Implementa restrições passivas contra inspeção de código-fonte, desativação
 * de cliques direitos (context menu), atalhos de desenvolvedor (F12, Ctrl+Shift+I, etc.)
 * e seleção de texto não autorizada, garantindo a proteção da propriedade intelectual.
 * ============================================================================
 */

(function() {
    "use strict";

    // 1. Desativação do Menu de Contexto (Botão Direito do Mouse)
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        return false;
    }, { passive: false });

    // 2. Bloqueio de Atalhos de Teclado de Desenvolvimento (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S)
    document.addEventListener("keydown", function(e) {
        // Tecla F12
        if (e.key === "F12" || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }

        // Combinações com Ctrl ou Cmd
        if (e.ctrlKey || e.metaKey) {
            const keyCode = e.keyCode || e.which;
            const key = (e.key || "").toLowerCase();

            // Ctrl+U (Ver código-fonte)
            // Ctrl+S (Salvar página)
            // Ctrl+Shift+I ou I (Inspecionar / Ferramentas de Dev)
            // Ctrl+Shift+J (Consola de Dev)
            // Ctrl+Shift+C (Inspecionar elemento)
            // Ctrl+A (Selecionar tudo - opcional, mantemos liberado ou bloqueado conforme rigor)
            if (
                key === 'u' || keyCode === 85 ||
                key === 's' || keyCode === 83 ||
                (e.shiftKey && (key === 'i' || keyCode === 73)) ||
                (e.shiftKey && (key === 'j' || keyCode === 74)) ||
                (e.shiftKey && (key === 'c' || keyCode === 67))
            ) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }
    }, { passive: false });

    // 3. Dissuasão de Seleção de Texto e Arrastar Imagens (Drag & Drop de assets)
    document.addEventListener("DOMContentLoaded", function() {
        // Aplica proteção de estilo contra seleção nas tags principais
        const protectedElements = document.querySelectorAll("body, img, h1, h2, h3, p, span");
        protectedElements.forEach(el => {
            el.style.webkitUserSelect = "none";
            el.style.mozUserSelect = "none";
            el.style.msUserSelect = "none";
            el.style.userSelect = "none";
        });

        // Impede arrastar imagens para download direto
        document.querySelectorAll("img").forEach(img => {
            img.addEventListener("dragstart", function(e) {
                e.preventDefault();
            });
        });
    });

    // 4. Detecção básica de abertura de Ferramentas de Programador (Debugger Trap opcional)
    setInterval(function() {
        const startTime = performance.now();
        debugger;
        const endTime = performance.now();
        if (endTime - startTime > 100) {
            // Ferramentas de desenvolvimento detetadas abertas
            // Opcional: console.clear();
        }
    }, 3000);

})();