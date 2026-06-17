const validators = {
  validateDescription(v) { return v && v.trim().length >= 3; },
  validateAmount(v) { return !isNaN(v) && Number(v) > 0; },
  validateDate(v) { return v && !isNaN(Date.parse(v)); },
  validateCategory(v) { return ['Food', 'Books', 'Transport', 'Entertainment', 'Other'].includes(v); }
};
