const vinilo = document.getElementById('controlVinilo');
const musica = document.getElementById('musicaRecuerdos');
let inicioMusicaPendiente = null;

function actualizarVinilo(reproduciendo) {
    vinilo.classList.toggle('vinilo-recuerdos--girando', reproduciendo);
    vinilo.setAttribute('aria-pressed', String(reproduciendo));
    vinilo.setAttribute('aria-label', reproduciendo ? 'Pausar música' : 'Reproducir música');
}

vinilo.addEventListener('click', function () {
    if (inicioMusicaPendiente !== null) {
        window.clearTimeout(inicioMusicaPendiente);
        inicioMusicaPendiente = null;
        actualizarVinilo(false);
        return;
    }

    if (musica.paused) {
        vinilo.setAttribute('aria-label', 'Cancelar inicio de música');
        inicioMusicaPendiente = window.setTimeout(function () {
            inicioMusicaPendiente = null;
            musica.play().catch(function () {
                actualizarVinilo(false);
                vinilo.setAttribute('aria-label', 'No se pudo reproducir la música. Tocar para reintentar.');
            });
        }, 1000);
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