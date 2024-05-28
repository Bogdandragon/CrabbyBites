import React, { useState, useEffect } from 'react';
import { VStack } from '@chakra-ui/react';
import AddTodo from './AddToDo';
import TodoList from './ToDoList';

function AddList({ingredients}) {
    const todosList = [
        { id: 1, ingredient: 'milk', quantity: '500ml'},
        { id: 2, ingredient: 'eggs', quantity: '3'},
        { id: 3, ingredient: 'lemon juice', quantity: '100ml'}
    ];
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
            <AddTodo addTodo={addTodo}/>
        </VStack>
    );
}

export default AddList;