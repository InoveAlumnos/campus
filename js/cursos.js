// Verificar el usuario en localStorage al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    const storedUser = localStorage.getItem('inoveUser');

    if (!storedUser || !users[storedUser]) {
        // Si no hay usuario válido en localStorage
        localStorage.removeItem('inoveUser'); // Borrar localStorage
        window.location.href = './index.html'; // Redirigir a index.html
        return;
    }

    // Si el usuario existe, cargar los datos
    const userData = users[storedUser];
    renderUserCourses(userData, storedUser);
    document.querySelectorAll('.card-logo').forEach(function(cardLogo) {
        cardLogo.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el comportamiento predeterminado
            alert("Este curso está cerrado, leer el detalle en la descripción de esta página");
        });
    });
});

// Función para renderizar cursos del usuario
function renderUserCourses(userData, username) {
    const mainDiv = document.querySelector('.cursos');
    if (!mainDiv) return;

    let htmlContent = ''; // Para acumular el contenido HTML

    // Renderizar cursos de backend si tiene acceso
    if (userData.backend) {
        courses.backend.forEach(course => {
            htmlContent += generateCourseCardHTML(course, certificates[username], 'backend');
        });
    }

    // Renderizar cursos de frontend si tiene acceso
    if (userData.frontend) {
        courses.frontend.forEach(course => {
            htmlContent += generateCourseCardHTML(course, certificates[username], 'frontend');
        });
    }

    // Insertar el contenido en el contenedor principal
    mainDiv.innerHTML = htmlContent;
}

// Función para generar el HTML de un curso
function generateCourseCardHTML(course, userCertificates, career) {
    // Verificar si hay un certificado disponible
    const certificadoHTML = userCertificates && userCertificates[course.label]
        ? `
            <a class="card-info-item" href="${userCertificates[course.label]}" target="_blank">
                <img src="./images/certificado.png" width="42px" height="38px">
                <span>Certificado</span>
            </a>
          `
        : '';

        const certificadoCarreraBackend = career=='backend' && userCertificates && userCertificates['carrera_backend']
        ? `
            <a class="card-info-item" href="${userCertificates['carrera_backend']}" target="_blank">
                <img src="./images/certificado.png" width="42px" height="38px">
                <span>Certificado Carrera</span>
            </a>
          `
        : '';

        const certificadoCarreraFrontend = career=='frontend' && userCertificates && userCertificates['carrera_frontend']
        ? `
            <a class="card-info-item" href="${userCertificates['carrera_frontend']}" target="_blank">
                <img src="./images/certificado.png" width="42px" height="38px">
                <span>Certificado Carrera</span>
            </a>
          `
        : '';

    

    // Retornar el HTML completo para este curso
    return `
        <div class="card">
            <div class="card-title">${course.title}</div>
            <div class="card-logo">
                <img src="${course.logo}" alt="${course.title}">
            </div>
            <div class="card-info">
                <a class="card-info-item" href="${course.videos_clase_href}" target="_blank">
                    <img src="./images/clasesEnVivo.png" alt="Videos de clase">
                    <span>Videos de clase</span>
                </a>
                <a class="card-info-item" href="${course.apuntes_href}" target="_blank">
                    <img src="./images/desafios.png" alt="Apuntes">
                    <span>Apuntes</span>
                </a>
                ${certificadoHTML}
                ${certificadoCarreraBackend}
                ${certificadoCarreraFrontend}
            </div>
        </div>
    `;
}

document.querySelector('#logout').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    localStorage.removeItem('inoveUser'); // Borrar localStorage
    window.location.href = './index.html'; // Redirigir a index.html
    return;
});

