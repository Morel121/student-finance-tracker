const Storage = {
  STORAGE_KEY: 'tracker_records',
  SETTINGS_KEY: 'tracker_settings',
  defaultSettings: { currency: 'USD', budgetCap: 1000 },

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
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  loadSettings() {
    try {
      const data = localStorage.getItem(this.SETTINGS_KEY);
      return { success: true, settings: data ? JSON.parse(data) : { ...this.defaultSettings } };
    } catch (e) {
      return { success: true, settings: { ...this.defaultSettings } };
    }
  }
};
