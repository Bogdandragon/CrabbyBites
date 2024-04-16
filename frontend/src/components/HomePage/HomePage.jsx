import Page from "../Page/Page";
import { Text } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center } from '@chakra-ui/react'
import '@fontsource/dm-serif-display';
import { Flex, Image, Heading, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { Show, Hide } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'
import SubmitButton from "../Buttons/SubmitButton";
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <Page navigate={navigate}>
        <Box w='100vw' h='90vh'>
            <Box bgImage={'cookingBackground.jpeg'}
                bgPosition='center'
                bgSize='cover'
                bgRepeat='no-repeat'
                bgClip={'border-box'}
                w='100%' h='100%'>
                <Flex px="5vw">
                    <Center pt="15vh" minW="50%">
                        <Center bg='#E3F2DD' minH='60vh' py="2vh" color='black' borderRadius='25' className="column">
                            <Stack>
                                <Text fontSize='5vh' fontWeight='semibold' fontFamily='dm-serif-display' mb="0">WELCOME TO</Text>
                                <Text fontSize='5vh' fontWeight='semibold' fontFamily='dm-serif-display' mb="3vh">CRABBY BITES!</Text>
                                <Text fontSize='2.5vh' fontWeight='semibold' fontFamily='dm-serif-display' mb="4vh" mx="2vw">Welcome to our cooking recipes social platform, where culinary enthusiasts come together to share, discover and create delicious dishes from around the world.</Text>
                                <Center><SubmitButton text="Let's Get Started!" size="lg"/></Center>   
                            </Stack>
                        </Center>
                    </Center>
                    
                    <Show breakpoint='(min-width: 769px)' w="50%">
                        <Flex alignItems='baseline' pt="5vh">
                                <Image src="salad.jpeg"
                                    borderRadius="20"
                                    border='1px'
                                    boxShadow='xl'
                                    width="23vw" 
                                    height="70vh"
                                    transform='translate(35%, 15%)'
                                    objectFit={'cover'}
                                />
                                <Image src="food.jpeg"
                                    border='1px'
                                    borderRadius="20"
                                    width="21vw"
                                    height="70vh"
                                    objectFit={'cover'}
                                />    
                        </Flex>
                    </Show>
                
                </Flex>
            </Box>
        </Box>
        </Page>
    );

}

export default HomePage;