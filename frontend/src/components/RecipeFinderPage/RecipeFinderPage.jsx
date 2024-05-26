import Page from "../Page/Page";
import { Text, SimpleGrid, Box, useBreakpointValue, Flex, Center } from '@chakra-ui/react';
import TransparentSidebar from "./TransparentSidebar";
import { useNavigate } from 'react-router-dom';
import RecipeCardTodoFav from "../RecipeCards/RecipeCardTodoFav";

function RecipeFinderPage ({numberRecipes}) {
    const navigate = useNavigate();
    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    return (
        <Page navigate={navigate}>
            <Box w='100vw' h='90vh'>
                <Box bgImage={'cookingBackground.jpeg'} bgPosition='center' bgSize='cover' bgRepeat='no-repeat' bgClip={'border-box'} w='100%' h='100%'>
                    <Flex flexDirection={isSmallScreen ? "column" : "row"}> 
                        <TransparentSidebar />
                        <Box backgroundColor="rgba(255, 255, 255, 1)" width="100%" height="89vh" borderTopRadius="5vh" mt="1vh" alignItems="left" textAlign="left" pl="3vw">
                            <Center><Text color="greenBrand.500" fontSize="4xl" className='title-font'>Find recipes</Text></Center>
                            <Text color="greenBrand.500" fontSize="xl" fontWeight="bold">Results: {numberRecipes}</Text>
                            <Box overflowY="auto" maxWidth='100%' maxHeight={{base:"79vh", md:"80vh"}} minHeight={{base:"70.5vh", md:"80vh"}} className='scrollable-box' >
                                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={3}>
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