package com.gn.springtest.repositories

import com.gn.springtest.domain.Todo
import org.springframework.data.jpa.domain.Specification

class ToDoSpecifications {
    companion object {
        fun completed(completed: Boolean): Specification<Todo> {
            return Specification<Todo> { root, query, criteriaBuilder ->
                criteriaBuilder.equal(root.get<Todo>("isDone"), completed)
            }
        }

        fun inProgress(inProgress: Boolean): Specification<Todo> {
            return Specification<Todo> { root, query, criteriaBuilder ->
                criteriaBuilder.equal(root.get<Todo>("inProgress"), inProgress)
            }
        }
    }
}