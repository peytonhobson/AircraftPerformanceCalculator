package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.models.Attachment;
import com.opl.aircraftperformancecalculator.models.Profile;
import com.opl.aircraftperformancecalculator.models.Response;
import com.opl.aircraftperformancecalculator.service.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/attachments")
@RequiredArgsConstructor
public class AttachmentResource {

    private final AttachmentService attachmentService;

    @PostMapping(path = "/save")
    public ResponseEntity<Response> save(@RequestBody List<Attachment> attachments) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("attachments", attachmentService.save(attachments)))
                        .message("Attachments saved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
