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
 * Inicializa la aplicación: carga los 3 archivos JSON y muestra confirmación.
 */
async function initApp() {
  const statusEl = document.getElementById('status');
  
  try {
    const events = await loadJSON('./data/events.json');
    console.log(`✅ events.json cargado — ${events.length} evento(s)`);
    
    const songs = await loadJSON('./data/songs.json');
    console.log(`✅ songs.json cargado — ${songs.length} canto(s)`);
    
    const repertoires = await loadJSON('./data/repertoires.json');
    console.log(`✅ repertoires.json cargado — ${repertoires.length} repertorio(s)`);
    
    if (statusEl) {
      statusEl.textContent = '✅ Datos cargados correctamente.';
      statusEl.className = 'status-message success';
    }
    
    console.log('🚀 Ministerio Renacer — esqueleto funcional listo');
  } catch (error) {
    console.error('❌ Error al cargar datos:', error.message);
    if (statusEl) {
      statusEl.textContent = `❌ Error: ${error.message}`;
      statusEl.className = 'status-message error';
    }
  }
}

document.addEventListener('DOMContentLoaded', initApp);
