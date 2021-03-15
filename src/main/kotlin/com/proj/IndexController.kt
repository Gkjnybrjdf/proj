package com.proj

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*


@Controller
@RequestMapping("/")
@SpringBootApplication
class IndexController {
    @GetMapping
    fun get() : String {
        return "index"
    }
}

fun main(args: Array<String>) {
    runApplication<IndexController>(*args)
}