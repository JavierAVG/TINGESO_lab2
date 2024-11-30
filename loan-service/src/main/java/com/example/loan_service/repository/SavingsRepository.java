package com.example.loan_service.repository;

import com.example.loan_service.entity.SavingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingsRepository extends JpaRepository<SavingEntity, Integer> {
}
