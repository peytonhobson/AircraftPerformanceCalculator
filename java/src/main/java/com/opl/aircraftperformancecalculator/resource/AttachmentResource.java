package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.models.Attachment;
import com.opl.aircraftperformancecalculator.models.Profile;
import com.opl.aircraftperformancecalculator.models.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/attachments")
@RequiredArgsConstructor
public class AttachmentResource {

    @PostMapping(path = "/save")
    public ResponseEntity<Response> save(@RequestBody Attachment attachment) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("attachment", attachmentService.save(profile)))
                        .message("Attachment saved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
