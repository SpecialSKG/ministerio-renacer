/**
 * Carga un archivo JSON mediante fetch y retorna los datos parseados.
 * @param {string} url - Ruta relativa al archivo JSON.
 * @returns {Promise<Array|Object>} Datos parseados.
 */
async function loadJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText} al cargar ${url}`);
  }
  return await response.json();
}

/**
 * Genera el HTML de una card de evento.
 * @param {Object} event - Datos del evento.
 * @returns {string} HTML de la card.
 */
function eventCardHTML(event) {
  const date = new Date(event.date + 'T' + (event.time || '00:00'));
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleDateString('es', { month: 'short' });

  return `
    <article class="event-card">
      <div class="event-date">
        <span class="day">${day}</span>
        <span class="month">${month}</span>
      </div>
      <div class="event-info">
        <span class="event-type">${event.type}</span>
        <h3>${event.title}</h3>
        <p class="event-meta">🕐 ${event.time} · 📍 ${event.place}</p>
      </div>
    </article>
  `;
}

/**
 * Renderiza los próximos eventos publicados en el contenedor.
 * @param {Array} events - Lista de eventos.
 */
function renderUpcomingEvents(events) {
  const container = document.getElementById('events-container');
  const empty = document.getElementById('events-empty');

  if (!container) return;

  const upcoming = events
    .filter(function(e) { return e.status === 'published'; })
    .sort(function(a, b) { return a.date.localeCompare(b.date); });

  if (upcoming.length === 0) {
    container.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }

  if (empty) empty.classList.add('hidden');
  container.innerHTML = upcoming.map(eventCardHTML).join('');
}

/**
 * Muestra mensaje de error si no se pudieron cargar los eventos.
 */
function showEventsError() {
  const container = document.getElementById('events-container');
  const empty = document.getElementById('events-empty');
  if (container) {
    container.innerHTML = '';
  }
  if (empty) {
    empty.textContent = 'No se pudieron cargar los eventos. Verifica los archivos de datos.';
    empty.classList.remove('hidden');
  }
}

/**
 * Inicializa la aplicación.
 */
async function initApp() {
  try {
    const events = await loadJSON('./data/events.json');
    renderUpcomingEvents(events);
  } catch (error) {
    console.error('Error al cargar datos:', error.message);
    showEventsError();
  }
}

document.addEventListener('DOMContentLoaded', initApp);
