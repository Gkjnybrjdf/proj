package com.proj.service

import com.proj.model.InputMessage
import com.proj.model.OutputMessage
import org.springframework.http.HttpEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class HighlightService {

    var app = "https://highlight-the-important.herokuapp.com/"

    fun getOutput(inputMessage: InputMessage): OutputMessage {
        val resource = "api/${inputMessage.type.toString().toLowerCase()}/get_predict"

        val response = RestTemplate().postForEntity("$app$resource", HttpEntity<InputMessage>(inputMessage), OutputMessage::class.java)

        return if (response.body == null)
            OutputMessage("-1", inputMessage.input_text, "Ошибка при выполнении запроса к сервису")
        else
            response.body!!
    }
}