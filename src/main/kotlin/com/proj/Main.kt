package com.proj

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@SpringBootApplication
@RestController("/")
class Main{

	@PostMapping
	fun post(@RequestBody inputMessage: InputMessage) : OutputMessage{
		return OutputMessage(inputMessage.id, inputMessage.input_text)
	}
}

fun main(args: Array<String>) {
	runApplication<Main>(*args)
}
