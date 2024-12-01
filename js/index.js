// Al cargar la página, verificar si el usuario ya está en localStorage
document.addEventListener('DOMContentLoaded', function () {
    const storedUser = localStorage.getItem('inoveUser');
    if (storedUser) {
        // Si existe un usuario en localStorage, redirigir a /cursos
        window.location.href = './cursos.html';
    }
});

// Evento para el botón LOGIN
document.querySelector('#login').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener el valor ingresado en el input Usuario/Email
    const inputValue = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (!inputValue) {
        alert('Por favor, ingrese un usuario o email.');
        return;
    }
    if (!password) {
        alert('Por favor, ingrese su contraseña.');
        return;
    }

    if (inputValue.includes('@')) {
        // Si es un email, obtener la parte antes del @
        const emailPrefix = inputValue.split('@')[0];

        // Buscar el usuario que matchee con el emailPrefix en user_2
        const matchedUser = findUserByUser2(emailPrefix);

        if (matchedUser) {
            saveUserAndRedirect(matchedUser);
        } else {
            alert('Usuario o Email incorrecto.');
        }
    } else {
        // Si no es un email, buscar directamente el usuario en el JSON
        if (users[inputValue]) {
            saveUserAndRedirect(users[inputValue].user_1);
        } else {
            alert('Usuario o Email incorrecto.');
        }
    }
});

// Función para buscar un usuario que matchee en user_2
function findUserByUser2(emailPrefix) {
    for (const key in users) {
        if (users[key].user_2 === emailPrefix) {
            return users[key].user_1; // Retornar el user_1 correspondiente
        }
    }
    return null; // Si no se encuentra un match
}

function saveUserAndRedirect(user) {
    localStorage.setItem('inoveUser', user); // Guardar el usuario en localStorage
    window.location.href = './cursos.html'; // Redirigir a la página /cursos
}

// Seleccionar el botón de toggle y el input de contraseña
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function () {
        const passwordInput = this.previousElementSibling;
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            this.textContent = "🔒";
        } else {
            passwordInput.type = "password";
            this.textContent = "👁️";
        }
    });
});