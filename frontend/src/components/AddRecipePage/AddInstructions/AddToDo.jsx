import { Stack, Text, Button, Center, useToast, Textarea } from '@chakra-ui/react'
import React, {useState} from 'react'
import { nanoid } from 'nanoid';

function AddTodo({ addTodo }) {
    const toast = useToast()
    const [instruction, setInstruction] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        if(instruction === '') {
            toast({
                title: "Please enter the text.",
                status: "warning",
                duration: 2000,
                isClosable: true,
            })
            return;
        }
        const todo = { id: nanoid(), instruction: instruction}
        addTodo(todo)
        setInstruction('')
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={0}>
                <Center><Text mt={2}>Enter your instruction:</Text></Center>
                <Textarea mt={0} w={{base:'50vw', md:'25vw'}} value={instruction} variant="outline" type="text" placeholder="Ex.: Cut your onion..." onChange={(e)=>setInstruction(e.target.value)} /> 
                <Button mt={2} colorScheme="neutral" onClick={handleSubmit}>Add instruction</Button>
            </Stack>
        </form>
    );
}

export default AddTodo