package com.proj

import com.proj.model.InputMessage
import com.proj.model.OutputMessage
import com.proj.service.HighlightService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/message")
class MainController(var highlightService: HighlightService) {

    @PostMapping
    fun post(@RequestBody inputMessage: InputMessage)
            : OutputMessage {
        return highlightService.getOutput(inputMessage)
    }
}