const Search = {
  filterRecords(records, query) {
    if (!query) return records;
    const q = query.toLowerCase();
    return records.filter(r => 
      r.description.toLowerCase().includes(q) || 
      r.category.toLowerCase().includes(q) || 
      r.date.includes(q)
    );
  },
  highlightText(text, query) {
    if (!query) return text;
    return text.replace(new RegExp(`(${query})`, 'gi'), '<mark>$1</mark>');
  }
};
