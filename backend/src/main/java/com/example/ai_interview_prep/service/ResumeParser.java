package com.example.ai_interview_prep.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public class ResumeParser {

    public static String extractText(MultipartFile file) throws Exception {

        String filename = file.getOriginalFilename();

        if (filename == null) {
            throw new RuntimeException("Invalid file");
        }

        if (filename.endsWith(".pdf")) {
            PDDocument document = PDDocument.load(file.getInputStream());
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);
            document.close();
            return text;
        }

        if (filename.endsWith(".docx")) {
            InputStream is = file.getInputStream();
            XWPFDocument doc = new XWPFDocument(is);

            StringBuilder text = new StringBuilder();
            doc.getParagraphs().forEach(p -> text.append(p.getText()).append("\n"));

            doc.close();
            return text.toString();
        }

        throw new RuntimeException("Unsupported file type");
    }
}
