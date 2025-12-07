const API_URL = "https://denuevoguitarras.onrender.com"; 

const form = document.getElementById('formGuitarra');
const eliminarBtn = document.getElementById('eliminarBtn');
const actualizarBtn = document.getElementById('actualizarBtn');
const tablaDiv = document.getElementById('tabla');

async function cargarGuitarras() {
  try {
    const res = await fetch(`${API_URL}/guitarras/`);
    const guitarras = await res.json();

    let tablaHTML = `
      <table>
        <tr>
          <th>ID</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Configuración</th>
          <th>Potenciómetros</th>
        </tr>
    `;

    guitarras.forEach(g => {
      tablaHTML += `
        <tr>
          <td>${g.idGuitarra}</td>
          <td>${g.Marca}</td>
          <td>${g.Modelo}</td>
          <td>${g.Configuracion}</td>
          <td>${g.CantPots}</td>
        </tr>`;
    });

    tablaHTML += '</table>';
    tablaDiv.innerHTML = tablaHTML;
  } catch (error) {
    console.error('Error al cargar guitarras:', error);
  }
}

function limpiarFormulario() {
  form.reset();
}

// --- AGREGAR (POST) ---
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.CantPots = Number(data.CantPots);
  data.idGuitarra = Number(data.idGuitarra);

  try {
    const res = await fetch(`${API_URL}/guitarras/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
        // ÉXITO: El backend devolvió la guitarra creada, ponemos mensaje manual
        alert("¡Guitarra agregada correctamente!");
        limpiarFormulario();
        cargarGuitarras();
    } else {
        // ERROR: El backend devolvió un error (ej. ID duplicado)
        // FastAPI pone el mensaje de error en 'detail'
        alert("Error: " + (result.detail || "Error desconocido"));
    }

  } catch (error) {
    console.error('Error de red:', error);
    alert("Error de conexión con el servidor");
  }
});

// --- ELIMINAR (DELETE) ---
eliminarBtn.addEventListener('click', async () => {
  const idGuitarra = form.idGuitarra.value;
  if (!idGuitarra) return alert('Introduce un ID para eliminar');

  try {
    const res = await fetch(`${API_URL}/guitarras/?idGuitarra=${idGuitarra}`, {
      method: 'DELETE'
    });

    const result = await res.json();

    if (res.ok) {
        // ÉXITO: Aquí tu backend SI devuelve un campo "mensaje"
        alert(result.mensaje);
        limpiarFormulario();
        cargarGuitarras();
    } else {
        // ERROR: (ej. ID no encontrado)
        alert("Error: " + (result.detail || "No se pudo eliminar"));
    }

  } catch (error) {
    console.error('Error de red:', error);
  }
});

// --- ACTUALIZAR (PUT) ---
actualizarBtn.addEventListener('click', async () => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.CantPots = Number(data.CantPots);
  data.idGuitarra = Number(data.idGuitarra);

  try {
    const res = await fetch(`${API_URL}/guitarras/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
        // ÉXITO: El backend devuelve la guitarra actualizada, mensaje manual
        alert("¡Guitarra actualizada correctamente!");
        limpiarFormulario();
        cargarGuitarras();
    } else {
        // ERROR: (ej. ID no existe)
        alert("Error: " + (result.detail || "No se pudo actualizar"));
    }

  } catch (error) {
    console.error('Error de red:', error);
  }
});

cargarGuitarras();