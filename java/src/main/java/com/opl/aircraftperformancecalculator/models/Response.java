package com.opl.aircraftperformancecalculator.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data; // Look deeper into Lombok
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.Map;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

/**
 * Class to represent responses for HTTP requests
 */
@Data
@SuperBuilder
@JsonInclude(NON_NULL)
public class Response {

    protected LocalDateTime timeStamp;
    protected int statusCode;
    protected HttpStatus status;
    protected String reason;
    protected String message;
    protected String developerMessage;
    protected Map<?,?> data; // The map contains two values: one string that represents the name of the variables
                                // that will be passed to the front end and the actual data to represent this.
                                // For example: Angular will read Map.of("pilots", pilot.get()) and store in a variable
                                // called res.data.pilots.
}
