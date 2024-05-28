import Page from "../Page/Page";
import { Text, SimpleGrid, Box, useBreakpointValue, Flex, Center } from '@chakra-ui/react';
import TransparentSidebar from "./TransparentSidebar";
import { useNavigate } from 'react-router-dom';
import RecipeCardTodoFav from "../RecipeCards/RecipeCardTodoFav";
import { useEffect } from "react";

function RecipeFinderPage ({numberRecipes}) {
    const navigate = useNavigate();
    const isSmallScreen = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        
    });

    return (
        <Page navigate={navigate}>
            <Box w='100%' h='100%'>
                <Box bgImage={'cookingBackground.jpeg'} bgPosition='center' bgSize='cover' bgRepeat='no-repeat' bgClip={'border-box'} w='100%' h='100%'>
                    <Flex flexDirection={isSmallScreen ? "column" : "row"}> 
                        <TransparentSidebar />
                        <Box backgroundColor="rgba(255, 255, 255, 1)" width="100%" height="100%" borderTopRadius="5vh" mt="1vh" alignItems="left" textAlign="left" pl="3vw">
                            <Center><Text color="greenBrand.500" fontSize="4xl" className='title-font'>Find recipes</Text></Center>
                            <Text color="greenBrand.500" fontSize="xl" fontWeight="bold">Results: {numberRecipes}</Text>
                            <Box overflowY="auto" maxWidth='100%' maxHeight={{base:"75vh", md:"75vh"}} minHeight={{base:"77.5vh", md:"77.5vh", lg: "77vh"}} className="scrollable-box">
                                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={3} h="100%">
                                    <RecipeCardTodoFav imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/> 
                                    <RecipeCardTodoFav imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/> 
                                    <RecipeCardTodoFav imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/> 
                                    <RecipeCardTodoFav imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/>
                                    <RecipeCardTodoFav imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/> 
                                    <RecipeCardTodoFav imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/> 
                                    <RecipeCardTodoFav imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/> 
                                    <RecipeCardTodoFav imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/>
                                </SimpleGrid>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Page>
  
    );
}

export default RecipeFinderPage;