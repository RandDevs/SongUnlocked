// Icons as SVG strings
const ICONS = {
    guitar: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto mb-2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-1.258-3.411l-7.794-2.227m0 0l-7.447-1.492a.75.75 0 00-.898.665v4.526a.75.75 0 00.75.75h1.968a.75.75 0 00.675-.414l.872-1.745.337-2.3z" /></svg>`,
    ukulele: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto mb-2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-1.258-3.411l-7.794-2.227m0 0l-7.447-1.492a.75.75 0 00-.898.665v4.526a.75.75 0 00.75.75h1.968a.75.75 0 00.675-.414l.872-1.745.337-2.3z" /></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`,
    chevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>`,
    home: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M11.47 3.84a.75.75 0 011.06 0l8.635 8.635a.75.75 0 11-1.06 1.06l-2.035-2.035V20.25a.75.75 0 01-.75.75H14.25a.75.75 0 01-.75-.75v-6h-3v6a.75.75 0 01-.75.75h-3.07a.75.75 0 01-.75-.75v-8.735l-2.035 2.035a.75.75 0 01-1.06-1.06l8.635-8.635z" /></svg>`,
    guitarNav: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M19.5 3h-3v18h3V3zM3 5h3v14H3V5zm4.5 0h3v14h-3V5zm4.5 0h3v14H12V5z" /></svg>`, // Simplified abstract strings
    ukuleleNav: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12 2a5 5 0 00-5 5v10a5 5 0 0010 0V7a5 5 0 00-5-5zm-1 13H9v-2h2v2zm0-4H9V9h2v2zm4 4h-2v-2h2v2zm0-4h-2V9h2v2z" /></svg>`, // Simplified ukulele shape
    check: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>`
};



const TAG_STYLES = {
    'Warm-up': { color: 'bg-orange-100/50 text-orange-700 border-orange-200', icon: '🔥' },
    'Chill': { color: 'bg-blue-100/50 text-blue-700 border-blue-200', icon: '🧊' },
    'Energetic': { color: 'bg-yellow-100/50 text-yellow-700 border-yellow-200', icon: '⚡' },
    'Campfire': { color: 'bg-stone-200/50 text-stone-700 border-stone-300', icon: '⛺' },
    'Fingerstyle': { color: 'bg-purple-100/50 text-purple-700 border-purple-200', icon: '🖐️' },
    'Sad Song': { color: 'bg-indigo-100/50 text-indigo-700 border-indigo-200', icon: '💧' },
    'Barre-Chord': { color: 'bg-red-100/50 text-red-700 border-red-200', icon: '💪' },
    'Love Song': { color: 'bg-pink-100/50 text-pink-700 border-pink-200', icon: '💖' },
    'default': { color: 'bg-stone-100 text-stone-600 border-stone-200', icon: '🏷️' }
};

// Helper for Bottom Navigation
const renderNavbar = (activeTab) => {
    const navItems = [
        { id: 'home', label: 'Home', icon: ICONS.home },
        { id: 'guitar', label: 'Guitar', icon: ICONS.guitarNav || ICONS.guitar },
        { id: 'ukulele', label: 'Ukulele', icon: ICONS.ukuleleNav || ICONS.ukulele }
    ];

    return `
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 flex justify-around items-center h-20 z-30 pb-2">
        ${navItems.map(item => {
        const isActive = activeTab === item.id;
        const colorClass = isActive ? 'text-emerald-700' : 'text-stone-400 hover:text-stone-600';
        const action = item.id === 'home'
            ? "window.dispatchAppEvent('navigate', {screen: 'home'})"
            : `window.dispatchAppEvent('navigate', {screen: 'list', params: {instrument: '${item.id}', status: 'mastered'}})`;

        return `
            <button onclick="${action}" class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${colorClass}">
                ${item.icon}
                <span class="text-[10px] font-bold tracking-wide">${item.label}</span>
            </button>
            `;
    }).join('')}
    </div>
    `;
};

export const Views = {
    home: ({ guitarStats, ukuleleStats }) => {
        return `
    <div class="p-6 pt-12 flex flex-col gap-6 max-w-md mx-auto">
      <div class="flex justify-between items-start mb-2">
        <div>
            <h2 class="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">Welcome Back to</h2>
            <h1 class="text-3xl font-bold text-stone-900 leading-none">SongUnlocked</h1>
            <p class="text-[10px] font-medium text-stone-400 mt-1">made by randevough</p>
        </div>
      </div>

      <div class="mb-2">
        <h2 class="text-3xl font-bold text-stone-800">Choose <br><span class="text-emerald-700">Instrument</span></h2>
      </div>
      
      <!-- Guitar Card -->
      <div class="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col relative group active:scale-[0.98] transition-all duration-300">
        <div class="h-32 bg-stone-200 relative">
            <img src="/guitar-bg.png" class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Guitar">
            <div class="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3 text-white">
                  <path fill-rule="evenodd" d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 00.438-.328V3.161c0-.214.072-.414.192-.587a.75.75 0 00-.32-.923c-.7-.442-1.432-.65-2.062-.65-2.344 0-4.085 2.56-4.598 6.471C10.74 3.791 9.006 1 6.649 1c-.818 0-1.57.34-2.148.913a.75.75 0 001.06 1.06c.328-.328.718-.515 1.088-.515 1.547 0 2.923 2.126 3.424 5.29H5.75a.75.75 0 00-.75.75v3.25a.75.75 0 00.75.75h4.63l.36 2.404a2.553 2.553 0 01-1.32 2.766 2.553 2.553 0 01-2.872-4.102.75.75 0 10-1.258.91A4.053 4.053 0 008.3 16.923a4.053 4.053 0 005.101-.63l.421-2.043h.428a1.5 1.5 0 011.006.39 4.053 4.053 0 102.73-5.207v-4.63c0-2.43.83-4.02 2.067-4.02.217 0 .42.048.601.12z" clip-rule="evenodd" />
                </svg>
                <span class="text-[10px] font-bold text-white uppercase tracking-wide">Most Used by You</span>
            </div>
        </div>
        <div class="p-5">
            <div class="flex justify-between items-center mb-1">
                <h2 class="text-2xl font-bold text-stone-800">Guitar</h2>
                <div class="bg-stone-100 p-2 rounded-full cursor-pointer hover:bg-emerald-50 transition-colors" onclick="window.dispatchAppEvent('navigate', {screen: 'list', params: {instrument: 'guitar', status: 'mastered'}})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-stone-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>
            </div>
            
            <div class="flex items-center gap-3 text-sm text-stone-500 mb-4">
                <span>${guitarStats.mastered} Mastered</span>
                <span class="w-1 h-1 bg-stone-300 rounded-full"></span>
                <span>${guitarStats.toLearn} Songs to learn</span>
            </div>
            
            <div class="relative h-1.5 bg-stone-100 rounded-full mb-2 overflow-hidden">
                 <div class="absolute top-0 left-0 h-full bg-emerald-600 rounded-full" style="width: ${guitarStats.progress}%"></div>
            </div>
            <div class="flex justify-between text-xs font-medium text-stone-400 mb-6">
                <span>Progress</span>
                <span class="text-emerald-700">${guitarStats.progress}%</span>
            </div>

            <button onclick="window.dispatchAppEvent('navigate', {screen: 'list', params: {instrument: 'guitar', status: 'mastered'}})" 
                class="w-full py-3.5 bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/20 active:scale-[0.98] transition-all hover:bg-emerald-800">
                Practice Guitar
            </button>
        </div>
      </div>

      <!-- Ukulele Card -->
      <div class="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col relative group active:scale-[0.98] transition-all duration-300">
        <div class="h-32 bg-stone-200 relative">
            <img src="/ukulele-bg.png" class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Ukulele">
        </div>
        <div class="p-5">
            <div class="flex justify-between items-center mb-1">
                <h2 class="text-2xl font-bold text-stone-800">Ukulele</h2>
                <div class="bg-stone-100 p-2 rounded-full cursor-pointer hover:bg-emerald-50 transition-colors" onclick="window.dispatchAppEvent('navigate', {screen: 'list', params: {instrument: 'ukulele', status: 'mastered'}})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-stone-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>
            </div>
            <div class="flex items-center gap-3 text-sm text-stone-500 mb-4">
                <span>${ukuleleStats.mastered} Mastered</span>
                <span class="w-1 h-1 bg-stone-300 rounded-full"></span>
                <span>${ukuleleStats.toLearn} Songs to learn</span>
            </div>
            
            <div class="relative h-1.5 bg-stone-100 rounded-full mb-2 overflow-hidden">
                 <div class="absolute top-0 left-0 h-full bg-emerald-600 rounded-full" style="width: ${ukuleleStats.progress}%"></div>
            </div>
            <div class="flex justify-between text-xs font-medium text-stone-400 mb-6">
                <span>Progress</span>
                <span class="text-emerald-700">${ukuleleStats.progress}%</span>
            </div>

            <button onclick="window.dispatchAppEvent('navigate', {screen: 'list', params: {instrument: 'ukulele', status: 'mastered'}})" 
                class="w-full py-3.5 bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/20 active:scale-[0.98] transition-all hover:bg-emerald-800">
                Practice Ukulele
            </button>
        </div>
      </div>
      
      <div class="h-8"></div>
      ${renderNavbar('home')}
    </div>
  `},

    list: ({ instrument, status = 'pool', songs }) => {
        // Consistent Theme
        const themeColor = 'text-emerald-600';
        const fabClass = 'bg-emerald-600';
        const tabActiveClass = 'bg-white text-emerald-900 shadow-sm ring-1 ring-emerald-900/5';
        const focusClass = 'focus:ring-emerald-500 focus:border-emerald-500';

        return `
    <div class="flex flex-col h-screen">
      <!-- Header -->
      <div class="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 space-y-4">
        <div class="flex items-center justify-between">
            <button onclick="window.dispatchAppEvent('navigate', {screen: 'home'})" class="p-2 -ml-2 text-stone-400 hover:text-stone-600">
                ${ICONS.chevronLeft}
            </button>
            <h1 class="text-xl font-bold capitalize text-stone-800">${instrument}</h1>
            
             <div class="bg-stone-100 p-2 rounded-full cursor-pointer hover:bg-emerald-50 transition-colors active:scale-95" title="Pick Random Song" onclick="window.dispatchAppEvent('random-song', {instrument: '${instrument}'})">
                <!-- Dice Icon -->
                <span class="text-xl">🎲</span>
            </div>
        </div>

        <!-- Tabs -->
        <div class="grid grid-cols-2 gap-2 mb-6 bg-stone-100 p-1.5 rounded-2xl">
            <button onclick="window.dispatchAppEvent('navigate', {screen: 'list', params: {instrument: '${instrument}', status: 'mastered'}})" 
                class="py-2.5 rounded-xl font-bold text-sm transition-all ${status === 'mastered' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}">
                Mastered
            </button>
            <button onclick="window.dispatchAppEvent('navigate', {screen: 'list', params: {instrument: '${instrument}', status: 'pool'}})" 
                class="py-2.5 rounded-xl font-bold text-sm transition-all ${status === 'pool' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}">
                To Learn
            </button>
        </div>

        <!-- Search & Filter -->
        <div class="space-y-3">
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    ${ICONS.search}
                </div>
                <input type="text" 
                       oninput="window.handleSearch(event)"
                       class="block w-full pl-10 pr-3 py-2 border border-stone-200 rounded-lg leading-5 bg-stone-50 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-1 ${focusClass} sm:text-sm transition-colors" 
                       placeholder="Search songs...">
            </div>
            
            <!-- Filters -->
            <div class="flex gap-2">
                <!-- Capo Filter (Reverted to Select) -->
                <div class="flex-none relative w-24">
                     <select onchange="window.handleFilterChange('capo', this.value)" 
                        style="-webkit-appearance: none; appearance: none;"
                        class="appearance-none w-full bg-white border border-stone-200 text-stone-600 text-xs font-bold rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:border-emerald-500 h-full">
                        <option value="">Capo</option>
                        <option value="0">No Capo</option>
                        ${[1, 2, 3, 4, 5, 6, 7].map(n => `<option value="${n}">${n}</option>`).join('')}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-500">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <!-- Tag Filters (Scrollable) -->
                <div class="flex-1 overflow-x-auto no-scrollbar flex gap-2 pb-1">
                    ${Object.keys(TAG_STYLES).filter(k => k !== 'default').map(tag => {
            const style = TAG_STYLES[tag];
            // Match card style exactly
            const activeColor = style.color;

            return `
                        <button onclick="window.handleFilterChange('tag', '${tag}', this)"
                                data-value="${tag}" 
                                class="tag-filter-btn whitespace-nowrap bg-white border border-stone-200 text-stone-600 text-xs font-bold rounded-lg px-3 py-2 transition-colors active:scale-95 flex items-center justify-center gap-1.5"
                                data-active-class="${activeColor}" 
                                data-default-class="bg-white text-stone-600 border-stone-200">
                            <span>${style.icon}</span>
                            <span>${tag}</span>
                        </button>
                        `;
        }).join('')}
                </div>
            </div>
        </div>
      </div>

      <!-- List -->
      <div id="song-list" class="flex-1 overflow-y-auto p-4 pb-48 space-y-3"> <!-- Increased bottom padding heavily for navbar + fab -->
        ${songs.length === 0 ? `
            <div class="text-center py-20 text-stone-400">
                <p>No songs yet.</p>
                <p class="text-sm">Tap + to add one.</p>
            </div>
        ` : songs.map(song => `
            <div onclick="window.dispatchAppEvent('navigate', {screen: 'detail', params: {id: '${song.id}'}})" 
                 class="song-item bg-white p-4 rounded-xl shadow-sm border border-stone-100 active:bg-stone-50 transition-colors cursor-pointer group"
                 data-title="${song.title.toLowerCase()}"
                 data-artist="${song.artist.toLowerCase()}"
                 data-capo="${song.capo || '0'}"
                 data-tags="${(song.tags || []).join(',')}">
                <div class="flex justify-between items-start">
                    <div class="flex-1 min-w-0 pr-2">
                        <h3 class="font-semibold text-stone-900 text-lg leading-tight mb-0.5 truncate group-hover:${themeColor} transition-colors">${song.title}</h3>
                        <p class="text-stone-500 text-sm mb-2 truncate">${song.artist}</p>
                        
                        ${song.tags && song.tags.length > 0 ? `
                        <div class="flex flex-wrap gap-1">
                            ${song.tags.map(tag => {
            const style = TAG_STYLES[tag] || TAG_STYLES.default;
            return `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold border ${style.color}">${tag}</span>`;
        }).join('')}
                        </div>
                        ` : ''}
                    </div>
                    
                    ${(song.capo !== undefined && song.capo !== null && song.capo !== '') ? `
                     <span class="flex-none text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-lg border ${song.capo == 0 ? 'bg-stone-100 text-stone-500 border-stone-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}">
                        ${song.capo == 0 ? 'No Capo' : `Capo ${song.capo}`}
                     </span>
                    ` : ''}
                </div>
            </div>
        `).join('')}
      </div>

      <!-- FAB (Moved up to avoid overlapping navbar) -->
      <button onclick="window.dispatchAppEvent('navigate', {screen: 'form', params: {instrument: '${instrument}', status: '${status}'}})" 
        class="fixed bottom-24 right-6 w-14 h-14 ${fabClass} text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20">
        ${ICONS.plus}
      </button>

      ${renderNavbar(instrument)}
    </div>
  `},

    detail: ({ song }) => {
        // Consistent Green Theme
        const themeColor = 'text-emerald-600';
        const bgTheme = 'bg-emerald-50';

        return `
    <div class="min-h-screen bg-white">
      <div class="flex justify-between items-center p-4 border-b border-stone-100 sticky top-0 bg-white z-10">
        <button onclick="window.history.back()" class="p-2 -ml-2 text-stone-500">
             ${ICONS.chevronLeft}
        </button>
        <div class="flex gap-2">
            <button onclick="window.dispatchAppEvent('delete-song', {id: '${song.id}'})" class="text-red-500 text-sm font-medium px-3 py-2">Delete</button>
            <button onclick="window.dispatchAppEvent('navigate', {screen: 'form', params: {id: '${song.id}'}})" class="text-emerald-700 text-sm font-bold bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors">Edit</button>
        </div>
      </div>

      <div class="p-6 space-y-6">
        <div>
            <span class="inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wide mb-2 ${bgTheme} ${themeColor}">
                ${song.instrument}
            </span>
            <h1 class="text-3xl font-bold text-stone-900 leading-tight mb-2">${song.title}</h1>
            <p class="text-xl text-stone-500">${song.artist}</p>
            
            ${song.tags && song.tags.length > 0 ? `
            <div class="flex flex-wrap gap-2 mt-3">
                ${song.tags.map(tag => {
            const style = TAG_STYLES[tag] || TAG_STYLES.default;
            return `<span class="px-3 py-1 ${style.color} border text-xs font-bold rounded-full flex items-center gap-1">${style.icon} ${tag}</span>`;
        }).join('')}
            </div>
            ` : ''}
        </div>

        ${song.capo ? `
        <div class="bg-stone-50 p-3 rounded-lg inline-flex items-center gap-2 border border-stone-100">
            <span class="text-xs font-bold text-stone-400 uppercase">Capo</span>
            <span class="font-bold text-stone-800">${song.capo}</span>
        </div>` : ''}

        <div class="h-px bg-stone-100 w-full my-4"></div>

        ${song.status === 'mastered' && song.chordProgression ? `
        <div>
            <h3 class="text-sm font-bold text-stone-400 uppercase mb-3">Chords</h3>
            <pre class="font-mono text-lg bg-stone-50 p-4 rounded-xl overflow-x-auto border border-stone-100 text-stone-800 whitespace-pre-wrap leading-relaxed">${song.chordProgression}</pre>
        </div>
        ` : ''}

        ${song.notes ? `
        <div>
            <h3 class="text-sm font-bold text-stone-400 uppercase mb-2">Notes</h3>
            <p class="text-stone-700 leading-relaxed whitespace-pre-line">${song.notes}</p>
        </div>
        ` : ''}

        <div class="h-12"></div>
        
        ${song.status === 'pool' ? `
        <button onclick="window.dispatchAppEvent('mark-mastered', {id: '${song.id}'})" class="w-full bg-stone-900 text-white font-bold py-4 rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2">
            ${ICONS.check} Mark as Mastered
        </button>
        ` : ''}
      </div>
    </div>
  `},

    form: ({ song = {}, instrument, status }) => {
        const isEdit = !!song.id;
        const initialInstrument = song.instrument || instrument || 'guitar';
        const initialStatus = song.status || status || 'pool';

        const showCapo = initialInstrument === 'guitar' || initialInstrument === 'ukulele';
        const showChords = initialStatus === 'mastered';

        // Consistent green theme for all forms
        const headerColor = 'bg-emerald-600 shadow-md transform transition-all';

        return `
    <div class="min-h-screen bg-stone-50 flex flex-col pb-24">
      <div class="${headerColor} px-6 py-4 flex justify-center items-center sticky top-0 z-10 w-full">
        <h1 class="font-bold text-lg text-white tracking-wide">${isEdit ? 'Edit Song' : 'New Song'}</h1>
      </div>

      <form id="song-form" onsubmit="window.handleFormSubmit(event)" class="px-6 pt-6 space-y-6 flex-1 overflow-y-auto">
        <input type="hidden" name="id" value="${song.id || ''}">
        
        <div class="space-y-1">
            <label class="block text-xs font-bold text-stone-400 uppercase">Title</label>
            <input type="text" name="title" value="${song.title || ''}" required 
                class="w-full bg-white border border-stone-200 rounded-lg p-3 text-lg font-semibold focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-stone-300" placeholder="Song Title">
        </div>

        <div class="space-y-1">
            <label class="block text-xs font-bold text-stone-400 uppercase">Artist</label>
            <input type="text" name="artist" value="${song.artist || ''}" required 
                class="w-full bg-white border border-stone-200 rounded-lg p-3 text-base focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-stone-300" placeholder="Artist Name">
        </div>

        <div class="grid grid-cols-2 gap-4">
            <!-- Instrument Segmented Control -->
            <div class="space-y-1">
                <label class="block text-xs font-bold text-stone-400 uppercase">Instrument</label>
                <div class="flex bg-stone-100 p-1 rounded-xl">
                    <button type="button" onclick="this.parentElement.querySelectorAll('button').forEach(b => b.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-stone-500 transition-all'); this.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-stone-900 shadow-sm transition-all'; document.getElementById('instrument-input').value = 'guitar'; document.getElementById('instrument-input').dispatchEvent(new Event('change', {bubbles: true}));" 
                        class="flex-1 py-2 rounded-lg text-sm font-bold ${initialInstrument === 'guitar' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'} transition-all">
                        Guitar
                    </button>
                    <button type="button" onclick="this.parentElement.querySelectorAll('button').forEach(b => b.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-stone-500 transition-all'); this.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-stone-900 shadow-sm transition-all'; document.getElementById('instrument-input').value = 'ukulele'; document.getElementById('instrument-input').dispatchEvent(new Event('change', {bubbles: true}));" 
                        class="flex-1 py-2 rounded-lg text-sm font-bold ${initialInstrument === 'ukulele' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'} transition-all">
                        Ukulele
                    </button>
                </div>
                <input type="hidden" name="instrument" id="instrument-input" value="${initialInstrument}" onchange="window.handleFormChange(event)">
            </div>
            
            <!-- Status Segmented Control -->
            <div class="space-y-1">
                <label class="block text-xs font-bold text-stone-400 uppercase">Status</label>
                <div class="flex bg-stone-100 p-1 rounded-xl">
                    <button type="button" onclick="this.parentElement.querySelectorAll('button').forEach(b => b.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-stone-500 transition-all'); this.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-stone-900 shadow-sm transition-all'; document.getElementById('status-input').value = 'pool'; document.getElementById('status-input').dispatchEvent(new Event('change', {bubbles: true}));" 
                        class="flex-1 py-2 rounded-lg text-sm font-bold ${initialStatus === 'pool' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'} transition-all">
                        To Learn
                    </button>
                    <button type="button" onclick="this.parentElement.querySelectorAll('button').forEach(b => b.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-stone-500 transition-all'); this.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-stone-900 shadow-sm transition-all'; document.getElementById('status-input').value = 'mastered'; document.getElementById('status-input').dispatchEvent(new Event('change', {bubbles: true}));" 
                        class="flex-1 py-2 rounded-lg text-sm font-bold ${initialStatus === 'mastered' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'} transition-all">
                        Mastered
                    </button>
                </div>
                 <input type="hidden" name="status" id="status-input" value="${initialStatus}" onchange="window.handleFormChange(event)">
            </div>
        </div>

        <div id="capo-field" class="space-y-1" style="display: ${showCapo ? 'block' : 'none'}">
            <label class="block text-xs font-bold text-stone-400 uppercase">Capo</label>
            <input type="number" name="capo" value="${song.capo !== undefined && song.capo !== null ? song.capo : ''}" 
                class="w-full bg-white border border-stone-200 rounded-lg p-3 text-base focus:outline-none focus:border-emerald-500" placeholder="e.g. 2 (Leave empty for No Capo)">
        </div>

        <div id="chords-field" class="space-y-1" style="display: ${showChords ? 'block' : 'none'}">
            <label class="block text-xs font-bold text-stone-400 uppercase">Chords</label>
            <textarea name="chordProgression" rows="4" 
                class="w-full bg-white border border-stone-200 rounded-lg p-3 font-mono text-sm focus:outline-none focus:border-emerald-500 placeholder-stone-300" 
                placeholder="Em  G  D  A7">${song.chordProgression || ''}</textarea>
        </div>

        <div class="space-y-2">
            <label class="block text-xs font-bold text-stone-400 uppercase">Tags / Mood</label>
            <div class="flex flex-wrap gap-2" id="tags-container">
                ${Object.keys(TAG_STYLES).filter(k => k !== 'default').map(tag => {
            const isSelected = (song.tags || []).includes(tag);
            const style = TAG_STYLES[tag];
            // Match card style exactly
            const activeColor = style.color;

            const defaultClass = 'bg-white text-stone-600 border-stone-200 hover:border-emerald-500';

            return `
                    <button type="button" 
                        onclick="this.classList.toggle('selected');
                                 if(this.classList.contains('selected')) {
                                     this.className = 'tag-select-btn px-4 py-2 rounded-full border text-sm font-bold transition-all active:scale-95 flex items-center gap-2 selected ${activeColor}';
                                 } else {
                                     this.className = 'tag-select-btn px-4 py-2 rounded-full border text-sm font-medium transition-all active:scale-95 flex items-center gap-2 ${defaultClass}';
                                 }"
                        data-tag="${tag}"
                        data-selected-class="${activeColor}"
                        data-default-class="${defaultClass}"
                        class="tag-select-btn px-4 py-2 rounded-full border text-sm font-medium transition-all active:scale-95 flex items-center gap-2 ${isSelected ? `selected ${activeColor} font-bold` : defaultClass}">
                        <span>${style.icon}</span>    
                        <span>${tag}</span>
                    </button>
                    `;
        }).join('')}
            </div>
            <!-- Hidden input to store tags for form submission -->
            <input type="hidden" name="tags" id="tags-input" value="${(song.tags || []).join(',')}">
        </div>

        <div class="space-y-1">
            <label class="block text-xs font-bold text-stone-400 uppercase">Notes</label>
            <textarea name="notes" rows="4" 
                class="w-full bg-white border border-stone-200 rounded-lg p-3 text-base focus:outline-none focus:border-emerald-500 placeholder-stone-300" 
                placeholder="Strumming patterns, lyrics, etc.">${song.notes || ''}</textarea>
        </div>
        <div class="h-6"></div>
      </form>

      <!-- Fixed Bottom Action Bar -->
      <div class="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-stone-100 flex gap-4 z-20 pb-8">
        <button onclick="window.history.back()" class="flex-1 py-4 font-bold text-stone-600 bg-stone-100 rounded-xl active:scale-95 transition-all">
            Cancel
        </button>
        <button form="song-form" type="submit" class="flex-1 py-4 font-bold text-white bg-emerald-600 rounded-xl shadow-lg shadow-emerald-600/20 active:scale-95 transition-all">
            Save Song
        </button>
      </div>
    </div>
  `}
}
