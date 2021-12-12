package com.gn.springtest.dto

import java.io.Serializable

data class TodoUpdateDto(
    val id: Long,
    val title: String,
    val todoMessage: String,
    val inProgress: Boolean,
    val isDone: Boolean
) : Serializable
