package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.models.Attachment;
import com.opl.aircraftperformancecalculator.models.Profile;
import com.opl.aircraftperformancecalculator.models.Response;
import com.opl.aircraftperformancecalculator.service.AttachmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/attachments")
@RequiredArgsConstructor
@Slf4j
public class AttachmentResource {

    private final AttachmentService attachmentService;

    @PostMapping(path = "/save")
    public ResponseEntity<Response> save(@RequestBody List<Attachment> attachments) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of(null, attachmentService.saveAll(attachments)))
                        .message("Attachments saved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @GetMapping(path = "/getAll/{userID}")
    public ResponseEntity<Response> getUserAttachments(@PathVariable("userID") String userID) {
        log.info("here");
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("attachments", attachmentService.listByUserID(userID)))
                        .message("Attachments Returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
