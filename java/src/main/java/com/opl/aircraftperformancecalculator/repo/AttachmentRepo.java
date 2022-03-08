package com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttachmentRepo extends JpaRepository<Attachment, Long> {

    List<Attachment> findAllByUserIDAndProfile(String userID, String profile);
    List<Attachment> findAllByUserIDAndName(String userID, String name);
}
