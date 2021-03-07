package com.proj

import com.proj.model.InputMessage
import com.proj.model.OutputMessage
import com.proj.service.HighlightService
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@SpringBootApplication
@RestController("/message")
class MainController(var highlightService: HighlightService) {

    @PostMapping
    fun post(@RequestBody inputMessage: InputMessage)
    : OutputMessage {
        return highlightService.getOutput(inputMessage)
    }
}

@Controller("/")
class IndexController {
    @GetMapping
    fun get() : String {
        return "index"
    }
}

fun main(args: Array<String>) {
    runApplication<MainController>(*args)
}