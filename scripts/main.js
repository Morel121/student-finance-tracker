const UI = {
  $ : (id) => document.getElementById(id),

  init() {
    this.$('record-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(this.$('record-form'));
      const rec = Object.fromEntries(data);
      const res = State.addOrUpdateRecord(rec);
      this.$('form-status').textContent = res.success ? 'Saved!' : res.errors.join(' ');
      if (res.success) {
        this.$('record-form').reset();
        this.$('date').value = new Date().toISOString().split('T')[0];
        this.refresh();
      }
    });

    this.$('reset-button').addEventListener('click', () => {
      this.$('record-form').reset();
      this.$('date').value = new Date().toISOString().split('T')[0];
    });

    this.$('search-input').addEventListener('input', (e) => {
      State.searchTerm = e.target.value;
      this.refresh();
    });

    this.$('sort-select').addEventListener('change', (e) => {
      State.sortOption = e.target.value;
      this.refresh();
    });

    this.$('settings-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(this.$('settings-form'));
      const set = Object.fromEntries(data);
      State.updateSettings(set);
      this.$('settings-status').textContent = 'Settings saved!';
      this.refresh();
    });

    this.$('records-body').addEventListener('click', (e) => {
      const id = e.target.closest('button')?.dataset.id;
      if (e.target.classList.contains('delete-button')) {
        State.deleteRecord(id);
        this.refresh();
      } else if (e.target.classList.contains('edit-button')) {
        const rec = State.records.find(r => r.id === id);
        if (rec) {
          this.$('record-id').value = rec.id;
          this.$('description').value = rec.description;
          this.$('amount').value = rec.amount;
          this.$('category').value = rec.category;
          this.$('date').value = rec.date;
        }
      }
    });

    this.refresh();
    this.$('date').value = new Date().toISOString().split('T')[0];
  },

  refresh() {
    const recs = State.getRecords();
    this.renderRecords(recs);
    this.renderTotal(recs);
    this.$('currency').value = State.settings.currency;
    this.$('budget-cap').value = State.settings.budgetCap;
  },

  renderRecords(recs) {
    const body = this.$('records-body');
    body.innerHTML = recs.map(r => {
      const amt = this.formatCurrency(r.amount, State.settings);
      return `<tr>
        <td>${r.date}</td>
        <td>${r.description}</td>
        <td>${r.category}</td>
        <td>${amt}</td>
        <td>
          <button class="edit-button" data-id="${r.id}">Edit</button>
          <button class="delete-button" data-id="${r.id}">Delete</button>
        </td>
      </tr>`;
    }).join('');
  },

  renderTotal(recs) {
    const total = recs.reduce((sum, r) => sum + r.amount, 0);
    this.$('total-spent').textContent = `Total: ${this.formatCurrency(total, State.settings)}`;
  },

  formatCurrency(val, set) {
    const rate = {USD: 1, EUR: 0.92, GBP: 0.79}[set.currency] || 1;
    const amt = val * rate;
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: set.currency}).format(amt);
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await State.init();
  UI.init();
});
