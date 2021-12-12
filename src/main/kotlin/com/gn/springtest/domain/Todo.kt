package com.gn.springtest.domain

import java.sql.Time
import javax.persistence.*

@Entity
@Table(name = "todo")
class Todo(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    val id: Long? = null,

    @Column(name = "title", nullable = false)
    val title: String,

    @Column(name = "todo_message", nullable = false)
    val todoMessage: String,

    @Column(name = "in_progress", nullable = false)
    val inProgress: Boolean,

    @Column(name = "is_done", nullable = false)
    val isDone: Boolean,

    @Column(name = "create_date", nullable = false)
    val createDate: Time,

    @Column(name = "update_date")
    val updateDate: Time? = null
)