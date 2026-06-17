const State = {
  records: [],

  async init() {
    const r = Storage.loadRecords();
    this.records = r.success ? r.records : [];
  },

  addRecord(data) {
    const errors = [];
    if (!data.description || data.description.trim().length < 3) errors.push('Description needed');
    if (!data.amount || isNaN(data.amount) || data.amount <= 0) errors.push('Valid amount needed');
    if (!data.category) errors.push('Category needed');
    if (!data.date) errors.push('Date needed');
    if (errors.length) return { success: false, errors };

    this.records.push({
      id: `r${Date.now()}`,
      description: data.description,
      amount: parseFloat(data.amount),
      category: data.category,
      date: data.date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    Storage.saveRecords(this.records);
    return { success: true };
  },

  deleteRecord(id) {
    this.records = this.records.filter(r => r.id !== id);
    Storage.saveRecords(this.records);
  },

  getRecords() {
    return [...this.records].sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};
