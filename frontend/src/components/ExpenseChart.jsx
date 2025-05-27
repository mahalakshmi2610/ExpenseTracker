// src/components/ExpenseChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA47BC'];

const ExpenseChart = ({ expenses }) => {
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  return (
    <div>
      <h3 className="text-lg font-bold my-4">Expense by Category</h3>
      <div className='chart-container'>
      
      <PieChart width={400} height={300}>
        <Pie
          data={categoryData}
          cx={200}
          cy={150}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {categoryData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </div>
    </div>
  );
};

export default ExpenseChart;
