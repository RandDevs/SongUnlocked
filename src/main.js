import './style.css'
import { store } from './store'
import { ui } from './ui'
import { Views } from './views'

// Helper for UI events
window.dispatchAppEvent = (name, detail) => {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

window.handleFormSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  if (data.capo && data.capo.trim() !== '') data.capo = parseInt(data.capo);
  else delete data.capo;

  // Gather Tags
  const tagBtns = document.querySelectorAll('.tag-select-btn');
  const selectedTags = [];
  tagBtns.forEach(btn => {
    // Logic fix: check for 'selected' class as updated in views.js
    if (btn.classList.contains('selected')) {
      selectedTags.push(btn.getAttribute('data-tag'));
    }
  });
  data.tags = selectedTags;

  window.dispatchAppEvent('save-song', data);
}

window.handleFormChange = (e) => {
  // Dynamic field visibility
  const instrumentSelect = document.getElementById('instrument-select');
  const statusSelect = document.getElementById('status-select');
  const capoField = document.getElementById('capo-field');
  const chordsField = document.getElementById('chords-field');

  if (e.target === instrumentSelect) {
    if (instrumentSelect.value === 'guitar' || instrumentSelect.value === 'ukulele') {
      capoField.style.display = 'block';
    } else {
      capoField.style.display = 'none';
    }
  }

  if (e.target === statusSelect) {
    if (statusSelect.value === 'mastered') {
      chordsField.style.display = 'block';
    } else {
      chordsField.style.display = 'none';
    }
  }
}

// Global Filter State
window.currentFilters = {
  query: '',
  capo: '',
  tag: ''
};

window.applyFilters = () => {
  const query = window.currentFilters.query.toLowerCase();
  const capo = window.currentFilters.capo;
  const tag = window.currentFilters.tag;

  document.querySelectorAll('.song-item').forEach(item => {
    const title = item.getAttribute('data-title');
    const artist = item.getAttribute('data-artist');
    const itemCapo = item.getAttribute('data-capo') || '0'; // Handle no capo as 0 or null
    // Tags stored in data attribute as comma separated string
    const itemTags = (item.getAttribute('data-tags') || '').split(',');

    let matches = true;

    // Search Match
    if (query && !title.includes(query) && !artist.includes(query)) matches = false;

    // Capo Match
    if (matches && capo !== '') {
      // Capo filter logic: "0" means no capo/null. Specific number means exact match.
      if (capo === '0') {
        if (itemCapo !== 'null' && itemCapo !== '' && itemCapo !== '0') matches = false;
      } else {
        if (itemCapo !== capo) matches = false;
      }
    }

    // Tag Match
    if (matches && tag !== '' && !itemTags.includes(tag)) matches = false;

    item.style.display = matches ? 'block' : 'none';
  });
}

window.handleSearch = (e) => {
  window.currentFilters.query = e.target.value;
  window.applyFilters();
}

window.handleFilterChange = (type, value, element) => {
  const isToggle = type === 'tag'; // Tags toggle, Capo just selects
  const filterKey = type;
  const btnClass = `${type}-filter-btn`;

  // Handle Logic
  if (isToggle && window.currentFilters[filterKey] === value) {
    window.currentFilters[filterKey] = ''; // Deselect
  } else {
    window.currentFilters[filterKey] = value;
  }

  // Handle Visuals
  document.querySelectorAll(`.${btnClass}`).forEach(btn => {
    const defaultClass = btn.getAttribute('data-default-class');
    const activeClass = btn.getAttribute('data-active-class');
    const btnValue = btn.getAttribute('data-value');

    // Check match
    if (window.currentFilters[filterKey] === btnValue) {
      btn.className = `${btnClass} whitespace-nowrap text-xs font-bold rounded-lg px-3 py-2 transition-colors active:scale-95 flex items-center justify-center gap-1.5 ${activeClass}`;
    } else {
      btn.className = `${btnClass} whitespace-nowrap text-xs font-bold rounded-lg px-3 py-2 transition-colors active:scale-95 flex items-center justify-center gap-1.5 ${defaultClass}`;
    }
  });

  window.applyFilters();
}

class App {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('navigate', (e) => this.route(e.detail.screen, e.detail.params));
    window.addEventListener('popstate', (e) => {
      if (e.state) {
        this.render(e.state.screen, e.state.params, false);
      } else {
        this.route('home', {}, false);
      }
    });

    window.addEventListener('save-song', (e) => {
      const songToSave = e.detail;
      if (songToSave.id) {
        store.updateSong(songToSave.id, songToSave);
      } else {
        store.addSong(songToSave);
      }
      window.history.back();
    });

    window.addEventListener('delete-song', (e) => {
      ui.showConfirmModal('Are you sure you want to delete this song? This action cannot be undone.', () => {
        store.deleteSong(e.detail.id);
        window.history.back();
      });
    });

    window.addEventListener('mark-mastered', (e) => {
      store.updateSong(e.detail.id, { status: 'mastered' });
      this.route('detail', { id: e.detail.id }, true);
    });

    window.addEventListener('random-song', (e) => {
      const instrument = e.detail.instrument || 'guitar';
      const songs = store.getSongs(instrument, 'mastered'); // Default to mastered?? Or all? User said "Pick Random Song". Probably all songs (pool + mastered) or just mastered? 
      // User said "Surprise me" feature, implied playing something. Usually you play mastered songs. 
      // But let's check store.getSongs. It takes (instrument, status). 
      // If we want ALL songs for an instrument, we might need to fetch both or update store to return all.
      // Let's stick to 'mastered' for now as that makes most sense for "Practice". 
      // Wait, "Songs to learn" also makes sense.
      // Let's fetch BOTH.
      const pool = store.getSongs(instrument, 'pool');
      const mastered = store.getSongs(instrument, 'mastered');
      const allSongs = [...pool, ...mastered];

      if (allSongs.length > 0) {
        const randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];
        this.route('detail', { id: randomSong.id });
      } else {
        alert(`No ${instrument} songs found! Add some first.`);
      }
    });

    this.route('home', {}, true);
  }

  route(screen, params = {}, replace = false) {
    if (!replace) {
      window.history.pushState({ screen, params }, '', '#' + screen);
    } else {
      window.history.replaceState({ screen, params }, '', '#' + screen);
    }
    this.render(screen, params);
  }

  render(screen, params) {
    switch (screen) {
      case 'home':
        const guitarStats = store.getStats('guitar');
        const ukuleleStats = store.getStats('ukulele');
        ui.render(Views.home, { guitarStats, ukuleleStats });
        break;
      case 'list':
        const songs = store.getSongs(params.instrument, params.status || 'pool');
        songs.sort((a, b) => b.createdAt - a.createdAt);
        ui.render(Views.list, { instrument: params.instrument, status: params.status, songs });
        break;
      case 'detail':
        const song = store.getSong(params.id);
        if (!song) {
          this.route('home', {}, true);
          return;
        }
        ui.render(Views.detail, { song });
        break;
      case 'form':
        const songToEdit = params.id ? store.getSong(params.id) : {};
        ui.render(Views.form, {
          song: songToEdit,
          instrument: params.instrument,
          status: params.status
        });
        break;
      default:
        ui.render(Views.home);
    }
  }
}

new App();
