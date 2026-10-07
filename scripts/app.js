document.body.innerHTML = `
<header class="header">
  <h1>Finance Tracker</h1>
  <p>Track expenses quickly</p>
</header>
<main id="main-content">
  <section class="panel">
    <h2>Add Expense</h2>
    <form id="record-form" novalidate>
      <div class="field-grid">
        <label for="description">Description</label>
        <input id="description" name="description" type="text" required placeholder="What for?">
        <label for="amount">Amount</label>
        <input id="amount" name="amount" type="text" required placeholder="12.50">
        <label for="category">Category</label>
        <select id="category" name="category" required>
          <option value="">Select</option>
          <option>Food</option>
          <option>Books</option>
          <option>Transport</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>
        <label for="date">Date</label>
        <input id="date" name="date" type="date" required>
      </div>
      <div class="form-actions">
        <button type="submit" id="save-button">Save</button>
        <button type="button" id="reset-button">Clear</button>
      </div>
      <output id="form-status" class="form-status"></output>
    </form>
  </section>

  <section class="panel">
    <h2>Records</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th><th></th></tr>
        </thead>
        <tbody id="records-body"></tbody>
      </table>
    </div>
  </section>

  <div style="text-align:center;margin:2rem 0;">
    <p id="total-spent" style="font-size:1.25rem;font-weight:bold;">Total: $0.00</p>
  </div>
</main>
`;
