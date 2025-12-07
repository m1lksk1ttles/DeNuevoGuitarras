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
    // ... (tu código de FormData aquí sigue igual) ...
    
    try {
        const res = await fetch(`${API_URL}/guitarras/`, { /* ... */ });
        const result = await res.json();

        if (res.ok) {
            // ÉXITO: Python devolvió la guitarra, nosotros ponemos el texto
            alert("¡Guitarra agregada con éxito!"); 
            limpiarFormulario();
            cargarGuitarras();
        } else {
            // ERROR: Python devuelve 'detail'
            alert("Error: " + result.detail); 
        }
    } catch (error) {
        console.error(error);
    }
});

// --- ELIMINAR (DELETE) ---
eliminarBtn.addEventListener('click', async () => {
    // ... (tu código de obtener ID sigue igual) ...

    try {
        const res = await fetch(`${API_URL}/guitarras/?idGuitarra=${idGuitarra}`, { /* ... */ });
        const result = await res.json();

        if (res.ok) {
            // ÉXITO: Aquí sí usamos result.mensaje porque Python lo envía
            alert(result.mensaje); 
            limpiarFormulario();
            cargarGuitarras();
        } else {
            // ERROR: Leemos 'detail' (Ej. "No se encontró la guitarra...")
            alert("Error: " + result.detail);
        }
    } catch (error) {
        console.error(error);
    }
});

// --- ACTUALIZAR (PUT) ---
actualizarBtn.addEventListener('click', async () => {
    // ... (tu código de FormData aquí sigue igual) ...

    try {
        const res = await fetch(`${API_URL}/guitarras/`, { /* ... */ });
        const result = await res.json();

        if (res.ok) {
            // ÉXITO: Mensaje manual
            alert("¡Guitarra actualizada con éxito!");
            limpiarFormulario();
            cargarGuitarras();
        } else {
            // ERROR: Leemos 'detail'
            alert("Error: " + result.detail);
        }
    } catch (error) {
        console.error(error);
    }
});

cargarGuitarras();