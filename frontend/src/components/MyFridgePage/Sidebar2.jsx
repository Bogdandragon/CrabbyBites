import React from 'react';
import { Text, Box, SimpleGrid, IconButton, useDisclosure, FormControl, FormLabel, Input, Center } from '@chakra-ui/react';
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import SubmitButton from '../Buttons/SubmitButton'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import IngredientsCard2 from './IngredientsCard2';
import axios from 'axios';
import { useState } from 'react';

function TransparentSidebar2() {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const {ingredients , setIngredients} = useState([]);

    axios.get(`http://localhost:5000/api/auth/ingredients`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then((response) => {
        setIngredients(response.data);
    }).catch((error) => {
        console.log(error);
    })
    const formikAddIngredient = useFormik({
        initialValues: {ingredient: ''},
        onSubmit: (values) => {
            axios.post(`http://localhost:5000/api/auth/addIngredient`, values, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }).then(() => {
                toast({
                    title: 'Ingredient added successfully.',
                    description: 'Ingredient added to your fridge page.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            
            }).catch((error) => {
                toast({
                    title: 'Error adding ingredient.',
                    description: error.response.data,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            })

            onClose();
            
        },
        validationSchema: Yup.object().shape({
            ingredient: Yup.string().required('Required field'),
        })
    })
    return (
        <Box h={{base: "100%", md: "90vh"}} w={{base: '100%', md: "50vw"}} bg='rgba(0, 0, 0, 0.3)' >
           <Text color="white" fontSize="4xl" className='title-font'>MY FRIDGE</Text>
           <Box h={{base: "100%", md: "70vh"}} w={{base: '100%', md: "50vw"}} bg='rgba(0, 0, 0, 0)' maxHeight={{base:"80%", md:"80vh"}} overflowY="auto" className='scrollable-box' pl='2vw' pr='3vw' pb='1vh'
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for Firefox and IE
                    sx={{
                        "&::-webkit-scrollbar": {
                            display: "none" // Hide scrollbar for Chrome, Safari, and Opera
                        }
                    }}>
                <SimpleGrid columns={{base:2, lg:3}} spacing={4}>
                    {/* ingredient card with every letter */}
                    {
                        letters.map((letter) => {
                        if (!ingredients || ingredients.length === 0) return null;
                        const ingredientsLetter = ingredients.filter((ingredient) => ingredient.name.toLowerCase().startsWith(letter));

                        if (ingredientsLetter.length > 0) {
                            return <IngredientsCard2 typeIngredients={letter.toUpperCase()} ingredientsList={ingredientsLetter}/>
                        } else {
                            return null;
                        }
                     })}

                </SimpleGrid>
            </Box>
            <IconButton mt='1vh' aria-label='Add ingredient' isRound={false} variant='solid' colorScheme='red' boxSize='12' fontSize='30' icon={<AddIcon />} onClick={onOpen}/>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Ingredient</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl onSubmit={formikAddIngredient.handleSubmit}>  
                            <FormControl isRequired>
                                <FormLabel>Ingredient name</FormLabel>
                                <Input id='ingredient' name='ingredient' type='ingredient' onChange={formikAddIngredient.handleChange} value={formikAddIngredient.values.ingredient}/>
                            </FormControl>
                            <FormControl>
                            </FormControl>
                            <Center pt='3vh'><SubmitButton text="Add your ingredient" onClick={formikAddIngredient.handleSubmit}/></Center>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
  );
}

export default TransparentSidebar2;