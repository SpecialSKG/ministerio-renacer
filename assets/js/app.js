/**
 * Ministerio Renacer — App principal
 * Hash routing, carga de datos, renderizado de vistas,
 * sistema de tema claro/oscuro y calendario navegable.
 */

'use strict';

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
let eventsLoadError = false;

// --- Tema ---
const THEME_KEY = 'mr-theme';

// --- Calendario ---
const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MONTHS_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

const calendarState = {
  viewYear: null,
  viewMonth: null, // 0-11
  selectedKey: null
};
const eventsByDate = new Map();

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
  if (Number.isNaN(date.getTime())) return dateStr;
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

function pad2(n) {
  return String(n).padStart(2, '0');
}

function dateParts(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  if (Number.isNaN(d.getTime())) return null;
  return { day: d.getDate(), mon: MONTHS_SHORT[d.getMonth()] };
}

function dateKey(y, m, d) {
  return `${y}-${pad2(m + 1)}-${pad2(d)}`;
}

function todayKey() {
  const now = new Date();
  return dateKey(now.getFullYear(), now.getMonth(), now.getDate());
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

  // Scroll a la sección respetando prefers-reduced-motion
  setTimeout(function () {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({
        behavior: reduceMotionQuery.matches ? 'auto' : 'smooth',
        block: 'start'
      });
    }
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
      <div class="section-head"><h1 class="section-title">Todos los eventos</h1></div>\
      <div class="events-list">' + published.map(function (e) { return eventCardHTML(e, 'h2'); }).join('') + '</div>\
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
        <header class="detail-head">\
          <p class="section-eyebrow">Evento</p>\
          <h1 class="section-title detail-title">' + escapeHTML(evt.title) + '</h1>\
          <span class="event-type-badge">' + escapeHTML(typeLabel(evt.type)) + '</span>\
        </header>\
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
        (evt.description ? '<div class="event-detail-block"><h2 class="block-title">Descripción</h2><p>' + escapeHTML(evt.description) + '</p></div>' : '') +
        repertoireBlockHTML(evt) + '\
        <div class="back-link"><a href="#/eventos">← Volver a eventos</a></div>\
      </div>\
    </section>';
}

// --- Repertorio: bloque dentro del detalle de evento ---
function repertoireBlockHTML(evt) {
  var heading = '<h2 class="block-title">Repertorio</h2>';

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

// --- Renderizado de cards (fila: fecha + contenido + flecha) ---
function eventCardHTML(event, headingTag) {
  // En la landing el título de sección es h2 y las cards son h3; en la lista
  // dinámica la página es h1, así que las cards suben a h2 (sin saltos de nivel).
  var titleTag = headingTag === 'h2' ? 'h2' : 'h3';
  var parts = dateParts(event.date);
  var day = parts ? parts.day : '—';
  var mon = parts ? parts.mon : '';
  var description = event.description
    ? '<p>' + escapeHTML(event.description) + '</p>'
    : '';

  return '\
    <a href="#/evento/' + escapeHTML(event.id) + '" class="event-card-link">\
      <article class="event-card">\
        <span class="event-date" aria-hidden="true">\
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>\
          <span class="d-num">' + escapeHTML(day) + '</span>\
          <span class="d-mon">' + escapeHTML(mon) + '</span>\
        </span>\
        <div class="event-body">\
          <p class="visually-hidden">' + escapeHTML(formatDate(event.date)) + '</p>\
          <span class="event-type">' + escapeHTML(typeLabel(event.type)) + '</span>\
          <' + titleTag + '>' + escapeHTML(event.title) + '</' + titleTag + '>' + description + '\
          <div class="event-meta">\
            <span>\
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>\
              ' + escapeHTML(event.time) + ' hs\
            </span>\
            <span>\
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>\
              ' + escapeHTML(event.place) + '\
            </span>\
          </div>\
        </div>\
        <svg class="event-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>\
      </article>\
    </a>';
}

// --- Landing events (para sección "Próximos eventos") ---
function renderUpcomingEvents(events) {
  var container = document.getElementById('events-container');
  var empty = document.getElementById('events-empty');
  if (!container) return;

  container.setAttribute('aria-busy', 'false');

  var upcoming = events
    .filter(function (e) { return e.status === 'published'; })
    .sort(function (a, b) { return a.date.localeCompare(b.date); })
    .slice(0, 3);

  if (upcoming.length === 0) {
    container.innerHTML = '';
    if (empty) {
      empty.innerHTML = '<h3>Sin eventos próximos</h3>' +
        '<p>No hay eventos publicados por ahora.</p>' +
        '<div class="back-link"><a href="#/eventos">← Ver todos los eventos</a></div>';
      empty.classList.remove('hidden');
    }
    return;
  }

  if (empty) empty.classList.add('hidden');
  container.innerHTML = upcoming.map(function (e) { return eventCardHTML(e); }).join('');
}

function showEventsError() {
  var container = document.getElementById('events-container');
  var empty = document.getElementById('events-empty');
  if (container) {
    container.innerHTML = '';
    container.setAttribute('aria-busy', 'false');
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
      <div class="section-head"><h1 class="section-title">Biblioteca de cantos</h1></div>\
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
        <h2>' + escapeHTML(song.title) + '</h2>\
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
    ? '<div class="song-detail-card"><h2 class="block-title">Etiquetas</h2><div class="song-tags">' +
      song.tags.map(function (tag) { return '<span class="tag">' + escapeHTML(tag) + '</span>'; }).join('') +
      '</div></div>'
    : '';

  var notesHTML = song.notes
    ? '<div class="song-detail-card"><h2 class="block-title">Notas</h2><p>' + escapeHTML(song.notes) + '</p></div>'
    : '';

  dynamic.innerHTML = '\
    <section class="section">\
      <div class="song-detail">\
        <header class="detail-head">\
          <p class="section-eyebrow">Canto</p>\
          <h1 class="section-title detail-title">' + escapeHTML(song.title) + '</h1>\
          <span class="event-type-badge">' + escapeHTML(categoryLabel(song.category)) + '</span>\
        </header>\
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
          <h2 class="block-title">Letra</h2>\
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

  var itemCount = (rep.items && rep.items.length) ? rep.items.length : 0;
  var countLabel = itemCount === 1 ? '1 canto' : itemCount + ' cantos';

  dynamic.innerHTML = '\
    <section class="section">\
      <div class="song-detail">\
        <header class="detail-head">\
          <p class="section-eyebrow">Repertorio</p>\
          <h1 class="section-title detail-title">' + escapeHTML(rep.title) + '</h1>\
          <span class="event-type-badge">' + countLabel + '</span>\
        </header>' +
        (eventLink ? '<div class="song-detail-card">' + eventLink + '</div>' : '') + '\
        <div class="song-detail-card">\
          <h2 class="block-title">Cantos del repertorio</h2>' +
          repertoireItemsHTML(rep) + '\
        </div>\
        <div class="back-link"><a href="' + backHref + '">' + backLabel + '</a></div>\
      </div>\
    </section>';
}

// ============================================================
// Sistema de tema claro/oscuro
// ============================================================
function currentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const sync = function () {
    const dark = currentTheme() === 'dark';
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#050B20' : '#F7F1E6');
  };

  btn.addEventListener('click', function () {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* almacenamiento no disponible */ }
    sync();
  });

  sync();
}

// ============================================================
// Navegación móvil
// ============================================================
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const header = document.querySelector('.site-header');
  if (!toggle || !header) return;

  toggle.addEventListener('click', function () {
    const open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  });

  header.querySelectorAll('.nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú de navegación');
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

// ============================================================
// Calendario navegable
// ============================================================
function buildEventsIndex() {
  eventsByDate.clear();
  var list = eventsData || [];
  list.forEach(function (evt) {
    if (evt && evt.date) {
      if (!eventsByDate.has(evt.date)) eventsByDate.set(evt.date, []);
      eventsByDate.get(evt.date).push(evt);
    }
  });
}

function eventsOnDate(key) {
  return eventsByDate.get(key) || [];
}

function initCalendar() {
  const now = new Date();
  calendarState.viewYear = now.getFullYear();
  calendarState.viewMonth = now.getMonth();
  calendarState.selectedKey = null;

  const prev = document.getElementById('cal-prev');
  const next = document.getElementById('cal-next');
  if (prev) prev.addEventListener('click', function () { shiftMonth(-1); });
  if (next) next.addEventListener('click', function () { shiftMonth(1); });

  renderCalendar();
}

function shiftMonth(delta) {
  const d = new Date(calendarState.viewYear, calendarState.viewMonth + delta, 1);
  calendarState.viewYear = d.getFullYear();
  calendarState.viewMonth = d.getMonth();
  calendarState.selectedKey = null;
  renderCalendar();
}

function monthTitle() {
  const d = new Date(calendarState.viewYear, calendarState.viewMonth, 1);
  return d.toLocaleDateString('es', { month: 'long', year: 'numeric' });
}

function renderCalendar() {
  const grid = document.getElementById('cal-grid');
  const title = document.getElementById('cal-title');
  if (!grid) return;

  title.textContent = monthTitle().replace(/^\w/, function (c) { return c.toUpperCase(); });

  // El contenedor es un grupo accesible; su nombre describe el mes visible.
  grid.setAttribute('aria-label', 'Calendario de ' + monthTitle());

  const year = calendarState.viewYear;
  const month = calendarState.viewMonth;
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // lunes = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const tKey = todayKey();

  // Encabezados de día: decorativos en pantalla; cada día con evento
  // expone su propio aria-label completo.
  let html = WEEKDAYS.map(function (w) {
    return '<span class="cal-dow" aria-hidden="true">' + w + '</span>';
  }).join('');

  for (let i = 0; i < firstDow; i++) {
    html += '<span class="cal-blank" aria-hidden="true"></span>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const key = dateKey(year, month, day);
    const dayEvents = eventsOnDate(key);
    const has = dayEvents.length > 0;
    const classes = ['cal-day'];
    if (has) classes.push('has-events');
    if (key === tKey) classes.push('is-today');
    if (key === calendarState.selectedKey) classes.push('is-selected');

    if (has) {
      const label = day + ' de ' + monthTitle() + ' — ' + dayEvents.map(function (e) { return e.title; }).join(', ');
      html += '<button type="button" class="' + classes.join(' ') + '" data-date="' + key + '" aria-label="' + escapeHTML(label) + '">' +
        day + '<span class="dot" aria-hidden="true"></span></button>';
    } else {
      html += '<span class="' + classes.join(' ') + '" aria-hidden="true">' + day + '</span>';
    }
  }

  grid.innerHTML = html;

  grid.querySelectorAll('button.cal-day').forEach(function (btn) {
    btn.addEventListener('click', function () {
      calendarState.selectedKey = btn.dataset.date;
      // renderCalendar() ya refresca el panel de detalle al final.
      renderCalendar();
    });
  });

  renderDetail();
}

function renderDetail() {
  const detail = document.getElementById('cal-detail');
  if (!detail) return;

  if (eventsLoadError) {
    detail.innerHTML = '<p class="detail-hint">No se pudieron cargar los eventos del calendario. Verificá los archivos de datos.</p>';
    return;
  }

  const key = calendarState.selectedKey;

  if (key) {
    const evts = eventsOnDate(key);
    const dayName = new Date(key + 'T12:00:00').toLocaleDateString('es', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    detail.innerHTML = '\
      <p class="section-eyebrow" style="margin-bottom:10px">' + escapeHTML(dayName) + '</p>\
      <ul class="detail-list">' +
        evts.map(function (e) {
          return '\
            <li class="detail-item">\
              <strong>' + escapeHTML(e.title) + '</strong>\
              <span class="event-type">' + escapeHTML(typeLabel(e.type)) + '</span>\
              <div class="detail-meta">\
                <span>\
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>\
                  ' + escapeHTML(e.time) + ' hs\
                </span>\
                <span>\
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>\
                  ' + escapeHTML(e.place) + '\
                </span>\
              </div>\
            </li>';
        }).join('') +
      '</ul>';
    return;
  }

  var monthEvents = [];
  eventsByDate.forEach(function (list, k) {
    if (k.startsWith(calendarState.viewYear + '-' + pad2(calendarState.viewMonth + 1))) {
      monthEvents = monthEvents.concat(list);
    }
  });

  if (monthEvents.length === 0) {
    detail.innerHTML = '<p class="detail-hint">No hay eventos en ' + escapeHTML(monthTitle()) +
      '. Navegá a otro mes para ver ensayos, eucaristías y talleres.</p>';
    return;
  }

  monthEvents.sort(function (a, b) { return a.date.localeCompare(b.date); });
  detail.innerHTML = '\
    <p class="section-eyebrow" style="margin-bottom:10px">Eventos de ' + escapeHTML(monthTitle()) + '</p>\
    <ul class="detail-list">' +
      monthEvents.map(function (e) {
        return '\
          <li class="detail-item">\
            <strong>' + escapeHTML(formatDate(e.date)) + ' · ' + escapeHTML(e.title) + '</strong>\
            <div class="detail-meta">\
              <span>' + escapeHTML(e.time) + ' hs</span>\
              <span>' + escapeHTML(e.place) + '</span>\
            </div>\
          </li>';
      }).join('') +
    '</ul>';
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
    eventsLoadError = false;
    renderUpcomingEvents(eventsData);
  } else {
    eventsLoadError = true;
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

  buildEventsIndex();
  initCalendar();
  handleRoute();
}

document.addEventListener('DOMContentLoaded', function () {
  initThemeToggle();
  initNav();
  initApp();
});
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
