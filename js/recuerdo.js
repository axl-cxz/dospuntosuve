const vinilo = document.getElementById('controlVinilo');
const musica = document.getElementById('musicaRecuerdos');

function actualizarVinilo(reproduciendo) {
    vinilo.classList.toggle('vinilo-recuerdos--girando', reproduciendo);
    vinilo.setAttribute('aria-pressed', String(reproduciendo));
    vinilo.setAttribute('aria-label', reproduciendo ? 'Pausar música' : 'Reproducir música');
}

vinilo.addEventListener('click', function () {
    if (musica.paused) {
        musica.play().catch(function () {
            actualizarVinilo(false);
            vinilo.setAttribute('aria-label', 'No se pudo reproducir la música. Tocar para reintentar.');
        });
    } else {
        musica.pause();
    }
});

musica.addEventListener('play', function () {
    actualizarVinilo(true);
});

musica.addEventListener('pause', function () {
    actualizarVinilo(false);
});

musica.addEventListener('ended', function () {
    actualizarVinilo(false);
});

musica.addEventListener('error', function () {
    actualizarVinilo(false);
    vinilo.setAttribute('aria-label', 'No se pudo cargar la música. Tocar para reintentar.');
});