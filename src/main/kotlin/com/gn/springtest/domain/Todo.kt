package com.gn.springtest.domain

import javax.persistence.*

@Entity
@Table(name = "todo")
open class Todo(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: Long? = null,

    @Column(name = "todo_message", nullable = false)
    open var todoMessage: String,

    @Column(name = "is_done", nullable = false)
    open var isDone: Boolean
)