package com.gn.springtest.dto

import java.io.Serializable

data class TodoCreateDto(val todoMessage: String, val isDone: Boolean) : Serializable
