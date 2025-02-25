const preguntas = [
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
        question: "2. ¿Cuál es la capital de España?",
        options: ["a) Barcelona.", "b) Madrid.", "c) Valencia.", "d) Sevilla."],
        correct: 1
    },
    {
        question: "3. ¿Cuántos artículos tiene la Constitución Española?",
        options: ["a) 169.", "b) 200.", "c) 300.", "d) 135."],
        correct: 0
    },
    {
        question: "4. ¿Quién fue el primer presidente del gobierno español tras la dictadura?",
        options: ["a) Felipe González.", "b) Adolfo Suárez.", "c) José María Aznar.", "d) Mariano Rajoy."],
        correct: 1
    }
];

// Guardar preguntas aleatorias cada 24 horas
function obtenerPreguntasDelDía() {
    let fechaGuardada = localStorage.getItem("fechaPreguntas");
    let hoy = new Date().toDateString();

    if (fechaGuardada !== hoy) {
        let preguntasAleatorias = preguntas.sort(() => 0.5 - Math.random()).slice(0, 3);
        localStorage.setItem("preguntasDiarias", JSON.stringify(preguntasAleatorias));
        localStorage.setItem("fechaPreguntas", hoy);
    }

    return JSON.parse(localStorage.getItem("preguntasDiarias"));
}

// Guardar la clasificación
function obtenerClasificacion() {
    let clasificacion = JSON.parse(localStorage.getItem("clasificacion")) || { ANA: 0, MAITE: 0, MONICA: 0, ALBERTO: 0 };
    return clasificacion;
}

// Actualizar la clasificación
function actualizarClasificacion(nombre, puntos) {
    let clasificacion = obtenerClasificacion();
    clasificacion[nombre] += puntos;
    localStorage.setItem("clasificacion", JSON.stringify(clasificacion));
}

// Iniciar el juego
function iniciarJuego() {
    let nombre = document.getElementById("nombre").value;
    if (!nombre) {
        alert("Selecciona un nombre.");
        return;
    }

    document.getElementById("seleccionar-nombre").style.display = "none";
    document.getElementById("juego").style.display = "block";
    
    mostrarPreguntas(nombre);
}

function mostrarPreguntas(nombre) {
    let preguntasDiarias = obtenerPreguntasDelDía();
    let contenedor = document.getElementById("preguntas");
    contenedor.innerHTML = "";

    preguntasDiarias.forEach((pregunta, index) => {
        let div = document.createElement("div");
        div.innerHTML = `<p>${pregunta.question}</p>`;

        pregunta.options.forEach((opcion, i) => {
            let input = document.createElement("input");
            input.type = "radio";
            input.name = `pregunta-${index}`;
            input.value = i;
            input.onclick = () => verificarRespuesta(nombre, index, i, pregunta.correct);
            
            let label = document.createElement("label");
            label.textContent = opcion;

            div.appendChild(input);
            div.appendChild(label);
            div.appendChild(document.createElement("br"));
        });

        let resultado = document.createElement("p");
        resultado.id = `resultado-${index}`;
        div.appendChild(resultado);

        contenedor.appendChild(div);
    });
}

function verificarRespuesta(nombre, index, seleccion, correcta) {
    let resultado = document.getElementById(`resultado-${index}`);
    let inputs = document.getElementsByName(`pregunta-${index}`);

    // Desactivar los botones de respuesta
    inputs.forEach(input => input.disabled = true);

    if (seleccion == correcta) {
        resultado.innerHTML = "✅ Correcto";
        resultado.classList.add("correcto");
        actualizarClasificacion(nombre, 1);
    } else {
        resultado.innerHTML = "❌ Incorrecto";
        resultado.classList.add("incorrecto");
    }

    // Mostrar clasificación después de contestar todas
    if (document.querySelectorAll("input:checked").length === 3) {
        document.getElementById("ver-clasificacion").style.display = "block";
    }
}

function mostrarClasificacion() {
    let clasificacion = obtenerClasificacion();
    let ranking = document.getElementById("ranking");
    ranking.innerHTML = "";

    Object.entries(clasificacion).forEach(([nombre, puntos]) => {
        let li = document.createElement("li");
        li.textContent = `${nombre}: ${puntos} puntos`;
        ranking.appendChild(li);
    });

    document.getElementById("juego").style.display = "none";
    document.getElementById("clasificacion").style.display = "block";
}

function reiniciarJuego() {
    document.getElementById("clasificacion").style.display = "none";
    document.getElementById("seleccionar-nombre").style.display = "block";
}
