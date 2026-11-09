document.addEventListener('DOMContentLoaded', function () {
    const mensaje = document.getElementById('mensaje');
    const btnNo = document.getElementById('btnNo');
    const btnSi = document.getElementById('btnSi');
    const textoSi = btnSi.querySelector('.accion__texto');
    const noEscapista = document.getElementById('noEscapista');
    const btnNoEscapista = document.getElementById('btnNoEscapista');
    const mensajeEscapista = document.getElementById('mensajeEscapista');
    let intentosNoEscapista = 0;

    btnNo.addEventListener('click', function (event) {
        event.preventDefault();

        if (document.body.classList.contains('page-propuesta--etapa-6-1')) {
            window.location.href = 'ok.html';
            return;
        }

        if (document.body.classList.contains('page-propuesta--etapa-5')) {
            mensaje.textContent = 'Esta bien, entiendo..., apoyo tu decision, no quieres leer el libro, solo terminemos esto...';
            btnNo.textContent = 'Ok';
            document.body.classList.add('page-propuesta--etapa-6-1');
        } else if (document.body.classList.contains('page-propuesta--etapa-4')) {
            mensaje.textContent = 'Mmmm, de verdad no quieres leer el libro...?, o si?';
            btnNo.textContent = 'No, no quiero leer lo que escribiste';
            textoSi.textContent = 'Si quiero, todo fue por casualidad XD';
            document.body.classList.add('page-propuesta--etapa-5');
        } else if (document.body.classList.contains('page-propuesta--etapa-3')) {
            mensaje.textContent = 'DE VERDAD NO QUIERES LEER?, enserio?, why?, porque?, vamooss, yo se que si quieres leerla';
            document.body.classList.add('page-propuesta--etapa-4');
        } else if (document.body.classList.contains('page-propuesta--etapa-2')) {
            mensaje.textContent = 'Okei, de verdad no quieres leer lo que escribi? :c';
            document.body.classList.add('page-propuesta--etapa-3');
        } else if (document.body.classList.contains('page-propuesta--no-elegido')) {
            mensaje.textContent = 'Emmm, creo que te equivocaste denuevo, todos cometemos errores.';
            btnNo.textContent = 'NO';
            textoSi.textContent = 'SI';
            document.body.classList.add('page-propuesta--etapa-2');
        } else {
            mensaje.textContent = 'Presionaste no?, supongo que te equivocaste, intentemos denuevo :v';
            document.body.classList.add('page-propuesta--no-elegido');
        }

        mensaje.classList.remove('texto-bajo--animado');
        void mensaje.offsetWidth;
        mensaje.classList.add('texto-bajo--animado');
    });

    btnSi.addEventListener('click', function (event) {
        if (document.body.classList.contains('page-propuesta--etapa-6-2')) {
            return;
        }

        if (!document.body.classList.contains('page-propuesta--etapa-5')) {
            return;
        }

        event.preventDefault();
        mensaje.textContent = 'Yo sabia que si querias leer mi carta jeje';
        textoSi.textContent = 'vamos :3';
        document.body.classList.add('page-propuesta--etapa-6-2');
        noEscapista.hidden = false;
        mensaje.classList.remove('texto-bajo--animado');
        void mensaje.offsetWidth;
        mensaje.classList.add('texto-bajo--animado');
    });

    function moverNoEscapista(pointerX, pointerY) {
        const bounds = noEscapista.getBoundingClientRect();
        const maxX = Math.max(0, window.innerWidth - bounds.width);
        const maxY = Math.max(0, window.innerHeight - bounds.height);
        let bestPosition = { x: 0, y: 0, distance: -1 };

        for (let attempt = 0; attempt < 30; attempt += 1) {
            const x = Math.random() * maxX;
            const y = Math.random() * maxY;
            const centerX = x + bounds.width / 2;
            const centerY = y + bounds.height / 2;
            const distance = Math.hypot(centerX - pointerX, centerY - pointerY);

            if (distance > bestPosition.distance) {
                bestPosition = { x: x, y: y, distance: distance };
            }
        }

        noEscapista.style.left = `${bestPosition.x}px`;
        noEscapista.style.top = `${bestPosition.y}px`;
        noEscapista.style.right = 'auto';
        noEscapista.style.bottom = 'auto';
    }

    btnNoEscapista.addEventListener('pointerenter', function (event) {
        if (!document.body.classList.contains('page-propuesta--etapa-6-2')) {
            return;
        }

        const mensajes = [
            '._.',
            'que',
            'Para',
            'Carambas',
            "Ya elegiste tu opcion, para :'v",
            'Ahora solo tienes una opcion jejej'
        ];
        intentosNoEscapista += 1;
        mensajeEscapista.textContent = mensajes[intentosNoEscapista - 1];
        mensajeEscapista.classList.toggle(
            'libro-propuesta__mensaje--una-linea',
            mensajeEscapista.textContent === 'Carambas'
        );
        mensajeEscapista.hidden = false;
        document.body.classList.add('page-propuesta--no-hover');
        mensajeEscapista.classList.toggle('libro-propuesta__mensaje--grande', intentosNoEscapista === 2);

        if (intentosNoEscapista === mensajes.length) {
            noEscapista.hidden = true;
            return;
        }

        moverNoEscapista(event.clientX, event.clientY);
    });

    btnNoEscapista.addEventListener('pointerdown', function (event) {
        event.preventDefault();
        moverNoEscapista(event.clientX, event.clientY);
    });

    btnNoEscapista.addEventListener('click', function (event) {
        event.preventDefault();
        moverNoEscapista(event.clientX, event.clientY);
    });

    btnNoEscapista.addEventListener('focus', function () {
        const bounds = btnNoEscapista.getBoundingClientRect();
        moverNoEscapista(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
        btnNoEscapista.blur();
    });

    window.addEventListener('resize', function () {
        if (document.body.classList.contains('page-propuesta--etapa-6-2')) {
            const bounds = noEscapista.getBoundingClientRect();
            noEscapista.style.left = `${Math.min(bounds.left, window.innerWidth - bounds.width)}px`;
            noEscapista.style.top = `${Math.min(bounds.top, window.innerHeight - bounds.height)}px`;
        }
    });
});