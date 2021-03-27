package com.proj.controllers

import com.proj.model.InputMessage
import com.proj.model.OutputMessage
import com.proj.model.Type
import com.proj.service.FileService
import com.proj.service.HighlightService
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/file")
class FileController(var fileService: FileService, var highlightService: HighlightService) {

    @PostMapping
    @RequestMapping("/upload")
    fun upload(
            @RequestParam(value = "sentence_count") sentenceCount : Long,
            @RequestParam(value = "type") type : Type,
            @RequestParam(value = "file") file: MultipartFile
    )
    : OutputMessage {
        val input = fileService.parse(file)
        return highlightService.getOutput(InputMessage("1", input, sentenceCount, type))
    }

    @PostMapping
    @RequestMapping("/download")
    fun download(
            @RequestParam(value = "file_type") type : String,
            @RequestParam(value = "output_text") text: String,
            resp: HttpServletResponse
    )
    : HttpEntity<ByteArray> {
        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_OCTET_STREAM
        resp.setHeader("Content-Disposition", "attachment; filename=output_text.${type.toLowerCase()}")
        return HttpEntity(fileService.write(type, text), headers)
    }
}