import Page from "../Page/Page";
import { Text, SimpleGrid, Box, useBreakpointValue, Flex, Center } from '@chakra-ui/react';
import TransparentSidebar from "./TransparentSidebar";
import { useNavigate } from 'react-router-dom';
import RecipeCardTodoFav from "../RecipeCards/RecipeCardTodoFav";
import { useEffect, useState } from "react";
import axios from "axios";

function RecipeFinderPage () {
    const navigate = useNavigate();
    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
    });

    return (
        <Page navigate={navigate}>
            <Box w='100%' h='100%'>
                <Box bgImage={'cookingBackground.jpeg'} bgPosition='center' bgSize='cover' bgRepeat='no-repeat' bgClip={'border-box'} w='100%' h='100%'>
                    <Flex flexDirection={isSmallScreen ? "column" : "row"}> 
                        <TransparentSidebar callback={setRecipes} />
                        <Box backgroundColor="rgba(255, 255, 255, 1)" width="100%" height="100%" borderTopRadius="5vh" mt="1vh" alignItems="left" textAlign="left" pl="3vw">
                            <Center><Text color="greenBrand.500" fontSize="4xl" className='title-font'>Find recipes</Text></Center>
                            <Text color="greenBrand.500" fontSize="xl" fontWeight="bold">Results: {recipes.length}</Text>
                            <Box overflowY="auto" maxWidth='100%' maxHeight={{base:"75vh", md:"75vh"}} minHeight={{base:"77.5vh", md:"77.5vh", lg: "77vh"}} className="scrollable-box">
                                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={3} h="100%">
                                    {recipes.map((recipe) => (
                                        <RecipeCardTodoFav recipeId={recipe._id} imageUrl={"data:image/png;base64," + recipe.picture} titleRecipe={recipe.title} descriptionRecipe={recipe.description} timeCooking={recipe.time} difficulty={recipe.difficulty} numberServings={recipe.servings}/>
                                    ))}
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