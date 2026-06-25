/**
 * Ministerio Renacer — App principal
 * Hash routing, carga de datos, renderizado de vistas
 */

// --- Configuración ---
const DATA = {
  events: './data/events.json'
  // songs y repertoires se añadirán en fases posteriores
};

// --- Estado global ---
let eventsData = null;

// --- Utilidades ---
async function loadJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText} al cargar ${url}`);
  }
  return await response.json();
}

function typeLabel(type) {
  const labels = { ensayo: 'Ensayo', misa: 'Misa', taller: 'Taller' };
  return labels[type] || type;
}

function formatLabel(format) {
  const labels = { acustico: 'Acústico', mixto: 'Mixto', electrico: 'Eléctrico' };
  return labels[format] || format;
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('es', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

// --- Router ---
function handleRoute() {
  const hash = window.location.hash.slice(1) || '/inicio';

  // Rutas de secciones de landing (scroll)
  const landingSections = ['/inicio', '/nosotros', '/organizacion', '/cantos', '/contacto'];

  if (landingSections.includes(hash)) {
    showLanding(hash.replace('/', '') || 'inicio');
    return;
  }

  if (hash === '/eventos') {
    showEventList();
    return;
  }

  if (hash.startsWith('/evento/')) {
    const id = hash.replace('/evento/', '');
    showEventDetail(id);
    return;
  }

  // Ruta desconocida → redirigir a inicio
  window.location.hash = '#/inicio';
}

function showLanding(sectionId) {
  const landing = document.getElementById('landing-sections');
  const dynamic = document.getElementById('dynamic-view');
  landing.classList.remove('hidden');
  dynamic.classList.add('hidden');

  // Scroll a la sección
  setTimeout(function () {
    const target = document.getElementById(sectionId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

function showEventList() {
  const landing = document.getElementById('landing-sections');
  const dynamic = document.getElementById('dynamic-view');
  landing.classList.add('hidden');
  dynamic.classList.remove('hidden');

  if (!eventsData || eventsData.length === 0) {
    dynamic.innerHTML = '<div class="empty-state"><p>No hay eventos disponibles.</p>' +
      '<div class="back-link"><a href="#/inicio">← Volver al inicio</a></div></div>';
    return;
  }

  const published = eventsData
    .filter(function (e) { return e.status === 'published'; })
    .sort(function (a, b) { return a.date.localeCompare(b.date); });

  if (published.length === 0) {
    dynamic.innerHTML = '<div class="empty-state"><p>No hay eventos publicados próximamente.</p>' +
      '<div class="back-link"><a href="#/inicio">← Volver al inicio</a></div></div>';
    return;
  }

  dynamic.innerHTML = '\
    <section class="section">\
      <h2 class="section-title">Todos los eventos</h2>\
      <div class="events-grid">' + published.map(eventCardHTML).join('') + '</div>\
      <div class="back-link"><a href="#/inicio">← Volver al inicio</a></div>\
    </section>';
}

function showEventDetail(id) {
  const landing = document.getElementById('landing-sections');
  const dynamic = document.getElementById('dynamic-view');
  landing.classList.add('hidden');
  dynamic.classList.remove('hidden');

  var event = eventsData ? eventsData.find(function (e) { return e.id === id; }) : null;

  if (!event) {
    dynamic.innerHTML = '\
      <section class="section">\
        <div class="event-detail">\
          <div class="empty-state">\
            <p>Este evento no está disponible.</p>\
            <div class="back-link"><a href="#/eventos">← Volver a eventos</a></div>\
          </div>\
        </div>\
      </section>';
    return;
  }

  var dress = [];
  if (event.dressCodeMen) dress.push('<div class="detail-row"><span class="detail-label">Vestimenta hombres</span><span class="detail-value">' + event.dressCodeMen + '</span></div>');
  if (event.dressCodeWomen) dress.push('<div class="detail-row"><span class="detail-label">Vestimenta mujeres</span><span class="detail-value">' + event.dressCodeWomen + '</span></div>');

  dynamic.innerHTML = '\
    <section class="section">\
      <div class="event-detail">\
        <span class="event-type-badge">' + typeLabel(event.type) + '</span>\
        <h2 class="section-title" style="margin-top:0.5rem">' + event.title + '</h2>\
        <div class="event-detail-grid">\
          <div class="detail-row">\
            <span class="detail-label">Fecha</span>\
            <span class="detail-value">' + formatDate(event.date) + '</span>\
          </div>\
          <div class="detail-row">\
            <span class="detail-label">Hora</span>\
            <span class="detail-value">' + event.time + ' hs</span>\
          </div>' +
          (event.meetingTime ? '<div class="detail-row"><span class="detail-label">Hora de reunión</span><span class="detail-value">' + event.meetingTime + ' hs</span></div>' : '') + '\
          <div class="detail-row">\
            <span class="detail-label">Lugar</span>\
            <span class="detail-value">' + event.place + '</span>\
          </div>' +
          (event.musicFormat ? '<div class="detail-row"><span class="detail-label">Formato musical</span><span class="detail-value">' + formatLabel(event.musicFormat) + '</span></div>' : '') +
          dress.join('') + '\
        </div>' +
        (event.description ? '<div class="event-detail-block"><p>' + event.description + '</p></div>' : '') +
        (event.repertoireId ? '<div style="text-align:center;margin-top:2rem"><a href="#/repertorio/' + event.repertoireId + '" class="btn btn-primary">Ver repertorio</a></div>' : '') + '\
        <div class="back-link"><a href="#/eventos">← Volver a eventos</a></div>\
      </div>\
    </section>';
}

// --- Renderizado de cards (con link) ---
function eventCardHTML(event) {
  var date = new Date(event.date + 'T' + (event.time || '00:00'));
  var day = String(date.getDate()).padStart(2, '0');
  var month = date.toLocaleDateString('es', { month: 'short' });

  return '\
    <a href="#/evento/' + event.id + '" class="event-card-link">\
      <article class="event-card">\
        <div class="event-date">\
          <span class="day">' + day + '</span>\
          <span class="month">' + month + '</span>\
        </div>\
        <div class="event-info">\
          <span class="event-type">' + event.type + '</span>\
          <h3>' + event.title + '</h3>\
          <p class="event-meta">🕐 ' + event.time + ' · 📍 ' + event.place + '</p>\
        </div>\
      </article>\
    </a>';
}

// --- Landing events (para sección "Próximos eventos") ---
function renderUpcomingEvents(events) {
  var container = document.getElementById('events-container');
  var empty = document.getElementById('events-empty');
  if (!container) return;

  var upcoming = events
    .filter(function (e) { return e.status === 'published'; })
    .sort(function (a, b) { return a.date.localeCompare(b.date); })
    .slice(0, 3);

  if (upcoming.length === 0) {
    container.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }

  if (empty) empty.classList.add('hidden');
  container.innerHTML = upcoming.map(eventCardHTML).join('');
}

function showEventsError() {
  var container = document.getElementById('events-container');
  var empty = document.getElementById('events-empty');
  if (container) {
    container.innerHTML = '';
  }
  if (empty) {
    empty.textContent = 'No se pudieron cargar los eventos. Verifica los archivos de datos.';
    empty.classList.remove('hidden');
  }
}

// --- Init ---
async function initApp() {
  try {
    eventsData = await loadJSON('./data/events.json');
    renderUpcomingEvents(eventsData);
  } catch (error) {
    console.error('Error al cargar datos:', error.message);
    showEventsError();
  }
  handleRoute();
}

document.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('hashchange', handleRoute);
