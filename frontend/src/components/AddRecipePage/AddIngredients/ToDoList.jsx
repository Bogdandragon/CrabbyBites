import { HStack, VStack,Text, Flex, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Select } from '@chakra-ui/react'
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

    function handleEditInputChange(e, id) {
        setModalValue({ ...modalValue, field: e.target.value});
        console.log(modalValue, id) 
    }

    function handleEditSubmit(e) {
        e.preventDefault();
        editTodo(modalValue.id,modalValue)
        setModalValue("")
        setIsOpen(false)
    }

    return (
        !todos.length ? 
            <Badge colorScheme="greenBrand" variant="outline" borderRadius="4" p='4' m='5'>Add ingredients and quantites for your recipe</Badge> 
            : (
                <VStack>
                    { todos.map((todo) => (
                        <HStack spacing="24px" w="320px">
                            <Flex p={6} w="300px" h="50px" justifyContent="space-between">
                                <Text>{todo.quantity}{todo.measurement} {todo.ingredient}</Text>
                                <Flex w="10px" >
                                    <DeleteIcon color="red.500" mr="2" onClick={()=>deleteTodo(todo.id)}/>
                                    <EditIcon onClick={()=>handleEditClick(todo)} />
                                </Flex>
                        
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Edit your list of ingredients</ModalHeader>
                                        <ModalCloseButton />
                                        <form onSubmit={handleEditSubmit}>
                                            <ModalBody>
                                                <Input value={modalValue.ingredient} key={modalValue.id} variant="outline" type="text"
                                                    placeholder="Update your ingredient" onChange={handleEditInputChange} />
                                                <Input value={modalValue.quantity} key={modalValue.id} variant="outline" type="text"
                                                    placeholder="Update your quantity" onChange={handleEditInputChange} />
                                                <Select value={modalValue.measurement} key={modalValue.id} onChange={handleEditInputChange}>
                                                    <option value='mg'>mg   </option>
                                                    <option value='g'>g</option>
                                                    <option value='kg'>kg</option>
                                                    <option value='ml'>ml</option>
                                                    <option value='l'>l</option>
                                                    <option value='tsp'>tsp</option>
                                                    <option value='tbsp'>tbsp</option>
                                                    <option value='cup'>cup</option>
                                                </Select>    
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
