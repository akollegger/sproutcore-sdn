package org.neo4j.examples.todo.repository;

import org.neo4j.examples.todo.model.Todo;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface TodoRepository extends GraphRepository<Todo> {

}
