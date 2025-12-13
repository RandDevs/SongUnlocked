export class UIManager {
    constructor() {
        this.app = document.getElementById('app');
        this.currentView = null;
        this.root = document.createElement('div');
        this.root.className = 'max-w-md mx-auto min-h-screen bg-stone-50 pb-24'; // Mobile container + padding for FAB
        this.app.appendChild(this.root);
    }

    render(viewTemplate, context = {}) {
        this.root.innerHTML = viewTemplate(context);
        this.bindEvents();
        window.scrollTo(0, 0); // Reset scroll on navigation
    }

    // Placeholder for binding events after render.
    // In a real app we might use delegation or bind specific listeners in the view logic.
    bindEvents() {
        // To be implemented by specific views or handled globally
    }

    navigateTo(screenName, params = {}) {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { screen: screenName, params } }));
    }

    showConfirmModal(message, onConfirm) {
        let modal = document.getElementById('app-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'app-modal';
            modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 hidden opacity-0 transition-opacity duration-200';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm transform scale-95 transition-transform duration-200">
                <h3 class="text-lg font-bold text-stone-900 mb-2">Confirm Action</h3>
                <p class="text-stone-600 mb-6 leading-relaxed">${message}</p>
                <div class="flex gap-3">
                    <button id="modal-cancel" class="flex-1 py-3 text-stone-600 font-bold bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors">Cancel</button>
                    <button id="modal-confirm" class="flex-1 py-3 text-white font-bold bg-red-500 rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">Delete</button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('div').classList.remove('scale-95');
            modal.querySelector('div').classList.add('scale-100');
        });

        const close = () => {
            modal.classList.add('opacity-0');
            modal.querySelector('div').classList.remove('scale-100');
            modal.querySelector('div').classList.add('scale-95');
            setTimeout(() => modal.classList.add('hidden'), 200);
        };

        document.getElementById('modal-cancel').onclick = close;
        document.getElementById('modal-confirm').onclick = () => {
            onConfirm();
            close();
        };
    }
}

export const ui = new UIManager();
