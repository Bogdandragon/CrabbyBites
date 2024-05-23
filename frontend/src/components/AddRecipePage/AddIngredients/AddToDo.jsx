import { Stack, Input,Button,useToast } from '@chakra-ui/react'
import React, {useState} from 'react'
import { nanoid } from 'nanoid';


function AddTodo({ addTodo }) {
    const toast = useToast()
    const [ingredient, setIngredient] = useState("")
    const [quantity, setQuantity] = useState("")

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
        const todo = { id: nanoid(), ingredient: ingredient, quantity: quantity }
        addTodo(todo)
        setIngredient('')
        setQuantity('')
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
                <Input mt={5} value={ingredient} variant="outline" type="text" placeholder="Enter your ingredient..." onChange={(e)=>setIngredient(e.target.value)} />
                <Input value={quantity} variant="outline" type="text" placeholder="Enter the quantity..." onChange={(e)=>setQuantity(e.target.value)} />
                <Button colorScheme="neutral" type="submit">Add ingredient </Button>
            </Stack>
        </form>
    );
}

export default AddTodo