import Page from "../Page/Page";
import { Text } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center } from '@chakra-ui/react'
import TransparentSidebar from "./TransparentSidebar";
import { useNavigate } from 'react-router-dom';
import { useBreakpointValue } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import RecipeCardTodoFav from "../RecipeCards/RecipeCardTodoFav";

function RecipeFinderPage ({numberRecipes}) {
    const navigate = useNavigate();
    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    return (
        <Page navigate={navigate}>
            <Box w='100vw' h='90vh'>
            <Box
              bgImage={'cookingBackground.jpeg'}
              bgPosition='center'
              bgSize='cover'
              bgRepeat='no-repeat'
              bgClip={'border-box'}
              w='100%' h='100%'>
                
                <Flex flexDirection={isSmallScreen ? "column" : "row"} 
                        justifyContent="flex-start"
                        alignItems="flex-start"> 

                        <TransparentSidebar />
                        <Box
                            backgroundColor="rgba(255, 255, 255, 1)" 
                            width={isSmallScreen ? "100%" : "90%"}
                            borderTopRadius="5vh"
                            mt={isSmallScreen ? 0 : "5vh"} 
                            p={isSmallScreen ? 4 : 0} 
                            alignItems="left"
                            textAlign="left"
                            pl="2vw"
                        >
                            <Text >Results: {numberRecipes}</Text>
                            <Box overflowY="auto" maxHeight={{base:"79vh", md:"79.5vh"}} minHeight={{base:"70.5vh", md:"79.5vh"}} className='scrollable-box'>
                            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
                            <RecipeCardTodoFav imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/> 
                            <RecipeCardTodoFav imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/> 
                            <RecipeCardTodoFav imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/> 
                            <RecipeCardTodoFav imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/>
                            
                            </SimpleGrid>
                            </Box>
                             
                        </Box>
                    </Flex>
            
            
            </Box></Box>
            



        </Page>
        
    );
}

export default RecipeFinderPage;