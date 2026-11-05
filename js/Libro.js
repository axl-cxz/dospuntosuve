document.addEventListener('DOMContentLoaded', function () {
    const paginas = Array.from(document.querySelectorAll('.carta-hoja'));
    const anterior = document.getElementById('paginaAnterior');
    const siguiente = document.getElementById('paginaSiguiente');
    const contador = document.getElementById('contadorPaginas');
    const modoMovil = window.matchMedia('(max-width: 600px)');
    const hojasMoviles = paginas.slice(1);
    const paginasPorVista = 2;
    const totalVistas = Math.ceil(paginas.length / paginasPorVista);
    let vistaActual = -1;
    let eraMovil = modoMovil.matches;

    function mostrarPagina(indice, direccion) {
        const esMovil = modoMovil.matches;
        const totalPaginas = esMovil ? hojasMoviles.length : totalVistas;
        if (indice < 0 || indice >= totalPaginas || (indice === vistaActual && esMovil === eraMovil)) {
            return;
        }

        vistaActual = indice;
        eraMovil = esMovil;

        paginas.forEach(function (pagina, numero) {
            const esPaginaActual = esMovil
                ? pagina === hojasMoviles[vistaActual]
                : Math.floor(numero / paginasPorVista) === vistaActual && numero !== 0;
            pagina.hidden = !esPaginaActual;
            pagina.classList.remove('carta-hoja--siguiente', 'carta-hoja--anterior');

            if (esPaginaActual) {
                if (direccion) {
                    pagina.classList.add(`carta-hoja--${direccion}`);
                }
            }
        });

        contador.textContent = `${esMovil ? 'Hoja' : 'Página'} ${vistaActual + 1} de ${totalPaginas}`;
        anterior.disabled = vistaActual === 0;
        siguiente.disabled = vistaActual === totalPaginas - 1;
    }

    paginas.forEach(function (pagina) {
        pagina.addEventListener('animationend', function () {
            pagina.classList.remove('carta-hoja--siguiente', 'carta-hoja--anterior');
        });
    });

    siguiente.addEventListener('click', function () {
        mostrarPagina(vistaActual + 1, 'siguiente');
    });

    anterior.addEventListener('click', function () {
        mostrarPagina(vistaActual - 1, 'anterior');
    });

    modoMovil.addEventListener('change', function (evento) {
        const siguienteIndice = evento.matches
            ? Math.max(0, vistaActual * paginasPorVista - 1)
            : Math.floor((vistaActual + 1) / paginasPorVista);
        vistaActual = -1;
        mostrarPagina(Math.min(siguienteIndice, evento.matches ? hojasMoviles.length - 1 : totalVistas - 1));
    });

    mostrarPagina(0);
});