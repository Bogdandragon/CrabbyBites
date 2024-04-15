import Page from "../Page/Page";
import { Text } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center } from '@chakra-ui/react'
import '@fontsource/dm-serif-display';
import { Flex, Image, Heading, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { Show, Hide } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'
import SubmitButton from "../Buttons/SubmitButton";
import './HomePage.css'

function HomePage() {
    return (
        <Page>
        <SimpleGrid columns={1} spacing={0} w='100vw' h='90vh'>
            <Box bgImage={'cookingBackground.jpeg'}
                        bgPosition='center'
                        bgSize='cover'
                        bgRepeat='no-repeat'
                        w='100%' h='100%'>
                <Flex>  
                    <Center bg='#E3F2DD' h='60vh' w='33vw' ml='8vw' mt='15vh' color='black' borderRadius='25' className="column">
                        <Stack>
                            <Text fontSize='3vw' fontWeight='semibold' fontFamily= 'dm-serif-display'>WELCOME TO CRABBY BITES!</Text>
                            <Text fontSize='1.5vw' fontWeight='semibold' fontFamily= 'dm-serif-display'>Welcome to our cooking recipes social platform, where culinary enthusiasts come together to share, discover and create delicious dishes from around the world.</Text>
                            <Center><SubmitButton text="Let's Get Started!"/></Center>   
                        </Stack>
                    </Center>
                    
                    <Show breakpoint='(min-width: 769px)'>
                        <Box className="hide-on-mobile" display='flex' alignItems='baseline' mr='10vh' mt='5vh'>
                                <Image src="salad.jpeg"
                                borderRadius="20"
                                border='1px'
                                boxShadow='xl'
                                width="23vw" 
                                height="70vh"
                                transform='translate(35%, 15%)'
                                />
                                <Image src="food.jpeg"
                                border='1px'
                                borderRadius="20"
                                width="21vw"
                                height="70vh"  
                                />    
                        </Box>
                    </Show>
                
                </Flex>
            </Box>
        </SimpleGrid>
        </Page>
    );

}

export default HomePage;