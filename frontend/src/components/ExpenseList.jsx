import React from 'react';
import ExpenseFilters from './ExpenseFilters';
import './ExpenseList.css';

const ExpenseList = ({ expenses, categories, filters, onFilterChange, onClearFilters, onDelete }) => {

  return (
    <div className="expense-list-container">
      <h3>All Expenses</h3>

      <ExpenseFilters
        filters={filters}
        onChange={onFilterChange}
        categories={categories}
        onClear={onClearFilters}
      />

      <table className="expense-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount (₹)</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>
                <button className="delete-button" onClick={() => onDelete(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
