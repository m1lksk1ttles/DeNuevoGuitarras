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
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Configuración</th>
            <th>Potenciómetros</th>
          </tr>
        </thead>
        <tbody>
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

    tablaHTML += '</tbody></table>';
    tablaDiv.innerHTML = tablaHTML;
  } catch (error) {
    console.error('Error al cargar guitarras:', error);
  }
}

function limpiarFormulario() {
  form.reset();
}

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
            alert("¡Guitarra agregada con éxito!"); 
            limpiarFormulario();
            cargarGuitarras();
        } else {
            alert("Error: " + (result.detail || "Error desconocido")); 
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión");
    }
});

eliminarBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const idGuitarra = new FormData(form).get('idGuitarra');

    if (!idGuitarra) return alert("Escribe un ID para eliminar");

    try {
        const res = await fetch(`${API_URL}/guitarras/?idGuitarra=${idGuitarra}`, { 
            method: 'DELETE'
        });
        
        const result = await res.json();

        if (res.ok) {
            alert(result.mensaje); 
            limpiarFormulario();
            cargarGuitarras();
        } else {
            alert("Error: " + (result.detail || "Error desconocido"));
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión");
    }
});

actualizarBtn.addEventListener('click', async (e) => {
    e.preventDefault();

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
            alert("¡Guitarra actualizada con éxito!");
            limpiarFormulario();
            cargarGuitarras();
        } else {
            alert("Error: " + (result.detail || "Error desconocido"));
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión");
    }
});

cargarGuitarras();