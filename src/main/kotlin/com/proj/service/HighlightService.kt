package com.proj.service

import com.proj.model.InputMessage
import com.proj.model.OutputMessage
import com.proj.utils.ConstantMessages
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
            OutputMessage("-1", inputMessage.input_text, ConstantMessages.serviceRequestError)
        else {
            val result = response.body!!
            val replaced = result.output_text.replace("\n", "<br/>")
            result.output_text = replaced
            result
        }
    }
}