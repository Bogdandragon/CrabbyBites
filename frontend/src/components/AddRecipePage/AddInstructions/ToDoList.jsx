import { HStack, VStack,Text, Flex, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input } from '@chakra-ui/react'
import { DeleteIcon, EditIcon} from '@chakra-ui/icons'
import React,{useState} from 'react'

function TodoList({ todos, deleteTodo, editTodo }) {
    const [todo, setTodo] = useState(""); 
    const [modalValue, setModalValue] = useState({})
    const [isOpen,setIsOpen] = useState(false)   

    function onClose() {
        setIsOpen(false)
    }

    function handleEditClick(todo) {
        setIsOpen(true)
        setModalValue(todo)
        console.log(todo)
    }

    function handleEditInputChange(e,id) {
        setModalValue({ ...modalValue, instruction: e.target.value });
        console.log(modalValue,id) 
    }

    function handleEditSubmit(e) {
        e.preventDefault();
        editTodo(modalValue.id,modalValue)
        setModalValue("")
        setIsOpen(false)
    }

    return (
        !todos.length ? 
            <Badge colorScheme="greenBrand" variant="outline" borderRadius="4" p='4' m='5'>Add instructions for your recipe</Badge> 
            : (
                <VStack>
                    { todos.map((todo) => (
                        <HStack spacing="24px" w="320px">
                            <Flex p={6} w="300px" h="50px" justifyContent="space-between">
                                <Text>{todo.instruction}</Text>
                                <Flex w="10px" >
                                    <DeleteIcon color="red.500" mr="2" onClick={()=>deleteTodo(todo.id)}/>
                                    <EditIcon onClick={()=>handleEditClick(todo)} />
                                </Flex>
                        
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Edit your instruction</ModalHeader>
                                        <ModalCloseButton />
                                        <form onSubmit={handleEditSubmit}>
                                            <ModalBody>
                                                <Input value={modalValue.instruction} key={modalValue.id} variant="outline" type="text"
                                                    placeholder="Update your instruction" onChange={handleEditInputChange} />
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button colorScheme="greenBrand" mr={3} onClick={onClose}>Close</Button>
                                                <Button type="submit" colorScheme="greenBrand" mr={3}>Update</Button>
                                            </ModalFooter>
                                        </form>
                                    </ModalContent>
                                </Modal>
                            </Flex>
                        </HStack>  
                    ))} 
                </VStack>
            )
        )
    }

export default TodoList
