package com.gn.springtest.dto

import java.sql.Time

class TodoReadDto(
    val id: Long,
    val title: String,
    val todoMessage: String,
    val isDone: Boolean,
    val inProgress: Boolean,
    val createDate: Time?,
    val updateDate: Time?
)