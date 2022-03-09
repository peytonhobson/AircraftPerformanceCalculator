package com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttachmentRepo extends JpaRepository<Attachment, Long> {

    List<Attachment> findAllByUsername(String userID);
    Attachment findAllByUsernameAndName(String userID, String name);
    Boolean deleteAllByUsernameAndName(String userID, String name);
}
