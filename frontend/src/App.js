import React, { useState, useEffect } from 'react';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: '',
  });
  const [refresh, setRefresh] = useState(false);

  // Fetch expenses on mount or refresh
  useEffect(() => {
    fetch('http://localhost:8080/api/expenses')
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error('Error fetching expenses:', err));
  }, [refresh]);

  // Filter expenses
  const filteredExpenses = expenses.filter(expense => {
    const dateCheck =
      (!filters.startDate || expense.date >= filters.startDate) &&
      (!filters.endDate || expense.date <= filters.endDate);

    const categoryCheck =
      !filters.category || filters.category === 'All' || expense.category === filters.category;

    return dateCheck && categoryCheck;
  });

  const categories = ['All', ...new Set(expenses.map(e => e.category))];

  const handleFilterChange = (e) => {
    setFilters({...filters, [e.target.name]: e.target.value});
  };

  const clearFilters = () => {
    setFilters({ startDate: '', endDate: '', category: 'All' });
  };

  const handleExpenseAdded = () => {
    setRefresh(!refresh);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/expenses/${id}`, { method: 'DELETE' });
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <h2>Expense Tracker</h2>
      <div className="form-container">
        <AddExpenseForm onExpenseAdded={handleExpenseAdded} />
      </div>
      <ExpenseList
        key={refresh}
        expenses={filteredExpenses}
        categories={categories}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        onDelete={handleDelete}
      />

      <ExpenseChart expenses={filteredExpenses} />

      <p className="total-amount">
        <strong>Total Amount:</strong> ₹{filteredExpenses.reduce((acc, e) => acc + e.amount, 0)}
      </p>

    </div>
  );
}

export default App;
