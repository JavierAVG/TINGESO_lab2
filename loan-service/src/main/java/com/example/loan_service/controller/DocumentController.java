package com.example.loan_service.controller;

import com.example.loan_service.entity.DocumentEntity;
import com.example.loan_service.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@RestController
@RequestMapping("/loan/document")
public class DocumentController {
    @Autowired
    private DocumentService documentService;

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestParam("loanid") Long loanid,
                                  @RequestParam("name") String name,
                                  @RequestParam("file") MultipartFile file) {
        try {
            DocumentEntity document = new DocumentEntity();
            document.setLoanid(loanid);
            document.setName(name);
            document.setFile(file.getBytes());
            document.setValidity(true);
            return ResponseEntity.ok(documentService.save(document));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar el documento");
        }
    }

    @GetMapping("/getallbyloanid/{id}")
    public ResponseEntity<ArrayList<DocumentEntity>> getDocumentsByLoanId(@PathVariable("id") Long id) {
        ArrayList<DocumentEntity> documents = documentService.getDocumentsByLoanId(id);
        if (documents == null || documents.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(documents);
    }

}
