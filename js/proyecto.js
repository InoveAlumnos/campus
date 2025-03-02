document.querySelector('#logout').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    localStorage.removeItem('inoveUser'); // Borrar localStorage
    window.location.href = './index.html'; // Redirigir a index.html
    return;
});

