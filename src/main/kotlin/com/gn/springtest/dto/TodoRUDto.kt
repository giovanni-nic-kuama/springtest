package com.gn.springtest.dto

import java.io.Serializable

data class TodoRUDto(val id: Long, val todoMessage: String, val isDone: Boolean) : Serializable
