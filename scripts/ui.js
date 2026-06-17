const UI = {
  renderRecords(records) {
    const body = document.getElementById('records-body');
    body.innerHTML = records.map(r => `
      <tr>
        <td>${r.date}</td>
        <td>${r.description}</td>
        <td>${r.category}</td>
        <td>$${r.amount.toFixed(2)}</td>
        <td>
          <button class="edit-button" data-id="${r.id}">Edit</button>
          <button class="delete-button" data-id="${r.id}">Delete</button>
        </td>
      </tr>
    `).join('');
  },

  renderStats(records) {
    const total = records.reduce((sum, r) => sum + r.amount, 0);
    document.getElementById('total-spent').textContent = `Total: $${total.toFixed(2)}`;
  },

  fillSettings(settings) {
    document.getElementById('currency').value = settings.currency || 'USD';
    document.getElementById('budget-cap').value = settings.budgetCap || '';
  }
};
