import Page from "../Page/Page";
import { Text } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center, useToast } from '@chakra-ui/react'
import '@fontsource/dm-serif-display';
import { Flex, Image, Heading, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { Show, Hide } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'
import SubmitButton from "../Buttons/SubmitButton";
import InfoButton from "../Buttons/InfoButton";
import './RecipePage.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { TimeIcon, MoonIcon, BellIcon, StarIcon } from '@chakra-ui/icons'


function RecipePage() {
    const navigate = useNavigate();
    const toast = useToast();

    const [recipe, setRecipe] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl = 'http://localhost:5000/api/recipes/6636385502482879b4adf223'; // Replace with your API endpoint URL

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await axios.get(apiUrl);
                setRecipe(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching recipe:', error);
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
            <Box
              //background={`url('cookingBackground.jpeg') fixed center / cover repeat`}
              bgImage={'cookingBackground.jpeg'}
              bgSize='cover'
              bgRepeat='repeat'
              position="absolute"
              width="100%"
              height="100%"
              top="5vw"
            >
              {/* White Box centered within the Background Image */}
            {isLoading ? <Text>Loading...</Text> :
              <Box
                backgroundColor="rgba(255, 255, 255, 1)" 
                width="90%" 
                position="absolute"
                top="125vh"
                left="50%"
                transform="translate(-50%, -50%)"
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                textAlign="center"
                marginTop="30vh"
                marginBottom="4vh"
                borderRadius="5vh"
                overflow="hidden"
              >
                <Text fontSize="10vh" fontWeight="bold" mb="5vh" maxWidth="50%" maxHeight="25%">
                    {recipe.name.toUpperCase()}
                </Text>

                <Flex justifyContent="space-between" width="45%" mb="5vh">
                    <SubmitButton text="Add to TODO List" size="lg" />
                    <SubmitButton text="Add to Favorites" size="lg"/>
                    <SubmitButton text="Report" size="sm"/>
                </Flex>

                <Flex width="50%" justifyContent="space-between" mb="0vh">
                    <Text fontSize="2.5vh" fontWeight="bold">
                        {recipe.category.toUpperCase()}
                    </Text>
                    <Text fontSize="2.5vh" fontWeight="bold">
                        <TimeIcon mr="1vh" />
                        {recipe.time}
                    </Text>
                    <Text fontSize="2.5vh" fontWeight="bold">
                        <MoonIcon mr="1vh" />
                        {recipe.difficulty.toUpperCase()}
                    </Text>
                    <Text fontSize="2.5vh" fontWeight="bold">
                        <BellIcon mr="1vh" />
                        {recipe.portions} SERVINGS
                    </Text>
                    <Text fontSize="2.5vh" fontWeight="bold">
                        <StarIcon mr="1vh" />
                        {recipe.rating}
                    </Text>
                </Flex>

                <Image src="roastedChicken.png" alt="Recipe Image" w="80vw" h="100vh" borderRadius="5vh" />

                <SimpleGrid columns={2} spacing={10} mt="20px" width="80%" alignContent="left">
                    <Box>
                        <Text fontSize="3vh" fontWeight="bold" color="rgba(242, 120, 30, 1)" textAlign="left">
                            INSTRUCTIONS
                        </Text>
                        <Text textAlign="left"> {recipe.instructions} </Text>
                        <InfoButton text="Share" />
                    </Box>

                    <Box backgroundColor="rgba(247, 229, 198, 1)" borderRadius="5vh" padding="3vh">
                        <Box backgroundColor="rgba(250, 244, 235, 1)" borderRadius="5vh" padding="3vh" marginBottom="3vh">
                            <Text fontSize="3vh" fontWeight="bold" color="rgba(255, 120, 30, 1)" textAlign="left">
                                DESCRIPTION
                            </Text>
                            <Text textAlign="left"> {recipe.description} </Text>
                        </Box>

                        <Box backgroundColor="rgba(250, 244, 235, 1)" borderRadius="5vh" padding="3vh">
                            <Text fontSize="3vh" fontWeight="bold" color="rgba(255, 120, 30, 1)" textAlign="left">
                                INGREDIENTS
                            </Text>
                            <Text textAlign="left">  </Text>
                        </Box>
                    </Box>
                </SimpleGrid>

              </Box>
            }
            </Box>
          </Box>
        </Page>
      );

}

export default RecipePage;