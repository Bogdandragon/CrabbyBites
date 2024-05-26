import React from 'react';
import { Text, Box, SimpleGrid, IconButton, useDisclosure, FormControl, FormLabel, Input, Center } from '@chakra-ui/react';
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import SubmitButton from '../Buttons/SubmitButton'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import IngredientsCard2 from './IngredientsCard2';

function TransparentSidebar2() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const formikAddIngredient = useFormik({
        initialValues: {ingredient: '', quantity: 0},
        onSubmit: (values) => {},
        validationSchema: Yup.object().shape({
            ingredient: Yup.string().required('Required field'),
            quantity: Yup.number().positive().integer().required('Required field')
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
                    <IngredientsCard2 typeIngredients="ESSENTIALS"/>
                    <IngredientsCard2 typeIngredients="VEGETABLES"/>
                    <IngredientsCard2 typeIngredients="FRUITS"/>
                    <IngredientsCard2 typeIngredients="DAIRY"/>
                    <IngredientsCard2 typeIngredients="MEAT"/>
                    <IngredientsCard2 typeIngredients="FLOUR"/>
                    <IngredientsCard2 typeIngredients="BREAD"/>
                    <IngredientsCard2 typeIngredients="SPICES"/>
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
                                <Input placeholder='Ingredient name' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Quantity</FormLabel>
                                <NumberInput min={0}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
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