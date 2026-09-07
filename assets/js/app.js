/**
 * Ministerio Renacer — App principal
 * Hash routing, carga de datos, renderizado de vistas
 */

// --- Configuración ---
const DATA = {
  events: './data/events.json',
  songs: './data/songs.json',
  repertoires: './data/repertoires.json'
};

// --- Estado global ---
let eventsData = null;
let songsData = null;
let repertoiresData = null;

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

function escapeHTML(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function categoryLabel(category) {
  const labels = {
    alabanza: 'Alabanza',
    comunion: 'Comunión',
    adoracion: 'Adoración',
    entrada: 'Entrada',
    ofrenda: 'Ofrenda',
    salida: 'Salida',
    otro: 'Otro'
  };
  return labels[category] || category;
}

// --- Router ---
function handleRoute() {
  const hash = window.location.hash.slice(1) || '/inicio';

  setActiveNav(hash);

  // Rutas de secciones de landing (scroll)
  const landingSections = ['/inicio', '/nosotros', '/organizacion', '/contacto'];

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

  if (hash === '/cantos') {
    showSongList();
    return;
  }

  if (hash.startsWith('/canto/')) {
    const id = hash.replace('/canto/', '');
    showSongDetail(id);
    return;
  }

  if (hash.startsWith('/repertorio/')) {
    const id = hash.replace('/repertorio/', '');
    showRepertoireDetail(id);
    return;
  }

  // Ruta desconocida → redirigir a inicio
  window.location.hash = '#/inicio';
}

function setActiveNav(hash) {
  let active = hash;
  if (hash.startsWith('/evento/')) active = '/eventos';
  if (hash.startsWith('/canto/')) active = '/cantos';
  if (hash.startsWith('/repertorio/')) active = '/eventos';

  const links = document.querySelectorAll('header nav a');
  links.forEach(function (link) {
    if (link.getAttribute('href') === '#' + active) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
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
    dynamic.innerHTML = '<div class="empty-state"><h3>Sin eventos disponibles</h3>' +
      '<p>No hay eventos disponibles.</p>' +
      '<div class="back-link"><a href="#/inicio">← Volver al inicio</a></div></div>';
    return;
  }

  const published = eventsData
    .filter(function (e) { return e.status === 'published'; })
    .sort(function (a, b) { return a.date.localeCompare(b.date); });

  if (published.length === 0) {
    dynamic.innerHTML = '<div class="empty-state"><h3>Sin eventos publicados</h3>' +
      '<p>No hay eventos publicados próximamente.</p>' +
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

  var evt = eventsData ? eventsData.find(function (e) { return e.id === id; }) : null;

  if (!evt) {
    dynamic.innerHTML = '\
      <section class="section">\
        <div class="event-detail">\
          <div class="empty-state">\
            <h3>Evento no encontrado</h3>\
            <p>Este evento no está disponible.</p>\
            <div class="back-link"><a href="#/eventos">← Volver a eventos</a></div>\
          </div>\
        </div>\
      </section>';
    return;
  }

  var dress = [];
  if (evt.dressCodeMen) dress.push('<div class="detail-row"><span class="detail-label">Vestimenta hombres</span><span class="detail-value">' + escapeHTML(evt.dressCodeMen) + '</span></div>');
  if (evt.dressCodeWomen) dress.push('<div class="detail-row"><span class="detail-label">Vestimenta mujeres</span><span class="detail-value">' + escapeHTML(evt.dressCodeWomen) + '</span></div>');

  dynamic.innerHTML = '\
    <section class="section">\
      <div class="event-detail">\
        <span class="event-type-badge">' + escapeHTML(typeLabel(evt.type)) + '</span>\
        <h2 class="section-title" style="margin-top:0.5rem">' + escapeHTML(evt.title) + '</h2>\
        <div class="event-detail-grid">\
          <div class="detail-row">\
            <span class="detail-label">Fecha</span>\
            <span class="detail-value">' + escapeHTML(formatDate(evt.date)) + '</span>\
          </div>\
          <div class="detail-row">\
            <span class="detail-label">Hora</span>\
            <span class="detail-value">' + escapeHTML(evt.time) + ' hs</span>\
          </div>' +
          (evt.meetingTime ? '<div class="detail-row"><span class="detail-label">Hora de reunión</span><span class="detail-value">' + escapeHTML(evt.meetingTime) + ' hs</span></div>' : '') + '\
          <div class="detail-row">\
            <span class="detail-label">Lugar</span>\
            <span class="detail-value">' + escapeHTML(evt.place) + '</span>\
          </div>' +
          (evt.musicFormat ? '<div class="detail-row"><span class="detail-label">Formato musical</span><span class="detail-value">' + escapeHTML(formatLabel(evt.musicFormat)) + '</span></div>' : '') +
          dress.join('') + '\
        </div>' +
        (evt.description ? '<div class="event-detail-block"><p>' + escapeHTML(evt.description) + '</p></div>' : '') +
        repertoireBlockHTML(evt) + '\
        <div class="back-link"><a href="#/eventos">← Volver a eventos</a></div>\
      </div>\
    </section>';
}

// --- Repertorio: bloque dentro del detalle de evento ---
function repertoireBlockHTML(evt) {
  var heading = '<h3 class="block-title">Repertorio</h3>';

  if (!evt.repertoireId) {
    return '<div class="event-detail-block">' + heading +
      '<p class="repertoire-empty">Este evento no tiene repertorio asociado.</p></div>';
  }

  var rep = repertoiresData ? repertoiresData.find(function (r) { return r.id === evt.repertoireId; }) : null;

  if (!rep) {
    return '<div class="event-detail-block">' + heading +
      '<p class="repertoire-empty">El repertorio de este evento no está disponible.</p></div>';
  }

  var items = repertoireItemsHTML(rep);
  return '<div class="event-detail-block">' + heading + items +
    '<div class="repertoire-actions"><a href="#/repertorio/' + escapeHTML(rep.id) + '" class="btn btn-primary">Ver repertorio</a></div></div>';
}

// --- Repertorio: lista ordenada de cantos (compartida) ---
function repertoireItemsHTML(rep) {
  if (!rep.items || rep.items.length === 0) {
    return '<p class="repertoire-empty">Este repertorio aún no tiene cantos asignados.</p>';
  }

  var ordered = rep.items.slice().sort(function (a, b) { return a.order - b.order; });
  var lis = ordered.map(function (item) {
    var song = songsData ? songsData.find(function (s) { return s.id === item.songId; }) : null;
    if (!song) {
      return '<li><span class="repertoire-empty">Canto no disponible</span></li>';
    }
    return '<li><a href="#/canto/' + escapeHTML(song.id) + '">' + escapeHTML(song.title) + '</a></li>';
  });
  return '<ol class="repertoire-list">' + lis.join('') + '</ol>';
}

// --- Renderizado de cards (con link) ---
function eventCardHTML(event) {
  var date = new Date(event.date + 'T' + (event.time || '00:00'));
  var day = String(date.getDate()).padStart(2, '0');
  var month = date.toLocaleDateString('es', { month: 'short' });

  return '\
    <a href="#/evento/' + escapeHTML(event.id) + '" class="event-card-link">\
      <article class="event-card">\
        <div class="event-date">\
          <span class="day">' + escapeHTML(day) + '</span>\
          <span class="month">' + escapeHTML(month) + '</span>\
        </div>\
        <div class="event-info">\
          <span class="event-type">' + escapeHTML(event.type) + '</span>\
          <h3>' + escapeHTML(event.title) + '</h3>\
          <p class="event-meta">\
            <svg class="event-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\
            <span>' + escapeHTML(event.time) + '</span>\
            <svg class="event-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>\
            <span>' + escapeHTML(event.place) + '</span>\
          </p>\
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
    empty.innerHTML = '<h3>No se pudieron cargar los eventos</h3>' +
      '<p>No se pudieron cargar los eventos. Verifica los archivos de datos.</p>' +
      '<div class="back-link"><a href="#/eventos">← Ver todos los eventos</a></div>';
    empty.classList.remove('hidden');
  }
}

// --- Cantos: lista con buscador ---
function showSongList() {
  const landing = document.getElementById('landing-sections');
  const dynamic = document.getElementById('dynamic-view');
  landing.classList.add('hidden');
  dynamic.classList.remove('hidden');

  if (songsData === null) {
    dynamic.innerHTML = '\
      <section class="section">\
        <div class="empty-state">\
          <h3>No se pudieron cargar los cantos</h3>\
          <p>No se pudieron cargar los cantos. Verifica los archivos de datos.</p>\
          <div class="back-link"><a href="#/inicio">← Volver al inicio</a></div>\
        </div>\
      </section>';
    return;
  }

  if (songsData.length === 0) {
    dynamic.innerHTML = '\
      <section class="section">\
        <div class="empty-state">\
          <h3>Sin cantos disponibles</h3>\
          <p>No hay cantos disponibles por ahora.</p>\
          <div class="back-link"><a href="#/inicio">← Volver al inicio</a></div>\
        </div>\
      </section>';
    return;
  }

  dynamic.innerHTML = '\
    <section class="section">\
      <h2 class="section-title">Biblioteca de cantos</h2>\
      <div class="song-search" role="search" aria-label="Buscar cantos">\
        <input id="song-search-input" type="search" placeholder="Buscar por título, categoría o etiqueta…" aria-label="Buscar cantos por título, categoría o etiqueta">\
      </div>\
      <div id="songs-container" class="songs-grid">' + songsData.map(songCardHTML).join('') + '</div>\
      <div id="songs-empty" class="empty-state hidden"></div>\
      <div class="back-link"><a href="#/inicio">← Volver al inicio</a></div>\
    </section>';

  var input = document.getElementById('song-search-input');
  input.addEventListener('input', function () {
    filterSongList(input.value);
  });
}

function songCardHTML(song) {
  return '\
    <a href="#/canto/' + escapeHTML(song.id) + '" class="song-card-link">\
      <article class="song-card">\
        <div class="song-card-head">\
          <span class="song-category">' + escapeHTML(categoryLabel(song.category)) + '</span>\
          <span class="song-key">Tonalidad: ' + escapeHTML(song.key) + '</span>\
        </div>\
        <h3>' + escapeHTML(song.title) + '</h3>\
        <p class="song-card-chords">' + escapeHTML(song.chords) + '</p>\
      </article>\
    </a>';
}

function filterSongList(query) {
  var container = document.getElementById('songs-container');
  var empty = document.getElementById('songs-empty');
  if (!container || !empty) return;

  var q = normalizeText(query).trim();
  if (!q) {
    container.innerHTML = songsData.map(songCardHTML).join('');
    empty.classList.add('hidden');
    return;
  }

  var results = songsData.filter(function (song) {
    var haystack = [
      song.title,
      song.category,
      categoryLabel(song.category)
    ].concat(song.tags || []);
    return haystack.some(function (field) {
      return normalizeText(field).includes(q);
    });
  });

  if (results.length === 0) {
    container.innerHTML = '';
    empty.innerHTML = '<h3>Sin resultados</h3>' +
      '<p>No se encontraron cantos para “' + escapeHTML(query) + '”.</p>' +
      '<button id="song-clear-search" class="btn btn-primary" type="button">Limpiar búsqueda</button>';
    empty.classList.remove('hidden');
    document.getElementById('song-clear-search').addEventListener('click', function () {
      var input = document.getElementById('song-search-input');
      if (input) input.value = '';
      filterSongList('');
    });
    return;
  }

  empty.classList.add('hidden');
  container.innerHTML = results.map(songCardHTML).join('');
}

// --- Cantos: detalle ---
function showSongDetail(id) {
  const landing = document.getElementById('landing-sections');
  const dynamic = document.getElementById('dynamic-view');
  landing.classList.add('hidden');
  dynamic.classList.remove('hidden');

  if (songsData === null) {
    dynamic.innerHTML = '\
      <section class="section">\
        <div class="empty-state">\
          <h3>No se pudieron cargar los cantos</h3>\
          <p>No se pudieron cargar los cantos. Verifica los archivos de datos.</p>\
          <div class="back-link"><a href="#/cantos">← Volver a cantos</a></div>\
        </div>\
      </section>';
    return;
  }

  var song = songsData.find(function (s) { return s.id === id; });

  if (!song) {
    dynamic.innerHTML = '\
      <section class="section">\
        <div class="empty-state">\
          <h3>Canto no encontrado</h3>\
          <p>Este canto no está disponible.</p>\
          <div class="back-link"><a href="#/cantos">← Volver a cantos</a></div>\
        </div>\
      </section>';
    return;
  }

  var tagsHTML = (song.tags && song.tags.length > 0)
    ? '<div class="song-detail-card"><h3 class="block-title">Etiquetas</h3><div class="song-tags">' +
      song.tags.map(function (tag) { return '<span class="tag">' + escapeHTML(tag) + '</span>'; }).join('') +
      '</div></div>'
    : '';

  var notesHTML = song.notes
    ? '<div class="song-detail-card"><h3 class="block-title">Notas</h3><p>' + escapeHTML(song.notes) + '</p></div>'
    : '';

  dynamic.innerHTML = '\
    <section class="section">\
      <div class="song-detail">\
        <span class="event-type-badge">' + escapeHTML(categoryLabel(song.category)) + '</span>\
        <h2 class="section-title" style="margin-top:0.5rem">' + escapeHTML(song.title) + '</h2>\
        <div class="song-detail-card">\
          <div class="detail-row">\
            <span class="detail-label">Tonalidad</span>\
            <span class="detail-value">' + escapeHTML(song.key) + '</span>\
          </div>\
          <div class="detail-row">\
            <span class="detail-label">Acordes</span>\
            <span class="detail-value">' + escapeHTML(song.chords) + '</span>\
          </div>\
        </div>\
        <div class="song-detail-card">\
          <h3 class="block-title">Letra</h3>\
          <p class="song-lyrics">' + escapeHTML(song.lyrics) + '</p>\
        </div>' +
        tagsHTML + notesHTML + '\
        <div class="back-link"><a href="#/cantos">← Volver a cantos</a></div>\
      </div>\
    </section>';
}

// --- Repertorio: vista dedicada ---
function showRepertoireDetail(id) {
  const landing = document.getElementById('landing-sections');
  const dynamic = document.getElementById('dynamic-view');
  landing.classList.add('hidden');
  dynamic.classList.remove('hidden');

  if (repertoiresData === null) {
    dynamic.innerHTML = '\
      <section class="section">\
        <div class="empty-state">\
          <h3>No se pudieron cargar los repertorios</h3>\
          <p>No se pudieron cargar los repertorios. Verifica los archivos de datos.</p>\
          <div class="back-link"><a href="#/eventos">← Volver a eventos</a></div>\
        </div>\
      </section>';
    return;
  }

  var rep = repertoiresData.find(function (r) { return r.id === id; });

  if (!rep) {
    dynamic.innerHTML = '\
      <section class="section">\
        <div class="empty-state">\
          <h3>Repertorio no encontrado</h3>\
          <p>Este repertorio no está disponible.</p>\
          <div class="back-link"><a href="#/eventos">← Volver a eventos</a></div>\
        </div>\
      </section>';
    return;
  }

  var eventLink = '';
  var evt = eventsData ? eventsData.find(function (e) { return e.id === rep.eventId; }) : null;
  if (evt) {
    eventLink = '<div class="detail-row"><span class="detail-label">Evento asociado</span>' +
      '<span class="detail-value"><a href="#/evento/' + escapeHTML(evt.id) + '">' + escapeHTML(evt.title) + '</a></span></div>';
  }

  var backHref = evt ? '#/evento/' + escapeHTML(evt.id) : '#/eventos';
  var backLabel = evt ? '← Volver al evento' : '← Volver a eventos';

  dynamic.innerHTML = '\
    <section class="section">\
      <div class="song-detail">\
        <h2 class="section-title">' + escapeHTML(rep.title) + '</h2>\
        <div class="song-detail-card">' + eventLink + '</div>\
        <div class="song-detail-card">\
          <h3 class="block-title">Cantos del repertorio</h3>' +
          repertoireItemsHTML(rep) + '\
        </div>\
        <div class="back-link"><a href="' + backHref + '">' + backLabel + '</a></div>\
      </div>\
    </section>';
}

// --- Init ---
async function initApp() {
  const results = await Promise.allSettled([
    loadJSON(DATA.events),
    loadJSON(DATA.songs),
    loadJSON(DATA.repertoires)
  ]);

  if (results[0].status === 'fulfilled') {
    eventsData = results[0].value;
    renderUpcomingEvents(eventsData);
  } else {
    console.error('Error al cargar eventos:', results[0].reason.message);
    showEventsError();
  }

  if (results[1].status === 'fulfilled') {
    songsData = results[1].value;
  } else {
    console.error('Error al cargar cantos:', results[1].reason.message);
  }

  if (results[2].status === 'fulfilled') {
    repertoiresData = results[2].value;
  } else {
    console.error('Error al cargar repertorios:', results[2].reason.message);
  }

  handleRoute();
}

document.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('hashchange', handleRoute);

// --- Botón volver arriba ---
const backToTop = document.getElementById('back-to-top');
const SCROLL_THRESHOLD = 400;
const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let scrollTicking = false;

function updateBackToTop() {
  const show = window.scrollY > SCROLL_THRESHOLD;
  if (show) {
    if (backToTop.hidden) {
      backToTop.hidden = false;
      // Fuerza un reflow para que la transición de entrada se ejecute
      void backToTop.offsetWidth;
      backToTop.classList.add('visible');
    }
  } else if (backToTop.classList.contains('visible')) {
    backToTop.classList.remove('visible');
    backToTop.hidden = true;
  }
}

function onScroll() {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(function () {
    updateBackToTop();
    scrollTicking = false;
  });
}

if (backToTop) {
  backToTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: reduceMotionQuery.matches ? 'instant' : 'smooth'
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  updateBackToTop();
}
