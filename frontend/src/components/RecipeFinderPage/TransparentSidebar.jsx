import React from 'react';
import { Text, Box, SimpleGrid, Center } from '@chakra-ui/react';
import IngredientsCard from '../IngredientsCard/IngredientsCard';
import SubmitButton from '../Buttons/SubmitButton';

function TransparentSidebar() {
    return (
        <Box h={{ base: "auto", lg: "90vh" }} w={{ base: '100%', md: '85%', lg: "30vw" }} bg='rgba(0, 0, 0, 0.3)' minHeight={{ md: "90vh" }}>
            <Text color="white" fontSize="4xl" className='title-font'>INGREDIENTS</Text>
            <Center pb='1vh'>
                <SubmitButton size='lg' text="Search" />
            </Center>
            <Box h={{ base: "auto", lg: "75vh" }} w={{ base: '100%', lg: "30vw" }} bg='rgba(0, 0, 0, 0)'
                maxHeight={{ base: "40vh", md: "80vh" }} overflowY="auto" className='scrollable-box' pl='2vw' pr='3vw' pb='1vh'
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for Firefox and IE
                sx={{
                    "&::-webkit-scrollbar": {
                        display: "none" // Hide scrollbar for Chrome, Safari, and Opera
                    }
                }}  >
                <SimpleGrid columns={2} spacing={4}>
                    <IngredientsCard typeIngredients="ESSENTIALS" />
                    <IngredientsCard typeIngredients="VEGETABLES" />
                    <IngredientsCard typeIngredients="FRUITS" />
                    <IngredientsCard typeIngredients="DAIRY" />
                    <IngredientsCard typeIngredients="MEAT" />
                    <IngredientsCard typeIngredients="FLOUR" />
                    <IngredientsCard typeIngredients="BREAD" />
                    <IngredientsCard typeIngredients="SPICES" />
                </SimpleGrid>
            </Box>
        </Box>
    );
}

export default TransparentSidebar;