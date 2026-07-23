// ---- HEADER: botón Atrás ----
// Usa el historial del navegador; si no hay historial (ej: alguien entra
// directo desde un link de Instagram), cae al inicio del sitio.
function volverAtras() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/index.html';
    }
}

document.getElementById('btn-atras').addEventListener('click', volverAtras);

// ---- NAV DE CATEGORÍAS ----
// Al tocar un chip: abre el acordeón de esa categoría (si estaba cerrado)
// y scrollea hasta ahí, dejando lugar para el nav sticky de arriba.
const chips = Array.from(document.querySelectorAll('.carta-nav__chip'));
const navEl = document.getElementById('carta-nav');

chips.forEach(chip => {
    chip.addEventListener('click', () => {
        const target = document.getElementById(chip.dataset.target);
        if (!target) return;

        target.open = true;

        const offset = navEl.offsetHeight + 12;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Resalta el chip de la categoría que se está viendo mientras se scrollea
const secciones = chips
    .map(chip => document.getElementById(chip.dataset.target))
    .filter(Boolean);

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chips.forEach(chip => {
                    chip.classList.toggle('activo', chip.dataset.target === entry.target.id);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    secciones.forEach(sec => observer.observe(sec));
}

/* ============================================================
   SCROLL-ANIMATIONS.JS
   Agrega la clase .is-visible cuando un elemento entra en pantalla,
   usando IntersectionObserver (nativo, sin librerías).
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const elementos = document.querySelectorAll('.menu__categoria, .carta-footer');

    if (!elementos.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // se anima una sola vez
            }
        });
    }, {
        threshold: 0.15 // se dispara cuando el 15% del elemento es visible
    });

    elementos.forEach((el) => observer.observe(el));
});