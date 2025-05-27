import React from 'react';

const ExpenseFilters = ({ filters, onChange, categories, onClear }) => {
  return (
    <div className="expense-filters">
      <label>
        Start Date:
        <input type="date" name="startDate" value={filters.startDate} onChange={onChange} />
      </label>

      <label>
        End Date:
        <input type="date" name="endDate" value={filters.endDate} onChange={onChange} />
      </label>

      <label>
        Category:
        <select name="category" value={filters.category} onChange={onChange}>
          <option value="">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>
    
      <button className="clear-filter-btn" onClick={onClear}>Clear Filters</button>
    </div>
  );
};

export default ExpenseFilters;
