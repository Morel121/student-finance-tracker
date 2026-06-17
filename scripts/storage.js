const Storage = {
  STORAGE_KEY: 'tracker_records',
  saveRecords(records) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  loadRecords() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return { success: true, records: data ? JSON.parse(data) : [] };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};
