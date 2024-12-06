package com.example.loan_service.repository;

import com.example.loan_service.entity.DocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface DocumentRepository extends JpaRepository<DocumentEntity, Long> {
    ArrayList<DocumentEntity> findByLoanid(Long loanid);
}
