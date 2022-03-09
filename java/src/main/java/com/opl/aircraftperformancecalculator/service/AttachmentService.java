package com.opl.aircraftperformancecalculator.service;

import com.opl.aircraftperformancecalculator.models.Attachment;
import com.opl.aircraftperformancecalculator.models.Profile;

import java.io.FileNotFoundException;
import java.util.List;

public interface AttachmentService {

    List<Attachment> saveAll(List<Attachment> attachments);
    Attachment save(Attachment attachment);
    Attachment get(String name, String userID);
    Attachment update(Attachment attachment);
    Boolean delete(Attachment attachment);
    List<Attachment> listByUserID(String userID);
    List<Attachment> listByUserIDandProfile(String userID, String profile);
}
