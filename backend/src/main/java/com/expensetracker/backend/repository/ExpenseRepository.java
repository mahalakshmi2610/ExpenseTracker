package com.expensetracker.backend.repository;

import com.expensetracker.backend.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByCategoryIgnoreCase(String category);
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
