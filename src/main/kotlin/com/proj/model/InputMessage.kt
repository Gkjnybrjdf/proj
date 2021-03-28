package com.proj.model

enum class Type {
    Tf, Tfidf, Lda, TextRank
}

class InputMessage(var id: String, var input_text: String, var sentence_count : Long, var type: Type)