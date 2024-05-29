import Page from "../Page/Page";
import { Text, Flex, Image, SimpleGrid, Box, Center, useToast, Container  } from '@chakra-ui/react';
import { TimeIcon, MoonIcon, BellIcon, StarIcon, AddIcon } from '@chakra-ui/icons'
import '@fontsource/dm-serif-display';
import SubmitButton from "../Buttons/SubmitButton";
import InfoButton from "../Buttons/InfoButton";
import './ProfilePage.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";



function ProfilePage() {
    const navigate = useNavigate();
    const toast = useToast();

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl = "http://localhost:5000/api/user/";

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(apiUrl);
                setUser(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
                setIsLoading(false);
            }
        }
        fetchUser();
    }, [apiUrl]);

    return (
        <Page navigate={navigate}>
          {/* Centering the white box horizontally and vertically */}
          <Box display="flex" justifyContent="center" alignItems="center">
            {/* Background Image */}
            {isLoading ? <Text>Loading...</Text> :
            <Flex justifyContent="center" bgImage={'cookingBackground.jpeg'} bgRepeat='repeat' width="100%" minH="100vh">
              {/* White Box centered within the Background Image */}
              <Box backgroundColor="rgba(255, 255, 255, 1)" w="90%" display="flex" flexDirection="column" justifyContent="flex-start"
                    alignItems="center" textAlign="center" borderRadius="5vh" mt="5vh">
                <Text color="greenBrand.500" fontSize="5vh" fontWeight="bold" my="5vh" maxWidth="100%" maxHeight="25%">
                    user.username
                </Text>
                <Flex justifyContent="center" width="45%" mb="5vh" wrap="wrap">
                    <Container m="1vh" w="auto"><SubmitButton text="Create a recipe" size="lg" /></Container>
                </Flex>
{/* 
                <Flex justifyContent="center" mb="1vh" wrap="wrap" px="1vh">
                    <Text fontSize="2vh" fontWeight="bold" mx-="1vh">
                        {user.username}
                    </Text>
                    <Text fontSize="2vh" fontWeight="bold" mx="1vh">
                        <TimeIcon viewBox="0 0 25 30" mr="3px" />
                        {user.username}
                    </Text>
                    <Text fontSize="2vh" fontWeight="bold" mx="1vh">
                        <MoonIcon viewBox="0 0 25 30" mr="3px" />
                        {user.username}
                    </Text>
                    <Text fontSize="2vh" fontWeight="bold" mx="1vh">
                        <BellIcon viewBox="0 0 25 30" mr="3px" />
                        {user.username}
                    </Text>
                    <Text fontSize="2vh" fontWeight="bold" mx="1vh">
                        <StarIcon viewBox="0 0 25 30" mr="3px" />
                        {user.username}
                    </Text>
                </Flex> */}

                <SimpleGrid columns={{base: 1, lg: 2}} spacing={10} mt="20px" width="100%" alignContent="left" px={{base: "5%", lg: "10%"}}>
                    <Box order={{base: 1, lg: 0}}>
                        <Text fontSize="3vh" fontWeight="bold" color="rgba(242, 120, 30, 1)" textAlign="left">
                            INSTRUCTIONS
                        </Text>
                    </Box>

                    <Box backgroundColor="rgba(247, 229, 198, 1)" borderRadius="5vh" padding={{base: "2vh", lg: "3vh"}}>
                        <Box backgroundColor="rgba(250, 244, 235, 1)" borderRadius="5vh" padding={{base: "2vh", lg: "3vh"}} marginBottom="3vh">
                            <Text fontSize="3vh" fontWeight="bold" color="rgba(255, 120, 30, 1)" textAlign="left">
                                DESCRIPTION
                            </Text>
                            <Text textAlign="left"> {user.username} </Text>
                        </Box>

                        <Box backgroundColor="rgba(250, 244, 235, 1)" borderRadius="5vh" padding={{base: "2vh", lg: "3vh"}}>
                            <Text fontSize="3vh" fontWeight="bold" color="rgba(255, 120, 30, 1)" textAlign="left">
                                INGREDIENTS
                            </Text>
                            
                            {/* <ul>
                                {recipe.ingredients.map((ingredient) => (
                                    <li>
                                        <Text textAlign="left">{`${ingredient.quantity} ${ingredient.measurement} ${ingredient.name}`}</Text>
                                    </li>
                                ))}
                            </ul>
                             */}
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

export default ProfilePage;