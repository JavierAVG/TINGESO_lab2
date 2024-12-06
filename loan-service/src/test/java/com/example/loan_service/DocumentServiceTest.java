package com.example.loan_service;

import com.example.loan_service.entity.DocumentEntity;
import com.example.loan_service.repository.DocumentRepository;
import com.example.loan_service.service.DocumentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class DocumentServiceTest {
    @Mock
    private DocumentRepository documentRepository;

    @InjectMocks
    private DocumentService documentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void whenSave_thenCorrect() {
        // given
        DocumentEntity document = new DocumentEntity();
        document.setLoanid(1L);
        document.setName("Test Document");
        document.setFile(new byte[]{1, 2, 3});
        document.setValidity(true);

        DocumentEntity savedDocument = new DocumentEntity();
        savedDocument.setId(1L);
        savedDocument.setLoanid(1L);
        savedDocument.setName("Test Document");
        savedDocument.setFile(new byte[]{1, 2, 3});
        savedDocument.setValidity(true);

        when(documentRepository.save(any(DocumentEntity.class))).thenReturn(savedDocument);

        // when
        DocumentEntity result = documentService.save(document);

        // then
        assertEquals(savedDocument, result);
        verify(documentRepository, times(1)).save(document);
    }

    @Test
    void whenGetDocumentsByLoanId_thenCorrect() {
        // given
        DocumentEntity document1 = new DocumentEntity(1L, 1L, "Document 1", new byte[]{1, 2, 3}, true);
        DocumentEntity document2 = new DocumentEntity(2L, 1L, "Document 2", new byte[]{4, 5, 6}, true);
        ArrayList<DocumentEntity> documents = new ArrayList<>(Arrays.asList(document1, document2));

        when(documentRepository.findByLoanid(anyLong())).thenReturn(documents);

        // when
        ArrayList<DocumentEntity> result = documentService.getDocumentsByLoanId(1L);

        // then
        assertEquals(documents, result);
        verify(documentRepository, times(1)).findByLoanid(1L);
    }
}