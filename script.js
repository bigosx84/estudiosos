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