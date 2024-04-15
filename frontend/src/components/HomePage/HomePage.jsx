import Page from "../Page/Page";
import { Text } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center } from '@chakra-ui/react'
import '@fontsource/dm-serif-display';
import { Flex, Image, Heading, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import HomePageButton from '../Buttons/HomePageButton'

import './HomePage.css'

function HomePage() {
    
    return (
        <Page>
        <SimpleGrid columns={1} spacing={0}>
        <Box bgImage={'cookingBackground.jpeg'}
       
                    bgPosition='center'
                    bgSize='cover'
                    bgRepeat='no-repeat'
                    w='100%' h='100%'className="hide-on-mobile">
         <SimpleGrid columns={2} spacing={0}>
        
         <Center bg='#E3F2DD' h='60%' w='65%' ml='17%' mt='14%' color='black' borderRadius='25'>
            <Stack spacing={3}>
            <Text fontSize={['xl','2xl', '3xl', '4xl', '5xl', '6xl']} fontWeight='semibold' fontFamily= 'dm-serif-display'>WELCOME TO CRABBY BITES!</Text>
            <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight='semibold' fontFamily= 'dm-serif-display'>Welcome to our cooking recipes social platform, where culinary enthusiasts come together to share, discover and create delicious dishes from around the world.</Text>
            <Center><HomePageButton text="Let's Get Started!"/></Center>   
            </Stack>
          </Center>
       
         <Flex flexDirection='column' alignItems='left' ml='25%' mt='4%'className="hide-on-mobile" >
            <Box>
                <Image
                src="foodd.png"
                border='1px'
                borderRadius="20"
                transition='0.5s ease'
                width="55%" // Example: 50% of the parent's width
                height="65%" // Maintain aspect ratio
                />
                <Image
                src="salata.png"
                borderRadius="20"
                border='1px'
                boxShadow='xl'
                width="55%" // Example: 50% of the parent's width
                height="65%" // Maintain aspect ratio
                transform='translate(-65%, -85%)'
                />
            </Box>
            </Flex>
        </SimpleGrid>
        </Box>
        </SimpleGrid>
        </Page>
    );

}

export default HomePage;
