package com.example.loan_service.repository;

import com.example.loan_service.entity.SavingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavingsRepository extends JpaRepository<SavingEntity, Long> {
    List<SavingEntity> findByLoanid(Long id);
}
