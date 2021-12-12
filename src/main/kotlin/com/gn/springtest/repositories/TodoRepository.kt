package com.gn.springtest.repositories;

import com.gn.springtest.domain.Todo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor

interface TodoRepository : JpaRepository<Todo, Long>, JpaSpecificationExecutor<Todo> {

}