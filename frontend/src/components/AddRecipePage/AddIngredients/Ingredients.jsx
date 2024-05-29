import React, { useState } from 'react';
import { VStack } from '@chakra-ui/react';
import AddTodo from './AddToDo';
import TodoList from './ToDoList';

function AddList({ingredients, onChange}) {
    const todosList = [];
    const [todos, setTodos] = useState(todosList);
    
    function deleteTodo(id) {
        const newTodos = todos.filter((item)=> { return item.id !== id })
        setTodos(newTodos)
        console.log(newTodos)
    }
        
    function addTodo(newTodo) {
        setTodos([...todos, newTodo])
        ingredients.push(newTodo)
    }
    
    function editTodo(id,updatedTodo) {
        const updatedItem = todos.map((todo) => { return todo.id === id ? updatedTodo : todo; });
        setTodos(updatedItem)
    }
    
    return (
        <VStack p={5}>
            <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo}/>
            <AddTodo addTodo={addTodo} onChange={onChange}/>
        </VStack>
    );
}

export default AddList;