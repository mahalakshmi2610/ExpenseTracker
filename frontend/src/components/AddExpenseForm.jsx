import React, { useState } from 'react';
import axios from 'axios';

const AddExpenseForm = ({ onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    note: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/expenses', formData);
      onExpenseAdded(); // To refresh the list
      setFormData({ title: '', amount: '', category: '', date: '', note: '' });
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  return (
  <form className="add-expense-form" onSubmit={handleSubmit}>
    <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
    <input name="amount" placeholder="Amount" type="number" value={formData.amount} onChange={handleChange} required />
    <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
    <input name="date" type="date" value={formData.date} onChange={handleChange} required />
    <input name="note" placeholder="Note" value={formData.note} onChange={handleChange} />
    <div className="button-container">
      <button type="submit">Add Expense</button>
    </div>
  </form>

  );
};

export default AddExpenseForm;
