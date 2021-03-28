package com.proj.service

import com.proj.utils.ConstantMessages
import org.apache.poi.xwpf.usermodel.XWPFDocument
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.ByteArrayOutputStream

@Service
class FileService {

    fun parse(file: MultipartFile)
    : String {
        val contentType = file.contentType!!
        if (contentType == "text/plain")
            return parseTxt(file)
        else if (contentType.contains("office"))
            return parseDocx(file)
        throw Exception(ConstantMessages.badContentType)
    }

    private fun parseDocx(file: MultipartFile) : String {
        val docx = XWPFDocument(file.inputStream)
        val par = docx.paragraphs
        return par.joinToString ("\n") { it.text }
    }

    private fun parseTxt(file: MultipartFile) : String {
        return String(file.bytes)
    }

    fun write(type: String, text: String)
    : ByteArray {
        return when (type){
            "TXT" -> makeTxt(text)
            "DOCX" -> makeDocx(text)
            else -> throw Exception(ConstantMessages.badContentType)
        }
    }

    private fun removeStrong(text: String)
    : String{
        return text.replace(Regex("</?strong>"), "")
    }

    private fun makeDocx(text: String) : ByteArray {
        val doc = XWPFDocument()
        val paragraphs = text.split("<br/>")
        for (paragraph in paragraphs){
            if (paragraph.isEmpty())
                continue
            val docParagraph = doc.createParagraph()
            var isBold = false
            var index = 0
            while (true) {
                val run = docParagraph.createRun()
                val newIndex =
                        if (isBold)
                            paragraph.indexOf("</strong>", index)
                        else
                            paragraph.indexOf("<strong>", index)

                if (newIndex == -1) {
                    run.setText(removeStrong(paragraph.substring(index, paragraph.length - 1)))
                    run.isBold = isBold
                    break
                } else {
                    run.setText(removeStrong(paragraph.substring(index, newIndex)))
                    run.isBold = isBold
                    isBold = !isBold
                    index = newIndex
                }
            }

        }
        val os = ByteArrayOutputStream()
        doc.write(os)
        return os.toByteArray()
    }

    private fun makeTxt(text: String) : ByteArray {
        val bos = ByteArrayOutputStream()
        bos.write(text.replace("<br/>", "\n").toByteArray())
        return bos.toByteArray()
    }
}