const State = {
  records: [],
  settings: {},
  searchTerm: '',
  sortOption: 'date-desc',

  async init() {
    const s = Storage.loadSettings();
    this.settings = s.success ? s.settings : { ...Storage.defaultSettings };
    const r = Storage.loadRecords();
    this.records = r.success ? r.records : [];
  },

  addOrUpdateRecord(data) {
    const errors = [];
    if (!data.description || data.description.trim().length < 3) errors.push('Description needed');
    if (!data.amount || isNaN(data.amount) || data.amount <= 0) errors.push('Valid amount needed');
    if (!data.category) errors.push('Category needed');
    if (!data.date) errors.push('Date needed');
    if (errors.length) return { success: false, errors };

    if (data.id) {
      const idx = this.records.findIndex(r => r.id === data.id);
      if (idx >= 0) {
        this.records[idx] = { ...this.records[idx], ...data, amount: parseFloat(data.amount), updatedAt: new Date().toISOString() };
      }
    } else {
      this.records.push({ id: `r${Date.now()}`, description: data.description, amount: parseFloat(data.amount), category: data.category, date: data.date, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    Storage.saveRecords(this.records);
    return { success: true };
  },

  deleteRecord(id) {
    this.records = this.records.filter(r => r.id !== id);
    Storage.saveRecords(this.records);
  },

  getRecords() {
    let recs = [...this.records];
    if (this.searchTerm) recs = recs.filter(r => r.description.includes(this.searchTerm) || r.category.includes(this.searchTerm));
    
    switch(this.sortOption) {
      case 'date-asc': return recs.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'amount-desc': return recs.sort((a, b) => b.amount - a.amount);
      default: return recs.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },

  updateSettings(data) {
    this.settings = { ...this.settings, ...data };
    Storage.saveSettings(this.settings);
  }
};
