import Page from "../Page/Page";
import { Text, SimpleGrid, Stack, HStack, Box, Center, useToast, Container, Flex, Image } from '@chakra-ui/react';
import { TimeIcon, MoonIcon, BellIcon, StarIcon } from '@chakra-ui/icons'
import '@fontsource/dm-serif-display';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import SubmitButton from "../Buttons/SubmitButton";
import InfoButton from "../Buttons/InfoButton";
import { AddIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Spacer } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/react';
import TodoRecipeCard from "./TodoRecipeCard";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, 
    Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import IngredientBox from "./IngredientBox";

function TodoRecipesPage() {
    const navigate = useNavigate();
    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Page navigate={navigate}>
          {/* Centering the white box horizontally and vertically */}
            <Box display="flex" justifyContent="center" alignItems="center">
                {/* Background Image */}
                
                    <Flex justifyContent="center" bgImage={'cookingBackground.jpeg'} bgRepeat='repeat' w="100%" minH="90vh">
                    {/* White Box centered within the Background Image */}
                        <Box backgroundColor="rgba(255, 255, 255, 1)" w="90%" display="flex" flexDirection="column" justifyContent="flex-start"
                             borderTopRadius="5vh" mt="5vh" pl="3vw" pr="3vw">
                                <Stack direction="row"> 
                                    <Text fontSize={{base:"4vh", md:"5vh"}} fontWeight="bold">TODO Recipes</Text>
                                    <Spacer />
                                    {isSmallScreen ? 
                                         <IconButton
                                         mt='1vh'
                                         isRound={true}
                                         variant='solid'
                                         color="white" bgColor='#EE6352'
                                         boxSize='12'
                                         fontSize='30'
                                         icon={<AddIcon />}
                                         onClick={onOpen}
                                         />
                                        : <Button mt='1vh' isRound={false} variant='solid' color="white" bgColor='#EE6352' borderRadius="full" fontSize="2vw"
                                     rightIcon={<AddIcon />} onClick={onOpen}>Create shopping list</Button>}
                                </Stack>

                                <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Shopping List:</ModalHeader>
                                    <ModalCloseButton />
                                <ModalBody>
                                    <SimpleGrid columns={3} spacing={3}>
                                        <IngredientBox text="apple" quantity="2"/>
                                        <IngredientBox text="watermelon" quantity="2"/>
                                        <IngredientBox text="apple" quantity="2"/>
                                        <IngredientBox text="apple" quantity="2"/>
                                        <IngredientBox text="apple" quantity="2"/>
                                        <IngredientBox text="apple" quantity="2"/>


                                    </SimpleGrid>
                                    
                                </ModalBody>
                                </ModalContent>
                                </Modal>


                                <TodoRecipeCard recipeId="1" imageUrl="fruitTart.jpeg" nameRecipe="Fruit Tart" listOwnedIngredients="apple, cherries" listMissingIngredients="flour, egg"/>
                                <TodoRecipeCard recipeId="1" imageUrl="fruitTart.jpeg" nameRecipe="Fruit Tart" listOwnedIngredients="apple, cherries" listMissingIngredients="flour, egg"/>
                                <TodoRecipeCard recipeId="1" imageUrl="fruitTart.jpeg" nameRecipe="Fruit Tart" listOwnedIngredients="apple, cherries" listMissingIngredients="flour, egg"/>
                                <TodoRecipeCard recipeId="1" imageUrl="fruitTart.jpeg" nameRecipe="Fruit Tart" listOwnedIngredients="apple, cherries" listMissingIngredients="flour, egg"/>
                                <TodoRecipeCard recipeId="1" imageUrl="fruitTart.jpeg" nameRecipe="Fruit Tart" listOwnedIngredients="apple, cherries" listMissingIngredients="flour, egg"/>
                                <TodoRecipeCard recipeId="1" imageUrl="fruitTart.jpeg" nameRecipe="Fruit Tart" listOwnedIngredients="apple, cherries" listMissingIngredients="flour, egg"/>
                                
                        </Box>
                    </Flex>
                
            </Box>
        </Page>
      );
}

export default TodoRecipesPage;