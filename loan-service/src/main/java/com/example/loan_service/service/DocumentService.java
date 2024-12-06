package com.example.loan_service.service;

import com.example.loan_service.entity.DocumentEntity;
import com.example.loan_service.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class DocumentService {
    @Autowired
    private DocumentRepository documentRepository;

    public DocumentEntity save(DocumentEntity document) {
        return documentRepository.save(document);
    }

    public ArrayList<DocumentEntity> getDocumentsByLoanId(Long id) {
        return documentRepository.findByLoanid(id);
    }
}
