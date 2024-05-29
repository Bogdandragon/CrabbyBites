import { Stack, Input, Text, Button, Center, useToast, Select } from '@chakra-ui/react'
import React, {useState} from 'react'
import { nanoid } from 'nanoid';

function AddTodo({ addTodo }) {
    const toast = useToast()
    const [ingredient, setIngredient] = useState("")
    const [quantity, setQuantity] = useState("")
    const [measurement, setMeasurement] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        if(ingredient === '') {
            toast({
                title: "Please enter the text.",
                status: "warning",
                duration: 2000,
                isClosable: true,
            })
            return;
        }
        const todo = { id: nanoid(), ingredient: ingredient, quantity: quantity, measurement: measurement}
        addTodo(todo)
        setIngredient('')
        setQuantity('')
        setMeasurement('')
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={0}>
                <Center><Text mt={5}>Enter your ingredient:</Text></Center>
                <Input mt={0} value={ingredient} variant="outline" type="text" placeholder="Ex.: milk, eggs, garlic, ..." onChange={(e)=>setIngredient(e.target.value)} />
                <Center><Text mt={2}>Enter the quantity for your ingredient:</Text></Center>
                <Input value={quantity} variant="outline" type="text" placeholder="Ex.: 500ml, 5, 5 cloves, ...)" onChange={(e)=>setQuantity(e.target.value)} />
                <Center><Text mt={5}>Select your type of measurement:</Text></Center>
                <Select value={measurement} onChange={(val) => setMeasurement(val.target.value)}>
                    <option value='mg'>mg</option>
                    <option value='g'>g</option>
                    <option value='kg'>kg</option>
                    <option value='ml'>ml</option>
                    <option value='l'>l</option>
                    <option value='tsp'>tsp</option>
                    <option value='tbsp'>tbsp</option>
                    <option value='cup'>cup</option>
                </Select>
                <Button mt={2} colorScheme="neutral" type="submit">Add ingredient</Button>
            </Stack>
        </form>
    );
}

export default AddTodo