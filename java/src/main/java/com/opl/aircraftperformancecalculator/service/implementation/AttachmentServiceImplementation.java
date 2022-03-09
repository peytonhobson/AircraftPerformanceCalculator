package com.opl.aircraftperformancecalculator.service.implementation;

import com.opl.aircraftperformancecalculator.models.Attachment;
import com.opl.aircraftperformancecalculator.repo.AttachmentRepo;
import com.opl.aircraftperformancecalculator.service.AttachmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class AttachmentServiceImplementation implements AttachmentService {

    private final AttachmentRepo attachmentRepo;

    @Override
    public List<Attachment> saveAll(List<Attachment> attachments) {
        log.info("Saving new Attachments: {}", attachments);
        return attachmentRepo.saveAll(attachments);
    }

    @Override
    public Attachment save(Attachment attachment) {
        log.info("Saving new Attachments: {}", attachment);
        return attachmentRepo.save(attachment);
    }

    @Override
    public Attachment get(String name, String userID) {
        log.info("Fetching attachment by username and name.");
        return attachmentRepo.findAllByUsernameAndName(userID, name);
    }

    @Override
    public Attachment update(Attachment attachment) {
        log.info("Updating Attachment: {}", attachment.getName());
        return attachmentRepo.save(attachment);
    }

    @Override
    public Boolean delete(Attachment attachment) {
        log.info("Deleting Attachment");
        return attachmentRepo.deleteAllByUsernameAndName(attachment.getUsername(), attachment.getName());
    }

    @Override
    public List<Attachment> listByUserID(String userID) {
        log.info("Listing all Attachments by User ID {}:", userID);
        return attachmentRepo.findAllByUsername(userID);
    }
}
