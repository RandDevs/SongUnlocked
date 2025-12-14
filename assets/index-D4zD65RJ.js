(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const E="modulepreload",S=function(t,e){return new URL(t,e).href},y={},A=function(e,s,o){let n=Promise.resolve();if(s&&s.length>0){let u=function(c){return Promise.all(c.map(r=>Promise.resolve(r).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const l=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),d=i?.nonce||i?.getAttribute("nonce");n=u(s.map(c=>{if(c=S(c,o),c in y)return;y[c]=!0;const r=c.endsWith(".css"),h=r?'[rel="stylesheet"]':"";if(o)for(let w=l.length-1;w>=0;w--){const x=l[w];if(x.href===c&&(!r||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${h}`))return;const p=document.createElement("link");if(p.rel=r?"stylesheet":E,r||(p.as="script"),p.crossOrigin="",p.href=c,d&&p.setAttribute("nonce",d),document.head.appendChild(p),r)return new Promise((w,x)=>{p.addEventListener("load",w),p.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${c}`)))})}))}function a(l){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=l,window.dispatchEvent(i),!i.defaultPrevented)throw l}return n.then(l=>{for(const i of l||[])i.status==="rejected"&&a(i.reason);return e().catch(a)})};function C(t={}){const{immediate:e=!1,onNeedRefresh:s,onOfflineReady:o,onRegistered:n,onRegisteredSW:a,onRegisterError:l}=t;let i,d;const u=async(r=!0)=>{await d};async function c(){if("serviceWorker"in navigator){if(i=await A(async()=>{const{Workbox:r}=await import("./workbox-window.prod.es5-BIl4cyR9.js");return{Workbox:r}},[],import.meta.url).then(({Workbox:r})=>new r("./sw.js",{scope:"./",type:"classic"})).catch(r=>{l?.(r)}),!i)return;i.addEventListener("activated",r=>{(r.isUpdate||r.isExternal)&&window.location.reload()}),i.addEventListener("installed",r=>{r.isUpdate||o?.()}),i.register({immediate:e}).then(r=>{a?a("./sw.js",r):n?.(r)}).catch(r=>{l?.(r)})}}return d=c(),u}const k="song_mastery_data";class L{constructor(){this.songs=this._load()}_load(){try{const e=localStorage.getItem(k);return e?JSON.parse(e):[]}catch(e){return console.error("Failed to load data",e),[]}}_save(){try{localStorage.setItem(k,JSON.stringify(this.songs))}catch(e){console.error("Failed to save data",e)}}getAllSongs(){return this.songs}getSongs(e,s){return this.songs.filter(o=>o.instrument===e&&o.status===s)}getSong(e){return this.songs.find(s=>s.id===e)}addSong(e){return e.id||(e.id=crypto.randomUUID()),e.createdAt=Date.now(),this.songs.push(e),this._save(),e}updateSong(e,s){const o=this.songs.findIndex(n=>n.id===e);return o!==-1?(this.songs[o]={...this.songs[o],...s},this._save(),this.songs[o]):null}deleteSong(e){const s=this.songs.findIndex(o=>o.id===e);return s!==-1?(this.songs.splice(s,1),this._save(),!0):!1}getStats(e){const s=this.songs.filter(i=>i.instrument===e),o=s.length,n=s.filter(i=>i.status==="mastered").length,a=o-n,l=o===0?0:Math.round(n/o*100);return{total:o,mastered:n,toLearn:a,progress:l}}}const m=new L;class j{constructor(){this.app=document.getElementById("app"),this.currentView=null,this.root=document.createElement("div"),this.root.className="max-w-md mx-auto min-h-screen bg-stone-50 pb-24",this.app.appendChild(this.root)}render(e,s={}){this.root.innerHTML=e(s),this.bindEvents(),window.scrollTo(0,0)}bindEvents(){}navigateTo(e,s={}){window.dispatchEvent(new CustomEvent("navigate",{detail:{screen:e,params:s}}))}showConfirmModal(e,s){let o=document.getElementById("app-modal");o||(o=document.createElement("div"),o.id="app-modal",o.className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 hidden opacity-0 transition-opacity duration-200",document.body.appendChild(o)),o.innerHTML=`
            <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm transform scale-95 transition-transform duration-200">
                <h3 class="text-lg font-bold text-stone-900 mb-2">Confirm Action</h3>
                <p class="text-stone-600 mb-6 leading-relaxed">${e}</p>
                <div class="flex gap-3">
                    <button id="modal-cancel" class="flex-1 py-3 text-stone-600 font-bold bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors">Cancel</button>
                    <button id="modal-confirm" class="flex-1 py-3 text-white font-bold bg-red-500 rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">Delete</button>
                </div>
            </div>
        `,o.classList.remove("hidden"),requestAnimationFrame(()=>{o.classList.remove("opacity-0"),o.querySelector("div").classList.remove("scale-95"),o.querySelector("div").classList.add("scale-100")});const n=()=>{o.classList.add("opacity-0"),o.querySelector("div").classList.remove("scale-100"),o.querySelector("div").classList.add("scale-95"),setTimeout(()=>o.classList.add("hidden"),200)};document.getElementById("modal-cancel").onclick=n,document.getElementById("modal-confirm").onclick=()=>{s(),n()}}}const v=new j,f={plus:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>',chevronLeft:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>',home:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M11.47 3.84a.75.75 0 011.06 0l8.635 8.635a.75.75 0 11-1.06 1.06l-2.035-2.035V20.25a.75.75 0 01-.75.75H14.25a.75.75 0 01-.75-.75v-6h-3v6a.75.75 0 01-.75.75h-3.07a.75.75 0 01-.75-.75v-8.735l-2.035 2.035a.75.75 0 01-1.06-1.06l8.635-8.635z" /></svg>',guitarNav:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M19.5 3h-3v18h3V3zM3 5h3v14H3V5zm4.5 0h3v14h-3V5zm4.5 0h3v14H12V5z" /></svg>',ukuleleNav:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12 2a5 5 0 00-5 5v10a5 5 0 0010 0V7a5 5 0 00-5-5zm-1 13H9v-2h2v2zm0-4H9V9h2v2zm4 4h-2v-2h2v2zm0-4h-2V9h2v2z" /></svg>',check:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>',search:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>'},g={"Warm-up":{color:"bg-orange-100/50 text-orange-700 border-orange-200",icon:"🔥"},Chill:{color:"bg-blue-100/50 text-blue-700 border-blue-200",icon:"🧊"},Energetic:{color:"bg-yellow-100/50 text-yellow-700 border-yellow-200",icon:"⚡"},Campfire:{color:"bg-stone-200/50 text-stone-700 border-stone-300",icon:"⛺"},Fingerstyle:{color:"bg-purple-100/50 text-purple-700 border-purple-200",icon:"🖐️"},"Sad Song":{color:"bg-indigo-100/50 text-indigo-700 border-indigo-200",icon:"💧"},"Barre-Chord":{color:"bg-red-100/50 text-red-700 border-red-200",icon:"💪"},"Love Song":{color:"bg-pink-100/50 text-pink-700 border-pink-200",icon:"💖"},default:{color:"bg-stone-100 text-stone-600 border-stone-200",icon:"🏷️"}},$=t=>`
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 flex justify-around items-center h-20 z-30 pb-2">
        ${[{id:"home",label:"Home",icon:f.home},{id:"guitar",label:"Guitar",icon:f.guitarNav},{id:"ukulele",label:"Ukulele",icon:f.ukuleleNav}].map(s=>{const n=t===s.id?"text-emerald-700":"text-stone-400 hover:text-stone-600";return`
            <button onclick="${s.id==="home"?"window.dispatchAppEvent('navigate', {screen: 'home'})":`window.dispatchAppEvent('navigate', {screen: 'list', params: {instrument: '${s.id}', status: 'mastered'}})`}" class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${n}">
                ${s.icon}
                <span class="text-[10px] font-bold tracking-wide">${s.label}</span>
            </button>
            `}).join("")}
    </div>
    `,b={home:({guitarStats:t,ukuleleStats:e})=>`
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
            <img src="./guitar-bg.png" class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Guitar">
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
                <span>${t.mastered} Mastered</span>
                <span class="w-1 h-1 bg-stone-300 rounded-full"></span>
                <span>${t.toLearn} Songs to learn</span>
            </div>
            
            <div class="relative h-1.5 bg-stone-100 rounded-full mb-2 overflow-hidden">
                 <div class="absolute top-0 left-0 h-full bg-emerald-600 rounded-full" style="width: ${t.progress}%"></div>
            </div>
            <div class="flex justify-between text-xs font-medium text-stone-400 mb-6">
                <span>Progress</span>
                <span class="text-emerald-700">${t.progress}%</span>
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
            <img src="./ukulele-bg.png" class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Ukulele">
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
                <span>${e.mastered} Mastered</span>
                <span class="w-1 h-1 bg-stone-300 rounded-full"></span>
                <span>${e.toLearn} Songs to learn</span>
            </div>
            
            <div class="relative h-1.5 bg-stone-100 rounded-full mb-2 overflow-hidden">
                 <div class="absolute top-0 left-0 h-full bg-emerald-600 rounded-full" style="width: ${e.progress}%"></div>
            </div>
            <div class="flex justify-between text-xs font-medium text-stone-400 mb-6">
                <span>Progress</span>
                <span class="text-emerald-700">${e.progress}%</span>
            </div>

            <button onclick="window.dispatchAppEvent('navigate', {screen: 'list', params: {instrument: 'ukulele', status: 'mastered'}})" 
                class="w-full py-3.5 bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/20 active:scale-[0.98] transition-all hover:bg-emerald-800">
                Practice Ukulele
            </button>
        </div>
      </div>
      
      <div class="h-8"></div>
      ${$("home")}
    </div>
  `,list:({instrument:t,status:e="pool",songs:s})=>{const o="text-emerald-600";return`
    <div class="flex flex-col h-screen">
      <!-- Header -->
      <div class="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 space-y-4">
        <div class="flex items-center justify-between">
            <button onclick="window.dispatchAppEvent('navigate', {screen: 'home'})" class="p-2 -ml-2 text-stone-400 hover:text-stone-600">
                ${f.chevronLeft}
            </button>
            <h1 class="text-xl font-bold capitalize text-stone-800">${t}</h1>
            
             <div class="bg-stone-100 p-2 rounded-full cursor-pointer hover:bg-emerald-50 transition-colors active:scale-95" title="Pick Random Song" onclick="window.dispatchAppEvent('random-song', {instrument: '${t}'})">
                <!-- Dice Icon -->
                <span class="text-xl">🎲</span>
            </div>
        </div>

        <!-- Tabs -->
        <div class="grid grid-cols-2 gap-2 mb-6 bg-stone-100 p-1.5 rounded-2xl">
            <button onclick="window.dispatchAppEvent('navigate', {screen: 'list', params: {instrument: '${t}', status: 'mastered'}})" 
                class="py-2.5 rounded-xl font-bold text-sm transition-all ${e==="mastered"?"bg-white text-stone-900 shadow-sm":"text-stone-500 hover:text-stone-700"}">
                Mastered
            </button>
            <button onclick="window.dispatchAppEvent('navigate', {screen: 'list', params: {instrument: '${t}', status: 'pool'}})" 
                class="py-2.5 rounded-xl font-bold text-sm transition-all ${e==="pool"?"bg-white text-stone-900 shadow-sm":"text-stone-500 hover:text-stone-700"}">
                To Learn
            </button>
        </div>

        <!-- Search & Filter -->
        <div class="space-y-3">
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    ${f.search}
                </div>
                <input type="text" 
                       oninput="window.handleSearch(event)"
                       class="block w-full pl-10 pr-3 py-2 border border-stone-200 rounded-lg leading-5 bg-stone-50 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors" 
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
                        ${[1,2,3,4,5,6,7].map(l=>`<option value="${l}">${l}</option>`).join("")}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-500">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <!-- Tag Filters (Scrollable) -->
                <div class="flex-1 overflow-x-auto no-scrollbar flex gap-2 pb-1">
                    ${Object.keys(g).filter(l=>l!=="default").map(l=>{const i=g[l],d=i.color;return`
                        <button onclick="window.handleFilterChange('tag', '${l}', this)"
                                data-value="${l}" 
                                class="tag-filter-btn whitespace-nowrap bg-white border border-stone-200 text-stone-600 text-xs font-bold rounded-lg px-3 py-2 transition-colors active:scale-95 flex items-center justify-center gap-1.5"
                                data-active-class="${d}" 
                                data-default-class="bg-white text-stone-600 border-stone-200">
                            <span>${i.icon}</span>
                            <span>${l}</span>
                        </button>
                        `}).join("")}
                </div>
            </div>
        </div>
      </div>

      <!-- List -->
      <div id="song-list" class="flex-1 overflow-y-auto p-4 pb-48 space-y-3"> <!-- Increased bottom padding heavily for navbar + fab -->
        ${s.length===0?`
            <div class="text-center py-20 text-stone-400">
                <p>No songs yet.</p>
                <p class="text-sm">Tap + to add one.</p>
            </div>
        `:s.map(l=>`
            <div onclick="window.dispatchAppEvent('navigate', {screen: 'detail', params: {id: '${l.id}'}})" 
                 class="song-item bg-white p-4 rounded-xl shadow-sm border border-stone-100 active:bg-stone-50 transition-colors cursor-pointer group"
                 data-title="${l.title.toLowerCase()}"
                 data-artist="${l.artist.toLowerCase()}"
                 data-capo="${l.capo||"0"}"
                 data-tags="${(l.tags||[]).join(",")}">
                <div class="flex justify-between items-start">
                    <div class="flex-1 min-w-0 pr-2">
                        <h3 class="font-semibold text-stone-900 text-lg leading-tight mb-0.5 truncate group-hover:${o} transition-colors">${l.title}</h3>
                        <p class="text-stone-500 text-sm mb-2 truncate">${l.artist}</p>
                        
                        <div class="flex flex-wrap gap-1">
                            ${l.tags&&l.tags.length>0?l.tags.map(i=>`<span class="px-1.5 py-0.5 rounded text-[10px] font-bold border ${(g[i]||g.default).color}">${i}</span>`).join(""):'<span class="px-1.5 py-0.5 rounded text-[10px] font-medium border bg-stone-50 text-stone-300 border-stone-100">No Tags</span>'}
                        </div>
                    </div>
                    
                    <span class="flex-none text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-lg border ${l.capo&&l.capo!=0?"bg-emerald-100 text-emerald-700 border-emerald-200":"bg-stone-100 text-stone-500 border-stone-200"}">
                        ${l.capo&&l.capo!=0?`Capo ${l.capo}`:"No Capo"}
                     </span>
                </div>
            </div>
        `).join("")}
      </div>

      <!-- FAB (Moved up to avoid overlapping navbar) -->
      <button onclick="window.dispatchAppEvent('navigate', {screen: 'form', params: {instrument: '${t}', status: '${e}'}})" 
        class="fixed bottom-24 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20">
        ${f.plus}
      </button>

      ${$(t)}
    </div>
  `},detail:({song:t})=>`
    <div class="min-h-screen bg-white">
      <div class="flex justify-between items-center p-4 border-b border-stone-100 sticky top-0 bg-white z-10">
        <button onclick="window.history.back()" class="p-2 -ml-2 text-stone-500">
             ${f.chevronLeft}
        </button>
        <div class="flex gap-2">
            <button onclick="window.dispatchAppEvent('delete-song', {id: '${t.id}'})" class="text-red-500 text-sm font-medium px-3 py-2">Delete</button>
            <button onclick="window.dispatchAppEvent('navigate', {screen: 'form', params: {id: '${t.id}'}})" class="text-emerald-700 text-sm font-bold bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors">Edit</button>
        </div>
      </div>

      <div class="p-6 space-y-6">
        <div>
            <span class="inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wide mb-2 bg-emerald-50 text-emerald-600">
                ${t.instrument}
            </span>
            <h1 class="text-3xl font-bold text-stone-900 leading-tight mb-2">${t.title}</h1>
            <p class="text-xl text-stone-500">${t.artist}</p>
            
            ${t.tags&&t.tags.length>0?`
            <div class="flex flex-wrap gap-2 mt-3">
                ${t.tags.map(o=>{const n=g[o]||g.default;return`<span class="px-3 py-1 ${n.color} border text-xs font-bold rounded-full flex items-center gap-1">${n.icon} ${o}</span>`}).join("")}
            </div>
            `:""}
        </div>

        ${t.capo?`
        <div class="bg-stone-50 p-3 rounded-lg inline-flex items-center gap-2 border border-stone-100">
            <span class="text-xs font-bold text-stone-400 uppercase">Capo</span>
            <span class="font-bold text-stone-800">${t.capo}</span>
        </div>`:""}

        <div class="h-px bg-stone-100 w-full my-4"></div>

        ${t.status==="mastered"&&t.chordProgression?`
        <div>
            <h3 class="text-sm font-bold text-stone-400 uppercase mb-3">Chords</h3>
            <pre class="font-mono text-lg bg-stone-50 p-4 rounded-xl overflow-x-auto border border-stone-100 text-stone-800 whitespace-pre-wrap leading-relaxed">${t.chordProgression}</pre>
        </div>
        `:""}

        ${t.notes?`
        <div>
            <h3 class="text-sm font-bold text-stone-400 uppercase mb-2">Notes</h3>
            <p class="text-stone-700 leading-relaxed whitespace-pre-wrap font-mono text-sm">${t.notes}</p>
        </div>
        `:""}

        <div class="h-12"></div>
        
        ${t.status==="pool"?`
        <button onclick="window.dispatchAppEvent('mark-mastered', {id: '${t.id}'})" class="w-full bg-stone-900 text-white font-bold py-4 rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2">
            ${f.check} Mark as Mastered
        </button>
        `:""}
      </div>

      <!-- Autoscroll Controls -->
      <div id="autoscroll-container" class="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3 pointer-events-none">
         <!-- Control Panel (Hidden by default) -->
         <div id="autoscroll-panel" class="bg-white/90 backdrop-blur-md border border-stone-200 shadow-xl rounded-2xl p-4 w-64 pointer-events-auto transform translate-y-4 opacity-0 scale-95 transition-all duration-200 hidden origin-bottom-right">
            <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold text-stone-500 uppercase">Autoscroll</span>
                <button onclick="window.dispatchAppEvent('toggle-autoscroll-panel')" class="text-stone-400 hover:text-stone-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
            </div>
            
            <div class="flex items-center gap-4 mb-3">
                <button id="autoscroll-toggle" onclick="window.dispatchAppEvent('toggle-autoscroll-state')" 
                    class="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 active:scale-95 transition-all">
                    <!-- Play Icon (Default) -->
                    <svg id="icon-play" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>
                    <!-- Pause Icon (Hidden) -->
                    <svg id="icon-pause" class="hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg>
                </button>
                <div class="flex-1 flex items-center gap-2 bg-stone-100 rounded-xl p-1">
                    <button onclick="window.dispatchAppEvent('adjust-speed', {delta: -0.1})" class="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-stone-600 font-bold active:scale-95 transition-all hover:bg-stone-50 text-xl leading-none pb-1">
                        -
                    </button>
                    <span id="speed-display" class="flex-1 text-center font-mono font-bold text-stone-700 text-sm">1.0x</span>
                    <button onclick="window.dispatchAppEvent('adjust-speed', {delta: 0.1})" class="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-stone-600 font-bold active:scale-95 transition-all hover:bg-stone-50 text-xl leading-none pb-1">
                        +
                    </button>
                </div>
            </div>
         </div>

         <!-- FAB -->
         <button onclick="window.dispatchAppEvent('toggle-autoscroll-panel')" 
            class="pointer-events-auto w-14 h-14 bg-stone-900 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>
         </button>
      </div>
    </div>
  `,form:({song:t={},instrument:e,status:s})=>{const o=!!t.id,n=t.instrument||e||"guitar",a=t.status||s||"pool",l=n==="guitar"||n==="ukulele",i=a==="mastered";return`
    <div class="min-h-screen bg-stone-50 flex flex-col pb-24">
      <div class="bg-emerald-600 shadow-md transform transition-all px-6 py-4 flex justify-center items-center sticky top-0 z-10 w-full">
        <h1 class="font-bold text-lg text-white tracking-wide">${o?"Edit Song":"New Song"}</h1>
      </div>

      <form id="song-form" onsubmit="window.handleFormSubmit(event)" class="px-6 pt-6 space-y-6 flex-1 overflow-y-auto">
        <input type="hidden" name="id" value="${t.id||""}">
        
        <div class="space-y-1">
            <label class="block text-xs font-bold text-stone-400 uppercase">Title</label>
            <input type="text" name="title" value="${t.title||""}" required 
                class="w-full bg-white border border-stone-200 rounded-lg p-3 text-lg font-semibold focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-stone-300" placeholder="Song Title">
        </div>

        <div class="space-y-1">
            <label class="block text-xs font-bold text-stone-400 uppercase">Artist</label>
            <input type="text" name="artist" value="${t.artist||""}" required 
                class="w-full bg-white border border-stone-200 rounded-lg p-3 text-base focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-stone-300" placeholder="Artist Name">
        </div>

        <div class="grid grid-cols-2 gap-4">
            <!-- Instrument Segmented Control -->
            <div class="space-y-1">
                <label class="block text-xs font-bold text-stone-400 uppercase">Instrument</label>
                <div class="flex bg-stone-100 p-1 rounded-xl">
                    <button type="button" onclick="this.parentElement.querySelectorAll('button').forEach(b => b.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-stone-500 transition-all'); this.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-stone-900 shadow-sm transition-all'; document.getElementById('instrument-input').value = 'guitar'; document.getElementById('instrument-input').dispatchEvent(new Event('change', {bubbles: true}));" 
                        class="flex-1 py-2 rounded-lg text-sm font-bold ${n==="guitar"?"bg-white text-stone-900 shadow-sm":"text-stone-500"} transition-all">
                        Guitar
                    </button>
                    <button type="button" onclick="this.parentElement.querySelectorAll('button').forEach(b => b.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-stone-500 transition-all'); this.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-stone-900 shadow-sm transition-all'; document.getElementById('instrument-input').value = 'ukulele'; document.getElementById('instrument-input').dispatchEvent(new Event('change', {bubbles: true}));" 
                        class="flex-1 py-2 rounded-lg text-sm font-bold ${n==="ukulele"?"bg-white text-stone-900 shadow-sm":"text-stone-500"} transition-all">
                        Ukulele
                    </button>
                </div>
                <input type="hidden" name="instrument" id="instrument-input" value="${n}" onchange="window.handleFormChange(event)">
            </div>
            
            <!-- Status Segmented Control -->
            <div class="space-y-1">
                <label class="block text-xs font-bold text-stone-400 uppercase">Status</label>
                <div class="flex bg-stone-100 p-1 rounded-xl">
                    <button type="button" onclick="this.parentElement.querySelectorAll('button').forEach(b => b.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-stone-500 transition-all'); this.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-stone-900 shadow-sm transition-all'; document.getElementById('status-input').value = 'pool'; document.getElementById('status-input').dispatchEvent(new Event('change', {bubbles: true}));" 
                        class="flex-1 py-2 rounded-lg text-sm font-bold ${a==="pool"?"bg-white text-stone-900 shadow-sm":"text-stone-500"} transition-all">
                        To Learn
                    </button>
                    <button type="button" onclick="this.parentElement.querySelectorAll('button').forEach(b => b.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-stone-500 transition-all'); this.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-stone-900 shadow-sm transition-all'; document.getElementById('status-input').value = 'mastered'; document.getElementById('status-input').dispatchEvent(new Event('change', {bubbles: true}));" 
                        class="flex-1 py-2 rounded-lg text-sm font-bold ${a==="mastered"?"bg-white text-stone-900 shadow-sm":"text-stone-500"} transition-all">
                        Mastered
                    </button>
                </div>
                 <input type="hidden" name="status" id="status-input" value="${a}" onchange="window.handleFormChange(event)">
            </div>
        </div>

        <div id="capo-field" class="space-y-1" style="display: ${l?"block":"none"}">
            <label class="block text-xs font-bold text-stone-400 uppercase">Capo</label>
            <input type="number" name="capo" value="${t.capo!==void 0&&t.capo!==null?t.capo:""}" 
                class="w-full bg-white border border-stone-200 rounded-lg p-3 text-base focus:outline-none focus:border-emerald-500" placeholder="e.g. 2 (Leave empty for No Capo)">
        </div>

        <div id="chords-field" class="space-y-1" style="display: ${i?"block":"none"}">
            <label class="block text-xs font-bold text-stone-400 uppercase">Chords</label>
            <textarea name="chordProgression" rows="4" 
                class="w-full bg-white border border-stone-200 rounded-lg p-3 font-mono text-sm focus:outline-none focus:border-emerald-500 placeholder-stone-300" 
                placeholder="Em  G  D  A7">${t.chordProgression||""}</textarea>
        </div>

        <div class="space-y-2">
            <label class="block text-xs font-bold text-stone-400 uppercase">Tags / Mood</label>
            <div class="flex flex-wrap gap-2" id="tags-container">
                ${Object.keys(g).filter(u=>u!=="default").map(u=>{const c=(t.tags||[]).includes(u),r=g[u],h=r.color,p="bg-white text-stone-600 border-stone-200 hover:border-emerald-500";return`
                    <button type="button" 
                        onclick="this.classList.toggle('selected');
                                 if(this.classList.contains('selected')) {
                                     this.className = 'tag-select-btn px-4 py-2 rounded-full border text-sm font-bold transition-all active:scale-95 flex items-center gap-2 selected ${h}';
                                 } else {
                                     this.className = 'tag-select-btn px-4 py-2 rounded-full border text-sm font-medium transition-all active:scale-95 flex items-center gap-2 ${p}';
                                 }"
                        data-tag="${u}"
                        data-selected-class="${h}"
                        data-default-class="${p}"
                        class="tag-select-btn px-4 py-2 rounded-full border text-sm font-medium transition-all active:scale-95 flex items-center gap-2 ${c?`selected ${h} font-bold`:p}">
                        <span>${r.icon}</span>    
                        <span>${u}</span>
                    </button>
                    `}).join("")}
            </div>
            <!-- Hidden input to store tags for form submission -->
            <input type="hidden" name="tags" id="tags-input" value="${(t.tags||[]).join(",")}">
        </div>

        <div class="space-y-1">
            <label class="block text-xs font-bold text-stone-400 uppercase">Notes</label>
            <textarea name="notes" rows="4" 
                class="w-full bg-white border border-stone-200 rounded-lg p-3 text-base font-mono focus:outline-none focus:border-emerald-500 placeholder-stone-300" 
                placeholder="Strumming patterns, lyrics, etc.">${t.notes||""}</textarea>
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
  `}};C({onNeedRefresh(){},onOfflineReady(){console.log("App ready to work offline")}});window.dispatchAppEvent=(t,e)=>{window.dispatchEvent(new CustomEvent(t,{detail:e}))};window.handleFormSubmit=t=>{t.preventDefault();const e=new FormData(t.target),s=Object.fromEntries(e.entries());s.capo&&s.capo.trim()!==""?s.capo=parseInt(s.capo):delete s.capo;const o=document.querySelectorAll(".tag-select-btn"),n=[];o.forEach(a=>{a.classList.contains("selected")&&n.push(a.getAttribute("data-tag"))}),s.tags=n,window.dispatchAppEvent("save-song",s)};window.handleFormChange=t=>{const e=document.getElementById("instrument-select"),s=document.getElementById("status-select"),o=document.getElementById("capo-field"),n=document.getElementById("chords-field");t.target===e&&(e.value==="guitar"||e.value==="ukulele"?o.style.display="block":o.style.display="none"),t.target===s&&(s.value==="mastered"?n.style.display="block":n.style.display="none")};window.currentFilters={query:"",capo:"",tag:""};window.applyFilters=()=>{const t=window.currentFilters.query.toLowerCase(),e=window.currentFilters.capo,s=window.currentFilters.tag;document.querySelectorAll(".song-item").forEach(o=>{const n=o.getAttribute("data-title"),a=o.getAttribute("data-artist"),l=o.getAttribute("data-capo")||"0",i=(o.getAttribute("data-tags")||"").split(",");let d=!0;t&&!n.includes(t)&&!a.includes(t)&&(d=!1),d&&e!==""&&(e==="0"?l!=="null"&&l!==""&&l!=="0"&&(d=!1):l!==e&&(d=!1)),d&&s!==""&&!i.includes(s)&&(d=!1),o.style.display=d?"block":"none"})};window.handleSearch=t=>{window.currentFilters.query=t.target.value,window.applyFilters()};window.handleFilterChange=(t,e,s)=>{const o=t==="tag",n=t,a=`${t}-filter-btn`;o&&window.currentFilters[n]===e?window.currentFilters[n]="":window.currentFilters[n]=e,document.querySelectorAll(`.${a}`).forEach(l=>{const i=l.getAttribute("data-default-class"),d=l.getAttribute("data-active-class"),u=l.getAttribute("data-value");window.currentFilters[n]===u?l.className=`${a} whitespace-nowrap text-xs font-bold rounded-lg px-3 py-2 transition-colors active:scale-95 flex items-center justify-center gap-1.5 ${d}`:l.className=`${a} whitespace-nowrap text-xs font-bold rounded-lg px-3 py-2 transition-colors active:scale-95 flex items-center justify-center gap-1.5 ${i}`}),window.applyFilters()};window.autoscrollState={interval:null,speed:1,isActive:!1};window.startAutoscroll=()=>{window.autoscrollState.interval&&clearInterval(window.autoscrollState.interval),window.autoscrollState.isActive=!0;const t=document.getElementById("icon-play"),e=document.getElementById("icon-pause");t&&t.classList.add("hidden"),e&&e.classList.remove("hidden");const s=()=>{window.scrollBy(0,1),window.innerHeight+window.scrollY>=document.body.offsetHeight&&window.stopAutoscroll()},n=50/window.autoscrollState.speed;window.autoscrollState.interval=setInterval(s,n)};window.stopAutoscroll=()=>{window.autoscrollState.interval&&clearInterval(window.autoscrollState.interval),window.autoscrollState.interval=null,window.autoscrollState.isActive=!1;const t=document.getElementById("icon-play"),e=document.getElementById("icon-pause");t&&t.classList.remove("hidden"),e&&e.classList.add("hidden")};window.adjustSpeed=t=>{let e=window.autoscrollState.speed+t;e=Math.round(e*10)/10,e<.1&&(e=.1),e>10&&(e=10),window.autoscrollState.speed=e;const s=document.getElementById("speed-display");s&&(s.textContent=e.toFixed(1)+"x"),window.autoscrollState.isActive&&window.startAutoscroll()};class I{constructor(){this.init()}init(){window.addEventListener("navigate",e=>this.route(e.detail.screen,e.detail.params)),window.addEventListener("popstate",e=>{e.state?this.render(e.state.screen,e.state.params,!1):this.route("home",{},!1)}),window.addEventListener("save-song",e=>{const s=e.detail;s.id?m.updateSong(s.id,s):m.addSong(s),window.history.back()}),window.addEventListener("delete-song",e=>{v.showConfirmModal("Are you sure you want to delete this song? This action cannot be undone.",()=>{m.deleteSong(e.detail.id),window.history.back()})}),window.addEventListener("mark-mastered",e=>{m.updateSong(e.detail.id,{status:"mastered"}),this.route("detail",{id:e.detail.id},!0)}),window.addEventListener("random-song",e=>{const s=e.detail.instrument||"guitar";m.getSongs(s,"mastered");const o=m.getSongs(s,"pool"),n=m.getSongs(s,"mastered"),a=[...o,...n];if(a.length>0){const l=a[Math.floor(Math.random()*a.length)];this.route("detail",{id:l.id})}else alert(`No ${s} songs found! Add some first.`)}),window.addEventListener("toggle-autoscroll-panel",()=>{const e=document.getElementById("autoscroll-panel");e&&(e.classList.contains("hidden")?(e.classList.remove("hidden"),requestAnimationFrame(()=>{e.classList.remove("opacity-0","scale-95")})):(e.classList.add("opacity-0","scale-95"),setTimeout(()=>{e.classList.add("hidden")},200)))}),window.addEventListener("toggle-autoscroll-state",()=>{window.autoscrollState.isActive?window.stopAutoscroll():window.startAutoscroll()}),window.addEventListener("adjust-speed",e=>{window.adjustSpeed(e.detail.delta)}),this.route("home",{},!0)}route(e,s={},o=!1){window.stopAutoscroll&&window.stopAutoscroll(),o?window.history.replaceState({screen:e,params:s},"","#"+e):window.history.pushState({screen:e,params:s},"","#"+e),this.render(e,s)}render(e,s){switch(e){case"home":const o=m.getStats("guitar"),n=m.getStats("ukulele");v.render(b.home,{guitarStats:o,ukuleleStats:n});break;case"list":const a=m.getSongs(s.instrument,s.status||"pool");a.sort((d,u)=>u.createdAt-d.createdAt),v.render(b.list,{instrument:s.instrument,status:s.status,songs:a});break;case"detail":const l=m.getSong(s.id);if(!l){this.route("home",{},!0);return}v.render(b.detail,{song:l});break;case"form":const i=s.id?m.getSong(s.id):{};v.render(b.form,{song:i,instrument:s.instrument,status:s.status});break;default:v.render(b.home)}}}new I;
