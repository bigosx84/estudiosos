let juegoTerminado = false;
let preguntasAleatorias = [];

// Función para generar las 3 preguntas aleatorias
function generarPreguntasAleatorias() {
    const preguntasTotales = [
        {
            question: "1. ¿Cuántos capítulos componen el Título I de la Constitución?",
            options: [
                "a) Diez.",
                "b) Diez, más cuatro disposiciones adicionales, nueve disposiciones transitorias, una disposición derogatoria y una disposición final.",
                "c) El título I no tiene capítulos.",
                "d) Cinco."
            ],
            correct: 3
        },
        {
            question: "2. ¿Quién es el presidente de España?",
            options: [
                "a) Pedro Sánchez.",
                "b) Mariano Rajoy.",
                "c) Alberto Núñez Feijóo.",
                "d) Felipe VI."
            ],
            correct: 1
        },
        {
            question: "3. ¿Cuál es la capital de Francia?",
            options: [
                "a) Berlín.",
                "b) Madrid.",
                "c) París.",
                "d) Londres."
            ],
            correct: 3
        },
        {
            question: "4. ¿Cuál es el océano más grande del planeta?",
            options: [
                "a) Atlántico.",
                "b) Pacífico.",
                "c) Índico.",
                "d) Ártico."
            ],
            correct: 2
        },
        {
            question: "5. ¿Qué país tiene la mayor población del mundo?",
            options: [
                "a) India.",
                "b) Estados Unidos.",
                "c) China.",
                "d) Brasil."
            ],
            correct: 3
        },
        // Añadir más preguntas si se desea
    ];

    // Seleccionamos 3 preguntas aleatorias
    preguntasAleatorias = [];
    while (preguntasAleatorias.length < 3) {
        const pregunta = preguntasTotales[Math.floor(Math.random() * preguntasTotales.length)];
        if (!preguntasAleatorias.includes(pregunta)) {
            preguntasAleatorias.push(pregunta);
        }
    }
}

// Función para comenzar el juego
function comenzarJuego() {
    if (juegoTerminado) {
        alert('El juego ha terminado. Espera hasta el próximo día para jugar.');
        return;
    }

    // Generamos las preguntas aleatorias
    generarPreguntasAleatorias();
    
    // Desactivamos el botón de "Empezar"
    document.getElementById('boton-empezar').disabled = true;
    document.getElementById('mensaje-finish').style.display = 'none';
    
    // Aquí comienza el juego, mostrando las preguntas
    mostrarPreguntas();
}

// Función para mostrar las preguntas
function mostrarPreguntas() {
    const preguntasContainer = document.getElementById('preguntas-container');
    preguntasContainer.innerHTML = '';

    preguntasAleatorias.forEach((pregunta, index) => {
        const divPregunta = document.createElement('div');
        divPregunta.classList.add('pregunta');
        
        const preguntaHTML = `
            <p>${pregunta.question}</p>
            <ul>
                ${pregunta.options.map((opcion, i) => `
                    <li>
                        <input type="radio" name="pregunta${index}" value="${i}">
                        ${opcion}
                    </li>
                `).join('')}
            </ul>
        `;

        divPregunta.innerHTML = preguntaHTML;
        preguntasContainer.appendChild(divPregunta);
    });

    // Añadir el botón para finalizar el juego
    const botonFinalizar = document.createElement('button');
    botonFinalizar.textContent = 'Finalizar';
    botonFinalizar.onclick = finalizarJuego;
    preguntasContainer.appendChild(botonFinalizar);
}

// Función para finalizar el juego
function finalizarJuego() {
    let puntuacion = 0;

    // Revisar las respuestas
    preguntasAleatorias.forEach((pregunta, index) => {
        const seleccionada = document.querySelector(`input[name="pregunta${index}"]:checked`);
        
        if (seleccionada && parseInt(seleccionada.value) === pregunta.correct) {
            puntuacion++;
        }
    });

    // Mostrar la puntuación
    alert(`Puntuación: ${puntuacion} de 3`);

    // Marcar el juego como terminado
    juegoTerminado = true;

    // Guardar la fecha de juego
    guardarFechaJuego();

    // Mostrar la clasificación
    mostrarClasificacion();

    // Desactivar el botón de "Empezar"
    document.getElementById('boton-empezar').disabled = true;
}

// Función para guardar la fecha del juego
function guardarFechaJuego() {
    const fechaActual = new Date();
    localStorage.setItem('ultimaFechaJuego', fechaActual.toString());
}

// Función para mostrar la clasificación
function mostrarClasificacion() {
    const clasificacionContainer = document.getElementById('clasificacion');
    clasificacionContainer.innerHTML = `
        <h2>Clasificación</h2>
        <ul>
            <li>ANA: 3 puntos</li>
            <li>MAITE: 2 puntos</li>
            <li>MONICA: 1 punto</li>
            <li>ALBERTO: 0 puntos</li>
        </ul>
    `;
}

// Función para verificar si el jugador puede jugar
function verificarJuego() {
    const ultimaFecha = localStorage.getItem('ultimaFechaJuego');
    const fechaActual = new Date();

    if (!ultimaFecha || (fechaActual - new Date(ultimaFecha)) > 24 * 60 * 60 * 1000) {
        // Han pasado más de 24 horas, permitir jugar de nuevo
        document.getElementById('boton-empezar').disabled = false;
        document.getElementById('mensaje-finish').style.display = 'none';
        juegoTerminado = false;  // Permitimos jugar de nuevo
    } else {
        // El jugador debe esperar 24 horas
        document.getElementById('mensaje-finish').textContent = '¡El juego ha terminado! Vuelve mañana para jugar de nuevo.';
        document.getElementById('mensaje-finish').style.display = 'block';
    }
}

// Función para reiniciar el juego manualmente
function reiniciarPreguntas() {
    generarPreguntasAleatorias();
    juegoTerminado = false;
    document.getElementById('boton-empezar').disabled = false;
    document.getElementById('mensaje-finish').style.display = 'none';
    mostrarPreguntas();
}

// Verificamos si el jugador puede jugar
verificarJuego();
