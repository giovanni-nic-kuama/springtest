package com.gn.springtest.dto

import java.io.Serializable

data class TodoCreateDto(val todoMessage: String, val title: String, val inProgress: Boolean, val isDone: Boolean) :
    Serializable
