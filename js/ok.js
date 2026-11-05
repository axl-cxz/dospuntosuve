document.querySelectorAll('button.ok-boton').forEach(function (boton) {
    boton.addEventListener('click', function () {
        if (boton.disabled) {
            return;
        }

        boton.disabled = true;
        boton.classList.add('ok-boton--desvanecer');
        function mostrarRespuesta(event) {
            if (event.propertyName !== 'opacity') {
                return;
            }

            boton.removeEventListener('transitionend', mostrarRespuesta);
            const respuesta = document.createElement('span');
            respuesta.className = 'ok-respuesta';
            respuesta.textContent = boton.dataset.respuesta;
            respuesta.setAttribute('aria-live', 'polite');
            boton.replaceWith(respuesta);
        }

        boton.addEventListener('transitionend', mostrarRespuesta);
    });
});