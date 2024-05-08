import Page from "../Page/Page";
import { Text } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center, useToast, Container } from '@chakra-ui/react'
import '@fontsource/dm-serif-display';
import { Flex, Image } from '@chakra-ui/react';
import SubmitButton from "../Buttons/SubmitButton";
import InfoButton from "../Buttons/InfoButton";
import './RecipePage.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { TimeIcon, MoonIcon, BellIcon, StarIcon } from '@chakra-ui/icons'


function RecipePage() {
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams();

    const [recipe, setRecipe] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl = "http://localhost:5000/api/recipes/" + id;

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await axios.get(apiUrl);
                response.data.picture = 'data:image/png;base64,' + response.data.picture;
                setRecipe(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching recipe:", error);
                setIsLoading(false);
            }
        }

        fetchRecipe();
    }, [apiUrl]);

    return (
        <Page navigate={navigate}>
          {/* Centering the white box horizontally and vertically */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {/* Background Image */}
            {isLoading ? <Text>Loading...</Text> :
            <Flex
              justifyContent="center"
              bgImage={'cookingBackground.jpeg'}
              bgRepeat='repeat'
              width="100%"
              minH="100vh"
            >
              {/* White Box centered within the Background Image */}
              <Box
                backgroundColor="rgba(255, 255, 255, 1)" 
                width="90%"
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                textAlign="center"
                borderRadius="5vh"
                mt="5vh"
              >
                <Text fontSize="5vh" fontWeight="bold" my="5vh" maxWidth="100%" maxHeight="25%">
                    {recipe.name.toUpperCase()}
                </Text>

                <Flex justifyContent="center" width="45%" mb="5vh" wrap="wrap">
                    <Container m="1vh" w="auto"><SubmitButton text="Add to TODO List" size="md" /></Container>
                    <Container m="1vh" w="auto"><SubmitButton text="Add to Favorites" size="md"/></Container>
                    <Container m="1vh" w="auto"><SubmitButton text="Report" size="md"/></Container>
                </Flex>

                <Flex justifyContent="center" mb="1vh" wrap="wrap" px="1vh">
                    <Text fontSize="2vh" fontWeight="bold" mx-="1vh">
                        {recipe.category.toUpperCase()}
                    </Text>
                    <Text fontSize="2vh" fontWeight="bold" mx="1vh">
                        <TimeIcon viewBox="0 0 25 30" mr="3px" />
                        {recipe.time} min.
                    </Text>
                    <Text fontSize="2vh" fontWeight="bold" mx="1vh">
                        <MoonIcon viewBox="0 0 25 30" mr="3px" />
                        {recipe.difficulty.toUpperCase()}
                    </Text>
                    <Text fontSize="2vh" fontWeight="bold" mx="1vh">
                        <BellIcon viewBox="0 0 25 30" mr="3px" />
                        {recipe.portions} SERVINGS
                    </Text>
                    <Text fontSize="2vh" fontWeight="bold" mx="1vh">
                        <StarIcon viewBox="0 0 25 30" mr="3px" />
                        {recipe.rating}
                    </Text>
                </Flex>

                <Flex w="80%" overflow="hidden" p="0" borderRadius="5vh" mb="2vh">
                    <Image src={recipe.picture} alt="Recipe Image" minW="100%" minH="50vh" maxH="75vh" objectFit="cover" />
                </Flex>

                <SimpleGrid columns={{base: 1, lg: 2}} spacing={10} mt="20px" width="100%" alignContent="left" px={{base: "5%", lg: "10%"}}>
                    <Box order={{base: 1, lg: 0}}>
                        <Text fontSize="3vh" fontWeight="bold" color="rgba(242, 120, 30, 1)" textAlign="left">
                            INSTRUCTIONS
                        </Text>
                        <ul>
                            {recipe.instructions.map((instruction) => (
                                <li>
                                    <Text textAlign="left"> {instruction} </Text>
                                </li>
                            ))}
                        </ul>
                    </Box>

                    <Box backgroundColor="rgba(247, 229, 198, 1)" borderRadius="5vh" padding={{base: "2vh", lg: "3vh"}}>
                        <Box backgroundColor="rgba(250, 244, 235, 1)" borderRadius="5vh" padding={{base: "2vh", lg: "3vh"}} marginBottom="3vh">
                            <Text fontSize="3vh" fontWeight="bold" color="rgba(255, 120, 30, 1)" textAlign="left">
                                DESCRIPTION
                            </Text>
                            <Text textAlign="left"> {recipe.description} </Text>
                        </Box>

                        <Box backgroundColor="rgba(250, 244, 235, 1)" borderRadius="5vh" padding={{base: "2vh", lg: "3vh"}}>
                            <Text fontSize="3vh" fontWeight="bold" color="rgba(255, 120, 30, 1)" textAlign="left">
                                INGREDIENTS
                            </Text>
                            <ul>
                                {recipe.ingredients.map((ingredient) => (
                                    <li>
                                        <Text textAlign="left">{`${ingredient.quantity} ${ingredient.measurement} ${ingredient.name}`}</Text>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    </Box>
                </SimpleGrid>
                <Center my="1vh">
                    <InfoButton text="Share" />
                </Center>
              </Box>
            </Flex>
            }
          </Box>
        </Page>
      );

}

export default RecipePage;