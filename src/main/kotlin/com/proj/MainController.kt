package com.proj

import com.proj.model.InputMessage
import com.proj.model.OutputMessage
import com.proj.service.HighlightService
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@SpringBootApplication
@RestController("/")
class MainController(var highlightService: HighlightService) {

    @CrossOrigin
    @PostMapping
    fun post(@RequestBody inputMessage: InputMessage)
    : OutputMessage {
        return highlightService.getOutput(inputMessage)
    }
}

fun main(args: Array<String>) {
    runApplication<MainController>(*args)
}