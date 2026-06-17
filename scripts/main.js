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

    this.$('records-body').addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-button')) {
        const id = e.target.dataset.id;
        State.deleteRecord(id);
        this.refresh();
      }
    });

    this.refresh();
    this.$('date').value = new Date().toISOString().split('T')[0];
  },

  refresh() {
    const recs = State.getRecords();
    this.renderRecords(recs);
    this.renderTotal(recs);
  },

  renderRecords(recs) {
    const body = this.$('records-body');
    body.innerHTML = recs.map(r => {
      const amt = `$${r.amount.toFixed(2)}`;
      return `<tr>
        <td>${r.date}</td>
        <td>${r.description}</td>
        <td>${r.category}</td>
        <td>${amt}</td>
        <td><button class="delete-button" data-id="${r.id}">Delete</button></td>
      </tr>`;
    }).join('');
  },

  renderTotal(recs) {
    const total = recs.reduce((sum, r) => sum + r.amount, 0);
    this.$('total-spent').textContent = `Total: $${total.toFixed(2)}`;
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await State.init();
  UI.init();
});
