const STORAGE_KEY = 'song_mastery_data';

export class Store {
    constructor() {
        this.songs = this._load();
    }

    _load() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Failed to load data", e);
            return [];
        }
    }

    _save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.songs));
        } catch (e) {
            console.error("Failed to save data", e);
        }
    }

    getAllSongs() {
        return this.songs;
    }

    getSongs(instrument, status) {
        return this.songs.filter(s => s.instrument === instrument && s.status === status);
    }

    getSong(id) {
        return this.songs.find(s => s.id === id);
    }

    addSong(song) {
        if (!song.id) {
            song.id = crypto.randomUUID();
        }
        song.createdAt = Date.now();
        this.songs.push(song);
        this._save();
        return song;
    }

    updateSong(id, updates) {
        const index = this.songs.findIndex(s => s.id === id);
        if (index !== -1) {
            this.songs[index] = { ...this.songs[index], ...updates };
            this._save();
            return this.songs[index];
        }
        return null;
    }

    deleteSong(id) {
        const index = this.songs.findIndex(s => s.id === id);
        if (index !== -1) {
            this.songs.splice(index, 1);
            this._save();
            return true;
        }
        return false;
    }

    getStats(instrument) {
        const songs = this.songs.filter(s => s.instrument === instrument);
        const total = songs.length;
        const mastered = songs.filter(s => s.status === 'mastered').length;
        const toLearn = total - mastered;
        const progress = total === 0 ? 0 : Math.round((mastered / total) * 100);
        return { total, mastered, toLearn, progress };
    }
}

export const store = new Store();
